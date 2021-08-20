import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      else {
        firebase.app();
      }
};

// start google sign in
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, PhotoURL, email } = res.user;
            const userDetails = {
                isSignedIn: true,
                name: displayName,
                photo: PhotoURL,
                email: email,
                success:true
            }
            setSignedToken();
            return userDetails;
            console.log(displayName, PhotoURL, email);
        })
        .catch(err => {
            console.log(err)
            console.log(err.message);
            console.log(err.email);
            console.log(err.credential);
        });
}

const setSignedToken = ()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        sessionStorage.setItem('token', idToken)
      }).catch(function(error) {
        // Handle error
      });
}
export const handleSignOUt = () => {
    return firebase.auth().signOut()
        .then(() => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                success:false
            }
            return signedOutUser;
        })
        .catch(err => {

        });
}

// end google sign in

// start facebook sign in
export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            user.success = true;
            return user;
            console.log('fb user', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            // ...
        });

}

// end facebook sign in

// start email-password sign up and sign

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserInfo(name);
            return newUserInfo;
        })
        .catch((error) => {
            const errorMessage = error.message;
            const showErrorMessage = {};
            showErrorMessage.error = errorMessage;
            showErrorMessage.success = false;
            return showErrorMessage;
        });
}

export const signInUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const errorMessage = error.message;
            const showErrorMessage = {};
            showErrorMessage.error = errorMessage;
            showErrorMessage.success = false;
            return showErrorMessage;
        });
}
// update user name when create new account
const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(() => {
        console.log('User name updated successfully');
    }).catch((error) => {
        console.log('Opus! that in not possible');
        console.log(error.message);
    });
}

  // end email-password sign up and sign

  // start github sign in
  export const handleGithubSignIn = () => {
    var githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        return user;
        console.log(user);
        // ...
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(email, errorMessage);
        var credential = error.credential;
        // ...
      });
  }