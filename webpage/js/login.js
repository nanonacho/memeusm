function authState() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            alert("Te has logueado!")
            window.location.replace("index.html")
        } else {
            alert("Has salido de tu cuenta!")
        }
      });
}
function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
        authState()
      }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/wrong-password") {
          alert("¡Contraseña equivocada!");
        }
        else if (errorCode == "auth/invalid-email") {
            alert("¡Email inválido!");
        }
        else if (errorCode == "auth/user-not-found") {
            alert("¡Usuario no encontrado!");
        }
        else {
          alert(errorMessage);
        }
      })
}





