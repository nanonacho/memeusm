
async function publicar(){
    var user = firebase.auth().currentUser
    console.log(user)
    if (user){
        var storageRef = firebase.storage().ref();
        var email = user.email
        var img = document.getElementById("FormControlFile").files[0]
        await storageRef.child("memes/" + img.name).put(img)
        await storageRef.child("memes/"+img.name).getMetadata().then(async function(metadata){
            await storageRef.child("memes/"+img.name).getDownloadURL().then(function(url){
                console.log(metadata)
                firebase.firestore().collection("posts").add({
                    autor : email,
                    etiquetas : "",
                    likes : 0,
                    imgurl : url,
                    fecha : metadata.timeCreated
                })
            })
            alert("Se ha publicado")
    })

    }
    else{
        alert("¡Necesitas loguearte para subir memes!")
    }
}
