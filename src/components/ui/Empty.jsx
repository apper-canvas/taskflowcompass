import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  type = "tasks", 
  onAction,
  actionLabel = "Add First Task",
  searchQuery = ""
}) => {
  const getEmptyConfig = () => {
    if (searchQuery) {
      return {
        icon: "Search",
        title: "No tasks found",
        description: `No tasks match "${searchQuery}". Try a different search term or create a new task.`,
        actionLabel: "Clear Search"
      }
    }

    switch (type) {
      case "tasks":
        return {
          icon: "CheckSquare",
          title: "No tasks yet",
          description: "Start organizing your day by creating your first task. You've got this!",
          actionLabel: "Create First Task"
        }
      case "completed":
        return {
          icon: "Trophy",
          title: "No completed tasks",
          description: "Tasks you complete will appear here. Start checking off some tasks!",
          actionLabel: "View All Tasks"
        }
      case "category":
        return {
          icon: "Folder",
          title: "No tasks in this category",
          description: "This category is empty. Add some tasks to get organized!",
          actionLabel: "Add Task"
        }
      default:
        return {
          icon: "Plus",
          title: "Nothing here yet",
          description: "Get started by adding some content.",
          actionLabel: "Get Started"
        }
    }
  }

  const { icon, title, description } = getEmptyConfig()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={40} className="text-primary" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Plus" size={16} />
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Empty