import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import CategoryFilter from "@/components/molecules/CategoryFilter"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { categoryService } from "@/services/api/categoryService"
import { taskService } from "@/services/api/taskService"

const Sidebar = ({ onClose }) => {
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ])
      
      setCategories(categoriesData)
      
      // Calculate task counts by category
      const counts = {}
      tasksData.forEach(task => {
        if (!task.completed) {
          counts[task.category] = (counts[task.category] || 0) + 1
        }
      })
      setTaskCounts(counts)
    } catch (err) {
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
              <p className="text-xs text-gray-500">Stay organized</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <ApperIcon name="X" size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Categories
            </h2>
            {loading ? (
              <Loading type="categories" />
            ) : error ? (
              <Error 
                type="categories" 
                message={error}
                onRetry={loadData}
              />
            ) : (
              <CategoryFilter 
                categories={categories} 
                taskCounts={taskCounts}
              />
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h2>
            <div className="space-y-1">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left">
                <ApperIcon name="Calendar" size={16} />
                Today's Tasks
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left">
                <ApperIcon name="Clock" size={16} />
                Upcoming
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left">
                <ApperIcon name="CheckCircle" size={16} />
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <ApperIcon name="Target" size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Stay Focused</p>
              <p className="text-xs text-gray-600">Complete your daily goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar