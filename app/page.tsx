import Button from '@/components/Button';
import Card from '@/components/Card';
import Hero from '@/components/Hero';
import { FaPen, FaUser } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { BsBoxArrowInDownRight } from 'react-icons/bs';

export default function Home() {
  return (
    <div>
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
      <h1 className="text-center text-4xl font-bold text-black lg:text-7xl">
        Features
      </h1>
      <div className="my-12 flex flex-col items-center justify-center space-y-10">
        <div className="flex flex-row space-x-10">
          <Card
            title="Customisable"
            body="Customise the event registration page as you wish!"
            icon={<FaPen size={42} />}
          />
          <Card
            title="User-First"
            body="You are placed first into our designs. We strive for a simple and intuitive user experience."
            icon={<FaUser size={42} />}
          />
        </div>
        <div className="flex flex-row space-x-10">
          <Card
            title="Data Dashboard"
            body="View the collected data at a single glance."
            icon={<AiFillPieChart size={42} />}
          />
          <Card
            title="Frictionless"
            body="Seamless integration with your website through one copy button."
            icon={<BsBoxArrowInDownRight size={42} />}
          />
        </div>
      </div>
    </div>
  );
}
