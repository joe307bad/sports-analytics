import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import styles from './styles.module.css';

// Define the data type
type Resource = {
  id: number;
  name: string;
  category: string;
  status: string;
  value: number;
  date: string;
};

// Fake data
const defaultData: Resource[] = [
  { id: 1, name: 'Basketball Analytics', category: 'Sports', status: 'Active', value: 1250, date: '2024-01-15' },
  { id: 2, name: 'Football Metrics', category: 'Sports', status: 'Active', value: 3400, date: '2024-02-20' },
  { id: 3, name: 'Baseball Stats', category: 'Sports', status: 'Inactive', value: 890, date: '2024-03-10' },
  { id: 4, name: 'Soccer Analysis', category: 'Sports', status: 'Active', value: 2100, date: '2024-01-25' },
  { id: 5, name: 'Tennis Tracker', category: 'Sports', status: 'Active', value: 1675, date: '2024-02-14' },
  { id: 6, name: 'Hockey Data', category: 'Sports', status: 'Pending', value: 950, date: '2024-03-05' },
  { id: 7, name: 'Golf Performance', category: 'Sports', status: 'Active', value: 1820, date: '2024-01-30' },
  { id: 8, name: 'Swimming Records', category: 'Sports', status: 'Inactive', value: 720, date: '2024-02-28' },
  { id: 9, name: 'Track & Field', category: 'Sports', status: 'Active', value: 1450, date: '2024-03-12' },
  { id: 10, name: 'Volleyball Stats', category: 'Sports', status: 'Pending', value: 1100, date: '2024-02-08' },
];

const columnHelper = createColumnHelper<Resource>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
];

export default function ResourcesTable(): React.ReactElement {
  const [data] = React.useState<Resource[]>(defaultData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={e =>
            table.getColumn('name')?.setFilterValue(e.target.value)
          }
          className={styles.filterInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={header.column.getCanSort() ? styles.sortable : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.info}>
        Showing {table.getRowModel().rows.length} of {data.length} rows
      </div>
    </div>
  );
}
