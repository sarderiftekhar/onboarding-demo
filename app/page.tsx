'use client'

import { useState } from 'react'
import EnhancedWelcomePage from '@/components/EnhancedWelcomePage'
import SplitScreenLayout from '@/components/SplitScreenLayout'
import MicroStepOnboarding from '@/components/MicroStepOnboarding'

export default function Home() {
  const [currentView, setCurrentView] = useState<'welcome' | 'onboarding'>('welcome')
  const [currentStep, setCurrentStep] = useState(0)
  
  // Calculate progress based on 10 micro-steps
  const totalSteps = 10
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleGetStarted = () => {
    setCurrentStep(0) // Ensure step is 0 first
    setCurrentView('onboarding')
  }

  const handleOnboardingComplete = (data: Record<string, any>) => {
    console.log('Onboarding completed with data:', data)
    // Handle completion - could redirect to dashboard or show success
  }

  const handleBackToWelcome = () => {
    setCurrentView('welcome')
    setCurrentStep(0)
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  if (currentView === 'welcome') {
    return <EnhancedWelcomePage onGetStarted={handleGetStarted} />
  }

  return (
    <SplitScreenLayout 
      currentStep={currentStep} 
      totalSteps={totalSteps}
      progress={progress}
    >
      <MicroStepOnboarding 
        onComplete={handleOnboardingComplete}
        onBackToWelcome={handleBackToWelcome}
        onStepChange={handleStepChange}
      />
    </SplitScreenLayout>
  )
}
