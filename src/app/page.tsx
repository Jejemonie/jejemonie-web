'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { Benefits } from '../components/landing/Benefits'
import { CTASection } from '../components/landing/CTASection'
import { Footer } from '../components/landing/Footer'

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  if (user) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <CTASection />
      <Footer />
    </>
  )
}