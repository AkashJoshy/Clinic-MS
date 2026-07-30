import React, { useEffect, useState } from 'react'


const useLocationStorage = (key: string, initialValue: any) => {
  
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key)
            if (!storedValue || storedValue === "undefined") return initialValue
            
            return JSON.parse(storedValue)
        } catch (error) {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocationStorage