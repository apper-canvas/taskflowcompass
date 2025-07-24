import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <motion.button
      type="button"
      className={cn(
        "flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 focus-ring",
        checked 
          ? "bg-primary border-primary text-white" 
          : "bg-white border-gray-300 hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && onChange && onChange(!checked)}
      disabled={disabled}
      ref={ref}
      whileScale={checked ? 1.1 : 1}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ApperIcon name="Check" size={12} />
        </motion.div>
      )}
    </motion.button>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox