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
  memeContainer = document.getElementById("memeContainer")
  posts.get().then(function(querySnapshot) {
    var dicPosts = []
    querySnapshot.forEach(function(doc) {
      dicPosts.push(doc.data())
  });
  dicPosts.reverse()
  dicPosts.forEach(function(post){
    document.getElementById("memeContainer").insertAdjacentHTML('beforeend', `<img src=${post.imgurl} class ="img-thumbnail" style="height: 45%; width: 45%; margin: 10px; border-radius:10px;">`)
  })
})
}

