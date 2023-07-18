import React from 'react';
import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import { AttendantData } from '@/types/Attendant';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelectOption
}) => {
  return (
    <Root>
      <Trigger asChild>
        <div className="min-w-full rounded-md bg-accent px-2 py-1 text-white">
          {selectedOption}
        </div>
      </Trigger>
      <Content className="w-full rounded-md bg-secondary p-2">
        {options.map((option) => (
          <Item
            className="my-1 rounded-md bg-white px-1"
            key={option}
            onSelect={() => onSelectOption(option)}
          >
            {option}
          </Item>
        ))}
      </Content>
    </Root>
  );
};

export default Dropdown;
