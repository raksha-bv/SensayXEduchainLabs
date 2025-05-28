"use client";

import { ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";

interface OCConnectWrapperProps {
  children: ReactNode;
  opts: any; // Replace 'any' with the specific type if known
  sandboxMode: boolean;
}

export default function OCConnectWrapper({ children, opts, sandboxMode }: OCConnectWrapperProps) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}
