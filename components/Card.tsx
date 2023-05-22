import React from 'react';

export interface CardProps {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, body, icon }) => {
  return (
    <div className="w-76 mx-8 flex h-48 flex-col rounded-md bg-secondary p-8 md:h-60 md:w-96">
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="mb-2 text-base font-semibold text-accent md:text-2xl">
        {title}
      </h3>
      <p className="text-sm font-light text-primary md:text-xl">{body}</p>
    </div>
  );
};

export default Card;
