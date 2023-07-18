import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const selectedOption = 'Option 1';
  const onSelectOption = jest.fn();

  test('displays the selected option correctly', () => {
    render(
      <Dropdown
        options={options}
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
      />
    );

    const trigger = screen.getByText('Option 1');
    expect(trigger).toHaveTextContent(selectedOption);
  });
});
