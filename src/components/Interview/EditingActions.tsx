import React from 'react';

const EditingActions: React.FC<{
	isNew: boolean;
	onSave: () => void;
	onCancel: () => void;
  }> = ({ isNew, onSave, onCancel }) => (
	<>
	  <button
		onClick={onSave}
		className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
	  >
		{isNew ? 'Add' : 'Save'}
	  </button>
	  <button
		onClick={onCancel}
		className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
	  >
		Cancel
	  </button>
	</>
	);
  
export default EditingActions;