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
    <html lang="ko">
      <body className={"w-screen bg-primary"}>
        <div className="flex justify-center h-screen max-w-md mx-auto shadow-2xl bg-white px-5 py-7">
          {children}
        </div>
      </body>
    </html>
  );
}
