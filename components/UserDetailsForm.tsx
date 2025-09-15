'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  DocumentTextIcon,
  InformationCircleIcon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

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

interface UserDetailsFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev?: () => void
  showBankSection?: boolean
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
    termSheet: 'View term sheet',
    kid: 'View Key Information Document',
    brochure: 'View Brochure'
  },
  { 
    id: '2', 
    name: 'YS4089773588 - Growth series: NASDAQ Tech Fund - Issue 2 - August 2025',
    termSheet: 'View term sheet',
    kid: 'View Key Information Document',
    brochure: 'View Brochure'
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

export default function UserDetailsForm({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev, 
  showBankSection = false 
}: UserDetailsFormProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleNext = () => {
    // Basic validation
    if (!formData.client || !formData.account || !formData.product) {
      alert('Please fill in all required fields')
      return
    }
    onNext()
  }

  const selectedClient = clients.find(c => c.id === formData.client)
  const selectedAccount = accounts.find(a => a.id === formData.account)
  const selectedProduct = products.find(p => p.id === formData.product)
  const selectedBankAccount = bankAccounts.find(b => b.id === formData.bankAccount)
  const selectedTaxYear = taxYearsOptions.find(t => t.id === formData.taxYears)

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">User Details</h2>
        <p className="text-xl text-gray-600">Please provide the client and product information</p>
      </div>

      <div className="space-y-6">
        {/* Client Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a client *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'client' ? null : 'client')}
              className="form-select flex items-center justify-between"
            >
              <span className={clsx(
                selectedClient ? 'text-gray-900' : 'text-gray-500'
              )}>
                {selectedClient ? selectedClient.name : 'Select a client'}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            
            {openDropdown === 'client' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                {clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      updateFormData({ client: client.id })
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b last:border-b-0"
                  >
                    <span>{client.name}</span>
                    {formData.client === client.id && (
                      <XMarkIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Account Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select an account *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'account' ? null : 'account')}
              className="form-select flex items-center justify-between"
            >
              <span className={clsx(
                selectedAccount ? 'text-gray-900' : 'text-gray-500'
              )}>
                {selectedAccount ? selectedAccount.name : 'Select an account'}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            
            {openDropdown === 'account' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => {
                      updateFormData({ account: account.id })
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b last:border-b-0"
                  >
                    <span>{account.name}</span>
                    {formData.account === account.id && (
                      <XMarkIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Product Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose a product *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'product' ? null : 'product')}
              className="form-select flex items-center justify-between min-h-[48px]"
            >
              <span className={clsx(
                selectedProduct ? 'text-gray-900' : 'text-gray-500',
                'truncate'
              )}>
                {selectedProduct ? selectedProduct.name : 'Search'}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
            </button>
            
            {openDropdown === 'product' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto"
              >
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      updateFormData({ product: product.id })
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <div className="flex space-x-4 text-xs">
                        <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
                          {product.termSheet}
                        </span>
                        <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
                          {product.kid}
                        </span>
                        <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
                          {product.brochure}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Product termsheet:</span> 
                  <button className="text-primary-600 hover:text-primary-700 ml-1">View term sheet</button>
                </p>
                <p><span className="font-medium">KID:</span> 
                  <button className="text-primary-600 hover:text-primary-700 ml-1">View Key Information Document</button>
                </p>
                <p><span className="font-medium">Brochure:</span> 
                  <button className="text-primary-600 hover:text-primary-700 ml-1">View Brochure</button>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Linked to Transfer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is linked to transfer:
          </label>
          <select
            value={formData.linkedToTransfer}
            onChange={(e) => updateFormData({ linkedToTransfer: e.target.value })}
            className="form-select"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </motion.div>

        {/* Tax Years */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Years
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'taxYears' ? null : 'taxYears')}
              className="form-select flex items-center justify-between"
            >
              <span className={clsx(
                selectedTaxYear ? 'text-gray-900' : 'text-gray-500'
              )}>
                {selectedTaxYear ? selectedTaxYear.name : 'Select tax year'}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            
            {openDropdown === 'taxYears' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                {taxYearsOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      updateFormData({ taxYears: option.id })
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    {option.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => updateFormData({ amount: e.target.value })}
            className="form-input"
            placeholder="0"
          />
        </motion.div>

        {/* Initial Adviser Fee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Adviser Fee
          </label>
          <div className="flex items-center space-x-2">
            <select
              value="%"
              className="w-20 px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
            >
              <option value="%">%</option>
              <option value="£">£</option>
            </select>
            <input
              type="number"
              value={formData.adviserFee}
              onChange={(e) => updateFormData({ adviserFee: e.target.value })}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </motion.div>

        {/* Bank Account Section */}
        {showBankSection && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-blue-50 p-4 rounded-lg border border-blue-200"
            >
              <div className="flex items-start space-x-2">
                <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Manage Your Bank Account Details:</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    No bank details found for this account and product combination. Please select from the options below.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a bank account
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'bank' ? null : 'bank')}
                  className="form-select flex items-center justify-between"
                >
                  <span className={clsx(
                    selectedBankAccount ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {selectedBankAccount ? selectedBankAccount.name : 'No Bank Account'}
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
                
                {openDropdown === 'bank' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
                  >
                    {bankAccounts.map((account) => (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => {
                          updateFormData({ bankAccount: account.id })
                          setOpenDropdown(null)
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                      >
                        {account.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Suitability and Appropriateness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-gray-900">Please confirm one of the below:</h4>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.suitability}
                    onChange={(e) => updateFormData({ 
                      suitability: e.target.checked,
                      appropriateness: false 
                    })}
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">1. Suitability (For Advised applications only):</p>
                    <p className="text-sm text-gray-600 mt-1">
                      I have provided a copy of this Plan's brochure and Key Information Document (KID) and disclosed
                      the associated risks of this Investment and that I have conducted the required suitability
                      assessment and that I consider this product to be suitable for my client.
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.appropriateness}
                    onChange={(e) => updateFormData({ 
                      appropriateness: e.target.checked,
                      suitability: false 
                    })}
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">2. Appropriateness (For Execution Only applications):</p>
                    <p className="text-sm text-gray-600 mt-1">
                      I have provided a copy of this Plan's brochure and Key Information Document (KID) and confirmed
                      the appropriateness of this investment and that I consider this product to be appropriate for my
                      client.
                    </p>
                  </div>
                </label>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-between pt-8 border-t border-gray-200"
      >
        {onPrev ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPrev}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>
        ) : (
          <div />
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="btn-primary flex items-center space-x-2"
        >
          <span>Continue</span>
          <ArrowRightIcon className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  )
}
