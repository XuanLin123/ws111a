export function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <meta charset="UTF-8">
            <meta name="viewport" content="width = device-width, initial-scale = 0.7">
    <style>
    /*tools*/
    .navbar {
      overflow: hidden;
      background-color: #555;
    }
    .navbar a {
      float: left;
      font-size: 16px;
      color: oringe;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }
    .dropdown {
      float: left;
      overflow: hidden;
    }
    .dropdown .dropbtn {
      font-size: 16px;  
      border: none;
      outline: none;
      color: white;
      padding: 14px 16px;
      background-color: inherit;
      font-family: inherit;
      margin: 0;
    }
    .navbar a:hover, .dropdown:hover .dropbtn {
      background-color: pink;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 3;
    }
    .dropdown-content a {
      float: none;
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: left;
    }
    .dropdown-content a:hover {
      background-color: #E3D9D9;
    }
    .dropdown:hover .dropdown-content {
      display: block;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
    }
      body {
        padding: 100px;
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
        margin: 10px 0;
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
      input[type=text],input[type=password],
      textarea {
        border: 1px solid #eee;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
      input[type=text],input[type=password] {
        width: 500px;
      }
      header{
        font-size: 50px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
         background-color: #3600CC;
         margin-top: -80px;
         text-align: center;
         height:70px;
      }
      article{
        width:auto;
        height:auto;
      }
    main
    {
      height:300px;
      width:300px;
    }
      div,ul,li,a,img{margin: 0;padding: 0;}
      .slider{width: 1988px;margin-left: 250px;margin-top: -300px;;position: relative;height: 900px;overflow: hidden;z-index: 1;}
      .slider li{list-style: none;position: absolute;left: 30px;top: 50px;z-index: 0;}
      .slider img{border: none;height: 900px;width:1080px;z-index: 0;}
      .slider .slider_btn{position: relative;height:25px;width:100%;margin-top:700px;margin-left: 900px;  }
      .slider .slider_btn span{display: inline-block;width: 15px;height: 15px;line-height: 15px;text-align: center;margin-right: 5px;cursor: pointer;background: #999;color: #FFFFEF;border-radius: 15px;font-size: 12px; z-index:2;}
    </style>
  </head>
  ${content}
  </html>
  `
}

export function loginUi(args={})  {
  var alertScript
  if (args.status != null) {
    console.log('loginUI:alertScript args=', args)
    alertScript = `<script>
    alert('${args.status}')
    </script>`
  } else {
    alertScript = ''
  }
  return layout('Login', `
  <body>
<header>final blog</header>
<nav>
</nav>
  <h1>Login</h1>
  <form action="/login" method="post">
    <p><input type="text" placeholder="username"  name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="submit" value="Login"></p>
    <p>first uses ? <a href="/signup">Create an account</a></p>
  </form>

  <div class="slider">
    <ul class="slider_pic">
          <li><img src="public/img/IMG_2772.jpg" alt="1" style="width: 1080px;height: 900px;"/></a></li>
          <li><img src="public/img/IMG_3178.jpg" alt="2" style="width: 1080px;height: 900px;"/></a></li>
          <li><img src="public/img/IMG_3774.jpg" alt="3" style="width: 1080px;height: 900px;" /></a></li>
          <li><img src="public/img/IMG_3791.jpg" alt="4" style="width: 1080px;height: 900px;" /></a></li>
          <li><img src="public/img/IMG_3812.jpg" alt="5" style="width: 1080px;height: 900px;" /></a></li>
          
    </ul>
    <div class="slider_btn" style="padding-right: 20px">
      <span style="background-color: deeppink;z-index: 2;"></span><span style="background-color: peru;"></span> <span style="background-color: chartreuse;"></span> <span style="background-color: darkturquoise;"></span> <span style="background-color: red;"></span> </div>
</div>
<script>
    function slider(s){this.init.apply(this,arguments)}
    slider.prototype={
         init:function(s){
            this.o=this.getByClass(s)[0];
            this.l=this.getByClass('slider_pic',this.o)[0].getElementsByTagName('li');
            this.b=this.getByClass('slider_btn',this.o)[0];
            this.bSpan=this.b.getElementsByTagName('span');
            this.len=this.l.length;
            this.iNum=0;
            this.status();
            this.autoPlay();
            this.clickPlay();
            this.suspensionPause();
         },
          clickPlay:function()
          {
               var This=this;
               for(var i=0;i<this.len;i++)
               {    
                     this.bSpan[i].index=i;
                     this.bSpan[i].onclick=function()
                     {
                           clearInterval(This.timer);
                           var index=this.index;
                           This.iNum=(index+1) == This.len ? 0 : (index+1)  ;
                           var o=This.l[index];
                           This.setLayout(this,o);
                           This.autoPlay();
                     }
               }
          },
          suspensionPause:function()
          {  
               var This=this;
               for(var i=0;i<this.len;i++)
               {
                     this.l[i].onmouseover=function()
                     {
                           clearInterval(This.timer);
                     }
                     this.l[i].onmouseout=function()
                     {
                           This.autoPlay();
                     }
               }
          },
          setLayout:function(o1,o2){
               for(var j=0;j<this.len;j++)
               {
                     if(this.bSpan[j]!=o1)
                     {
                           this.bSpan[j].className='';
                           this.l[j].style.zIndex=j;
                     }
               }
               o2.style.zIndex=this.len;
               o2.style.left='600px';
               this.doMove(o2,0);
               o1.className='cur';
          },
          status:function(){
               for(var i=this.len;i--;i>0)
               {
                     this.l[i].style.zIndex=i;
                     this.bSpan[i].className='';
               }
               this.l[0].style.zIndex=this.len;
               this.bSpan[0].className='cur';
               this.b.style.zIndex=(this.len+1);
          },
          autoPlay:function(){
               this.timer=null;
               var This=this;
               this.timer=setInterval(function(){
                     This.setLayout(This.bSpan[This.iNum],This.l[This.iNum])
                     This.iNum++;
                     if(This.iNum==This.len)
                     {
                           This.iNum=0;
                     }
               },4500)
          },
          getByClass:function(s,p){
               var reg=new RegExp('(\\\\b)'+s+'(\\\\b)');
               var aResult=[];
               var aElement=(p || document).getElementsByTagName('*');
               for(var i=0;i<aElement.length;i++)
               {
                     reg.test(aElement[i].className) && aResult.push(aElement[i])
               }
               return aResult;
          },
          doMove:function(o,t)
          {
               clearInterval(o.timer);
               o.timer=setInterval(function(){
                     var iS=(t-o.offsetLeft)/8;
                     iS=iS>0?Math.ceil(iS):Math.floor(iS);

                     if(o.offsetLeft==t)
                     {
                           clearInterval(o.timer);
                     }
                     else
                     {
                           o.style.left=o.offsetLeft+iS+"px";
                     }

               },30)
          }

    }
    var slide=new slider('slider');
   </script>
</body>
${alertScript}
  `)
}

export function signupUi(args={}) {
  var alertScript
  if (args.status != null) {
    console.log('signupUI:alertScript args=', args)
    alertScript = `<script>
    alert('${args.status}')
    </script>`
  } else {
    alertScript = ''
  }
  return layout('Signup',` 
  <h1>Signup</h1>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="username" name="username"></p>
    <p><input type="password" placeholder="password" name="password"></p>
    <p><input type="text" placeholder="email" name="email"></p>
    <p><input type="submit" value="Signup"></p>
  </form>
  ${alertScript}
  `
  )
}

export function success() {
  return layout('Success', `
  <h1>Success!</h1>
  You may <a href="/">read all Post</a> again !
  `)
}

export function fail() {
  return layout('Fail', `
  <h1>Fail!</h1>
  You may <a href="/">read all Post</a> or <a href="JavaScript:window.history.back()">go back</a> !
  `)
}

export function list(posts, user) {
  console.log('list: user=', user)
  let list = []
  for (let post of posts) {
    list.push(`
    <li style="border-color: crimson">
    </li>
    <li style="border-color: crimson"><h2>${ post.title } -- by ${post.username}</h2>
      <p>${post.body}</p>
      <p><a href="/post/${post.id}">Read post</a></p></li>
    `)
  }
  let content = `
  <body>
  <header style="text-align: left;">
  <div class="navbar">
  <a href="/"><img src="public/img/head.png"  style="height: 70px;width: 70px;">回首頁</a>
  <a href="/post/new"><img src="public/img/head.png"  style="height: 70px;width: 70px;">創造貼文</a>
  <a href="/logout"><img src="public/img/head.png"  style="height: 70px;width: 70px;">登出</a>
  <div class="dropdown">
      <button class="dropbtn">
      <img src="public/img/head.png"  style="height: 70px;width: 70px;">
      文章排序
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="/?orderby=id&op=DESC">最新貼文</a>
        <a href="/?orderby=title&op=DESC">文章名稱(A~Z)</a>
        <a href="/?orderby=title&op=ASC">文章名稱(Z~A)</a>
      </div>
    </div> 
  </div>

  </header>

  <article>
  <p style="border: crimson;font-size: 30px; border-top: 100px; ">${(user==null)?' 請先登入再發文!<a href="/login">登入</a>':'歡迎 '+user.username+''}</p>
  
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  </article>
  </body>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
    <p><input type="file"  accept="image/*"/>
  </form>
  `)
}

export function show(post) {
  return layout(post.title, `
  <body >
    <h1>${post.title} -- by ${post.username}</h1>
    <p>${post.body}</p>
  </body>
  `)
}
