"use client";
import React, { useEffect, useRef } from "react";

interface AdsenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  layout?: string;
  responsive?: boolean;
  className?: string;
  client?: string;
}

export const Adsense: React.FC<AdsenseProps> = ({
  slot,
  style = { display: "block" },
  format = "auto",
  layout,
  responsive = true,
  className = "",
  client = "ca-pub-3032394425172826",
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle && adRef.current) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (e) {
        // Ignore duplicate ad push errors
      }
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        {...(layout ? { "data-ad-layout": layout } : {})}
        ref={adRef as any}
      />
    </div>
  );
}; 