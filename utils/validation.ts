export interface FormData {
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

export interface ValidationError {
  field: string
  message: string
}

export function validateUserDetails(data: Partial<FormData>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.client) {
    errors.push({ field: 'client', message: 'Please select a client' })
  }

  if (!data.account) {
    errors.push({ field: 'account', message: 'Please select an account' })
  }

  if (!data.product) {
    errors.push({ field: 'product', message: 'Please choose a product' })
  }

  if (data.amount && parseFloat(data.amount) <= 0) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' })
  }

  if (data.adviserFee && (parseFloat(data.adviserFee) < 0 || parseFloat(data.adviserFee) > 100)) {
    errors.push({ field: 'adviserFee', message: 'Adviser fee must be between 0 and 100%' })
  }

  return errors
}

export function validateBankDetails(data: Partial<FormData>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.bankAccount) {
    errors.push({ field: 'bankAccount', message: 'Please select a bank account' })
  }

  if (!data.suitability && !data.appropriateness) {
    errors.push({ 
      field: 'compliance', 
      message: 'Please confirm either suitability or appropriateness' 
    })
  }

  return errors
}

export function formatCurrency(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '£0.00'
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(num)
}

export function formatPercentage(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0%'
  
  return `${num.toFixed(2)}%`
}
