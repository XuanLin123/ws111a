import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

//database part
const db = new DB("blog.db");
db.query(`CREATE TABLE IF NOT EXISTS memosdb(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, title TEXT, note TEXT)`);
db.query(`INSERT OR IGNORE INTO memosdb (id, time, title, note) VALUES (0,'2022-10-10','雙十','放假')`)

//router part
const router = new Router;
router.get("/", listMemo)
    .get('/memo/new', add)
    .get('/memo/:id', showMemo)
    .post('/memo', create)
    .get('/del/:id', del);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
    let listMemo = []
    for(const [id, time, title, note] of db.query(sql)) {
        listMemo.push({id, time, title, note})
    }
    return listMemo
}

async function listMemo(ctx) {
    let memos = query(`SELECT id, time, title, note FROM memosdb`);
    ctx.response.body = await render.listMemo(memos);
}

async function showMemo(ctx) {
    const pid = ctx.params.id;
    let memos = query(`SELECT id, time, title, note FROM memosdb WHERE id = ${pid}`);
    if(!memos[0]) {
        ctx.throw(404, "invalid id");
    }
    ctx.response.body = await render.showMemo(memos[0]);
}

async function add(ctx) {
    ctx.response.body = await render.newMemo();
}

async function del(ctx) {
    const pid = ctx.params.id;
    db.query(`DELETE FROM memosdb WHERE id = ${pid}`);
    ctx.response.redirect('/');
}

async function create(ctx) {
    const note = ctx.request.body()
    if(note.type === "form") {
        const pairs = await note.value
        const memo = {}
        for(const [key, value] of pairs) {
            memo[key] = value
        }
        db.query(`INSERT INTO memosdb(time, title, note) VALUES( ?, ?, ?)`, [memo.time, memo.title, memo.note]);
        ctx.response.redirect('/')
    }
}

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });