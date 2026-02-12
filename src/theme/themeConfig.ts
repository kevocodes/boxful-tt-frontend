import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontFamily: "var(--font-mona-sans)",
    colorPrimary: "#2E49CE",
    controlHeight: 40,
    motionDurationFast: "0.1s",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.2s",
  },
  components: {
    Menu: {
      itemSelectedBg: "#2E49CE",
      itemSelectedColor: "#ffffff",
      itemMarginBlock: 16,
    },
    Button: {
      fontWeight: 600,
      fontSize: 16
    }
  },
};

export default theme;
