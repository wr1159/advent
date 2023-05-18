import React from 'react';

interface CardProps {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, body, icon }) => {
  return (
    <div className="flex h-60 w-96 flex-col rounded bg-secondary p-8">
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="mb-2 text-2xl font-semibold text-accent">{title}</h3>
      <p className="text-xl font-light text-primary">{body}</p>
    </div>
  );
};

export default Card;
