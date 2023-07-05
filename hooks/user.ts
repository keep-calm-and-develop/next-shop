
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchJson } from '../lib/api';


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
            queryClient.setQueryData('user', user);
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

type User = { id: string, name: string };

export const useUser = (): {
    user: undefined | User,
    handleSignOut: () => Promise<void>;
} => {
    const { data: user } = useQuery('user', async () => {
        try {
            return await fetchJson('/api/user');
        } catch (error) {
            return undefined;
        }
    }, {
        cacheTime: Infinity,
        staleTime: 30 * 1000,
    });

    const handleSignOut = useCallback(async () => {
        await fetchJson('/api/logout');
    }, []);

    return { user, handleSignOut };
};
