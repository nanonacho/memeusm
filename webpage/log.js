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


function register(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    if (email.value.includes("@usm.cl") ||  email.value.includes("@sansano.usm.cl")){
        const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));
    }
    else{
        alert("¡Solo se permiten correos @sansano.usm.cl y @usm.cl!")
    }
};

function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
        authState()
      }).catch(e => alert(e.message))
}

function logout() {
    firebase.auth().signOut();
}




