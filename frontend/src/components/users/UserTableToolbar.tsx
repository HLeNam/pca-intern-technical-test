import SearchInput from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Download, UserPlus } from 'lucide-react';

interface UserTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  onSignUp: () => void;
  onExport: () => void;
  isExporting: boolean;
}

export default function UserTableToolbar({
  search,
  onSearchChange,
  selectedCount,
  onSignUp,
  onExport,
  isExporting,
}: UserTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Search */}
      <SearchInput search={search} onSearchChange={onSearchChange} />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={selectedCount === 0 || isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export
          {selectedCount > 0 && (
            <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5 leading-none">
              {selectedCount}
            </span>
          )}
        </Button>

        <Button size="sm" onClick={onSignUp} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Button>
      </div>
    </div>
  );
}
