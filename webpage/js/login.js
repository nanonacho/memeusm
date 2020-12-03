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
      }).catch(e => alert(e.message))
}





