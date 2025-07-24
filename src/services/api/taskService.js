import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(200)
    return [...tasks].sort((a, b) => a.order - b.order)
  },

  async getById(id) {
    await delay(150)
    const task = tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  },

async create(taskData) {
    await delay(300)
    
    if (taskData.isRecurring && taskData.recurringData) {
      return this.createRecurringTasks(taskData)
    }
    
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || "medium",
      category: taskData.category || "Personal",
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      order: Math.max(...tasks.map(t => t.order), 0) + 1,
      isRecurring: taskData.isRecurring || false,
      recurringData: taskData.recurringData || null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  createRecurringTasks(taskData) {
    const { recurringData } = taskData
    const createdTasks = []
    const startDate = new Date(recurringData.startDate)
    const endDate = recurringData.endDate ? new Date(recurringData.endDate) : null
    const currentDate = new Date(startDate)
    
    // Limit to prevent infinite loops - max 365 tasks
    let taskCount = 0
    const maxTasks = endDate ? 365 : 30 // Default to 30 tasks if no end date
    
    while (taskCount < maxTasks && (!endDate || currentDate <= endDate)) {
      const shouldCreateTask = this.shouldCreateTaskOnDate(currentDate, recurringData, taskCount)
      
      if (shouldCreateTask) {
        const newTask = {
          Id: Math.max(...tasks.map(t => t.Id), ...createdTasks.map(t => t.Id), 0) + 1,
          title: taskData.title,
          completed: false,
          priority: taskData.priority || "medium",
          category: taskData.category || "Personal",
          dueDate: currentDate.toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          order: Math.max(...tasks.map(t => t.order), 0) + createdTasks.length + 1,
          isRecurring: true,
          recurringData: recurringData,
          recurringParent: taskCount === 0 ? null : createdTasks[0].Id
        }
        createdTasks.push(newTask)
        tasks.push(newTask)
        taskCount++
      }
      
      // Advance date based on pattern
      this.advanceDate(currentDate, recurringData)
      
      // Safety check to prevent infinite loops
      if (taskCount === 0 && createdTasks.length === 0) {
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }
    
    return { tasks: createdTasks }
  },

  shouldCreateTaskOnDate(date, recurringData, iteration) {
    const { pattern, selectedDays, frequency } = recurringData
    
    switch (pattern) {
      case "daily":
        return iteration % frequency === 0
      case "weekly":
        if (selectedDays.length === 0) return false
        const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        const dayName = dayNames[date.getDay()]
        return selectedDays.includes(dayName) && Math.floor(iteration / 7) % frequency === 0
      case "monthly":
        return date.getDate() === new Date(recurringData.startDate).getDate() && iteration % frequency === 0
      case "custom":
        return iteration % recurringData.customInterval === 0
      default:
        return false
    }
  },

  advanceDate(date, recurringData) {
    const { pattern, frequency, customInterval, customUnit } = recurringData
    
    switch (pattern) {
      case "daily":
        date.setDate(date.getDate() + 1)
        break
      case "weekly":
        date.setDate(date.getDate() + 1)
        break
      case "monthly":
        date.setMonth(date.getMonth() + 1)
        break
      case "custom":
        switch (customUnit) {
          case "days":
            date.setDate(date.getDate() + 1)
            break
          case "weeks":
            date.setDate(date.getDate() + 7)
            break
          case "months":
            date.setMonth(date.getMonth() + 1)
            break
          case "years":
            date.setFullYear(date.getFullYear() + 1)
            break
        }
        break
    }
  },

  async update(id, updates) {
    await delay(250)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return null
    
    tasks[index] = { ...tasks[index], ...updates }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return false
    
    tasks.splice(index, 1)
    return true
  },

  async bulkDelete(ids) {
    await delay(300)
    const deletedTasks = []
    ids.forEach(id => {
      const index = tasks.findIndex(t => t.Id === parseInt(id))
      if (index !== -1) {
        deletedTasks.push(tasks[index])
        tasks.splice(index, 1)
      }
    })
    return deletedTasks
  },

  async reorder(taskId, newOrder) {
    await delay(200)
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(taskId))
    if (taskIndex === -1) return false
    
    tasks[taskIndex].order = newOrder
    return true
  },

  async getByCategory(categoryName) {
    await delay(200)
    return [...tasks]
      .filter(t => t.category.toLowerCase() === categoryName.toLowerCase())
      .sort((a, b) => a.order - b.order)
  },

  async search(query) {
    await delay(150)
    const searchTerm = query.toLowerCase().trim()
    if (!searchTerm) return [...tasks].sort((a, b) => a.order - b.order)
    
    return [...tasks]
      .filter(t => 
        t.title.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => a.order - b.order)
  }
}