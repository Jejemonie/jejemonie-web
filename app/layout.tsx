import './globals.css'
import { Manrope } from 'next/font/google'
import { Navbar } from '@/app/(pages)/(landing)/components/Navbar'
import localFont from 'next/font/local'


const manrope = Manrope({ subsets: ['latin'] })

const Mouser = localFont({
  src: './fonts/Mouser.woff2',
})

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
      <body className={`${Mouser.className} ${manrope.className}`} suppressHydrationWarning={true}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}