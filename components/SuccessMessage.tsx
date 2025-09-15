'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface SuccessMessageProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export default function SuccessMessage({ 
  message, 
  show, 
  onClose, 
  duration = 5000 
}: SuccessMessageProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80"
        >
          <CheckCircleIcon className="w-6 h-6 text-green-200" />
          <p className="flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-green-200 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
