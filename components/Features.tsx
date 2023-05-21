import React from 'react';
import { FaPen, FaUser } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { BsBoxArrowInDownRight } from 'react-icons/bs';
import Card from './Card';

const FeaturesComponent: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-black lg:text-7xl">
        Features
      </h1>
      <div className="my-12 grid grid-cols-1 justify-center gap-6 md:grid-cols-2">
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
  );
};

export default FeaturesComponent;
