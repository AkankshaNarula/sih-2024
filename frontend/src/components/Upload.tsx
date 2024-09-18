import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";

const rowsData = [
    {
        key: "1",
        name: "documentation.pdf",
    },
    {
        key: "2",
        name: "rules.pdf",
    },
    {
        key: "3",
        name: "policies.txt",
    },
    {
        key: "4",
        name: "data.dat",
    },
];

const columns = [
    {
        key: "name",
        label: "File Name",
    },
    {
        key: "view",
        label: "View",
    },
    {
        key: "remove",
        label: "Remove",
    },
];

export default function Upload() {
    const [selectionBehavior, setSelectionBehavior] = useState<"toggle" | "replace">("toggle");
    const [rows, setRows] = useState(rowsData);

    return (
        <div className="flex flex-col items-center justify-center gap-3 max-w-screen-xl mt-10 mx-auto">
            <p className="text-2xl font-bold text-slate-700 mb-4">
                Uploaded Documents
            </p>
            <div className="w-full max-w-4xl">
                <Table
                    aria-label="Selection behavior table example with dynamic content"
                    selectionMode="multiple"
                    selectionBehavior={selectionBehavior}
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn className='font-bold text-lg' key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>

                                <TableCell>{item.name}</TableCell>
                                
                                <TableCell>
                                    <Button color="primary">
                                        View
                                    </Button>
                                </TableCell>
                                
                                <TableCell>
                                    <Button color="default">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Button color="success" className="mt-6 mb-6">
                Upload Documents
            </Button>
        </div>
    );
}