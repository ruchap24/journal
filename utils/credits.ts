// LocalStorage-based image generation usage tracking (no authentication required)

const STORAGE_KEY = 'image_generation_usage'

interface UsageRecord {
  date: string
  count: number
}

export async function updateImageGenerationUsage(userId?: string) {
  if (typeof window === 'undefined') return { success: false }
  
  const today = new Date().toISOString().split('T')[0]
  const storageKey = `${STORAGE_KEY}_${today}`
  
  const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10)
  localStorage.setItem(storageKey, String(currentCount + 1))
  
  return { success: true }
}

export async function getCurrentUsage(userId?: string): Promise<number> {
  if (typeof window === 'undefined') return 0
  
  const today = new Date().toISOString().split('T')[0]
  const storageKey = `${STORAGE_KEY}_${today}`
  
  return parseInt(localStorage.getItem(storageKey) || '0', 10)
}

export async function checkRemainingCredits(userId?: string) {
  const DAILY_LIMIT = 4 // Set your daily limit here
  const currentUsage = await getCurrentUsage(userId)
  return {
    remaining: Math.max(0, DAILY_LIMIT - currentUsage),
    used: currentUsage
  }
}
