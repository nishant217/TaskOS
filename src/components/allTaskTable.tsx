import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Flag, User as UserIcon, MoreVertical } from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  priority: "P1" | "P2" | "P3";
  priorityText: string;
  assignee: string;
  date: string;
  overdue: boolean;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Task ID",
    size: 130,
    cell: ({ getValue }) => (
      <span className="font-mono text-sm font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 300,
    cell: ({ row }) => (
      <div className="max-w-[280px]">
        <p className="truncate font-medium">{row.original.title}</p>
        {row.original.overdue && (
          <p className="text-xs text-red-500">Overdue</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
    cell: ({ row }) => (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    size: 170,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
          <Flag size={10} /> {row.original.priority}
        </span>
        <span className="text-xs text-slate-500">
          {row.original.priorityText}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    size: 170,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <UserIcon size={14} className="text-primary" />
        </div>
        <span className="text-sm font-medium">{row.original.assignee}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Due Date",
    size: 160,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar size={14} className="text-slate-400" />
        <span
          className={`text-sm ${
            row.original.overdue
              ? "text-red-600 font-medium"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {row.original.date}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    size: 80,
    cell: () => (
      <button className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800">
        <MoreVertical size={16} />
      </button>
    ),
  },
];

export default function TasksTanstackTable({ data }: { data: Task[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
      {/* 👇 ONLY THIS DIV SCROLLS */}
      <div className="relative w-full overflow-x-auto overscroll-x-contain">
        <table
          className="w-full min-w-[1100px] table-fixed"
        >
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="px-6 py-4 align-middle"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
