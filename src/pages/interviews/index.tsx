import React from 'react';
import InterviewTable from '@/components/Interview/InterviewTable';
import Navbar from '@/components/Navbar/Navbar';

const InterviewPage: React.FC = () => {
  return (
	  <div>
	<Navbar/>
      <InterviewTable />
    </div>
  );
};

export default InterviewPage;