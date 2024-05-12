import React from 'react';
import { useRouter } from 'next/router';
import InterviewTable from '@/components/Interview/InterviewTable';
import Navbar from '@/components/Navbar/Navbar';
import PageNavigation from '@/components/Interview/PageNavigation';

const InterviewPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const pageId = String(id) ? String(id as string) : null;

  return (
    <div>
      <Navbar />
      <PageNavigation />
      {pageId && <InterviewTable pageId={pageId} />}
    </div>
  );
};

export default InterviewPage;