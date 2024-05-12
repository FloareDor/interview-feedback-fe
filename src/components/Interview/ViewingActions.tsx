import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ViewingActions: React.FC<{
	onEdit: () => void;
	onDelete: () => void;
	canDelete: boolean;
  }> = ({ onEdit, onDelete, canDelete }) => (
	<div className="flex items-center pl-7 gap-10">
	  <button
		onClick={onEdit}
		className="bg-transparent text-blue-500 hover:text-blue-700 text-sm font-bold py-1 px-2 rounded mr-2"
	  >
		<FontAwesomeIcon icon={faEdit} />
	  </button>
	  {canDelete && (
		<button
		  onClick={onDelete}
		  className="bg-transparent text-red-500 hover:text-red-700 text-sm font-bold py-1 px-2 rounded"
		>
		  <FontAwesomeIcon icon={faTrash} />
		</button>
	  )}
	</div>
  );

export default ViewingActions;