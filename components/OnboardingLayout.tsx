'use client'

import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface OnboardingLayoutProps {
  children: React.ReactNode
  onBack?: () => void
  showBackButton?: boolean
}

export default function OnboardingLayout({ 
  children, 
  onBack, 
  showBackButton = false 
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 py-6"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center"
          >
            <img 
              src="/images/logo_hilbert_blanc.png" 
              alt="Hilbert Logo" 
              className="object-contain"
              style={{ width: '15em' }}
            />
          </motion.div>

          {/* Back Button */}
          {showBackButton && onBack && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Welcome</span>
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-128 h-128 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  )
}
