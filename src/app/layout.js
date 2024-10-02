import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "E Gas",
  description: "Most Efficient and Less Pollutive LPG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased scrollbar`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
