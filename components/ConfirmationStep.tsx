'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'

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

interface ConfirmationStepProps {
  formData: FormData
  onNext: () => void
  onPrev: () => void
}

const clients = [
  { id: '1', name: 'Andrew Hutson - UK10233038 - individual' },
  { id: '2', name: 'Sarah Johnson - UK10233039 - individual' },
  { id: '3', name: 'Michael Brown - UK10233040 - corporate' },
]

const accounts = [
  { id: '1', name: 'UK10233038_DIR_9190' },
  { id: '2', name: 'UK10233038_DIR_9191' },
  { id: '3', name: 'UK10233038_DIR_9192' },
]

const products = [
  { 
    id: '1', 
    name: 'XS3089773587 - Income series: FTSE 100 EW45 Conditional Memory Quarterly Autocall Plan - Issue 1 - July 2025',
  },
  { 
    id: '2', 
    name: 'YS4089773588 - Growth series: NASDAQ Tech Fund - Issue 2 - August 2025',
  },
]

const bankAccounts = [
  { id: '1', name: 'No Bank Account' },
  { id: '2', name: 'Santander - ****1234' },
  { id: '3', name: 'HSBC - ****5678' },
  { id: '4', name: 'Barclays - ****9012' },
]

const taxYearsOptions = [
  { id: '1', name: 'ISA 2025/26 - Annual allowance: 20000.00' },
  { id: '2', name: 'ISA 2024/25 - Annual allowance: 20000.00' },
  { id: '3', name: 'ISA 2023/24 - Annual allowance: 20000.00' },
]

export default function ConfirmationStep({ formData, onNext, onPrev }: ConfirmationStepProps) {
  const selectedClient = clients.find(c => c.id === formData.client)
  const selectedAccount = accounts.find(a => a.id === formData.account)
  const selectedProduct = products.find(p => p.id === formData.product)
  const selectedBankAccount = bankAccounts.find(b => b.id === formData.bankAccount)
  const selectedTaxYear = taxYearsOptions.find(t => t.id === formData.taxYears)

  const summaryItems = [
    {
      icon: UserIcon,
      title: 'Client Information',
      items: [
        { label: 'Client', value: selectedClient?.name || 'Not selected' },
        { label: 'Account', value: selectedAccount?.name || 'Not selected' },
      ]
    },
    {
      icon: DocumentTextIcon,
      title: 'Product Details',
      items: [
        { label: 'Product', value: selectedProduct?.name || 'Not selected' },
        { label: 'Tax Years', value: selectedTaxYear?.name || 'Not selected' },
        { label: 'Linked to Transfer', value: formData.linkedToTransfer },
      ]
    },
    {
      icon: BanknotesIcon,
      title: 'Financial Details',
      items: [
        { label: 'Amount', value: formData.amount ? `£${formData.amount}` : '£0' },
        { label: 'Initial Adviser Fee', value: formData.adviserFee ? `${formData.adviserFee}%` : '0%' },
      ]
    },
    {
      icon: CreditCardIcon,
      title: 'Bank Account',
      items: [
        { label: 'Bank Account', value: selectedBankAccount?.name || 'Not selected' },
      ]
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircleIcon className="w-8 h-8 text-primary-600" />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Review & Confirm</h2>
        <p className="text-xl text-gray-600">Please review all the information before submitting your application</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryItems.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex justify-between items-start">
                    <span className="text-sm text-gray-600">{item.label}:</span>
                    <span className="text-sm font-medium text-gray-900 text-right max-w-xs truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Compliance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-green-50 border-green-200"
      >
        <h3 className="font-semibold text-green-900 mb-3">Compliance Confirmation</h3>
        <div className="space-y-2">
          {formData.suitability && (
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">Suitability assessment completed</span>
            </div>
          )}
          {formData.appropriateness && (
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">Appropriateness assessment completed</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">All required documents reviewed</span>
          </div>
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
      >
        <h4 className="font-medium text-amber-900 mb-2">Important Notice</h4>
        <p className="text-sm text-amber-800">
          By clicking "Submit Application" below, you confirm that all information provided is accurate and complete. 
          This application will be processed according to our terms and conditions.
        </p>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-between pt-8 border-t border-gray-200"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrev}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Previous</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="btn-primary flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <span>Submit Application</span>
          <ArrowRightIcon className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  )
}
