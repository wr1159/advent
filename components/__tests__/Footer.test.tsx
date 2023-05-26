import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders links with correct href', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');

    const linkData = [
      {
        href: 'https://www.github.com/ph-nathan',
        text: 'Nathan'
      },
      {
        href: 'https://www.github.com/wr1159',
        text: 'Wei Rong'
      },
      {
        href: 'https://nextjs.org/',
        text: 'Next.js'
      },
      {
        href: 'https://tailwindcss.com/',
        text: 'Tailwind CSS'
      },
      {
        href: 'https://vercel.com/',
        text: 'Vercel'
      },
      {
        href: 'https://www.github.com/wr1159/advent',
        text: 'Github'
      }
    ];

    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', linkData[index].href);
      expect(link).toHaveTextContent(linkData[index].text);
    });
  });
});
