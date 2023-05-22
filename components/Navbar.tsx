'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';

const Navbar: React.FC<{}> = () => {
  return (
    <NavigationMenu
      orientation="horizontal"
      className="p-4 w-auto text-gray-500 "
    >
      <NavigationMenuList className="flex space-x-6 text-xl items-center align-center">
        <NavigationMenuItem className="advent text-black text-2xl px-6 hover:text-gray-700">
          <NavigationMenuLink href="/">Advent </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-gray-400">
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-gray-400">
          <NavigationMenuLink href="/statistics">Statistics</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:text-gray-400">
          <NavigationMenuLink href="/documentation">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
