"use client";

import { useState } from "react";
import { Layout } from "antd";
import Sidebar from "@/components/platform/Sidebar";
import Navbar from "@/components/platform/Navbar";

const { Content } = Layout;

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onCollapse={setCollapsed}
      />

      <Layout
        className={`transition-all duration-200 site-layout ml-0 ${
          collapsed ? "md:ml-20" : "md:ml-65"
        }`}
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <Content style={{ margin: "36px 36px", overflow: "initial" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PlatformLayout;
