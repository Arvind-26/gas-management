import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"

export const metadata = {
  title: "E Gas",
  description: "Most Efficient and Less Pollutive LPG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased scrollbar`}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
