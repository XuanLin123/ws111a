import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("calender.db");
db.query(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, title TEXT, body TEXT)`);

db.query(`INSERT OR IGNORE INTO posts (id, time, title, body) VALUES (0,'2022-10-10','雙十','放假')`)
db.query(`INSERT OR IGNORE INTO posts (id, time, title, body) VALUES (1,'2023-01-01','放假','元旦')`)


const router = new Router();

router.get('/', list)
    .get('/post/new', add)
    .get('/post/:id', show)
    .post('/post', create)
    .get('/del/:id', del)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());


function query(sql) {
    let list = []
    for (const [id, time, title, body] of db.query(sql)) {
        list.push({ id, time, title, body })
    }
    return list
}

async function list(ctx) {
    let posts = query(`SELECT id, time, title, body FROM posts`);
    ctx.response.body = await render.list(posts);
}

async function add(ctx) {
    ctx.response.body = await render.newPost();
}

async function show(ctx) {
    const pid = ctx.params.id;
    let posts = query(`SELECT id, time, title, body FROM posts WHERE id = ${pid}`);
    console.log(posts)
    if (!posts[0]) {
        ctx.throw(404, "invalid note id");
    }
    ctx.response.body = await render.show(posts[0]);
}

async function del(ctx) {
    const pid = ctx.params.id;
    db.query(`DELETE FROM posts WHERE id = ${pid}`);
    ctx.response.redirect("/");
}


async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
        const pairs = await body.value
        const post = {}
        for (const [key, value] of pairs) {
            post[key] = value
        }
        console.log('post=', post)
        db.query(`INSERT INTO posts(time, title, body) VALUES( ? , ? , ? )`, [post.time, post.title, post.body]);
        ctx.response.redirect('/');
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });