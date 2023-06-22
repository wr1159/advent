// This is preview form
'use client';
import PreviewForm from '@/components/Editor/Preview_Side/PreviewForm';
interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  return <PreviewForm params={params} />;
}
