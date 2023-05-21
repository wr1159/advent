'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import Button from './Button';
import { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

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
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <NavigationMenu className="flex w-auto flex-row justify-between p-4 text-gray-500 ">
      <div className="flex items-center">
        <NavigationMenuList className="align-center hidden items-center space-x-6 text-xl md:flex">
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
        <button
          className="flex items-center justify-center px-4 md:hidden "
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <AiOutlineMenuUnfold size={32} />
          ) : (
            <AiOutlineMenuFold size={32} />
          )}
        </button>
      </div>
      {login && <Button text="Login" size="sm" type="secondary" href="/auth" />}
    </NavigationMenu>
  );
};

export default Navbar;
