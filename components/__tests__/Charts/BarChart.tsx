import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like 'toBeInTheDocument'
import BarChart from '@/components/Charts/BarChart';

describe('BarChart', () => {
  const mockData = [
    { id: 1, age: 25 },
    { id: 2, age: 30 },
    { id: 3, age: 22 }
  ];

  test('renders bar chart correctly', () => {
    const { container } = render(
      <BarChart data={mockData} param="age" label="Age" />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
