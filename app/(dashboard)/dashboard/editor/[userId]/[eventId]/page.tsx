import AttendeeFormEditor from '@/components/Editor/Editor_Side/AttendeeFormEditor';

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  return <AttendeeFormEditor params={params} />;
}
