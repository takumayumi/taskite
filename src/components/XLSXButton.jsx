import React from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const XLSXButton = () => {
  const taskite = useSelector((state) => state.taskite);

  const handleExport = () => {
    // Define column order
    const statusOrder = ["Backlog", "In Progress", "Done"];
    const maxLength = Math.max(
      ...statusOrder.map((key) => taskite.tasks[key]?.length || 0),
    );

    // Header row
    const rows = [statusOrder];

    // Build rows
    for (let i = 0; i < maxLength; i++) {
      const row = statusOrder.map((key) => {
        const task = taskite.tasks[key]?.[i];
        return task ? task.content : "";
      });
      rows.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Set column widths: 100px ~ 14.29 characters (Excel uses character width units)
    worksheet["!cols"] = statusOrder.map(() => ({ wpx: 100 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
    const fileName = `taskite-${formattedDate}-${formattedTime}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button className="btn-vintage" onClick={handleExport}>
      <FontAwesomeIcon icon={faTable} />
      Export to Excel
    </button>
  );
};

export default XLSXButton;
