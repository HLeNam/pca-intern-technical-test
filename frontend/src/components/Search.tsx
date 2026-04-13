import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchInput({
  search,
  onSearchChange,
}: SearchInputProps) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-9 pr-9"
      />
      {search && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
