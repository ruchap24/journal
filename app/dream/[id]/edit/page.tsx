"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { DreamForm } from "@/components/dream-form"
import { getDreamById } from "@/utils/supabase/dreams"
import type { Dream } from "@/utils/supabase/dreams"
import { Meteors } from "@/components/ui/meteors"
import { FloatingStars } from "@/components/floatingstars"

const translations = {
  en: {
    loading: "Loading dream...",
    editDream: "Edit Dream",
    backToDream: "Back to Dream",
    error: "Failed to load dream. Please try again.",
  },
  hi: {
    loading: "सपना लोड हो रहा है...",
    editDream: "सपना संपादित करें",
    backToDream: "सपने पर वापस जाएं",
    error: "सपना लोड करने में विफल। कृपया पुनः प्रयास करें।",
  }
} as const;

export default function EditDream() {
  const params = useParams()
  const id = params.id as string
  const [dream, setDream] = useState<Dream | null>(null)
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('storage-local', handleLanguageChange as any)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage-local', handleLanguageChange as any)
    }
  }, [])

  useEffect(() => {
    async function loadDream() {
      try {
        setLoading(true)
        setError(null)
        const fetchedDream = await getDreamById(id)
        if (fetchedDream) {
          setDream(fetchedDream)
        } else {
          router.push("/home")
        }
      } catch (err) {
        console.error('Failed to load dream:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dream')
      } finally {
        setLoading(false)
      }
    }

    loadDream()
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">{translations[language].loading}</div>
      </div>
    )
  }

  if (error || !dream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{translations[language].error}</div>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <FloatingStars count={40} />
      <Meteors number={100} className="z-0" />
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center max-w-6xl mx-auto">
          <Link href={`/dream/${id}`} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold ml-2">{translations[language].editDream}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <DreamForm initialData={dream} isEditing={true} />
      </main>
    </div>
  )
}