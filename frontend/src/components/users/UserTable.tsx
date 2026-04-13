import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserTableToolbar from '@/components/users/UserTableToolbar';
import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type RowSelectionState,
} from '@tanstack/react-table';
import type { SortOrder, User, UserSortBy } from '@/types/user.types';
import { getColumns } from '@/components/users/UserTableColumns';
import { Skeleton } from '@/components/ui/skeleton';
import { UserTablePagination } from '@/components/users/UserTablePagination';
import { DEFAULT_META } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useUsers } from '@/hooks/useUsers';
import { useExportUsers } from '@/hooks/useExport';

export default function UserTable() {
  // Query state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<UserSortBy>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('DESC');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // UI state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [, setSignUpOpen] = useState(false);
  const [, setDeleteUser] = useState<User | null>(null);

  // Hooks
  const { data, isLoading } = useUsers({
    page,
    limit,
    sortBy,
    sortOrder,
    search: debouncedSearch || undefined,
  });
  const exportUsers = useExportUsers();

  const users = data?.data ?? [];
  const meta = data?.metadata ?? DEFAULT_META;

  // Reset page + selection on search change
  useEffect(() => {
    setPage(1);
    setRowSelection({});
  }, [debouncedSearch]);

  // Sort handler
  const handleSort = (field: UserSortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
    setPage(1);
  };

  // Export handler
  const handleExport = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map(row => row.original.id);
    exportUsers.mutate(selectedIds);
  };

  const columns = getColumns({
    sortBy,
    sortOrder,
    onSort: handleSort,
    onDelete: setDeleteUser,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: users,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    getRowId: row => row.id,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toolbar */}
          <UserTableToolbar
            search={search}
            onSearchChange={setSearch}
            selectedCount={selectedCount}
            onSignUp={() => setSignUpOpen(true)}
            onExport={handleExport}
            isExporting={exportUsers.isPending}
          />

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(hg => (
                  <TableRow key={hg.id}>
                    {hg.headers.map(header => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: limit }).map((_, i) => (
                    <TableRow key={i}>
                      {columns.map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading && meta.totalItems > 0 && (
            <UserTablePagination
              meta={meta}
              onPageChange={p => {
                setPage(p);
                setRowSelection({});
              }}
              onLimitChange={l => {
                setLimit(l);
                setPage(1);
                setRowSelection({});
              }}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
