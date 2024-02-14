import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-primary">
            <h1 className="text-white text-2xl">Property Tax Education</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin" className="text-white">
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
