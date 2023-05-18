const app = require("../../firebaseconfig.js");

const { createUserWithEmailAndPassword, getAuth } = require('firebase/auth');
// const { createUserWithEmailAndPassword, getAuth, Auth } = require('firebase/auth');

const auth = getAuth(app);

// export default async function signUp(email, password) {
async function signUp(
  email: string,
  password: string
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

module.exports = signUp;
