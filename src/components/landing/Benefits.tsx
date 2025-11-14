import { CheckCircle } from 'lucide-react'

export function Benefits() {
  const benefitGroups = [
    {
      title: 'For Individuals',
      benefits: [
        'Track personal spending and income effortlessly',
        'Receive personalized savings recommendations',
        'Set and achieve financial goals with AI guidance',
        'Identify areas to reduce unnecessary expenses',
        'Plan for major life events and purchases',
      ],
    },
    {
      title: 'For Families',
      benefits: [
        'Coordinate finances across multiple family members',
        'Create shared savings goals and track progress',
        'Manage household expenses with custom categories',
        'Plan for education, vacations, and other family needs',
        'Keep everyone accountable with shared insights',
      ],
    },
    {
      title: 'For Businesses',
      benefits: [
        'Track business expenses and revenue streams',
        'Forecast cash flow with AI-powered predictions',
        'Categorize tax-deductible expenses automatically',
        'Generate financial reports with a single click',
        'Manage team spending with custom permissions',
      ],
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Benefits for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an individual, a family, or a business, our platform
            adapts to your unique financial needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitGroups.map((group, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}