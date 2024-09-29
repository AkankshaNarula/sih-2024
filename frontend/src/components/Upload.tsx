import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
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
    <Card className="w-full">
      <CardBody>
        <div className="flex flex-col items-center justify-center gap-6">
          {rows.length > 0 ? (
            <Table aria-label="Uploaded documents" className="min-w-full">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key} className="bg-gray-100 text-gray-700 font-semibold text-sm uppercase">
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key} className="hover:bg-gray-50">
                    <TableCell className="text-gray-700">{item.name}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleDownload(item.name, item.content)}
                      >
                        Download
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onClick={() => handleDelete(item.key)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-xl text-gray-500">No documents uploaded yet</p>
          )}

          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          <Button
            color="primary"
            size="lg"
            className="mt-4"
            endContent={<span className="ml-2">+</span>}
            onClick={() => document.getElementById("fileUpload")?.click()}
          >
            Upload New Document
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}