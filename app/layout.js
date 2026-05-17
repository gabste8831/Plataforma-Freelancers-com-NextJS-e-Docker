import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "FreelaCloud | Plataforma para Profissionais",
  description: "Conectando os melhores profissionais aos grandes projetos de tecnologia.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} font-sans selection:bg-violet-500/30 selection:text-white antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-400 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
