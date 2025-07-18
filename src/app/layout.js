import './globals.css';
import Navbar from '@/components/NavBar';
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: 'Fruit Bowl Delivery',
  description: 'Fresh fruits & veggies every morning',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="p-4">{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
