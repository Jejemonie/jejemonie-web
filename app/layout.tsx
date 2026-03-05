import './globals.css'
import { Manrope } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
  title: 'Manayja',
  description: 'Take control of your money with manayja',
  icons: {
    icon: '/leaf.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className} suppressHydrationWarning={true}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}