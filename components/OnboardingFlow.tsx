'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import UserDetailsForm from './UserDetailsForm'
import ConfirmationStep from './ConfirmationStep'
import ProgressIndicator from './ProgressIndicator'
import clsx from 'clsx'

const steps = [
  { id: 1, name: 'User Details', description: 'Client and product information' },
  { id: 2, name: 'Bank Details', description: 'Account management setup' },
  { id: 3, name: 'Confirmation', description: 'Review and confirm details' },
  { id: 4, name: 'Complete', description: 'Application submitted' },
]

interface FormData {
  client: string
  account: string
  product: string
  amount: string
  adviserFee: string
  bankAccount: string
  suitability: boolean
  appropriateness: boolean
  linkedToTransfer: string
  taxYears: string
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    client: '',
    account: '',
    product: '',
    amount: '',
    adviserFee: '',
    bankAccount: '',
    suitability: false,
    appropriateness: false,
    linkedToTransfer: 'No',
    taxYears: ''
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Steps */}
      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-12 max-w-4xl mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <UserDetailsForm 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <UserDetailsForm 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
                showBankSection={true}
              />
            )}
            {currentStep === 3 && (
              <ConfirmationStep 
                formData={formData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <CompletionStep />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function CompletionStep() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckIcon className="w-8 h-8 text-green-600" />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-900 mb-2"
      >
        Application Completed!
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6"
      >
        Your onboarding application has been successfully submitted and is now being processed.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-x-4"
      >
        <button className="btn-primary">
          View Application Status
        </button>
        <button className="btn-secondary">
          Return to Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}
