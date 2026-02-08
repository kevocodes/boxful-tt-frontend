import { CarOutlined, PlusOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";

export const MENU_ITEMS = [
  {
    key: ROUTES.HOME,
    icon: <PlusOutlined />,
    label: "Crear orden",
    path: ROUTES.HOME,
  },
  {
    key: ROUTES.SHIPMENTS,
    icon: <CarOutlined />,
    label: "Mis envíos",
    path: ROUTES.SHIPMENTS,
  },
];
