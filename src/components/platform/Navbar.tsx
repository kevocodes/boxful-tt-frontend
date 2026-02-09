"use client";

import { Button, Layout, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/constants/menu";

const { Header } = Layout;

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { title: storeTitle } = usePageTitleStore();
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentMenuItem = MENU_ITEMS.find((item) => item.path === pathname);
  const title = currentMenuItem ? currentMenuItem.label : storeTitle;
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Header
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
        position: "sticky",
        top: 0,
        zIndex: 9,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            style={{ fontSize: "16px", width: 44, height: 44 }}
          />
        </div>
        <div className="ml-4 flex items-center gap-1 text-xl transition-all duration-200">
          {title.split(" ").map((word, index, arr) => (
            <span
              key={index}
              className={index === arr.length - 1 ? "font-bold" : "font-normal"}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <p className="font-normal text-base leading-none">
        {session?.user?.name} {session?.user?.lastname}
      </p>
    </Header>
  );
};

export default Navbar;
