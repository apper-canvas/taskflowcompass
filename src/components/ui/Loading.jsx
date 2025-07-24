import React from "react"
import { motion } from "framer-motion"

const Loading = ({ type = "tasks" }) => {
  const renderTaskSkeleton = () => (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="flex gap-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCategorySkeleton = () => (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg"
        >
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          </div>
          <div className="w-6 h-4 bg-gray-200 rounded animate-pulse" />
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="w-full">
      {type === "tasks" && renderTaskSkeleton()}
      {type === "categories" && renderCategorySkeleton()}
      {type === "search" && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="mt-2 text-gray-500 text-sm">Searching tasks...</p>
        </div>
      )}
    </div>
  )
}

export default Loading