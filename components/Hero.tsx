import React, { ReactNode } from 'react';
interface HeroProps {
  largeText: string;
  children: ReactNode;
}
const Hero: React.FC<HeroProps> = ({ largeText, children }) => {
  return (
    <div className="my-32 flex h-3/4 flex-col items-center px-20 lg:mt-64 ">
      <h1 className="pb-12 text-center text-4xl font-bold text-black lg:text-8xl">
        {largeText}
      </h1>
      {children}
    </div>
  );
};

export default Hero;
