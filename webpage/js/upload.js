function publicar(){
    var user = firebase.auth().currentUser
    console.log(user)
    if (user){
        var storageRef = firebase.storage().ref();
        var email = user.email
        var img = document.getElementById("FormControlFile").files[0]
        storageRef.child("memes/" + img.name).put(img).then(function(snapshot){
            alert("¡Publicado!")
            window.location = "index.html"
            nodoCreate(storageRef,img.name, email)
            })
        
        }
    else{
        alert("¡Necesitas loguearte para subir memes!")
    }
}

function nodoCreate(storageRef,imgName, email){
    storageRef.child('memes/'+imgName).getDownloadURL().then(function(url) {
        console.log(url)
        firebase.firestore().collection("posts").add({
            autor : email,
            etiquetas : "",
            likes : 0,
            imgurl : url
        })
      }).catch(function(error) {
        alert("Se ha producido un error")
      });
      
}