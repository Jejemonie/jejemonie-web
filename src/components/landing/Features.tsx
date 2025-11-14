import { TrendingUp, BarChart3, Bell, Link, RefreshCw, Shield } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations and insights based on your spending patterns and financial goals.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Visualize your financial health with intuitive charts and detailed breakdowns of your spending habits.',
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'Smart Alerts',
      description: 'Receive timely notifications about unusual transactions, upcoming bills, and budget milestones.',
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: 'Seamless Integrations',
      description: 'Connect with your bank accounts, credit cards, and other financial services for a unified view.',
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: 'Automated Categorization',
      description: 'Our AI automatically categorizes your transactions, saving you time and ensuring accuracy.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Bank-Level Security',
      description: 'Rest easy knowing your financial data is protected with enterprise-grade encryption and security.',
    },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powered by Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-driven platform transforms how you track, analyze, and
            optimize your budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}