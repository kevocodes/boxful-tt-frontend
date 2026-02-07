import Image from "next/image";
import { Col, Row } from "antd";
import LoginBanner from "@/app/assets/images/loginbanner.png";
import MainStrip from "@/app/assets/svgs/mainstrip.svg";
import SafetyStrip from "@/app/assets/svgs/safetystrip.svg";
import ShipmentStrip from "@/app/assets/svgs/shipmentstrip.svg";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Row className="h-full w-full">
        {/* Left Column - Content */}
        <Col
          xs={24}
          lg={10}
          className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 bg-white h-full relative z-20"
        >
          <div className="w-full max-w-md space-y-8">{children}</div>
        </Col>

        {/* Right Column (Hidden on mobile) */}
        <Col
          xs={0}
          lg={14}
          className="hidden lg:flex flex-col relative bg-gray-50 h-full overflow-hidden"
        >
          {/* Top Right Overlays */}
          <div className="absolute top-0 right-0 z-10 w-96 h-96 pointer-events-none overflow-hidden">
            <div className="absolute -top-15 -right-55 transform -rotate-45 w-95">
              <Image
                src={SafetyStrip}
                alt="Safety Strip"
                className="w-full h-auto object-contain scale-125"
                priority
              />
            </div>
            <div className="absolute top-3 -right-56.25 transform rotate-15 w-175">
              <Image
                src={ShipmentStrip}
                alt="Shipment Strip"
                className="w-full h-auto object-contain scale-125"
                priority
              />
            </div>
          </div>

          {/* Content Rows */}
          <div className="relative w-full h-[calc(100vh-151px)]">
            <Image
              src={LoginBanner}
              alt="Boxful Delivery"
              fill
              className="object-cover object-[75%_top]"
              priority
            />
          </div>
          <div className="h-37.75 w-full relative bg-[#004745] z-10">
            <Image
              src={MainStrip}
              alt="Footer Pattern"
              fill
              className="object-cover object-[5%_bottom]"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
