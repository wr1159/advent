import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Advent - Canva for Event Organisation',
  description:
    'Say goodbye to inconsistent theming in the event registration flow and redirection to third party registration apps. Welcome a simple solution to integrate an event registration page to your website, customised to your liking.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="Advent - Canva for Event Organisation"
        />
        <meta
          property="og:description"
          content="Say goodbye to inconsistent theming in the event registration flow and redirection to third party registration apps. Welcome a simple solution to integrate an event registration page to your website, customised to your liking."
        />
        <meta property="og:image" content="/src/opengraph.png" />
        <meta
          property="og:image:alt"
          content="Advent supports many features!"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
