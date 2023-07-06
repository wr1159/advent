import LinkCard from '@/components/LinkCard';
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
    body: 'First video, credits to Vivaldi for the soundtrack.'
  }
];

const milestoneOne = [
  {
    href: '/orbital/milestone-one',
    title: 'Milestone One README',
    body: 'Our first README, detailing our project.'
  },
  {
    href: '/src/milestone-one-poster.png',
    title: 'Milestone One Poster',
    body: 'Our second poster with a QR code to our website.'
  },
  {
    href: 'https://youtu.be/iHqpLQbVtEk',
    title: 'Milestone One Video',
    body: 'Milestone One Video, credits to Vivaldi for the soundtrack.'
  }
];

const milestoneTwo = [
  {
    href: '/orbital/milestone-two',
    title: 'Milestone Two README',
    body: 'Our second README for MS2'
  },
  {
    href: '/src/milestone-two-poster.jpg',
    title: 'Milestone Two Poster',
    body: 'MS2 poster with SWE practices'
  },
  {
    href: 'https://youtu.be/HEh8VRfFCWA',
    title: 'Milestone Two Video',
    body: 'Video with Demo for MS2'
  }
];

const milestoneThree = [
  {
    href: '/orbital',
    title: 'Milestone Three README',
    body: 'Unavailable'
  },
  {
    href: '/orbital',
    title: 'Milestone Three Poster',
    body: 'Unavailable'
  },
  {
    href: '/orbital',
    title: 'Milestone Three Video',
    body: 'Unavailable'
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

      <div className="mx-auto mb-12 grid grid-cols-1 justify-center gap-6 md:grid-cols-3">
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
      <LinkCard
        href="/orbital/project-log"
        title="Project Log"
        body="Project Log submitted"
      />
      <h2 className="my-12 text-2xl text-accent lg:mt-20 lg:text-3xl">
        Liftoff
      </h2>
      <OrbitalRow linkCards={liftoff} />

      <h2 className="my-12 text-2xl text-accent lg:mt-20  lg:text-3xl">
        Milestone 1
      </h2>
      <OrbitalRow linkCards={milestoneOne} />

      <h2 className="my-12 text-2xl text-accent lg:mt-20  lg:text-3xl">
        Milestone 2
      </h2>
      <OrbitalRow linkCards={milestoneTwo} />

      <h2 className="my-12 text-2xl text-accent lg:mt-20  lg:text-3xl">
        Milestone 3
      </h2>
      <OrbitalRow linkCards={milestoneThree} />
    </div>
  );
}
