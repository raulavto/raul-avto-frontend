"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGTMEvent } from '@next/third-parties/google';

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1237876190485541");
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};

type GTMEventData = { event: string, [key: string]: any };
type FBQEvent = string;

const sendEvent = (gtmEventData: GTMEventData | null = null, fbqEvent: FBQEvent | null = null, additionalData: object = {}) => {
  if (typeof window !== 'undefined') {
    if (gtmEventData) {
      sendGTMEvent(gtmEventData);
    } 
    
    if (fbqEvent && (window as any).fbq) {
      (window as any).fbq('track', fbqEvent, additionalData);
    }
  }
};

export const sendClick_submitForm = () => {
  const gtmData = { event: 'submitLeadForm' };
  const fbqData = { leadType: 'formSubmit' }; 
  sendEvent(gtmData, 'submitLeadForm', fbqData);
};
