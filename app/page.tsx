import Button from '@/components/Button';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <Hero largeText="Event registration simplified for organisers and attendees.">
      <p className="px-2 text-center text-base text-primary lg:px-48 lg:text-2xl">
        Say <span className="text-accent">goodbye </span>to inconsistent{' '}
        <span className="text-accent">theming </span>
        in the event registration flow and redirection to{' '}
        <span className="text-accent">third party </span>registration apps.
        Welcome a <span className="text-accent">simple </span>solution to
        integrate an event registration page to your website,{' '}
        <span className="text-accent">customised </span>to your liking.
      </p>
      <div className="md: my-12 flex-row space-x-2 lg:space-x-12">
        <Button text="Get Started" size="lg" type="primary" href="/auth" />
        <Button
          text="Github"
          size="lg"
          type="secondary"
          href="https://www.github.com/wr1159/advent"
        />
      </div>
    </Hero>
  );
}
