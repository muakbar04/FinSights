"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function PageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const getPageTitle = () => {
      const path = pathname.split("/").filter(Boolean);
      if (path.length === 0) return "FinSights - Track Smart. Spend Wise.";
      
      const page = path[path.length - 1];
      // If the last part is a number (ID), use the previous part
      if (!isNaN(page)) {
        return "FinSights - Budget Details";
      }
      
      const formattedPage = page.charAt(0).toUpperCase() + page.slice(1);
      return `FinSights - ${formattedPage}`;
    };

    document.title = getPageTitle();
  }, [pathname]);

  return null;
}

export default PageTitle; 