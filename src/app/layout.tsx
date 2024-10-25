import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I wanna go Home!",
  description: "Your AI lover is upset! What should I do?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"w-screen flex justify-center bg-brown-100"}>
        <div className="pb-20 h-screen max-w-md w-full mx-auto p-6 shadow-lg flex flex-col items-center justify-center space-y-8">
          {children}
        </div>
      </body>
    </html>
  );
}
