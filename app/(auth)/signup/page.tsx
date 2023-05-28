'use client';
import Button from '@/components/Button';
import SignUpForm from '@/components/SignUpForm';

function Page() {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-screen p-8">
        <Button text="Back" href="/login" />
      </div>
      <SignUpForm />
    </div>
  );
}

export default Page;
