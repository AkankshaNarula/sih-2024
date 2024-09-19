import { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

interface FileRow {
  key: string;
  name: string;
  content: string;
}

interface Column {
  key: string;
  label: string;
}

const getInitialRows = (): FileRow[] => {
  const storedRows = JSON.parse(localStorage.getItem("uploadedFiles") || "[]") as FileRow[];
  return storedRows.length > 0 ? storedRows : [];
};

const columns: Column[] = [
  { key: "name", label: "File Name" },
  { key: "view", label: "Download" },
  { key: "remove", label: "Remove" },
];

export default function Upload() {
  const [rows, setRows] = useState<FileRow[]>(getInitialRows);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(rows));
    // Trigger a storage event to notify the Speedometer component
    window.dispatchEvent(new Event('storage'));
  }, [rows]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Content = reader.result as string;
        const newFile: FileRow = {
          key: (rows.length + 1).toString(),
          name: file.name,
          content: base64Content,
        };
        setRows((prevRows) => [...prevRows, newFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (key: string) => {
    const updatedRows = rows.filter((row) => row.key !== key);
    setRows(updatedRows);
  };

  const handleDownload = (name: string, content: string) => {
    const a = document.createElement("a");
    a.href = content;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 max-w-screen-xl mt-10 mx-auto">
      <p className="text-2xl font-bold text-slate-700 mb-4">Uploaded Documents</p>

      {rows.length > 0 ? (
        <div className="w-full max-w-4xl">
          <Table aria-label="Uploaded documents">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn className="font-bold text-lg" key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleDownload(item.name, item.content)}
                    >
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(item.key)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-xl text-gray-500">There are no files to show</p>
      )}

      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <Button
        color="success"
        className="mt-6 mb-6"
        onClick={() => document.getElementById("fileUpload")?.click()}
      >
        Upload Documents
      </Button>
    </div>
  );
}