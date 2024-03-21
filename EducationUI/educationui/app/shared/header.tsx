import { SignedIn, SignedOut, SignInButton, SignOutButton} from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import AdmindashboardLink from '../components/Navigation/AdminDashboardLink';
import StudentDashboardLink from '../components/Navigation/StudentDashboardLink';
import { Sign } from 'crypto';


const Header: React.FC = async () => {
    return (
        <header>
            <div className="navbar bg-primary">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost flex flex-col items-center">
                        <p className='text-2xl text-white'>ISTC</p>
                        <p className='text-base text-white font-normal'>Education Program</p>
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link 
                                href='/courses'
                                className='btn btn-ghost text-white'
                                >Course Catalog
                            </Link>
                        </li>
                        <li>
                            <SignedIn>
                                <Link href="/student" className="btn btn-ghost text-white">
                                    Student Dashboard
                                </Link>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>
                                    <button className="btn btn-ghost text-white">Sign In</button>
                                </SignInButton>
                            </SignedOut>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;