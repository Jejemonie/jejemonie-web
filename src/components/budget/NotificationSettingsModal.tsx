import { useState } from 'react'
import { X, Bell } from 'lucide-react'
import { Budget } from './BudgetCard'

interface NotificationSettingsModalProps {
  budget: Budget
  onClose: () => void
  onSave: (
    budgetId: string,
    notifications: {
      enabled: boolean
      threshold: number
    }
  ) => void
}

export function NotificationSettingsModal({
  budget,
  onClose,
  onSave,
}: NotificationSettingsModalProps) {
  const [enabled, setEnabled] = useState(budget.notifications.enabled)
  const [threshold, setThreshold] = useState(budget.notifications.threshold.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const thresholdValue = parseFloat(threshold)
    if (thresholdValue < 0 || thresholdValue > 100) {
      alert('Threshold must be between 0 and 100')
      return
    }
    onSave(budget.id, {
      enabled,
      threshold: thresholdValue,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Notification Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Enable Notifications
                </p>
                <p className="text-xs text-gray-600">
                  Get alerted when budget limits are reached
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          {enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-lg font-semibold text-orange-600 w-16 text-right">
                  {threshold}%
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                You will be notified when spending reaches {threshold}% of your
                budget in any category
              </p>
            </div>
          )}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}