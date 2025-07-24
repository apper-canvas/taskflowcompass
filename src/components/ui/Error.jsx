import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = "general"
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case "tasks":
        return {
          icon: "ListX",
          title: "Unable to load tasks",
          description: "We couldn't fetch your tasks right now. Please try again."
        }
      case "categories":
        return {
          icon: "FolderX",
          title: "Unable to load categories",
          description: "We couldn't load your task categories. Please try again."
        }
      case "search":
        return {
          icon: "SearchX",
          title: "Search failed",
          description: "We couldn't search your tasks right now. Please try again."
        }
      default:
        return {
          icon: "AlertCircle",
          title: "Something went wrong",
          description: message
        }
    }
  }

  const { icon, title, description } = getErrorConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="inline-flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error