import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

const apikey = 'AIzaSyBa8xtd0PM2z2UcPkdRLuVCst0O-mgB_Co';

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData));   
  }
}

export const authSignup = (authData) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+apikey,{
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(uiStopLoading());
      alert("Authentication failed, please try again.")
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (parsedRes.error) {
        alert("Authentication failed, please try again.");
        console.log(parsedRes)
      }
      else {
        startMainTabs();
      }
    })
  }
}