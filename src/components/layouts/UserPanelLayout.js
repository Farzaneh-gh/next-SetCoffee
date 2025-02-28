"use client";
import React from "react";
import dynamic from "next/dynamic";

const UserPanelLayout = ({ children }) => {
  const TopBar = dynamic(() => import("../modules/p-user/TopBar"), {
    ssr: false,
  });
  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  );
};

export default UserPanelLayout;
