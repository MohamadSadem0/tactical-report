import { ReactNode } from "react";
import ClientProvider from "@/components/ClientProvider"; 
import "./globals.css"; 



export const metadata = {
  title: "Next.js App with Redux",
  description: "Learning Next.js with Redux and TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
