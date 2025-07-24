import React from "react"
import { motion } from "framer-motion"
import { NavLink, useParams } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const CategoryFilter = ({ categories = [], taskCounts = {} }) => {
  const { categoryName } = useParams()

  const getCategoryCount = (categoryName) => {
    return taskCounts[categoryName] || 0
  }

  const allTasksCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-1">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive && !categoryName
              ? "bg-primary text-white shadow-sm"
              : "text-gray-700 hover:text-primary hover:bg-primary/5"
          }`
        }
      >
        <ApperIcon name="List" size={16} />
        <span className="flex-1">All Tasks</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {allTasksCount}
        </span>
      </NavLink>

      {categories.map((category) => (
        <NavLink
          key={category.Id}
          to={`/category/${category.name.toLowerCase()}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-gray-700 hover:text-primary hover:bg-primary/5"
            }`
          }
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: category.color }}
          />
          <span className="flex-1">{category.name}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {getCategoryCount(category.name)}
          </span>
        </NavLink>
      ))}
    </div>
  )
}

export default CategoryFilter