import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <title>
    home and login
  </title>
  <style>
    body{
      background-color: #C4C400;
    }

    h1{
      color: #000093;
      text-align: center;
    }

    h2{
      color: #00D1C3;
      text-align: center;
    }
    #setlogin{
      margin: 50px;
      padding: 10px;
      width: 230px;
      height: 250px;
      background-color: #FFFFDF	;
      border-radius: 5px;
      border-top: 10px solid #FFAD86;
      
      position:relative;   
      margin: auto;
      top: 100px;
      text-align:center;  
    }
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)

  let pathname = ctx.request.url.pathname

  if (pathname.startsWith("/login")) {
    ctx.response.body = page(`
    <h2>
    <a href="http://127.0.0.1:8000">Home</a>
    </h2>
    <div id="setlogin">
      <h3 style="color:#F75000;">Login</h3>
       <form action="" method="post">
         <input type="text" name="user" value="" placeholder="User Name"/>
         <input type="password" name="password" value="" placeholder="Password"/><br><br>
         <input type="submit" value="login"/>
       </form>
    </div>
    
    `)
  } else {
    ctx.response.body = page(`
      <h1>
      home and login Homework
      </h1>
      <h2>
      <a href="http://127.0.0.1:8000/login">login</a>
      </h2>
    `)
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
