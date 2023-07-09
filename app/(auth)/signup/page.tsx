'use client';
import Button from '@/components/Button';
import SignUpForm from '@/components/SignUpForm';

function Page() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <Button
          text="Back"
          href="/login"
          size="md"
          className="absolute left-4 top-4 md:left-8 md:top-8"
        />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground text-sm text-zinc-500">
              Enter your username below to create an account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>

      <div className="hidden h-full bg-white lg:block" />
    </div>
  );
}

export default Page;
