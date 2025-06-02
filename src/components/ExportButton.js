import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const ExportButton = () => {
  const tasks = useSelector((state) => state.tasks);

  const handleExport = () => {
    const exportedData = JSON.stringify(tasks, null, 2);
    const blob = new Blob([exportedData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn-vintage" onClick={handleExport}>
      <FontAwesomeIcon icon={faFloppyDisk} />
      Save Tasks
    </button>
  );
};

export default ExportButton;
