import "./globals.css";

export const metadata = {
  title: "Electric BD - Leading Electric, Solar, Inverter & Tech Shop in Bangladesh",
  description: "Electric BD is the best electric, cable, solar IPS, circuit breaker, home appliance, and power tools retail & online shop in Bangladesh with official brand warranty.",
  keywords: "Electric shop in Bangladesh, Solar Inverter BD, IPS shop BD, BRB Cable price in BD, Schneider Circuit Breaker, Power tools Bangladesh, Star Tech BD style electric store",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#f2f4f8] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}
