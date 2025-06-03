import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const ExportButton = () => {
  const tasks = useSelector((state) => state.taskite.tasks);

  const handleExport = () => {
    const exportedData = JSON.stringify(tasks, null, 2);
    const blob = new Blob([exportedData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
    a.download = `taskite-${formattedDate}-${formattedTime}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn-vintage" onClick={handleExport}>
      <FontAwesomeIcon icon={faFloppyDisk} />
      Save as Backup
    </button>
  );
};

export default ExportButton;
