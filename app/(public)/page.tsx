import Hero from '@/components/Hero';
import HeroChild from '@/components/HeroChild';
import FeaturesComponent from '@/components/Features';

export default function Home() {
  return (
    <div>
      <Hero largeText="Canva for Event Organisation.">
        <HeroChild />
      </Hero>
      <FeaturesComponent />
    </div>
  );
}
