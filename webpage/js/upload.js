let objectDetector;
let objects = []

function detect() {
    objectDetector.detect(img, function (err, results) {
      if (err) {
        console.log(err);
        return
      }
    objects = results;
    console.log(results+"detect")
    });
  }

async function cargarImagen(img){
    var reader  = new FileReader();
    reader.onloadend = function () {
        etiquetarMeme(reader.result)
    }
    reader.readAsDataURL(img)
}
async function etiquetarMeme(url){
    img = new Image();
    img.src = url;
    objectDetector = await ml5.objectDetector('cocossd', detect)
}

async function publicar(){
    var user = firebase.auth().currentUser
    if (user){
        var storageRef = firebase.storage().ref();
        var email = user.email
        var img = document.getElementById("FormControlFile").files[0]
        let memeEtiquetas = []
        await cargarImagen(img)
        await storageRef.child("memes/" + img.name).put(img)
        await storageRef.child("memes/"+img.name).getMetadata().then(async function(metadata){
            await storageRef.child("memes/"+img.name).getDownloadURL().then(async function(url){
                objects.forEach(function(objeto){
                    if (!memeEtiquetas.includes(objeto.label) && (objeto.label == "person" || objeto.label == "dog" || objeto.label == "cat")){
                        console.log(objeto.label)
                        memeEtiquetas.push(objeto.label)
                    }
                })
                await firebase.firestore().collection("posts").add({
                    autor : email,
                    etiquetas : memeEtiquetas,
                    likes : 0,
                    imgurl : url,
                    fecha : metadata.timeCreated
                })
                
            })
            alert("Se ha publicado")
    })
    window.location = "index.html"
    }
    else{
        alert("¡Necesitas loguearte para subir memes!")
    }

}

