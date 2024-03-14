import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-primary">
            <h1 className="text-white text-2xl">Property Tax Education</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="btn btn-ghost text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin" className="btn btn-ghost text-white">
                            Admin
                        </Link>
                    </li>
                    <li>
                        <div className='mt-2'>
                            <UserButton afterSignOutUrl='/' />
                        </div>
                        
                    </li>
                </ul>
            </nav>

            
        </header>
    );
}

export default Header;