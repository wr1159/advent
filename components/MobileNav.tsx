import React from 'react';
import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenu
} from '@radix-ui/react-navigation-menu';
import { NavbarProps } from './Navbar';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

interface MobileNavProps extends NavbarProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({
  texts,
  links,
  login,
  showMobileMenu,
  setShowMobileMenu
}) => {
  return (
    <div className="fixed left-1/2 z-40 flex w-5/6 -translate-x-1/2 flex-col items-center justify-center rounded-md bg-background p-10 shadow-md">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col items-center space-y-4">
          <NavigationMenuItem className="advent px-6 text-2xl text-black hover:text-gray-700">
            <NavigationMenuLink asChild>
              <Link href={login ? '/' : '/dashboard'}> Advent </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {links.map((link, id) => (
            <NavigationMenuItem
              className="text-xl hover:text-gray-400"
              key={id}
            >
              <NavigationMenuLink asChild>
                <Link href={link}>{texts[id]}</Link>
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
  );
};

export default MobileNav;
