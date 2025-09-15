'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface WelcomePageProps {
  onGetStarted: () => void
}

const trustLogos = [
  'HubSpot', 'Salesforce', 'Zendesk', 'Pipedrive', 'Monday.com', 'Bitrix24'
]

const features = [
  {
    icon: UserGroupIcon,
    title: 'Client Management',
    description: 'Streamlined client onboarding and management system'
  },
  {
    icon: ChartBarIcon,
    title: 'Investment Tracking',
    description: 'Real-time portfolio monitoring and reporting'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance Ready',
    description: 'Built-in suitability and appropriateness checks'
  },
  {
    icon: ClockIcon,
    title: 'Time Saving',
    description: 'Reduce onboarding time by up to 75%'
  }
]

const testimonialAvatars = [
  { name: 'John Smith', initials: 'JS', color: 'bg-blue-500' },
  { name: 'Sarah Wilson', initials: 'SW', color: 'bg-green-500' },
  { name: 'Michael Chen', initials: 'MC', color: 'bg-purple-500' },
  { name: 'Emma Davis', initials: 'ED', color: 'bg-pink-500' },
]

export default function WelcomePage({ onGetStarted }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">HILBERT</span>
            <span className="text-sm text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
              Financial Solutions
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <div className="flex -space-x-2">
              {testimonialAvatars.map((avatar, index) => (
                <motion.div
                  key={avatar.name}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  className={`w-10 h-10 rounded-full ${avatar.color} flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm`}
                >
                  {avatar.initials}
                </motion.div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Trusted by thousands</span> of financial advisors
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                ✨ Streamlined Client Onboarding
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Onboard Clients in{' '}
                <span className="text-primary-600">Minutes</span>
                <br />
                Not <span className="text-gray-400 line-through">Hours</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Streamline your financial advisory process with our intelligent onboarding system. 
                Reduce paperwork, ensure compliance, and delight your clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-lg group"
              >
                Start Demo Onboarding
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center px-6 py-4 text-gray-600 font-medium"
              >
                <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-600" />
                GDPR Compliant • No setup required
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 gap-6 pt-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column - Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={ { delay: 0.6 }}
            className="relative"
          >
            {/* Demo Preview Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Step 1 of 4</span>
                </div>

                {/* Form Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Client Details</h3>
                  
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 }}
                      className="p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="text-sm text-gray-600 mb-1">Select a client</div>
                      <div className="font-medium">Andrew Hutson - UK10233038</div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 }}
                      className="p-3 border rounded-lg"
                    >
                      <div className="text-sm text-gray-600 mb-1">Choose a product</div>
                      <div className="text-gray-400">Search products...</div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="flex justify-end"
                  >
                    <div className="px-6 py-3 bg-primary-600 text-white rounded-lg text-sm font-medium">
                      Continue →
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="absolute -bottom-6 left-4 bg-white rounded-lg shadow-lg p-3 border"
            >
              <div className="text-xs text-gray-600">Compliance Status</div>
              <div className="text-sm font-medium text-green-600">✓ All checks passed</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 text-sm mb-8">Works with 50+ financial platforms, including:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 + index * 0.1 }}
                className="text-gray-500 font-medium text-lg"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
