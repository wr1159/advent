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
      className="w-auto p-4 text-gray-500 "
    >
      <NavigationMenuList className="align-center flex items-center space-x-6 text-xl">
        <NavigationMenuItem className="advent px-6 text-2xl text-black hover:text-gray-700">
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
