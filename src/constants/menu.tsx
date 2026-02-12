import { PlusOutlined, TruckFilled } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";

export const MENU_ITEMS = [
  {
    key: ROUTES.HOME,
    icon: <PlusOutlined style={{ fontSize: "20px" }} />,
    label: "Crear orden",
    path: ROUTES.HOME,
  },
  {
    key: ROUTES.SHIPMENTS,
    icon: <TruckFilled style={{ fontSize: "20px" }} />,
    label: "Mis envíos",
    path: ROUTES.SHIPMENTS,
  },
];
