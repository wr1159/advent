import Link from 'next/link';
import { CardProps } from './Card';

export interface LinkCardProps extends CardProps {
  href: string;
}
const LinkCard: React.FC<LinkCardProps> = ({ href, title, body, icon }) => {
  return (
    <Link
      href={href}
      className="flex h-36 w-60 flex-col rounded border-2 border-accent bg-secondary p-8 hover:border-accentHover"
    >
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="mb-2 text-base font-semibold text-accent">{title}</h3>
      <p className="text-sm font-light text-primary">{body}</p>
    </Link>
  );
};

export default LinkCard;
