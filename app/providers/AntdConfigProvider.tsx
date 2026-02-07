"use client";

import React from "react";
import { ConfigProvider } from "antd";

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-mona-sans)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
