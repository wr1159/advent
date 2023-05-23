'use client';
import SignUpForm from '@/components/SignUpForm';

function Page() {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-70 mb-30">Sign up</h1>
        <SignUpForm></SignUpForm>
      </div>
    </div>
  );
}

export default Page;
