import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cloverlaid",
  description: "A simple image overlay tool for combining and processing RGB images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`nunito-sans-standard antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
