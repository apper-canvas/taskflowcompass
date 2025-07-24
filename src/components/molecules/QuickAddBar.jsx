import React, { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"

const QuickAddBar = ({ onAdd, categories = [] }) => {
  const [title, setTitle] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState(categories[0]?.name || "Personal")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await onAdd({
        title: title.trim(),
        priority,
        category
      })
      setTitle("")
      setIsExpanded(false)
      toast.success("Task added successfully!")
    } catch (error) {
      toast.error("Failed to add task")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    if (e.key === "Escape") {
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <ApperIcon 
              name="Plus" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-10 border-0 focus:ring-1 focus:ring-primary/30 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 border-t border-gray-100 pt-4"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
                >
                  {categories.map((cat) => (
                    <option key={cat.Id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!title.trim()}
                className="px-4"
              >
                <ApperIcon name="Plus" size={14} className="mr-1" />
                Add Task
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default QuickAddBar