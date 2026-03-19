import "./globals.css";
import { Manrope, Montserrat } from "next/font/google";
import { Navbar } from "@/app/(pages)/(landing)/components/Navbar";
import localFont from "next/font/local";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Mouser = localFont({
  src: "./fonts/Mouser.woff2",
  variable: "--font-mouser",
});

export const metadata = {
  title: "Manayja",
  description: "Take control of your money with manayja",
  icons: {
    icon: "/icon-white.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${Mouser.variable} ${manrope.variable} font-sans  text-gray-800 bg-[#fbfeff]`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
