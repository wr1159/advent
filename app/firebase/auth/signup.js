// import app from "../../../config.js";
const app = require('../../../firebaseconfig.js');

// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const { createUserWithEmailAndPassword, getAuth } = require('firebase/auth');

const auth = getAuth(app);

// export default async function signUp(email, password) {
const signUp = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

module.exports = signUp;
