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