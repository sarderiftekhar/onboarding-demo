'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import confetti from 'canvas-confetti'
import { 
  ArrowRightIcon, 
  CheckIcon,
  UserIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface MicroStep {
  id: string
  title: string
  subtitle: string
  type: 'select' | 'input' | 'multi-select' | 'confirmation' | 'complete'
  options?: { id: string; label: string; description?: string; icon?: React.ComponentType<any> }[]
  placeholder?: string
  validation?: (value: any) => boolean
  required?: boolean
}

interface MicroStepOnboardingProps {
  onComplete: (data: Record<string, any>) => void
  onBackToWelcome?: () => void
  onStepChange?: (step: number) => void
}

const microSteps: MicroStep[] = [
  {
    id: 'client_type',
    title: 'What type of client are you?',
    subtitle: 'This helps us personalize your experience',
    type: 'select',
    required: true,
    options: [
      { 
        id: 'individual', 
        label: 'Individual Investor', 
        description: 'Personal investment account',
        icon: UserIcon 
      },
      { 
        id: 'corporate', 
        label: 'Corporate Client', 
        description: 'Business investment account',
        icon: CreditCardIcon 
      }
    ]
  },
  {
    id: 'client_name',
    title: 'Select your client profile',
    subtitle: 'Choose from your existing profiles',
    type: 'select',
    required: true,
    options: [
      { id: '1', label: 'Andrew Hutson - UK10233038', description: 'Individual • Active since 2021' },
      { id: '2', label: 'Sarah Johnson - UK10233039', description: 'Individual • Active since 2022' },
      { id: '3', label: 'Michael Brown - UK10233040', description: 'Corporate • Active since 2020' }
    ]
  },
  {
    id: 'account_selection',
    title: 'Which account would you like to use?',
    subtitle: 'Select your preferred account for this investment',
    type: 'select',
    required: true,
    options: [
      { id: '1', label: 'UK10233038_DIR_9190', description: 'Direct Investment Account' },
      { id: '2', label: 'UK10233038_DIR_9191', description: 'ISA Investment Account' },
      { id: '3', label: 'UK10233038_DIR_9192', description: 'SIPP Investment Account' }
    ]
  },
  {
    id: 'investment_amount',
    title: 'How much would you like to invest?',
    subtitle: 'Enter your investment amount',
    type: 'input',
    placeholder: '10000',
    required: true,
    validation: (value: string) => parseFloat(value) > 0
  },
  {
    id: 'product_category',
    title: 'What type of investment interests you?',
    subtitle: 'We\'ll show you relevant products',
    type: 'select',
    required: true,
    options: [
      { 
        id: 'structured', 
        label: 'Structured Products', 
        description: 'Capital protected investments',
        icon: ShieldCheckIcon 
      },
      { 
        id: 'funds', 
        label: 'Investment Funds', 
        description: 'Diversified portfolio options',
        icon: DocumentTextIcon 
      },
      { 
        id: 'bonds', 
        label: 'Bonds & Fixed Income', 
        description: 'Steady income investments',
        icon: BanknotesIcon 
      }
    ]
  },
  {
    id: 'specific_product',
    title: 'Choose your investment product',
    subtitle: 'Based on your preferences',
    type: 'select',
    required: true,
    options: [
      { 
        id: '1', 
        label: 'FTSE 100 Autocall Plan', 
        description: 'Issue 1 • July 2025 • 6.5% potential return' 
      },
      { 
        id: '2', 
        label: 'NASDAQ Tech Growth Fund', 
        description: 'Issue 2 • August 2025 • Growth focused' 
      }
    ]
  },
  {
    id: 'tax_wrapper',
    title: 'Would you like tax-efficient investing?',
    subtitle: 'Choose your ISA allocation',
    type: 'select',
    options: [
      { id: '1', label: 'ISA 2025/26', description: '£20,000 annual allowance available' },
      { id: '2', label: 'ISA 2024/25', description: '£15,000 remaining allowance' },
      { id: 'none', label: 'No ISA', description: 'General investment account' }
    ]
  },
  {
    id: 'adviser_fee',
    title: 'Set your adviser fee',
    subtitle: 'This will be deducted from your investment',
    type: 'input',
    placeholder: '1.5',
    validation: (value: string) => parseFloat(value) >= 0 && parseFloat(value) <= 10
  },
  {
    id: 'bank_account',
    title: 'Choose your funding source',
    subtitle: 'Select the account to fund your investment',
    type: 'select',
    options: [
      { id: '1', label: 'Santander Current Account', description: '****1234 • Available: £25,000' },
      { id: '2', label: 'HSBC Savings Account', description: '****5678 • Available: £50,000' },
      { id: '3', label: 'New Bank Account', description: 'Add a new funding source' }
    ]
  },
  {
    id: 'suitability_check',
    title: 'Confirm suitability assessment',
    subtitle: 'Required for advised applications',
    type: 'confirmation',
    required: true,
    options: [
      {
        id: 'suitability',
        label: 'Suitability Confirmed',
        description: 'I confirm that I have conducted the required suitability assessment and this product is suitable for my client.'
      }
    ]
  }
]

export default function MicroStepOnboarding({ onComplete, onBackToWelcome, onStepChange }: MicroStepOnboardingProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isComplete, setIsComplete] = useState(false)

  const currentStep = microSteps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / microSteps.length) * 100

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStepIndex)
  }, [currentStepIndex, onStepChange])

  // Spring animation for progress and step transitions
  const slideSpring = useSpring({
    transform: `translateX(${currentStepIndex * -100}%)`,
    config: config.gentle,
  })

  const progressSpring = useSpring({
    width: `${progress}%`,
    config: config.slow,
  })

  const handleAnswer = (stepId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }))
  }

  const handleNext = () => {
    const answer = answers[currentStep.id]
    
    if (currentStep.required && (!answer || answer === '')) {
      return // Don't proceed if required field is empty
    }

    if (currentStep.validation && !currentStep.validation(answer)) {
      return // Don't proceed if validation fails
    }

    if (currentStepIndex < microSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      // Completion
      setIsComplete(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => onComplete(answers), 2000)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  if (isComplete) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckIcon className="w-16 h-16 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Onboarding Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600"
          >
            Welcome to your investment journey
          </motion.p>
        </motion.div>
        
        {/* Back to Welcome Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onBackToWelcome}
          className="absolute bottom-8 right-8 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
        >
          Back to Welcome
        </motion.button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Progress Bar */}
      <div className="p-8 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <animated.div
            style={progressSpring}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          />
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Step {currentStepIndex + 1} of {microSteps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full flex flex-col justify-center max-w-2xl mx-auto"
          >
            {/* Question Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#1E3A8A' }}>
                {currentStep.title}
              </h1>
              <p className="text-xl text-gray-600">
                {currentStep.subtitle}
              </p>
            </motion.div>

            {/* Answer Options */}
            <div className="space-y-4 mb-12">
              {currentStep.type === 'select' && currentStep.options && (
                <>
                  {currentStep.options.map((option, index) => {
                    const Icon = option.icon
                    const isSelected = answers[currentStep.id] === option.id
                    
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(currentStep.id, option.id)}
                        className={clsx(
                          'w-full p-6 rounded-2xl border-2 text-left transition-all duration-200',
                          isSelected 
                            ? 'border-primary-500 bg-primary-50 shadow-lg' 
                            : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                        )}
                      >
                        <div className="flex items-start space-x-4">
                          {Icon && (
                            <div className={clsx(
                              'w-12 h-12 rounded-xl flex items-center justify-center',
                              isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                            )}>
                              <Icon className="w-6 h-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className={clsx(
                              'text-lg font-semibold mb-1',
                              isSelected ? 'text-primary-700' : 'text-gray-900'
                            )}>
                              {option.label}
                            </h3>
                            {option.description && (
                              <p className="text-gray-600 text-sm">
                                {option.description}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            >
                              <CheckIcon className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </>
              )}

              {currentStep.type === 'input' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <input
                      type={currentStep.id === 'investment_amount' ? 'number' : 'text'}
                      placeholder={currentStep.placeholder}
                      value={answers[currentStep.id] || ''}
                      onChange={(e) => handleAnswer(currentStep.id, e.target.value)}
                      className="w-full px-6 py-6 text-2xl border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-0 outline-none transition-all duration-200"
                    />
                    {currentStep.id === 'investment_amount' && (
                      <div className="absolute left-6 top-6 text-2xl text-gray-400 pointer-events-none">
                        £
                      </div>
                    )}
                    {currentStep.id === 'adviser_fee' && (
                      <div className="absolute right-6 top-6 text-2xl text-gray-400 pointer-events-none">
                        %
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep.type === 'confirmation' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
                >
                  {currentStep.options?.map((option) => (
                    <label key={option.id} className="flex items-start space-x-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={answers[currentStep.id] === option.id}
                        onChange={(e) => handleAnswer(currentStep.id, e.target.checked ? option.id : '')}
                        className="w-6 h-6 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {option.label}
                        </h3>
                        <p className="text-gray-600">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center"
            >
              {currentStepIndex > 0 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="px-8 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                >
                  ← Back
                </motion.button>
              ) : onBackToWelcome ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBackToWelcome}
                  className="px-8 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                >
                  ← Back to Welcome
                </motion.button>
              ) : (
                <div />
              )}

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentStep.required && !answers[currentStep.id]}
                className={clsx(
                  'px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200',
                  currentStep.required && !answers[currentStep.id]
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                )}
              >
                <span>{currentStepIndex === microSteps.length - 1 ? 'Complete' : 'Continue'}</span>
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
