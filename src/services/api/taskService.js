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
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || "medium",
      category: taskData.category || "Personal",
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      order: Math.max(...tasks.map(t => t.order), 0) + 1
    }
    tasks.push(newTask)
    return { ...newTask }
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