import React from 'react';
import Button from './Button';

const HeroChild: React.FC = () => {
  return (
    <>
      <p className="px-2 text-center text-base text-primary lg:px-48 lg:text-2xl">
        Say <span className="text-accent">goodbye </span>to inconsistent{' '}
        <span className="text-accent">theming </span>
        in the event registration flow and redirection to{' '}
        <span className="text-accent">third party </span>registration apps.
        Welcome a <span className="text-accent">simple </span>solution to
        integrate an event registration page to your website,{' '}
        <span className="text-accent">customised </span>to your liking.
      </p>
      <div className="my-4 flex-row space-x-2 md:my-12 lg:space-x-12">
        <Button text="Get Started" size="lg" theme="primary" href="/auth" />
        <Button
          text="Github"
          size="lg"
          theme="secondary"
          href="https://www.github.com/wr1159/advent"
        />
      </div>
    </>
  );
};

export default HeroChild;
