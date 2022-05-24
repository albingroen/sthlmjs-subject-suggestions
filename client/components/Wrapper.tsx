import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <div className="space-y-8">{children}</div>;
}
