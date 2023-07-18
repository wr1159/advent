import React from 'react';
import {
  Menu,
  Item,
  MenuTrigger,
  MenuContent
} from '@radix-ui/react-dropdown-menu';
import { AttendantData } from '@/types/Attendant';

interface DropdownProps {
  options: Array<keyof AttendantData>;
  selectedOption: keyof AttendantData;
  onSelectOption: (option: keyof AttendantData) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelectOption
}) => {
  return (
    <Menu>
      <MenuTrigger as="button" className="btn">
        {selectedOption}
      </MenuTrigger>
      <MenuContent>
        {options.map((option) => (
          <Item key={option} onSelect={() => onSelectOption(option)}>
            {option}
          </Item>
        ))}
      </MenuContent>
    </Menu>
  );
};

export default Dropdown;
