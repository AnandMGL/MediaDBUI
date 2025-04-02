import mainCaller, { pilaAuthUser } from "./mainCaller";

export function authUser({ password, username }) {
  return pilaAuthUser(password, username);
}

export function authWithEmail(email) {
  return mainCaller("loginWithEmail", "POST", email);
}

export function createUser(user) {
  return mainCaller("signUp", "POST", user, {
    "Content-type": "multipart/form-data",
  });
}

export function kakaoCreateUser(user) {
  return mainCaller("kakaoSignUp", "POST", user, {
    "Content-type": "multipart/form-data",
  });
}
