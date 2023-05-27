import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="p-8 md:px-16">
      <p className="text-xs text-primary md:text-sm">
        Built by{' '}
        <Link
          href="https://www.github.com/ph-nathan"
          className="font-medium text-accent underline"
        >
          Nathan
        </Link>{' '}
        and{' '}
        <Link
          href="https://www.github.com/wr1159"
          className="font-medium text-accent underline"
        >
          Wei Rong
        </Link>{' '}
        with{' '}
        <Link
          href="https://nextjs.org/"
          className="font-medium text-accent underline"
        >
          Next.js
        </Link>{' '}
        and{' '}
        <Link
          href="https://tailwindcss.com/"
          className="font-medium text-accent underline"
        >
          Tailwind CSS
        </Link>
        . Hosted on{' '}
        <Link
          href="https://vercel.com/"
          className="font-medium text-accent underline"
        >
          Vercel
        </Link>
        . The source code is available on{' '}
        <Link
          href="https://www.github.com/wr1159/advent"
          className="font-medium text-accent underline"
        >
          Github
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
