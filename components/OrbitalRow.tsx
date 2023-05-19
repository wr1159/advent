import LinkCard, { LinkCardProps } from './LinkCard';

interface OrbitalRowProps {
  linkCards: LinkCardProps[];
}

const OrbitalRow: React.FC<OrbitalRowProps> = ({ linkCards }) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-12 md:grid-cols-2 lg:grid-cols-3">
      {linkCards.map((card, index) => (
        <LinkCard
          key={index}
          href={card.href}
          title={card.title}
          body={card.body}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default OrbitalRow;
