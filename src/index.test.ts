import { describe, it, expect } from 'vitest'
import { sum, multiply } from './index'

describe('Utility Functions', () => {
  describe('sum', () => {
    it('should add two positive numbers correctly', () => {
      expect(sum(2, 3)).toBe(5)
      expect(sum(10, 15)).toBe(25)
    })

    it('should handle negative numbers', () => {
      expect(sum(-1, -2)).toBe(-3)
      expect(sum(-5, 10)).toBe(5)
    })

    it('should handle zero', () => {
      expect(sum(0, 0)).toBe(0)
      expect(sum(5, 0)).toBe(5)
      expect(sum(0, -3)).toBe(-3)
    })
  })

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12)
      expect(multiply(7, 8)).toBe(56)
    })

    it('should handle negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(-4, -5)).toBe(20)
    })

    it('should handle zero', () => {
      expect(multiply(0, 5)).toBe(0)
      expect(multiply(7, 0)).toBe(0)
    })
  })
})
