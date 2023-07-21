import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartContainer from '../Chart';

// Mock the Chart components to prevent rendering errors during testing
jest.mock(
  '../Charts/LineChart',
  () =>
    function MockedLineChart() {
      return <div data-testid="line-chart" />;
    }
);
jest.mock(
  '../Charts/BarChart',
  () =>
    function MockedBarChart() {
      return <div data-testid="bar-chart" />;
    }
);
jest.mock(
  '../Dropdown',
  () =>
    function MockedDropdown({ options, selectedOption, onSelectOption }: any) {
      return (
        <select
          data-testid="dropdown"
          value={selectedOption}
          onChange={(e) => onSelectOption(e.target.value)}
        >
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
);

const mockAttendants = [
  { name: 'John', age: 30, email: 'john@example.com' },
  { name: 'Alice', age: 25, email: 'alice@example.com' }
];

describe('ChartContainer', () => {
  it('renders correctly with length type', () => {
    render(
      <ChartContainer
        heading="Title"
        subheading="Subtitle"
        attendants={mockAttendants}
        param="name"
        label="Number"
        colSpan={1}
        chartType="line"
        type="length"
      />
    );

    // Check if the heading and subheading are rendered correctly
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();

    // Check if the number of attendants is rendered correctly
    expect(screen.getByText('2')).toBeInTheDocument();

    // Check if the LineChart component is rendered
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders correctly with select type', () => {
    render(
      <ChartContainer
        heading="Title"
        subheading="Subtitle"
        attendants={mockAttendants}
        param="name"
        label="Number"
        colSpan={1}
        chartType="bar"
        type="select"
      />
    );

    // Check if the heading and subheading are rendered correctly
    expect(screen.getByText('Title')).toBeInTheDocument();

    // Check if the Dropdown components are rendered
    expect(screen.getAllByTestId('dropdown')).toHaveLength(2);

    // Check if the BarChart component is rendered
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
