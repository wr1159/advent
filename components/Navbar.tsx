'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import Button from './Button';

interface NavbarProps {
  links: string[];
  login?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ links, login }) => {
  return (
    <NavigationMenu className="flex w-auto flex-row justify-between p-4 text-gray-500">
      <NavigationMenuList className="align-center flex items-center space-x-6 text-xl">
        <NavigationMenuItem className="advent px-6 text-2xl text-black hover:text-gray-700">
          <NavigationMenuLink href="/">Advent </NavigationMenuLink>
        </NavigationMenuItem>
        {links.map((link) => (
          <NavigationMenuItem className="hover:text-gray-400">
            <NavigationMenuLink href={`/${link.toLowerCase()}`}>
              {link}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {login && (
        <Button
          text="Login"
          size="sm"
          type="secondary"
          href="/auth"
          className="mr-5"
        />
      )}
    </NavigationMenu>
  );
};

export default Navbar;
