import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { usersApi } from '@/api/users.api';

export function useExportUsers() {
  return useMutation({
    mutationFn: (ids: string[]) => usersApi.exportCsv(ids),
    onSuccess: (blob, ids) => {
      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${ids.length} user(s) successfully`);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to export users');
    },
  });
}
