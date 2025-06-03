import { useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

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
