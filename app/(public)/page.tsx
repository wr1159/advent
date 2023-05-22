import Hero from '@/components/Hero';
import HeroChild from '@/components/HeroChild';
import FeaturesComponent from '@/components/Features';

export default function Home() {
  return (
    <div>
      <Hero largeText="Event registration simplified for organisers and attendees.">
        <HeroChild />
      </Hero>
      <FeaturesComponent />
    </div>
  );
}
