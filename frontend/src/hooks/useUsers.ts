import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { UserQueryParams } from '@/types/user.types';
import { usersApi } from '@/api/users.api';
import type { CreateUserFormData } from '@/lib/validations';
import type { ApiError } from '@/types/common.types';

export const USER_KEYS = {
  all: ['users'] as const,
  list: (params: UserQueryParams) => ['users', 'list', params] as const,
};

// GET /users
export function useUsers(params: UserQueryParams) {
  return useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: () => usersApi.getAll(params),
  });
}

// POST /users
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserFormData) => usersApi.create(data),
    onSuccess: () => {
      toast.success('User created successfully');
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
    onError: (err: unknown) => {
      const error = err as ApiError;

      if (!error.errors) {
        toast.error(error.message || 'Failed to create user');
      }
    },
  });
}

// DELETE /users/:id
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      void queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete user');
    },
  });
}
