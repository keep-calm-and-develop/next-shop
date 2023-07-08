import Link from 'next/link';
import React from 'react';
import { useSignOut, useUser } from '../hooks/user';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const user = useUser();
    const handleSignOut = useSignOut();
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
                                <Link href="/cart">Cart</Link>
                            </li>
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
