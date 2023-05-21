import React from 'react';

export interface CardProps {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, body, icon }) => {
  return (
    <div className="mx-auto flex h-52 w-72 flex-col rounded bg-secondary p-4 md:h-60 md:w-96 md:p-8">
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="mb-2 text-base font-semibold text-accent md:text-2xl">
        {title}
      </h3>
      <p className="text-sm font-light text-primary md:text-xl">{body}</p>
    </div>
  );
};

export default Card;
