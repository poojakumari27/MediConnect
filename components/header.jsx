import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Badge } from "./ui/badge";
import { checkUser } from '@/lib/checkUser';
import { checkAndAllocateCredits } from '@/actions/credits';

const Header = async () => {
  const user = await checkUser();

  if (user?.role === "PATIENT") {
    await checkAndAllocateCredits(user);
  }

  return (
  <header className="fixed top-0 w-full border-b bg-background-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
  <nav className="flex items-center justify-between px-4 py-1 md:px-6 md:py-2">
    {/* Logo - Larger */}
    <Link href="/">
      <Image
        src="/photo.png"
        alt="Medimeet Logo"
        width={180}
        height={40}
        className="h-10 w-auto object-contain"
      />
    </Link>

        {/* Navigation and Auth Buttons */}
        <div className="flex items-center space-x-2">
          <SignedIn>
            {/* Admin Link */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button variant="outline" className="hidden md:inline-flex h-8 text-sm items-center gap-2 px-3">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}

            {/* Doctor Link */}
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button variant="outline" className="hidden md:inline-flex h-8 text-sm items-center gap-2 px-3">
                  <Stethoscope className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            )}

            {/* Patient Link */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button variant="outline" className="hidden md:inline-flex h-8 text-sm items-center gap-2 px-3">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Button>
              </Link>
            )}

            {/* Unassigned Link */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button variant="outline" className="hidden md:inline-flex h-8 text-sm items-center gap-2 px-3">
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
              </Link>
            )}
          </SignedIn>

          {/* Credits / Pricing */}
          <Link href="/pricing">
            <Badge
              variant="outline"
              className="h-8 text-xs bg-blue-900/20 border-blue-700/30 px-2 flex items-center gap-2"
            >
              <CreditCard className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-blue-400">
                {user?.role === "PATIENT"
                  ? `${user.credits} Credits`
                  : "Pricing"}
              </span>
            </Badge>
          </Link>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal" asChild>
              <Button variant="secondary" className="h-8 px-3 text-sm">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
