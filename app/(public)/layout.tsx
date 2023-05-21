import '../globals.css';
import Navbar from '@/components/Navbar';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar
        texts={['Orbital', 'Documentation']}
        links={['/orbital', '/documentation']}
        login={true}
      />
      {children}
    </div>
  );
}
