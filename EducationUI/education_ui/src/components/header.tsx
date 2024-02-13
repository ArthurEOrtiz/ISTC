import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-blue-500">
            <h1 className="text-white text-2xl">Property Tax Education</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="curser-pointer text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="curser-pointer text-white">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="curser-pointer text-white">
                            About
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
