import { toast } from "@/components/ui/use-toast";
import { UserInfo, UserState } from "@/lib/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
// import { cookies } from "next/headers";

const initialState = {
  userInfo: hasCookie("userInfo")
    ? JSON.parse(getCookie("userInfo") as string)
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      const newState = state;
      newState.userInfo = action.payload;
      setCookie("userInfo", JSON.stringify(newState.userInfo), {
        sameSite: true,
        secure: true,
      });
      // cookies().set("userInfo", JSON.stringify(newState.userInfo));
      toast({
        title: "Welocme!",
        description: "You are now logged in.",
      });
    },
    signOut: (state) => {
      const newState = state;
      newState.userInfo = null;
      deleteCookie("userInfo");
      // cookies().delete("userInfo");
      toast({
        title: "Goodbye!",
        description: "You Have Logged Out Successfully.",
      });
      window.location.replace("/authportal");
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUserInfo = (state: { user: UserState }) =>
  state.user.userInfo;
