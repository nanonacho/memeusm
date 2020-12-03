

function register(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password_conf = document.getElementById("password_conf");
    console.log(email.value)
    console.log(password.value)
    console.log(password_conf.value)
    if ((email.value.includes("@usm.cl") ||  email.value.includes("@sansano.usm.cl") ) && (password.value == password_conf.value)   ){
        const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        promise.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") {
              alert("¡Email en uso!");
            }
            else if (errorCode == "auth/invalid-email") {
                alert("¡Email inválido!");
            }
            else if (errorCode == "auth/weak-password") {
                alert("¡Contraseña debil!");
            }
            else {
              alert(errorMessage);
            }
          });
    }
    else{
        alert("¡Solo se permiten correos @sansano.usm.cl y @usm.cl y las contraseñas deben ser iguales!")
    }
};



