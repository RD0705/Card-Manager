import QRCode from "react-qr-code";
import { cn } from "@/lib/utils";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay = ({ value, size = 120, className }: QRCodeDisplayProps) => {
  return (
    <div className={cn("bg-white p-2 rounded-md", className)}>
      <QRCode
        value={value}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      />
    </div>
  );
};
