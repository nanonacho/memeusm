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

function mostrarMemes(){
  posts = firebase.firestore().collection("posts").orderBy("fecha")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      dicPosts.push(doc.data())
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    document.getElementById("memeContainer").insertAdjacentHTML('beforeend', `
      <figure class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
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
    document.getElementById("memePersonasContainer").insertAdjacentHTML('beforeend', `
      <figure class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
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
    document.getElementById("memeGatosContainer").insertAdjacentHTML('beforeend', `
      <figure class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
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
    document.getElementById("memePerrosContainer").insertAdjacentHTML('beforeend', `
      <figure class="sombra figure rounded mx-auto " style="height: 45%; width: 45%; background-color: #c8cbce; ">
        <img src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${post.autor} Fecha: ${post.fecha} </figcaption>
      </figure>`)
  })
})
}

