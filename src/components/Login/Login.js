import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGithubSignIn, handleGoogleSignIn, handleSignOUt, initializeLoginFrameWork, signInUserWithEmailAndPassword } from "./LoginManager";

initializeLoginFrameWork();

function Login() {
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    photo: '',
    email: '',
    password: '',
    error: '',
    success: '',
    confirmPassword: false,
    alert: ''
  });


  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  // start google sign in
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res, true);
      })
  }

  const googleSignOUt = () => {
    handleSignOUt()
      .then(res => {
        handleResponse(res, false);
      })
  }
  // end google sign in

  // start facebook sign in
  const facebookSignIn = () => {
    handleFacebookSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }
  // end facebook sign in

  // start github sign in
  const githubSignIn = () => {
    handleGithubSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }
  // end github sign in

  const [newUser, setNewUser] = useState(false);
  const handleBlur = (e) => {
    // console.log( e.target.name,e.target.value);
    let isValidFieldForm;
    if (e.target.name === 'name') {
      isValidFieldForm = e.target.value;
    }
    if (e.target.name === "email") {
      isValidFieldForm = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasAtLeastOneNumber = /\d{1}/.test(e.target.value);
      isValidFieldForm = isPasswordValid && isPasswordHasAtLeastOneNumber;
    }
    if (e.target.name === 'confirmPassword') {
      if (user.password === e.target.value) {
        const confirmNewPassword = { ...user };
        confirmNewPassword[e.target.name] = true;
        confirmNewPassword.alert = '';
        setUser(confirmNewPassword);
      }
      else {
        const confirmNewPasswordNotMatch = { ...user };
        confirmNewPasswordNotMatch.alert = 'Password not matched';
        setUser(confirmNewPasswordNotMatch);
      }
    }

    if (isValidFieldForm) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.confirmPassword && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    if (!newUser && user.email && user.password) {
      signInUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }


  // end google sign up

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      {
        user.isSignedIn ? <button onClick={googleSignOUt}>Sign Out</button>
          :
          <button onClick={googleSignIn}>Sign In</button>

      }
      <br />
      <br />
      <button onClick={facebookSignIn}>Login with facebook</button>
      <br />
      <button onClick={githubSignIn}>Login with Github</button>
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>E-mail, {user.email}</p>
          <img src={user.PhotoURL} alt="" />
        </div>
      }

      <h4>Our own authentication</h4>
      <h5>Email: {user.email}</h5>
      <h6>Password: {user.password}</h6>
      <p>Name: {user.name}</p>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User</label>
      <form onClick={handleSubmit}>
        <br />
        {
          newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your user name" required />
        }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Email address" required />
        <br />
        <input type="password" name="password" placeholder="Enter new password" onBlur={handleBlur} required />
        <br />
        {
          newUser && <input type="password" name="confirmPassword" placeholder="Confirm Password" onBlur={handleBlur} required />
        }
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      {
        user.success ? <p style={{ color: 'green' }}>{newUser ? 'Sign up' : 'Logged in'} successfully</p>
          :
          <p style={{ color: 'red' }}>{user.error}</p>
      }
      <p style={{ color: 'red' }}>{user.alert}</p>
    </div>
  );
}

export default Login;
