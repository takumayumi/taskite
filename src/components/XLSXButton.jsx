/**
 * XLSXButton.jsx
 * Export button for downloading tasks as an Excel spreadsheet.
 * Converts task columns into rows using XLSX (SheetJS).
 *
 * Author: Yumi Takuma
 */

import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const XLSXButton = () => {
  const taskite = useSelector((state) => state.taskite);

  const handleExport = () => {
    const statusOrder = ["Backlog", "In Progress", "Done"];

    // Determine the max number of rows based on the longest column
    const maxLength = Math.max(
      ...statusOrder.map((key) => taskite.tasks[key]?.length || 0),
    );

    const rows = [statusOrder];

    // Build 2D array: each row is a set of task contents by column
    for (let i = 0; i < maxLength; i++) {
      const row = statusOrder.map((key) => {
        const task = taskite.tasks[key]?.[i];
        return task ? task.content : "";
      });
      rows.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Set fixed column widths (in pixels)
    worksheet["!cols"] = statusOrder.map(() => ({ wpx: 100 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    // Create timestamped filename: taskite-YYYY-MM-DD-HH-MM.xlsx
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1,
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(
      2,
      "0",
    )}-${String(now.getMinutes()).padStart(2, "0")}`;
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
