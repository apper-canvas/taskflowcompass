import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [query, setQuery] = useState("")
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const q = searchParams.get("q") || ""
    setQuery(q)
    if (onSearch) {
      onSearch(q)
    }
  }, [searchParams, onSearch])

  const handleSearch = (value) => {
    setQuery(value)
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`)
    } else {
      navigate("/")
    }
  }

  const clearSearch = () => {
    setQuery("")
    navigate("/")
  }

  return (
    <div className="relative">
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-10 bg-white shadow-sm border-gray-200 focus:border-primary focus:shadow-md transition-all duration-200"
        />
        {query && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default SearchBar