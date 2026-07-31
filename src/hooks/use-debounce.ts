import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, and performance optimization
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timer if value changes before delay completes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for debouncing search queries
 * Automatically handles common search patterns
 */
export function useSearchDebounce(query: string, delay: number = 450) {
  const debouncedQuery = useDebounce(query, delay)

  return {
    query: debouncedQuery,
    isDebouncing: query !== debouncedQuery,
  }
}

/**
 * Hook for debouncing API calls
 * Prevents excessive API requests while user is typing
 */
export function useDebounceCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>()

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const newTimer = setTimeout(() => {
      callback(...args)
    }, delay)

    setDebounceTimer(newTimer)
  }) as T

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return debouncedCallback
}
