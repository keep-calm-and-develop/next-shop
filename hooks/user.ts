
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchJson } from '../lib/api';

const USER_QUERY_KEY = 'user';

export const useSignIn = (): {
    signIn: (email: string, password: string) => Promise<boolean>;
    signInError: boolean;
    signInLoading: boolean;
} => {
    const queryClient = useQueryClient();

    const loginMutation = useMutation<unknown, unknown, { email: string, password: string }>(async ({
        email, password,
    }) => fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }));

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const user = await loginMutation.mutateAsync({ email, password });
            queryClient.setQueryData(USER_QUERY_KEY, user);
            return true;
        } catch (error) {
            return false;
        }
    }, []);

    return {
        signIn,
        signInError: loginMutation.isError,
        signInLoading: loginMutation.isLoading,
    };
};

export const useSignOut = (): () => Promise<void> => {
    const queryClient = useQueryClient();
    const logoutMutation = useMutation(async () => fetchJson('/api/logout'));
    return (async () => {
        await logoutMutation.mutateAsync();
        queryClient.setQueryData(USER_QUERY_KEY, undefined);
    });
};

type User = { id: string, name: string };

export const useUser = (): undefined | User => {
    const { data: user } = useQuery(USER_QUERY_KEY, async () => {
        try {
            return await fetchJson('/api/user');
        } catch (error) {
            return undefined;
        }
    }, {
        cacheTime: Infinity,
        staleTime: 30 * 1000,
    });

    return user;
};
