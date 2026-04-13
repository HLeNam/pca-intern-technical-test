import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { User, UserSortBy, SortOrder } from '@/types/user.types';

interface GetColumnsOptions {
  sortBy: UserSortBy;
  sortOrder: SortOrder;
  onSort: (field: UserSortBy) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const SortIcon = ({
  field,
  sortBy,
  sortOrder,
}: {
  field: UserSortBy;
  sortBy: UserSortBy;
  sortOrder: SortOrder;
}) => {
  if (sortBy !== field)
    return <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />;
  return sortOrder === 'ASC' ? (
    <ArrowUp className="ml-2 h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="ml-2 h-3.5 w-3.5" />
  );
};

export const getColumns = ({
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: GetColumnsOptions): ColumnDef<User>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    size: 40,
  },
  {
    accessorKey: 'firstName',
    header: () => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => onSort('firstName')}
      >
        First Name
        <SortIcon field="firstName" sortBy={sortBy} sortOrder={sortOrder} />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('firstName')}</span>
    ),
  },
  {
    accessorKey: 'lastName',
    header: () => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => onSort('lastName')}
      >
        Last Name
        <SortIcon field="lastName" sortBy={sortBy} sortOrder={sortOrder} />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: () => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => onSort('email')}
      >
        Email
        <SortIcon field="email" sortBy={sortBy} sortOrder={sortOrder} />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('email')}</span>
    ),
  },
  {
    id: 'actions',
    header: () => <span className="text-muted-foreground">Actions</span>,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
    size: 90,
  },
];
