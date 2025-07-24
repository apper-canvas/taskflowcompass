import React, { useState } from "react"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isDragging = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return { variant: "high", icon: "AlertCircle", color: "#ef4444" }
      case "medium":
        return { variant: "medium", icon: "Clock", color: "#f59e0b" }
      case "low":
        return { variant: "low", icon: "Minus", color: "#10b981" }
      default:
        return { variant: "default", icon: "Minus", color: "#6b7280" }
    }
  }

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    if (isPast(date) && !isToday(date)) {
      return { status: "overdue", color: "#ef4444", icon: "AlertTriangle" }
    }
    if (isToday(date)) {
      return { status: "today", color: "#f59e0b", icon: "Calendar" }
    }
    if (isTomorrow(date)) {
      return { status: "tomorrow", color: "#3b82f6", icon: "Calendar" }
    }
    return { status: "future", color: "#6b7280", icon: "Calendar" }
  }

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    if (isPast(date) && !isToday(date)) return "Overdue"
    return format(date, "MMM d")
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const dueDateStatus = getDueDateStatus(task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? "task-drag" : ""
      } ${task.completed ? "opacity-75" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={onToggleComplete}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 
              className={`font-medium text-gray-900 ${
                task.completed ? "line-through text-gray-500" : ""
              } cursor-pointer hover:text-primary transition-colors`}
              onClick={onEdit}
            >
              {task.title}
            </h3>
            
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                <button
                  onClick={onEdit}
                  className="p-1 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <ApperIcon name="Edit2" size={14} />
                </button>
                <button
                  onClick={onDelete}
                  className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <ApperIcon name="Trash2" size={14} />
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={priorityConfig.variant}
              size="sm"
              className="inline-flex items-center gap-1"
            >
              <ApperIcon name={priorityConfig.icon} size={10} />
              {task.priority}
            </Badge>

            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: priorityConfig.color }}
            />

            <span className="text-xs text-gray-600 font-medium">
              {task.category}
            </span>

            {task.dueDate && (
              <div className="inline-flex items-center gap-1 text-xs">
                <ApperIcon 
                  name={dueDateStatus?.icon || "Calendar"} 
                  size={12} 
                  style={{ color: dueDateStatus?.color }}
                />
                <span 
                  className={`font-medium ${
                    dueDateStatus?.status === "overdue" ? "text-red-600" :
                    dueDateStatus?.status === "today" ? "text-orange-600" :
                    "text-gray-600"
                  }`}
                >
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard