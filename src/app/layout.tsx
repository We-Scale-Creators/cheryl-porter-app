import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mama Cheryl's Studio",
  description: "Vocal coaching app by Cheryl Porter — World's #1 Vocal Coach",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF008F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <div className="app-container shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
