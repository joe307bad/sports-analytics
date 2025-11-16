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
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

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
    cell: info => (
      <div className={styles.cellWrapper}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => (
      <div className={styles.cellWrapper}>
        {info.getValue()}
      </div>
    ),
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

  // Initialize filters and sorting from URL params - computed once synchronously
  const getInitialState = () => {
    if (!ExecutionEnvironment.canUseDOM) {
      return { name: '', category: '', sport: '', sorting: [] };
    }
    const params = new URLSearchParams(window.location.search);
    const sortingParam = params.get('sort');
    let sorting: SortingState = [];

    if (sortingParam) {
      try {
        const [id, desc] = sortingParam.split(':');
        if (id) {
          sorting = [{ id, desc: desc === 'desc' }];
        }
      } catch (e) {
        // Invalid sorting param, use default
      }
    }

    return {
      name: params.get('name') || '',
      category: params.get('category') || '',
      sport: params.get('sport') || '',
      sorting,
    };
  };

  const [nameFilter, setNameFilter] = React.useState<string>(() => getInitialState().name);
  const [categoryFilter, setCategoryFilter] = React.useState<string>(() => getInitialState().category);
  const [sportFilter, setSportFilter] = React.useState<string>(() => getInitialState().sport);
  const [sorting, setSorting] = React.useState<SortingState>(() => getInitialState().sorting);

  // Build columnFilters from individual filter states - must be computed synchronously
  const columnFilters = React.useMemo(() => {
    const filters: ColumnFiltersState = [];
    if (nameFilter) filters.push({ id: 'name', value: nameFilter });
    if (categoryFilter) filters.push({ id: 'category', value: categoryFilter });
    if (sportFilter) filters.push({ id: 'sport', value: sportFilter });
    return filters;
  }, [nameFilter, categoryFilter, sportFilter]);

  // Update URL params when filters or sorting change
  React.useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const params = new URLSearchParams();
    if (nameFilter) params.set('name', nameFilter);
    if (categoryFilter) params.set('category', categoryFilter);
    if (sportFilter) params.set('sport', sportFilter);
    if (sorting.length > 0) {
      const sort = sorting[0];
      params.set('sort', `${sort.id}:${sort.desc ? 'desc' : 'asc'}`);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [nameFilter, categoryFilter, sportFilter, sorting]);

  // Get unique categories and sports from the data
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(defaultData.map(r => r.category)));
    return uniqueCategories.sort();
  }, []);

  const sports = React.useMemo(() => {
    const uniqueSports = Array.from(new Set(defaultData.map(r => r.sport)));
    return uniqueSports.sort();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const clearAllFilters = () => {
    setNameFilter('');
    setCategoryFilter('');
    setSportFilter('');
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <h2 className={styles.resourcesTitle}>Resources</h2>
        <input
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
          className={styles.filterInput}
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className={styles.filterInput}
        >
          <option value="">Filter by Category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sportFilter}
          onChange={e => setSportFilter(e.target.value)}
          className={styles.filterInput}
        >
          <option value="">Filter by Sport</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        <button
          onClick={clearAllFilters}
          className={styles.clearButton}
          title="Clear all filters"
          aria-label="Clear all filters"
        >
          ×
        </button>
      </div>

      <div className={styles.tableWrapper}>
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
      </div>
    </div>
  );
}
