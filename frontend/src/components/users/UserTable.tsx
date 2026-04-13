import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserTableToolbar from '@/components/users/UserTableToolbar';
import { useState } from 'react';

export default function UserTable() {
  // Query state
  const [search, setSearch] = useState('');

  // UI state
  const [rowSelection, setRowSelection] = useState({});
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Export CSV
  const handleExport = async () => {};

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserTableToolbar
            search={search}
            onSearchChange={setSearch}
            selectedCount={selectedCount}
            onSignUp={() => setSignUpOpen(true)}
            onExport={handleExport}
            isExporting={isExporting}
          />
        </CardContent>
      </Card>
    </>
  );
}
