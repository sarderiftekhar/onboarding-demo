'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import CountUp from 'react-countup'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface LeftPanelContent {
  step: number
  title: string
  subtitle: string
  description: string
  stats?: { value: number; label: string; prefix?: string; suffix?: string }[]
  features?: string[]
  gradient: string
  icon: React.ComponentType<any>
}

interface SplitScreenLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  progress: number
}

const stepContent: LeftPanelContent[] = [
  {
    step: 0,
    title: "Welcome to Hilbert",
    subtitle: "Exceptional Investment Solutions",
    description: "Leading provider of structured products and innovative investment solutions. Join thousands of satisfied clients who trust us with their financial future and wealth management needs.",
    stats: [
      { value: 12000, label: "Happy Clients", suffix: "+" },
      { value: 98.0, label: "Success Rate", suffix: "%" },
      { value: 15, label: "Years Experience", suffix: "+" }
    ],
    features: ["FCA Regulated", "Institutional Grade Security", "Dedicated Relationship Managers"],
    gradient: "from-purple-600 via-blue-600 to-indigo-600",
    icon: SparklesIcon
  },
  {
    step: 1,
    title: "Client Profiling",
    subtitle: "Tailored Investment Approach",
    description: "We customize our investment solutions based on your profile, whether you're an individual investor or corporate client seeking structured products and portfolio diversification.",
    stats: [
      { value: 150, label: "Structured Products", suffix: "+" },
      { value: 10, label: "Avg Setup Time", suffix: " min" }
    ],
    features: ["Risk Assessment", "Suitability Analysis", "Regulatory Compliance"],
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    icon: UserGroupIcon
  },
  {
    step: 2,
    title: "Secure Account Setup",
    subtitle: "FCA Regulated Platform",
    description: "Your investments are protected by industry-leading security measures and regulatory compliance. We maintain the highest standards for client asset protection and data security.",
    stats: [
      { value: 256, label: "Bit Encryption", suffix: "-bit" },
      { value: 99.9, label: "Platform Uptime", suffix: "%" }
    ],
    features: ["FCA Authorized", "Client Asset Protection", "Secure Trading Platform"],
    gradient: "from-orange-500 via-red-500 to-pink-600",
    icon: ShieldCheckIcon
  },
  {
    step: 3,
    title: "Structured Products",
    subtitle: "Capital Protection & Growth",
    description: "Access our comprehensive range of structured products, including capital-protected investments, autocalls, and multi-asset solutions designed for sophisticated investors.",
    stats: [
      { value: 200, label: "Investment Products", suffix: "+" },
      { value: 95, label: "Capital Protection", suffix: "%" }
    ],
    features: ["Autocall Products", "Multi-Asset Solutions", "Capital Protection"],
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    icon: ChartBarIcon
  },
  {
    step: 4,
    title: "Investment Amount",
    subtitle: "Capital Allocation",
    description: "Determine your investment amount and ensure it aligns with your financial objectives and risk tolerance. Our platform supports flexible investment sizes.",
    stats: [
      { value: 1000, label: "Minimum Investment", suffix: "£" },
      { value: 24, label: "Settlement Time", suffix: " hrs" }
    ],
    features: ["Flexible Amounts", "Instant Calculations", "Risk Monitoring"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    icon: ChartBarIcon
  },
  {
    step: 5,
    title: "Product Selection",
    subtitle: "Investment Categories",
    description: "Choose from our range of structured products, investment funds, and fixed income solutions. Each category is designed to meet different investment objectives.",
    stats: [
      { value: 85, label: "Product Categories", suffix: "+" },
      { value: 12.5, label: "Avg Performance", suffix: "%" }
    ],
    features: ["Structured Products", "Diversified Funds", "Fixed Income"],
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    icon: SparklesIcon
  },
  {
    step: 6,
    title: "Specific Products",
    subtitle: "Tailored Recommendations",
    description: "Based on your profile and preferences, we've selected products that match your investment criteria. Review our recommendations and make your choice.",
    stats: [
      { value: 6.5, label: "Potential Return", suffix: "%" },
      { value: 95, label: "Capital Protection", suffix: "%" }
    ],
    features: ["Expert Curation", "Risk Matched", "Performance History"],
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    icon: ChartBarIcon
  },
  {
    step: 7,
    title: "Tax Efficiency",
    subtitle: "ISA & Tax Wrappers",
    description: "Maximize your returns with tax-efficient investing through ISA allowances and other tax wrappers available to UK investors.",
    stats: [
      { value: 20000, label: "ISA Allowance", suffix: "£" },
      { value: 40, label: "Tax Savings", suffix: "%" }
    ],
    features: ["ISA Optimization", "Tax Planning", "Allowance Tracking"],
    gradient: "from-amber-500 via-orange-500 to-red-600",
    icon: ShieldCheckIcon
  },
  {
    step: 8,
    title: "Fee Structure",
    subtitle: "Transparent Pricing",
    description: "Set your adviser fee and review all costs associated with your investment. We believe in complete transparency with no hidden fees.",
    stats: [
      { value: 1.5, label: "Standard Fee", suffix: "%" },
      { value: 0, label: "Hidden Costs", suffix: "" }
    ],
    features: ["Transparent Fees", "Flexible Pricing", "No Hidden Costs"],
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    icon: CheckCircleIcon
  },
  {
    step: 9,
    title: "Final Confirmation",
    subtitle: "Investment Ready",
    description: "Review all your selections and confirm your suitability assessment. You're almost ready to begin your investment journey with Hilbert.",
    stats: [
      { value: 2, label: "Business Days", suffix: " days" },
      { value: 100, label: "Setup Complete", suffix: "%" }
    ],
    features: ["Final Review", "Suitability Confirmed", "Investment Ready"],
    gradient: "from-emerald-500 via-green-500 to-lime-600",
    icon: CheckCircleIcon
  }
]

export default function SplitScreenLayout({ children, currentStep, totalSteps, progress }: SplitScreenLayoutProps) {
  // Ensure we always have valid content, defaulting to step 0
  const content = stepContent[currentStep >= 0 ? currentStep : 0] || stepContent[0]
  const Icon = content.icon

  // Animated progress ring
  const progressSpring = useSpring({
    progress: progress,
    config: config.slow,
  })


  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Panel - Company Branding */}
      <motion.div
        className="w-1/3 relative overflow-hidden"
        initial={false}
        animate={{ 
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${content.gradient}`}
        >

          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/images/logo_hilbert_blanc.png" 
                  alt="Hilbert Logo" 
                  className="object-contain"
                  style={{ width: '15em' }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center space-y-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Text Content */}
                <div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold mb-2"
                  >
                    {content.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-white/90 mb-4"
                  >
                    {content.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/80 text-lg leading-relaxed"
                  >
                    {content.description}
                  </motion.p>
                </div>

                {/* Stats */}
                {content.stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {content.stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-white">
                          {stat.prefix}
                          <CountUp
                            end={stat.value}
                            duration={2}
                            delay={1}
                            decimals={stat.label.includes('Rate') || stat.label.includes('Return') ? 1 : 0}
                          />
                          {stat.suffix}
                        </div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Features */}
                {content.features && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-3"
                  >
                    {content.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-300" />
                        <span className="text-white/90">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
            </div>

            {/* Progress Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="4"
                    />
                    <animated.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset={progressSpring.progress.to(p => 251.2 - (p / 100) * 251.2)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <animated.span className="text-2xl font-bold text-white">
                      {progressSpring.progress.to(p => `${Math.round(p)}%`)}
                    </animated.span>
                  </div>
                </div>
              </div>
              <p className="text-center text-white/80 mt-4 text-sm">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Content */}
      <div className="flex-1 bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <motion.div
          className="relative h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
