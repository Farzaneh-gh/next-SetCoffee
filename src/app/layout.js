import "./globals.css";
import { Inter } from "next/font/google";
import AosInit from "@/utils/Aos";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SetCoffee",
  description:
    "Discover the rich flavors and cozy ambiance at Set Coffee. Enjoy freshly brewed coffee, handcrafted beverages, and delicious pastries in a welcoming atmosphere. Your perfect coffee moment awaits!",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <AosInit />
        {children}</body>
    </html>
  );
}
