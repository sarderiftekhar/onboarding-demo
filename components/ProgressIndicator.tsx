'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Step {
  id: number
  name: string
  description: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={clsx(
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300',
                  currentStep > step.id 
                    ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                    : currentStep === step.id 
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg ring-4 ring-primary-100' 
                    : 'bg-gray-100 border-gray-200 text-gray-400'
                )}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  step.id
                )}
              </motion.div>
              <div className="mt-4 text-center max-w-24">
                <p className={clsx(
                  'text-sm font-semibold transition-colors duration-200',
                  currentStep >= step.id ? 'text-primary-700' : 'text-gray-400'
                )}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{step.description}</p>
              </div>
            </div>
            
            {stepIdx < steps.length - 1 && (
              <motion.div 
                className="flex-1 h-1 mx-6 rounded-full overflow-hidden bg-gray-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: stepIdx * 0.2 }}
              >
                <motion.div
                  className={clsx(
                    'h-full rounded-full transition-all duration-500',
                    currentStep > step.id 
                      ? 'bg-green-500' 
                      : currentStep === step.id 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-400' 
                      : 'bg-gray-200'
                  )}
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep > step.id ? '100%' : currentStep === step.id ? '50%' : '0%'
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
