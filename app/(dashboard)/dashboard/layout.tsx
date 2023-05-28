import Footer from '@/components/Footer';
import '../../globals.css';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar
        texts={['Dashboard', 'Statistics', 'Documentation']}
        links={['/dashboard', '/dashboard/statistics', '/documentation']}
        logout={true}
      />
      {children}
      <Footer />
    </div>
  );
}
