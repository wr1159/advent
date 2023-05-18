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
      className="p-4 flex w-auto text-gray-500"
    >
      <NavigationMenuList className="flex space-x-6 text-xl">
        <NavigationMenuItem className="font-serif text-black text-xl px-6">
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
