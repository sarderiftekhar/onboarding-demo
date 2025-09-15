'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import CountUp from 'react-countup'
import { 
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface EnhancedWelcomePageProps {
  onGetStarted: () => void
}

const features = [
  {
    icon: ChartBarIcon,
    title: "Structured Products",
    description: "Tailored investments with defined returns over specific periods",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheckIcon,
    title: "Regulatory Compliance",
    description: "FCA regulated with adherence to highest industry standards",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: UserGroupIcon,
    title: "Institutional Grade",
    description: "Serving both individual and institutional investors",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: SparklesIcon,
    title: "Bespoke Solutions",
    description: "Custom investment strategies aligned with your objectives",
    color: "from-orange-500 to-red-500"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wealth Manager",
    avatar: "SJ",
    quote: "Hilbert's structured products offer the perfect balance of capital protection and growth potential.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Investment Advisor", 
    avatar: "MC",
    quote: "Their transparency and client education approach sets Hilbert apart in structured products.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Institutional Investor",
    avatar: "EW", 
    quote: "Exceptional bespoke solutions tailored to our specific investment objectives.",
    rating: 5
  }
]

const stats = [
  { value: 12000, label: "Clients Served", suffix: "+" },
  { value: 150, label: "Structured Products", suffix: "+" },
  { value: 95, label: "Capital Protection", suffix: "%" },
  { value: 15, label: "Years Experience", suffix: "+" }
]

export default function EnhancedWelcomePage({ onGetStarted }: EnhancedWelcomePageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  // Spring animations
  const heroSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0px)' : 'translateY(50px)',
    config: config.gentle,
    delay: 200,
  })

  const statsSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
    config: config.wobbly,
    delay: 800,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 0.8, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HILBERT</h1>
                <p className="text-sm text-gray-600">Financial Solutions</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center space-x-6"
            >
              <div className="flex -space-x-2">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-lg"
                  >
                    {testimonial.avatar}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Trusted by</span>
                <span className="font-semibold text-gray-900"> 12,000+ investors</span>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Interactive Demo */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="relative lg:order-1"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border">
                  {/* Demo Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Onboarding Progress</span>
                      <span className="text-sm font-bold text-primary-600">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className="h-3 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "67%" }}
                        transition={{ delay: 1.2, duration: 2 }}
                      />
                    </div>
                  </div>

                  {/* Demo Question */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      What type of client are you?
                    </h3>
                    
                    <div className="space-y-3">
                      {['Individual Investor', 'Corporate Client', 'Institutional Investor'].map((option, index) => (
                        <motion.div
                          key={option}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 + index * 0.2 }}
                          className={clsx(
                            'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                            index === 1 
                              ? 'border-primary-500 bg-primary-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{option}</span>
                            {index === 1 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 2, type: "spring" }}
                                className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2 }}
                      className="w-full mt-4 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Start your journey →
                    </motion.button>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Text Content */}
              <animated.div style={heroSpring} className="space-y-8 lg:order-2">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  FCA Regulated • Structured Products Specialist
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Structured
                    <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Products</span>
                    <br />
                    <span style={{ color: '#0066FF' }}>Simplified</span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                    Access bespoke investment solutions with{' '}
                    <span className="font-semibold text-primary-600">defined returns</span>.
                    Join institutional and individual investors who trust Hilbert's transparency and expertise.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGetStarted}
                    className="group px-8 py-6 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <span>Start Your Journey</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRightIcon className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap items-center gap-4 pt-4"
                >
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 font-medium">FCA Authorized</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 font-medium">Client Asset Protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 font-medium">Structured Products Specialist</span>
                  </div>
                </motion.div>
              </animated.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <animated.section style={statsSpring} className="px-6 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.prefix}
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={1.5}
                      decimals={stat.decimals || 0}
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </animated.section>

        {/* Features Grid */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0066FF' }}>
                Why Choose Hilbert Investment Solutions?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience transparency, expertise, and regulatory excellence in structured product investments
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
