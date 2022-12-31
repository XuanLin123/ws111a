export function layout(title, content) {
    return `
    <html>
    <head>
        <title>${title}</title>
        <style>
        body {
            padding: 80px;
            font: 16px Helvetica, Arial;
          }
      
          h1 {
            font-size: 2em;
          }
      
          h2 {
            font-size: 1.2em;
          }
      
          #posts {
            margin: 0;
            padding: 0;
          }
      
          #posts li {
            margin: 40px 0;
            padding: 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            list-style: none;
          }
      
          #posts li:last-child {
            border-bottom: none;
          }
      
          textarea {
            width: 500px;
            height: 300px;
          }
      
          input[type=text],
          textarea {
            border: 1px solid #eee;
            border-top-color: #ddd;
            border-left-color: #ddd;
            border-radius: 2px;
            padding: 15px;
            font-size: .8em;
          }
      
          input[type=text] {
            width: 500px;
          }
        </style>
    </head>
    <body>
        <section id="content">${content}</section>
    </body>
    </html>
    `
}

export function listMemo(memos) {
    let list = []
    for(let memo of memos) {
        console.log(memo.time);
        list.push(`
        <li>
            <h2>${memo.time} ${memo.title}</h2>
            <p><a href="/memo/${memo.id}">Check</a></p>
            <P><a href="/del/${memo.id}">Delete</a></p>
        </li>
        `)
    }
    let content = `
    <h1>Memo~</h1>
    <p>There have <strong>${memos.length}</strong> post~</p>
    <p><a href="/memo/new">Create a Memo</a></p>
    <ul id="memos">${list.join('\n')}</ul>
    `
    return layout('Memos', content)
}

export function showMemo(memo) {
    return layout(memo.title, `
        <h1>${memo.title}</h1>
        <pre>${memo.note}</pre>
        <p><a href="/">Back</a></p>
    `)
}

export function newMemo() {
    return layout('New Memo', `
        <h1>Create New Memo</h1>
        <form action="/memo" method="post">
            <p><input type="date" id="date" name="time"></p>
            <p><input type="text" placeholder="Title" name="title"></p>
            <p><textarea placeholder="Contents" name="note"></textarea></p>
            <p><input type="submit" value="Create"></p>
        </form>
    `)
}