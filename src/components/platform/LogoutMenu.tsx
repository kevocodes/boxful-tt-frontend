"use client";

import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";

const LogoutMenu = () => {
  return (
    <Menu
      mode="inline"
      style={{ borderRight: 0 }}
      selectable={false}
      onClick={({ key }) => {
        if (key === "logout") signOut();
      }}
      items={[
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Cerrar sesión",
          className: "text-red-500 hover:text-red-600",
        },
      ]}
    />
  );
};

export default LogoutMenu;
