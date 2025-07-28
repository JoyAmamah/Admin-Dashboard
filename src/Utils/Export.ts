import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import type { Employee } from "../types/types";

export const exportToJson = (data: Employee[], fileName = "employees") => {
  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  saveAs(jsonBlob, `${fileName}.json`);
};

export const exportToExcel = (data: Employee[], fileName = "employees") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
