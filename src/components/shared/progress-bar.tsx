"use client";

import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname } from "next/navigation";

const ProgressBar = () => {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      NProgress.start();
      setPrevPathname(pathname);
    }
    NProgress.done();
  }, [pathname]);

  return null; // UI qismida hech narsa ko'rsatmaydi
};

export default ProgressBar;
