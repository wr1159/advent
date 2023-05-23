import Hero from '@/components/Hero';
import OrbitalRow from '@/components/OrbitalRow';

const liftoff = [
  {
    href: '/src/liftoff-proposal.pdf',
    title: 'Liftoff Proposal',
    body: 'First iteration of our proposal.'
  },
  {
    href: '/src/liftoff-poster.jpg',
    title: 'Liftoff Poster',
    body: 'First iteration of our poster.'
  },
  {
    href: 'https://youtu.be/iHqpLQbVtEk',
    title: 'Liftoff Video',
    body: 'First video, credits to Vivaldi for the sick soundtrack.'
  }
];

export default function Orbital() {
  return (
    <div className="my-8 flex w-full flex-col items-center">
      <div className="mb-4 flex w-full flex-col items-center space-y-6 px-6 text-xl">
        <h1 className="text-3xl text-accent lg:text-5xl">
          <span className="advent text-black">Advent</span> - NUS Orbital 2023
          Project
        </h1>
        <h2 className="text text-2xl text-accent">
          This page contains all our documents submitted for Orbital 2023.
        </h2>
      </div>
      <div className="my-8 w-full border border-accent"></div>

      <div className="mx-auto mb-8 grid grid-cols-1 justify-center gap-6 md:grid-cols-3">
        <div className="text-center">
          <h3 className="text-primary">Team name</h3>
          <h2 className="text-2xl">
            <span className="advent">Advent</span>
          </h2>
        </div>

        <div className="text-center">
          <h3 className="text-primary">Team number</h3>
          <h2 className="text-2xl">5877</h2>
        </div>
        <div className="text-center">
          <h3 className="text-primary">Achievement Level</h3>
          <h2 className="text-2xl">Artemis</h2>
        </div>
      </div>
      <h2 className="my-4 text-2xl text-accent">Liftoff</h2>
      <OrbitalRow linkCards={liftoff} />
    </div>
  );
}
