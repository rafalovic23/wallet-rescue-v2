'use client'

import { useAuth } from '@/hooks/useAuth'

export const Hero = () => {
  const { login } = useAuth()

  return (
    <section className="relative pt-32 pb-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge animé */}
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary-light">
              🚀 Secure Recovery Solution
            </span>
          </div>
          
          {/* Titre principal */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white animate-slide-up">
            Never Lose Access to Your
            <span className="text-primary-light"> Web3 Wallet</span>
          </h1>
          
          {/* Description */}
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Set up your social recovery system with trusted friends and never worry about losing your wallet access again.
          </p>
          
          {/* Bouton d'action principal */}
          <div className="mt-8 flex justify-center gap-4 animate-slide-up">
            <button 
              className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
              onClick={login}
            >
              Get Started
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
            {[
              { value: '10K+', label: 'Users Protected' },
              { value: '99.9%', label: 'Recovery Rate' },
              { value: '$0', label: 'Gas Fees on Polygon' },
            ].map((stat) => (
              <div key={stat.label} className="animate-fade-in">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-base text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}