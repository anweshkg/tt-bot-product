import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TT",
  description: "Product Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" bg-black">
        <Navbar lightModeColor="text-gray-10" darkModeColor="text-gray-10" />
      </div>

      <div className="relative overflow-hidden">{children}</div>
      <Footer />
    </>
  );
}
