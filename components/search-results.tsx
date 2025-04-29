import Link from "next/link"
import { DreamCard } from "./dream-card"
import { MeteorCard } from "./ui/meteor-card"
import { useState, useEffect } from "react"
import type { Dream } from "@/utils/supabase/dreams"

interface SearchResultsProps {
  dreams: Dream[]
  searchTerm: string
  activeFilters: string[]
  selectedEmotion: string | null
}

// Emotion mapping between English and Bahasa Melayu
const emotionMapping = {
  // English to English (lowercase)
  "happy": "happy",
  "excited": "excited",
  "scared": "scared",
  "anxious": "anxious",
  "confused": "confused",
  "peaceful": "peaceful",
  // Hindi to English (lowercase)
  "खुश": "happy",
  "उत्साहित": "excited",
  "डरा": "scared",
  "चिंतित": "anxious",
  "भ्रमित": "confused",
  "शांत": "peaceful"
} as const;

// Helper function to map any emotion string to a valid Emotion type
const mapToValidEmotion = (emotion: string): "happy" | "scared" | "confused" | "peaceful" | "anxious" | "excited" => {
  const validEmotions = ["happy", "scared", "confused", "peaceful", "anxious", "excited"];
  const lowerEmotion = emotion.toLowerCase();
  
  // Check if it's a Hindi emotion and map it to English
  if (emotionMapping[lowerEmotion as keyof typeof emotionMapping]) {
    return emotionMapping[lowerEmotion as keyof typeof emotionMapping];
  }
  
  // Check if it's a valid English emotion
  if (validEmotions.includes(lowerEmotion)) {
    return lowerEmotion as "happy" | "scared" | "confused" | "peaceful" | "anxious" | "excited";
  }
  
  // Default fallback
  return "confused";
}

export function SearchResults({ dreams, searchTerm, activeFilters, selectedEmotion }: SearchResultsProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    // Initial load
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Set up storage event listener for changes from other windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setLanguage(e.newValue as 'en' | 'hi');
      }
    };

    // Set up event listener for changes in the same window
    const handleLanguageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setLanguage(e.newValue as 'en' | 'hi');
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage-local', handleLanguageChange as any);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-local', handleLanguageChange as any);
    };
  }, []);

  const filteredDreams = dreams.filter((dream) => {
    // First, filter by emotion if selected
    if (selectedEmotion) {
      const dreamEmotionLower = dream.emotion.toLowerCase();
      const selectedEmotionLower = selectedEmotion.toLowerCase();
      
      // Check if the dream emotion matches the selected emotion in either language
      const dreamEmotionMapped = emotionMapping[dreamEmotionLower as keyof typeof emotionMapping] || dreamEmotionLower;
      const selectedEmotionMapped = emotionMapping[selectedEmotionLower as keyof typeof emotionMapping] || selectedEmotionLower;
      
      if (dreamEmotionMapped !== selectedEmotionMapped) {
        return false;
      }
    }

    // If no search term, just show all dreams (or filtered by emotion above)
    if (!searchTerm) {
      return true;
    }

    // With search term, check all relevant fields
    return dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dream.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dream.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           new Date(dream.date).toLocaleDateString().includes(searchTerm) ||
           (dream.people && dream.people.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const noResultsText = language === 'hi' 
    ? "आपकी खोज मापदंड से मेल खाने वाला कोई सपना नहीं मिला।"
    : "No dreams match your search criteria.";

  return (
    <>
      {filteredDreams.length > 0 ? (
        filteredDreams.map((dream) => (
          <div key={dream.id} className="h-full w-full">
            <Link href={`/dream/${dream.id}`} className="block h-full w-full">
              <MeteorCard
                title={dream.title}
                date={new Date(dream.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                emotion={mapToValidEmotion(dream.emotion)}
                excerpt={dream.summary}
                location={dream.location}
                people={dream.people}
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-full">
          <p className="text-zinc-400">{noResultsText}</p>
        </div>
      )}
    </>
  )
}

