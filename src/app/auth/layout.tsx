import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}