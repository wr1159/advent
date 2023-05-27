import React, { ReactNode } from 'react';
interface HeroProps {
  largeText: string;
  children: ReactNode;
}
const Hero: React.FC<HeroProps> = ({ largeText, children }) => {
  return (
    <div className="mb-20 mt-32 flex h-3/4 flex-col items-center px-10 md:px-20 ">
      <h1 className="pb-12 text-center text-5xl font-bold text-black md:text-7xl lg:text-8xl">
        {largeText}
      </h1>
      {children}
    </div>
  );
};

export default Hero;
