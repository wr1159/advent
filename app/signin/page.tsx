'use client';
import React from 'react';
import handleGoogleSignIn from "../firebase/auth/google-ver";
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';

function Page() {
    function redirectToPage() {
        // Change the URL to the desired page
        window.location.href = '/signup';
      }
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <SignInForm></SignInForm>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        <br></br><button onClick={redirectToPage}>Sign up</button>
      </div>
    </div>
  );
}

export default Page;