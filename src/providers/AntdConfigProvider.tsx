"use client";

import React from "react";
import { ConfigProvider, App } from "antd";
import theme from "@/theme/themeConfig";

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
