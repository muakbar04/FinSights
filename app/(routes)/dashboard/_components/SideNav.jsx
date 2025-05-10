import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Wallet,
  ShieldCheck,
} from "lucide-react";

function SideNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Budgets",
      path: "/dashboard/budgets",
      icon: PiggyBank,
    },
    {
      name: "Expenses",
      path: "/dashboard/expenses",
      icon: ReceiptText,
    },
    {
      name: "Income",
      path: "/dashboard/incomes",
      icon: Wallet,
    },
    {
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/chart-donut.svg" alt="FinSights Logo" width={40} height={25} />
          <span className="text-blue-800 font-bold text-xl">FinSights</span>
        </Link>
      </div>
      <div className="space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default SideNav;
