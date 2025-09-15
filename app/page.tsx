'use client'

import { useState } from 'react'
import WelcomePage from '@/components/WelcomePage'
import OnboardingLayout from '@/components/OnboardingLayout'
import OnboardingFlow from '@/components/OnboardingFlow'

export default function Home() {
  const [currentView, setCurrentView] = useState<'welcome' | 'onboarding'>('welcome')

  const handleGetStarted = () => {
    setCurrentView('onboarding')
  }

  const handleBackToWelcome = () => {
    setCurrentView('welcome')
  }

  if (currentView === 'welcome') {
    return <WelcomePage onGetStarted={handleGetStarted} />
  }

  return (
    <OnboardingLayout onBack={handleBackToWelcome} showBackButton={true}>
      <OnboardingFlow />
    </OnboardingLayout>
  )
}
