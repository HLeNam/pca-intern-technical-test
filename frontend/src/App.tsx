import { Header } from '@/components/Header';
import UserTable from '@/components/users/UserTable';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <UserTable />
      </main>
    </div>
  );
}

export default App;
