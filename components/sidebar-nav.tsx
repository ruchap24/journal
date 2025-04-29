"use client"

import { HomeIcon, PlusIcon, GlobeIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function SidebarNav() {
  const pathname = usePathname()
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  
  useEffect(() => {
    // Initial load
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Set up storage event listener for changes from other windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setLanguage(e.newValue as 'en' | 'hi')
      }
    }

    // Set up event listener for changes in the same window
    const handleLanguageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setLanguage(e.newValue as 'en' | 'hi')
      }
    }

    // Add event listeners
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('storage-local', handleLanguageChange as any)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage-local', handleLanguageChange as any)
    }
  }, [])

  const translations = {
    en: {
      home: "Home",
      capture: "Capture",
      explore: "Explore",
      settings: "Settings"
    },
    hi: {
      home: "होम",
      capture: "कैप्चर",
      explore: "एक्सप्लोर",
      settings: "सेटिंग्स"
    }
  }
  
  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/home") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-zinc-900/50 border-r border-zinc-800/50">
      <div className="flex flex-col h-full px-4 py-8">
        {/* App Logo */}
        <div className="flex items-center gap-2 px-2 mb-8">
          <Image
            priority
            width={32}
            height={32}
            className="h-8 w-8"
            src="/newlogo.svg"       
            alt="Logo"
            draggable="false"
          />
          <span className="text-2xl font-semibold">DreamAI</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          <Link 
            href="/home" 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              isActive("/home") 
                ? "bg-zinc-800/80 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="font-medium">{translations[language].home}</span>
          </Link>
          
          <Link 
            href="/capture" 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              isActive("/capture") 
                ? "bg-zinc-800/80 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-medium">{translations[language].capture}</span>
          </Link>
          
          
          
          <Link 
            href="/settings" 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              isActive("/settings") 
                ? "bg-zinc-800/80 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="font-medium">{translations[language].settings}</span>
          </Link>
        </nav>
        
        {/* Version info at bottom */}
        <div className="pt-4 mt-auto border-t border-zinc-800/50">
          <p className="text-xs text-zinc-500 px-3"><a href="https://www.linkedin.com/in/ruchap18/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Rucha Patil
                    </a></p>
        </div>
      </div>
    </aside>
  )
} 