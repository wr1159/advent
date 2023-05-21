'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import Button from './Button';
import { useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold
} from 'react-icons/ai';
import MobileNav from './MobileNav';

interface linksProps {
  text: string;
  href: string;
}

export interface NavbarProps {
  texts: string[];
  links: string[];
  login?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ texts, links, login }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <div>
      <NavigationMenu className="z-50 flex w-auto flex-row justify-between p-4 text-gray-500">
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
            className="flex items-center justify-center px-4 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {!showMobileMenu && <AiOutlineMenu size={32} color="black" />}
          </button>
        </div>
        {login && (
          <Button text="Login" size="sm" type="secondary" href="/auth" />
        )}
      </NavigationMenu>

      {showMobileMenu && (
        <div className="px-auto fixed top-0 z-40 flex w-full flex-col items-center justify-center overflow-auto bg-background py-10 md:hidden">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center space-y-4">
              <NavigationMenuItem className="advent px-6 text-2xl text-black hover:text-gray-700">
                <NavigationMenuLink href={login ? '/' : '/dashboard'}>
                  Advent{' '}
                </NavigationMenuLink>
              </NavigationMenuItem>
              {links.map((link, id) => (
                <NavigationMenuItem
                  className="text-xl hover:text-gray-400"
                  key={id}
                >
                  <NavigationMenuLink href={link}>
                    {texts[id]}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <button
            className="pt-6"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <AiOutlineClose size={24} color="#00264B" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
