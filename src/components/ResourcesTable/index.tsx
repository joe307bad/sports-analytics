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
import resourcesData from '@site/static/resources.json';

type Resource = {
  id: number;
  name: string;
  category: string;
  sport: string;
  url: string;
  description: string;
};

const defaultData: Resource[] = resourcesData.resources;

const columnHelper = createColumnHelper<Resource>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('sport', {
    header: 'Sport',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('url', {
    header: 'Link',
    cell: info => (
      <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
        {info.getValue()}
      </a>
    ),
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
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                >
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
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
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
