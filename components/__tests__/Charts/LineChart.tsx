import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like 'toBeInTheDocument'
import LineChart from '@/components/Charts/LineChart';

describe('LineChart', () => {
  const mockData = [
    { id: 1, age: 25 },
    { id: 2, age: 30 },
    { id: 3, age: 22 }
  ];

  test('renders line chart correctly', () => {
    const { container } = render(
      <LineChart data={mockData} param="age" label="Age" />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
