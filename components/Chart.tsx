import { mockAttendant } from '@/app/(dashboard)/dashboard/statistics/page';
import LineChart from './Charts/LineChart';
import { twMerge } from 'tailwind-merge';
import BarChart from './Charts/BarChart';

interface ChartContainerProps {
  heading: string;
  subheading: string;
  attendants: mockAttendant[];
  param: keyof mockAttendant;
  label: string;
  colSpan: number;
  chartType: 'line' | 'bar';
}
// create a react component that returns the div below
const ChartContainer: React.FC<ChartContainerProps> = ({
  heading,
  subheading,
  attendants,
  param,
  label,
  colSpan,
  chartType
}) => {
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
          <h2 className="text-sm text-primary">{subheading}</h2>
          <div className="flex flex-row items-center space-x-2 ">
            <h1 className="text-3xl font-bold  lg:text-5xl">
              {attendants.length}
            </h1>
            <h2 className="text-sm text-primary">
              <span className="text-green-500">+4</span> vs last 7 days
            </h2>
          </div>
        </div>
      </div>
      {chartType === 'line' ? (
        <LineChart data={attendants} param={param} label={label} />
      ) : chartType === 'bar' ? (
        <BarChart data={attendants} param={param} label={label} />
      ) : (
        <div>Invalid chart type</div>
      )}
    </div>
  );
};

export default ChartContainer;
