import categoriesData from "@/services/mockData/categories.json"

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(150)
    return [...categories]
  },

  async getById(id) {
    await delay(100)
    const category = categories.find(c => c.Id === parseInt(id))
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await delay(200)
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || "#5B67F5",
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(200)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) return null
    
    categories[index] = { ...categories[index], ...updates }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(200)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) return false
    
    categories.splice(index, 1)
    return true
  },

  async updateTaskCount(categoryName, count) {
    await delay(100)
    const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())
    if (category) {
      category.taskCount = count
      return { ...category }
    }
    return null
  }
}