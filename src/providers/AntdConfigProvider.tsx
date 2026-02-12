"use client";

import React from "react";
import { ConfigProvider, App } from "antd";
import theme from "@/theme/themeConfig";
import locale from 'antd/locale/es_ES';


interface AntdConfigProviderProps {
  children: React.ReactNode;
}

const AntdConfigProvider = ({ children }: AntdConfigProviderProps) => {
  return (
    <ConfigProvider theme={theme} locale={locale}>
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
