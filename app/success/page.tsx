import React from 'react';
import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="text-center">
        <h1 className="mb-6 font-sans text-4xl font-bold">
          Registration Successful
        </h1>
        <p className="mb-8 font-sans text-lg">
          Thank you for registering. We look forward to seeing you at the event.
        </p>
        <Link href={`/dashboard`}>Back to Home</Link>
      </main>
    </div>
  );
};

export default SuccessPage;
