/**
 * ImportButton.jsx
 * A button that triggers the import confirmation prompt to restore tasks from backup.
 *
 * Author: Yumi Takuma
 */

import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";

const ImportButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowPrompt("import"));
  };

  return (
    <button className="btn-vintage" onClick={handleClick}>
      <FontAwesomeIcon icon={faFolderOpen} />
      Restore from Backup
    </button>
  );
};

export default ImportButton;
