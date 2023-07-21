import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Advent',
  description: 'Canva for Event Organisation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://advent-beta.vercel.app',
    title: 'Advent',
    description: 'Canva for Event Organisation',
    siteName: 'Advent',
    images: [
      {
        url: '/src/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Advent description'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advent',
    description: 'Canva for Event Organisation',
    images: [
      {
        url: '/src/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Advent description'
      }
    ]
  },
  icons: {
    icon: '/src/icon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/src/opengraph.png" />
        <meta
          property="og:image:alt"
          content="Advent supports many features!"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
