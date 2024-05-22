"use client";

import { selectUserInfo, signOut } from "@/lib/redux/User/UserSlice";
import { IconDoorExit, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const userInfo = useSelector(selectUserInfo);

  const dispatch = useDispatch();
  const SignOutHandler = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme === "light" ? (
    <div className="flex flex-row gap-10">
      <IconSun className="hover:scale-110" onClick={() => setTheme("dark")} />
      {userInfo && (
        <IconDoorExit
          className="hover:scale-110 cursor-pointer"
          onClick={SignOutHandler}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-row gap-10">
      <IconMoon
        className="hover:scale-110 cursor-pointer"
        onClick={() => setTheme("light")}
      />
      {userInfo && (
        <IconDoorExit
          className="hover:scale-110 cursor-pointer"
          onClick={SignOutHandler}
        />
      )}
    </div>
  );
}
