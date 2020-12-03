function Redirect() 
    {  
        document.getElementById("overlay").style.display = "none";
        window.location="index.html"; 
    } 

function authState() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("overlay").style.display = "block";
            setTimeout('Redirect()', 3000);  

        } else {
            document.getElementById("overlay").style.display = "none";
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





