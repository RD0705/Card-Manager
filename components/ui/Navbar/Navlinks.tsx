'use client';

import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import s from './Navbar.module.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navlinks() {
  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/" className={s.link}>
            Pricing
          </Link>
          <SignedIn>
            <Link href="/account" className={s.link}>
              Account
            </Link>
          </SignedIn>
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        <SignedOut>
          <Link href="/sign-in" className={s.link}>
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}
