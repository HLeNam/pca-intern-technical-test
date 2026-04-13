import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserTableToolbar from '@/components/users/UserTableToolbar';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type RowSelectionState,
} from '@tanstack/react-table';
import type { SortOrder, User, UserSortBy } from '@/types/user.types';
import { getColumns } from '@/components/users/UserTableColumns';

export default function UserTable() {
  // Data state
  const [users, setUsers] = useState<User[]>([]);

  // Query state
  const [sortBy, setSortBy] = useState<UserSortBy>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('DESC');
  const [search, setSearch] = useState('');

  // UI state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Sort handler
  const handleSort = (field: UserSortBy) => {};

  // Export CSV
  const handleExport = async () => {};

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
            isExporting={isExporting}
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
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
