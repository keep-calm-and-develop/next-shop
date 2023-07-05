import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJson } from '../lib/api';

interface NavBarProps {

}

type User = { id: string, name: string };

const useGetUser = (): {
    user: null | User,
    handleSignOut: () => Promise<void>;
} => {
    const [user, setUser] = useState<null | User>();
    useEffect(() => {
        (async () => {
            try {
                const user = await fetchJson('/api/user');
                setUser(user as User);
            } catch (error) {
                setUser(null);
            }
        })();
    }, []);

    const handleSignOut = useCallback(async () => {
        await fetchJson('/api/logout');
        setUser(null);
    }, []);

    return { user, handleSignOut };
};

const NavBar: React.FC<NavBarProps> = ({}) => {
    const { user, handleSignOut } = useGetUser();
    return (
        <nav className='px-2 py-1'>
            <ul className='flex gap-2'>
                <li className='text-xl font-extrabold'>
                    <Link href="/">
                        Next Shop
                    </Link>
                </li>
                <li role="separator" className='flex-1' />
                {
                    user 
                        ? (<>
                            <li>
                                {user.name}
                            </li>
                            <li>
                                <button onClick={handleSignOut}>Sign Out</button>
                            </li>
                        </>)
                        : (<li>
                            <Link href="/sign-in">
                                Sign In
                            </Link>
                        </li>)
                }
            </ul>
        </nav>
    );
}

export default NavBar;
