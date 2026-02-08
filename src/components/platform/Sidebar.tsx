"use client";

import { Layout } from "antd";
import Image from "next/image";

import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import logoIcon from "@/assets/svgs/logoicon.svg";
import logotext from "@/assets/svgs/logotext.svg";

import SidebarMenu from "./SidebarMenu";
import LogoutMenu from "./LogoutMenu";
import MobileSidebar from "./MobileSidebar";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({
  collapsed,
  mobileOpen,
  onClose,
  onCollapse,
}: SidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden md:block border-r border-gray-200"
        width={260}
        theme="light"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          zIndex: 10,
          background: "#fff",
        }}
      >
        <div className="relative px-4 pb-4 pt-8 w-full flex items-center justify-between">
          {/* Logo Container */}
          <div
            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
            style={{
              width: collapsed ? "32px" : "100%",
              transition: "width 0.3s ease-in-out",
            }}
          >
            <div
              style={{
                minWidth: 32,
                height: 32,
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src={logoIcon}
                alt="Boxful Icon"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div
              style={{
                width: 90,
                height: 24,
                position: "relative",
                opacity: collapsed ? 0 : 1,
                transition: "opacity 0.2s",
                transitionDelay: collapsed ? "0s" : "0.15s",
              }}
            >
              <Image
                src={logotext}
                alt="Boxful Text"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div
            onClick={() => onCollapse(!collapsed)}
            className="absolute -right-3 top-7 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:border-blue-600 hover:text-blue-600 z-50 text-gray-400 shadow-sm transition-colors"
          >
            {collapsed ? (
              <DoubleRightOutlined style={{ fontSize: "12px" }} />
            ) : (
              <DoubleLeftOutlined style={{ fontSize: "12px" }} />
            )}
          </div>
        </div>

        <div className="px-2">
          <div
            className={`text-xs text-gray-400 font-bold mb-2 px-4 mt-4 transition-opacity duration-200 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
            style={{ height: "20px" }}
          >
            MENÚ
          </div>
          <SidebarMenu key={collapsed ? "collapsed" : "expanded"} />
        </div>
        <div className="absolute bottom-4 left-0 w-full px-2">
          <div className="border-t border-gray-100 pt-2">
            <LogoutMenu />
          </div>
        </div>
      </Sider>

      {/* Mobile Drawer */}
      <MobileSidebar mobileOpen={mobileOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
