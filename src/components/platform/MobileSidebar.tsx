"use client";

import { Drawer } from "antd";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import horizontalLogo from "@/assets/svgs/horizontalLogo.svg";
import SidebarMenu from "./SidebarMenu";
import LogoutMenu from "./LogoutMenu";

interface MobileSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ mobileOpen, onClose }: MobileSidebarProps) => {
  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={mobileOpen}
      styles={{ body: { padding: 0 } }}
      size={260}
      closable={false}
      className="md:hidden"
    >
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-100">
        <Image
          src={horizontalLogo}
          alt="Boxful Logo"
          width={100}
          height={32}
          priority
        />
        <div
          onClick={onClose}
          className="cursor-pointer p-2 -mr-2 text-gray-400 hover:text-gray-600"
        >
          <CloseOutlined style={{ fontSize: "18px" }} />
        </div>
      </div>
      <div className="pt-4">
        <div className="text-xs text-gray-400 font-bold mb-2 px-4">MENÚ</div>
        <SidebarMenu />
      </div>
      <div className="absolute bottom-4 left-0 w-full px-2">
        <div className="border-t border-gray-100 pt-2">
          <LogoutMenu />
        </div>
      </div>
    </Drawer>
  );
};

export default MobileSidebar;
