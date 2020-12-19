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
function tieneLikes(id,likes){
  if(likes == 0){
    document.getElementById(id).remove(); 
  }
  

}

function mostrarMemes(label,orden=fecha){
  posts = firebase.firestore().collection("posts").orderBy(orden)
  var otrosAnimales = ["bird","horse","sheep","cow","elephant","bear","zebra","giraffe"]
  var i = 0
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      if (doc.data().etiquetas.includes(label)){
        dicPosts.push(doc.data())
      }
      else if(label == "otros")
      {
        for (var animal in otrosAnimales){
          if(doc.data().etiquetas.includes(otrosAnimales[animal])){
            dicPosts.push(doc.data())
          }
        }
      }
      else if (label == "none"){
        dicPosts.push(doc.data())
      }
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
      var x = post.imgurl
      var y = post.fecha.substr(0, 10)
      if (post.autor.includes("@usm.cl")){
        var autor = post.autor.replace(post.autor.substr(-7),"")
       
      }
      else{
        var autor = post.autor.replace(post.autor.substr(-15),"")
        
      }
      if(orden == 'likes' && i != 3){
        document.getElementById("memeContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto" style="height: 45%; width: 45%; background-color: #f4823f; display:block; ">
        <img onerror="check('${x}')" src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="boton-admin figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${autor} Fecha: ${y} <button id="borrar" style="display: none;" class="btn btn-danger">X Borrar</button> </figcaption>
      </figure>`)
        i = i + 1

      }
      else if (orden != 'likes'){
        document.getElementById("memeContainer").insertAdjacentHTML('beforeend', `
      <figure id =${post.imgurl} class="sombra figure rounded mx-auto" style="height: 45%px; width: 45%; background-color: #c8cbce; display:block; ">
        <img onerror="check('${x}')" src=${post.imgurl} class ="rounded mx-auto d-block img-thumbnail img-fluid rounded figure-img" style="border-radius:10px;">
        <figcaption class="boton-admin figure-caption text-center font-weight-bold"> Likes: ${post.likes}  Autor: ${autor} Fecha: ${y} <button id="borrar" style="display: none;" class="btn btn-danger">X Borrar</button> </figcaption>
      </figure>`)
      }
      
      var exists = document.getElementById(post.imgurl)
      firebase.auth().onAuthStateChanged(function(user) {
        if (user && exists) {
            if(user.email == "patricio.martinezc@usm.cl" || user.email == "ignacio.alvaradome@usm.cl" || user.email == "paolo.garcia@usm.cl"){
              var btn = document.createElement("BUTTON");
              var btn_like = document.createElement("BUTTON",{id: x});

              btn.innerHTML = "Borrar";
              btn_like.innerHTML = "Like"

              btn.classList.add('btn');
              btn.classList.add('btn-danger');

              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              btn_like.classList.add('btn-lg');
              if(post.likes_user.includes(user.email)){
                btn_like.setAttribute("disabled","")
              }
              document.getElementById(x).appendChild(btn);
              document.getElementById(x).appendChild(btn_like);

              btn.onclick = function(){
                var posts = firebase.firestore().collection("posts")
                var storageRef = firebase.storage().ref();
                posts.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    if (doc.data().imgurl == x){
                      var nombre = doc.data().fileName
                      var id = doc.id
                      storageRef.child("memes/" + nombre).delete().then(function(){
                        posts.doc(id).delete().then(e =>{window.location.reload()})
                      })
                    }
                  });
                })
                btn_like.setAttribute("disabled","")
              }
              btn_like.onclick = function(){
                var posts = firebase.firestore().collection("posts")
                posts.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    if (doc.data().imgurl == x){
                      var id = doc.id
                      posts.doc(id).update({
                        likes: firebase.firestore.FieldValue.increment(1),
                        likes_user: firebase.firestore.FieldValue.arrayUnion(user.email)
                      })
                    }
                  });
                })
                btn_like.setAttribute("disabled","")
              }
             
            }
            else if (user && exists){
              var btn_like = document.createElement("BUTTON",{id: x});
              btn_like.innerHTML = "Like";
              btn_like.classList.add('btn');
              btn_like.classList.add('btn-success');
              btn_like.classList.add('btn-lg');
              if(post.likes_user.includes(user.email)){
                btn_like.setAttribute("disabled","")
              }
              document.getElementById(x).appendChild(btn_like);
              btn_like.onclick = function(){
                var posts = firebase.firestore().collection("posts")
                posts.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    if (doc.data().imgurl == x){
                      var id = doc.id
                      posts.doc(id).update({
                        likes: firebase.firestore.FieldValue.increment(1),
                        likes_user: firebase.firestore.FieldValue.arrayUnion(user.email)
                      })
                    }
                  });
                })
                btn_like.setAttribute("disabled","")
              }
                }
        } 
      });

      
  })
  
})
}

