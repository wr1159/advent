import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Advent',
  description: 'Canva for Event Organisation'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Advent" />
        <meta
          property="og:description"
          content="Canva for Event Organisation"
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
