import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'GoldCheck',
  description: 'Live Gold Price & Profit Margin Calculator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="goldTheme" lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-var(--navbar-height))]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
