import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const PageNavigation: React.FC = () => {
  const router = useRouter();
  const [pageIds, setPageIds] = useState<string[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [newPageId, setNewPageId] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${backendUrl}/get-all-pages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPageIds(response.data);
    };

    fetchPages();
  }, []);

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPageId(String(e.target.value));
  };

  const handleGoToPage = () => {
    if (selectedPageId) {
      router.push(`/interviews/${selectedPageId}`);
    }
  };

  const handleCreatePage = () => {
    if (newPageId) {
      router.push(`/interviews/${newPageId}`);
      setNewPageId('');
    }
  };

  return (
    <div className="mb-4 flex flex-row items-center justify-center w-screen pt-6">
      <div className="mr-4">
        <select
          value={selectedPageId || ''}
          onChange={handlePageChange}
          className="text-black border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Select a page</option>
          {pageIds.map((pageId) => (
            <option key={pageId} value={pageId}>
              {pageId}
            </option>
          ))}
        </select>
        <button
          onClick={handleGoToPage}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 ml-2"
          disabled={!selectedPageId}
        >
          Go to Page
        </button>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={newPageId}
          onChange={(e) => setNewPageId(e.target.value)}
          placeholder="Enter new page name"
          className="text-black border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleCreatePage}
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
        >
          Create Page
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;