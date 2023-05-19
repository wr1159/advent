'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import Button from './Button';

interface linksProps {
  text: string;
  href: string;
}

interface NavbarProps {
  texts: string[];
  links: string[];
  login?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ texts, links, login }) => {
  return (
    <NavigationMenu className="flex w-auto flex-row justify-between p-4 text-gray-500">
      <NavigationMenuList className="align-center flex items-center space-x-6 text-xl">
        <NavigationMenuItem className="advent px-6 text-2xl text-black hover:text-gray-700">
          <NavigationMenuLink href={login ? '/' : '/dashboard'}>
            Advent{' '}
          </NavigationMenuLink>
        </NavigationMenuItem>
        {links.map((link, id) => (
          <NavigationMenuItem className="hover:text-gray-400" key={id}>
            <NavigationMenuLink href={link}>{texts[id]}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {login && (
        <Button
          text="Login"
          size="sm"
          type="secondary"
          href="/auth"
          className="-5"
        />
      )}
    </NavigationMenu>
  );
};

export default Navbar;
