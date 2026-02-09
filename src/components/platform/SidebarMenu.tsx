"use client";

import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/constants/menu";

const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      style={{ borderRight: 0 }}
      onClick={({ key }) => router.push(key)}
      classNames={{
        item: "font-semibold",
      }}
      items={MENU_ITEMS.map((item) => {
        return {
          key: item.path,
          icon: item.icon,
          label: item.label,
        };
      })}
    />
  );
};

export default SidebarMenu;
