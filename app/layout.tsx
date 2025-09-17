import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CorteZapp Admin",
  description: "Painel administrativo do sistema CorteZapp",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
      >
        <div className="flex min-h-dvh flex-col">
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
