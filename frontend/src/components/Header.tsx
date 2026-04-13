import { ModeToggle } from '@/components/ModeToggle';
import { Users } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="font-semibold text-base">User Management</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
