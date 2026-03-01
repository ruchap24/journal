// LocalStorage-based dream storage (no authentication required)

export interface Dream {
  id: string
  user_id?: string // Optional, kept for compatibility but not used
  title: string
  date: string
  location: string
  people: string
  time_of_day: "Morning" | "Afternoon" | "Night" | "Unknown"
  activity: string
  unusual_events: {
    occurred: boolean
    description: string
  }
  symbols: string
  emotion: "Happy" | "Scared" | "Confused" | "Peaceful" | "Anxious" | "Excited"
  kategori_mimpi: "Daytime Carryover Dream" | "Random Dream" | "Carried Dream" | "Learning Dream" | "Receiving Dream" | "Message Dream" | "Disturbance Dream" | "Blank Dream"
  keadaan_mimpi: "Watching a Screen" | "Character in Dream" | "Both Watching and Being a Character"
  jenis_mimpi: "Normal Dream" | "Aware but Can't Control" | "Lucid Dream" | "Liminal Dream" | "Vivid Dream"
  ending: "abruptly" | "slowly" | null
  final_moments: string
  summary: string
  created_at: string
  updated_at: string
}

// Helper function to get dreams from localStorage
function getDreamsFromStorage(): Dream[] {
  if (typeof window === 'undefined') return []
  const dreamsJson = localStorage.getItem('dreams')
  if (!dreamsJson) return []
  try {
    return JSON.parse(dreamsJson)
  } catch {
    return []
  }
}

// Helper function to save dreams to localStorage
function saveDreamsToStorage(dreams: Dream[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('dreams', JSON.stringify(dreams))
}

export async function createDream(dream: Omit<Dream, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Dream> {
  const now = new Date().toISOString()
  const newDream: Dream = {
    ...dream,
    id: crypto.randomUUID(),
    date: new Date(dream.date).toISOString(),
    created_at: now,
    updated_at: now,
    // Ensure unusual_events is properly formatted
    unusual_events: {
      occurred: dream.unusual_events?.occurred || false,
      description: dream.unusual_events?.description || ''
    },
    // Ensure optional fields have default values
    symbols: dream.symbols || '',
    people: dream.people || '',
    final_moments: dream.final_moments || '',
    ending: dream.ending || null
  }

  const dreams = getDreamsFromStorage()
  dreams.push(newDream)
  saveDreamsToStorage(dreams)
  
  return newDream
}

export async function getDreams(): Promise<Dream[]> {
  const dreams = getDreamsFromStorage()
  // Sort by date descending (most recent first)
  return dreams.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getDreamById(id: string): Promise<Dream | null> {
  const dreams = getDreamsFromStorage()
  return dreams.find(dream => dream.id === id) || null
}

export async function updateDream(id: string, dream: Partial<Omit<Dream, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Dream> {
  const dreams = getDreamsFromStorage()
  const index = dreams.findIndex(d => d.id === id)
  
  if (index === -1) {
    throw new Error('Dream not found')
  }

  const updatedDream: Dream = {
    ...dreams[index],
    ...dream,
    updated_at: new Date().toISOString(),
    // Ensure unusual_events is properly formatted if provided
    unusual_events: dream.unusual_events || dreams[index].unusual_events
  }

  dreams[index] = updatedDream
  saveDreamsToStorage(dreams)
  
  return updatedDream
}

export async function deleteDream(id: string): Promise<boolean> {
  const dreams = getDreamsFromStorage()
  const filteredDreams = dreams.filter(d => d.id !== id)
  
  if (filteredDreams.length === dreams.length) {
    throw new Error('Dream not found')
  }

  saveDreamsToStorage(filteredDreams)
  return true
}

export async function testConnection(): Promise<boolean> {
  // Always return true for localStorage
  return true
}

export async function deleteAllDreams(): Promise<boolean> {
  saveDreamsToStorage([])
  return true
}
