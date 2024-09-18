import { Avatar } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Ava() {
  return (
    <div className="flex gap-4 justify-center items-center space-x-8 flex-col md:flex-row mt-16">
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        className="w-32 h-32 text-large"
      />
      <div className="flex flex-col justify-center">
        <Table hideHeader aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>A</TableColumn>
            <TableColumn>B</TableColumn>
          </TableHeader>
          <TableBody className="gap-y-12">
            <TableRow key="1">
              <TableCell className="bg-slate-200 font-bold">Name</TableCell>
              <TableCell>Tony Reichert</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="bg-slate-200 font-bold">Email</TableCell>
              <TableCell>tonyreichert@gmail.com</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="bg-slate-200 font-bold">Phone</TableCell>
              <TableCell>7865925143</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}