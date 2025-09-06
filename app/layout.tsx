import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "MGI Chat • SaaS",
  description: "Miami Global Investments Group – AI Chatbot SaaS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
