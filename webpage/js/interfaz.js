function Redirect() 
    {  
      document.getElementById("overlay").style.display = "none";
        window.location="index.html"; 
    } 

function authState() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("upload").style.display = "block";
            document.getElementById("in").style.display = "none";
            document.getElementById("reg").style.display = "none";
            document.getElementById("logout").style.display = "block";

        } else {
           document.getElementById("upload").style.display = "none";
           document.getElementById("in").style.display = "block";
           document.getElementById("reg").style.display = "block";
           document.getElementById("logout").style.display = "none"; 
        }
      });
}
authState()
function logout() {
    firebase.auth().signOut().then(function() {
      document.getElementById("overlay").style.display = "block";
            setTimeout('Redirect()', 3000);
}).catch(function(error) {
  // An error happened.
}); 
}
function check(url){
  document.getElementById(url).remove(); 

}


function mostrarMemes(){

  posts = firebase.firestore().collection("posts").orderBy("fecha")

  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      dicPosts.push(doc.data())
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
      var x = post.imgurl
      document.getElementById("memeContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto" style="height: 45%; width: 45%; background-color: #c8cbce; display:block; ">
        <img onerror="check('${x}')" src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="boton-admin figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} <button id="borrar" style="display: none;" class="btn btn-danger">X Borrar</button> </figcaption>
      </figure>`)
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON");

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');

              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){console.log("borrar");}
              btn_like.onclick = function(){console.log("laik");}
             
            }
            else if(user.email != null){
              var btn_like = document.createElement("BUTTON");
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){console.log("laik");}
                }
        } 
      });

      
  })
  
})

}

function mostrarMemesPersonas(){
  posts = firebase.firestore().collection("posts").orderBy("fecha")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      if (doc.data().etiquetas.includes("person")){
        dicPosts.push(doc.data())
      }
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    var x = post.imgurl
    document.getElementById("memePersonasContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto "  style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img onerror="check('${x}')" src=${post.imgurl} id =${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON");

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');

              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){console.log("borrar");}
              btn_like.onclick = function(){console.log("laik");}
             
            }
            else if(user.email != null){
              var btn_like = document.createElement("BUTTON");
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){console.log("laik");}
                }
        } 
      });
  })
})
}

function mostrarMemesGatos(){
  posts = firebase.firestore().collection("posts").orderBy("fecha")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      if (doc.data().etiquetas.includes("cat")){
        dicPosts.push(doc.data())
      }
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    var x = post.imgurl
    document.getElementById("memeGatosContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img onerror="check('${x}')" src=${post.imgurl}  class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON");

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');

              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){console.log("borrar");}
              btn_like.onclick = function(){console.log("laik");}
             
            }
            else if(user.email != null){
              var btn_like = document.createElement("BUTTON");
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){console.log("laik");}
                }
        } 
      });
  })
})
}

function mostrarMemesPerros(){
  posts = firebase.firestore().collection("posts").orderBy("fecha")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      if (doc.data().etiquetas.includes("dog")){
        dicPosts.push(doc.data())
      }
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    var x = post.imgurl
    document.getElementById("memePerrosContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img onerror="check('${x}')" src=${post.imgurl}  class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON");

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');

              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){console.log("borrar");}
              btn_like.onclick = function(){console.log("laik");}
             
            }
            else if(user.email != null){
              var btn_like = document.createElement("BUTTON");
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){console.log("laik");}
                }
        } 
      });
  })
})
}

function mostrarMemesOtrosAnimales(){
  posts = firebase.firestore().collection("posts").orderBy("fecha")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    var otrosAnimales = ["bird","horse","sheep","cow","elephant","bear","zebra","giraffe"]
    querySnapshot.forEach(function(doc) {
      for (animal in otrosAnimales){
        if (doc.data().etiquetas.includes(otrosAnimales[animal])){
          dicPosts.push(doc.data())
        }
      }
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    var x = post.imgurl
    document.getElementById("memeAnimalesContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img onerror="check('${x}')" src=${post.imgurl}  class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON");

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');

              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){console.log("borrar");}
              btn_like.onclick = function(){console.log("laik");}
             
            }
            else if(user.email != null){
              var btn_like = document.createElement("BUTTON");
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){console.log("laik");}
                }
        } 
      });
  })
})
}
