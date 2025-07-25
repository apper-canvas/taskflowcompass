import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import TaskCard from "@/components/molecules/TaskCard"
import QuickAddBar from "@/components/molecules/QuickAddBar"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedTasks, setSelectedTasks] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)
  
  const { categoryName } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      let tasksData
      if (searchQuery) {
        tasksData = await taskService.search(searchQuery)
      } else if (categoryName) {
        tasksData = await taskService.getByCategory(categoryName)
      } else {
        tasksData = await taskService.getAll()
      }
      
      const categoriesData = await categoryService.getAll()
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [categoryName, searchQuery])

  const handleAddTask = async (taskData) => {
try {
      const result = await taskService.create(taskData)
      if (result.tasks) {
        // Multiple tasks created from recurring pattern
        setTasks(prev => [...result.tasks, ...prev])
        toast.success(`${result.tasks.length} recurring tasks created!`)
      } else {
        // Single task created
        setTasks(prev => [result, ...prev])
        toast.success("Task added successfully!")
      }
    } catch (err) {
      toast.error("Failed to add task")
      throw err
    }
  }

const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId)
    if (!task) return

    try {
      const updatedTask = await taskService.update(taskId, {
        completed_c: !task.completed_c
      })
      
      setTasks(prev => 
        prev.map(t => t.Id === taskId ? updatedTask : t)
      )
      
      toast.success(
        updatedTask.completed_c ? "Task completed! 🎉" : "Task marked as incomplete"
      )
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleEditTask = (taskId) => {
    // For now, just show a toast - full edit modal would be implemented here
    toast.info("Edit functionality coming soon!")
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return
    
    if (!window.confirm(`Delete ${selectedTasks.length} selected tasks?`)) {
      return
    }

    try {
      await taskService.bulkDelete(selectedTasks)
      setTasks(prev => prev.filter(t => !selectedTasks.includes(t.Id)))
      setSelectedTasks([])
      toast.success(`${selectedTasks.length} tasks deleted`)
    } catch (err) {
      toast.error("Failed to delete tasks")
    }
  }

const filteredTasks = tasks.filter(task => 
    showCompleted ? task.completed_c : !task.completed_c
  )

  const completedTasks = tasks.filter(task => task.completed_c)
  const activeTasks = tasks.filter(task => !task.completed_c)

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`
    if (categoryName) return categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    return "All Tasks"
  }

  const getEmptyType = () => {
    if (searchQuery) return "search"
    if (categoryName) return "category"
    return "tasks"
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
            <div className="h-16 bg-gray-200 rounded mb-4 animate-pulse" />
          </div>
          <Loading type="tasks" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Error 
            type="tasks" 
            message={error}
            onRetry={loadData}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTasks.length} active, {completedTasks.length} completed
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SearchBar onSearch={() => {}} />
              {selectedTasks.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="inline-flex items-center gap-2"
                >
                  <ApperIcon name="Trash2" size={14} />
                  Delete ({selectedTasks.length})
                </Button>
              )}
            </div>
          </div>

          {/* Quick Add */}
          {!searchQuery && (
            <QuickAddBar 
              onAdd={handleAddTask}
              categories={categories}
            />
          )}
        </div>

        {/* Task Controls */}
        {(activeTasks.length > 0 || completedTasks.length > 0) && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCompleted(false)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                  !showCompleted 
                    ? "bg-primary text-white" 
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Active ({activeTasks.length})
              </button>
              <button
                onClick={() => setShowCompleted(true)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                  showCompleted 
                    ? "bg-primary text-white" 
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Completed ({completedTasks.length})
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <Empty
                type={getEmptyType()}
                searchQuery={searchQuery}
                onAction={() => {
                  if (searchQuery) {
                    window.location.href = "/"
                  }
                }}
                actionLabel={searchQuery ? "Clear Search" : "Add First Task"}
              />
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={() => handleToggleComplete(task.Id)}
                    onEdit={() => handleEditTask(task.Id)}
                    onDelete={() => handleDeleteTask(task.Id)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default TaskList