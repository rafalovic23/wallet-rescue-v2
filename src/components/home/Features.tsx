'use client'

const features = [
  {
    title: 'Social Recovery System',
    description: 'Choose trusted friends or family members as guardians who can help you recover your wallet access in case of emergency.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Secure Multi-Sig Recovery',
    description: 'Recovery requires validation from multiple guardians, ensuring maximum security while maintaining ease of use.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Zero Gas Fees',
    description: 'Built on Polygon Network for lightning-fast transactions and minimal costs. No more expensive recovery processes.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Why Choose Wallet Rescue
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Simple, secure, and social wallet recovery system designed for Web3 users.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative p-6 bg-secondary rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg text-primary-light group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border border-primary/0 rounded-xl group-hover:border-primary/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}