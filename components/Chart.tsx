'use client';
import LineChart from './Charts/LineChart';
import { twMerge } from 'tailwind-merge';
import BarChart from './Charts/BarChart';
import { AttendantData } from '@/types/Attendant';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { capitalizeFirstLetter } from '@/utils/capitalizeLetter';

interface ChartContainerProps {
  heading: string;
  subheading: string;
  attendants: AttendantData[];
  param: keyof AttendantData;
  label: string;
  colSpan: number;
  chartType: 'line' | 'bar';
  type: 'select' | 'length';
}
// create a react component that returns the div below
const ChartContainer: React.FC<ChartContainerProps> = ({
  heading,
  subheading,
  attendants,
  param,
  label,
  colSpan,
  chartType,
  type
}) => {
  const [option, setOption] = useState(Object.keys(attendants[0])[0]);
  const [chart, setChart] = useState<string>(capitalizeFirstLetter(chartType));
  return (
    <div
      className={twMerge(
        `flex flex-col content-between justify-between overflow-hidden rounded-md border bg-white p-4`,
        'col-span-' + colSpan.toString()
      )}
    >
      <div className="start-0 flex flex-row justify-between">
        <div className="flex flex-row space-x-2 ">
          <h1 className="text-xl">{heading}</h1>
        </div>
        <div className="flex flex-col px-4">
          {type === 'length' && (
            <>
              <h2 className="text-sm text-primary">{subheading}</h2>
              <div className="flex flex-row items-center space-x-2 ">
                <h1 className="text-3xl font-bold  lg:text-5xl">
                  {attendants.length}
                </h1>
              </div>
            </>
          )}
          {type === 'select' && (
            <div className="flex w-full gap-x-1">
              <div className="flex-col">
                <p>Select Attribute</p>
                <Dropdown
                  options={Object.keys(attendants[0])}
                  selectedOption={option}
                  onSelectOption={setOption}
                />
              </div>
              <div className="flex-col">
                <p>Select Chart Type</p>
                <Dropdown
                  options={['Line', 'Bar']}
                  selectedOption={chart}
                  onSelectOption={setChart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {chart.toLowerCase() === 'line' ? (
        <LineChart
          data={attendants}
          param={type === 'select' ? option : param}
          label={label}
        />
      ) : chart.toLowerCase() === 'bar' ? (
        <BarChart
          data={attendants}
          param={type === 'select' ? option : param}
          label={label}
        />
      ) : (
        <div>Invalid chart type</div>
      )}
    </div>
  );
};

export default ChartContainer;
