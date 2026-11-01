import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const AnimateNumber = ({ value, length }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true }) // animate only once

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1000
    const increment = value / (duration / 10)

    const interval = setInterval(() => {
      start += increment
      if (start >= value) {
        start = value
        clearInterval(interval)
      }
      setCount(Math.floor(start))
    }, 10)

    return () => clearInterval(interval)
  }, [isInView, value])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: -10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay:length*1 }}
    >
      {count}
    </motion.span>
  )
}

export default AnimateNumber
