import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

import { NavigationProvider } from "./_providers/navigation-provider"
import NavigationOverlay from "./_components/navigation-overlay"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gerencia toda a sua barbearia/salão de beleza",
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
        <AuthProvider>
          <NavigationProvider>
            <div className="flex min-h-dvh flex-col overflow-y-auto [scrollbar-width:none]">
              <div className="flex-1">
                {children}
                <NavigationOverlay />
              </div>
              <Footer />
            </div>
            <Toaster />
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
