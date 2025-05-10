"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./Logo";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Logo />

      <div className="flex items-center gap-4">
        {isSignedIn && (
          <Link href="/dashboard">
            <Button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Dashboard
            </Button>
          </Link>
        )}

        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button className="rounded-full">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
