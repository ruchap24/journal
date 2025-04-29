"use client"

import { SearchIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  placeholder?: string
}

const translations = {
  en: {
    searchPlaceholder: "Search dreams..."
  },
  hi: {
    searchPlaceholder: "सपने खोजें..."
  }
}

export function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  placeholder 
}: SearchBarProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const defaultPlaceholder = translations[language].searchPlaceholder

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-zinc-400" />
      </div>
      <input
        type="search"
        className="block w-full p-2.5 pl-10 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg focus:ring-white focus:border-white placeholder-zinc-400 text-white"
        placeholder={placeholder || defaultPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
