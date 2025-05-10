import React from "react";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container-modern flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="heading-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FinSights Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
    </motion.header>
  );
}

export default DashboardHeader;