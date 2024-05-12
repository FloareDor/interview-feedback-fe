import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import InterviewTable from '@/components/Interview/InterviewTable';
import Navbar from '@/components/Navbar/Navbar';

const InterviewPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/interviews/[id]', 'interviews/interview1');
  }, []);

  return (
    <div>
      <Navbar/>
      <InterviewTable pageId={"interview1"} />
    </div>
  );
};

export default InterviewPage;
