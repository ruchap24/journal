"use client"

import { useState, useEffect, useRef, type RefObject } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Cover } from "@/components/Cover"
import Image from "next/image"
import { ArrowRight, Moon, Brain, Sparkles, CloudLightning } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { DreamSphere } from "@/components/dream-sphere"
import { DREAM_LEVELS, type LevelInfo } from "@/components/dream-level-profile"
import { Meteors } from "@/components/ui/meteors"
import "./styles.css"

// Define types for level titles to ensure type safety
type DreamLevel = 'dreamwalker' | 'novicedreamer' | 'dreamseeker' | 'dreamweaver' | 
                 'dreamsage' | 'dreammaster' | 'dreamoracle' | 'ascendeddreamer';

                 type LevelTitles = {
                  [K in DreamLevel]: string;
                }

                interface TranslationContent {
                  title: string;
                  description: string;
                  startDreaming: string;
                  joinNow: string;
                  signIn: string;
                  signUp: string;
                  features: string;
                  readyToStart: string;
                  explore: string;
                  startExploring: string;
                  dreamJournal: string;
                  dreamJournalDesc: string;
                  patternRecognition: string;
                  patternRecognitionDesc: string;
                  dreamVisualization: string;
                  dreamVisualizationDesc: string;
                  exploreDescription: string;
                  dreamLeveling: string;
                  dreamLevelingDesc: string;
                  progressSystem: string;
                  progressSystemTitle: string;
                  progressSystemDesc: string;
                  levelFeatures: string;
                  levelFeaturesDesc: string;
                  dreamLevelProgression: string;
                  dreamLevelDesc: string;
                  entriesRequired: string;
                  levelTitles: LevelTitles;
                }
                
                interface Translations {
                  en: TranslationContent;
                  hi: TranslationContent;
                }

// Get the actual color value for the aura
const getAuraColorValue = (level: LevelInfo) => {
  switch(level.auraColor) {
    case 'red': return 'rgb(239, 68, 68)';
    case 'orange': return 'rgb(249, 115, 22)';
    case 'white': return 'rgb(255, 255, 255)';
    case 'green': return 'rgb(34, 197, 94)';
    case 'blue': return 'rgb(59, 130, 246)';
    case 'indigo': return 'rgb(99, 102, 241)';
    case 'purple': return 'rgb(168, 85, 247)';
    case 'gold': return 'rgb(255, 215, 0)';
    default: return 'rgb(59, 130, 246)';
  }
}

// Custom hook for intersection observer
function useElementOnScreen(options = {}): [RefObject<HTMLDivElement | null>, boolean] {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    const currentElement = containerRef.current    //
    if (currentElement) observer.observe(currentElement)

    return () => {
      if (currentElement) observer.unobserve(currentElement)
    }
  }, [options])

  return [containerRef, isVisible]
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Load language from local storage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to local storage when it changes
  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Dispatch custom event for other components
    window.dispatchEvent(new StorageEvent('storage-local', { key: 'language', newValue: lang }));
  };

  // Apply landing-page class to document body and html
  useEffect(() => {
    document.body.classList.add('landing-page');
    document.documentElement.classList.add('landing-page');
    
    return () => {
      document.body.classList.remove('landing-page');
      document.documentElement.classList.remove('landing-page');
    };
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Unlock the stories of slumber with ",
      description: "An elegant and insightful dream journal designed to help you capture, explore, and decode your dreams effortlessly",
      startDreaming: "Enter the Dreamscape",
      joinNow: "Join Now",
      signIn: "Sign In",
      signUp: "Sign Up",
      features: "Features",
      readyToStart: "Ready to Start Your Dream Journey?",
      explore: "Explore our dream journal and visualization tools to discover new insights about yourself.",
      startExploring: "Start Exploring",
      dreamJournal: "Dream Journal",
      dreamJournalDesc: "Easily record and organize your dreams with our intuitive journaling interface.",
      patternRecognition: "Pattern Recognition",
      patternRecognitionDesc: "Discover recurring themes and symbols in your dreams over time.",
      dreamVisualization: "Dream Visualization",
      dreamVisualizationDesc: "Experience your dreams in a new way with our unique 3D visualization tool.",
      exploreDescription: "Start capturing and exploring your dreams today. Join our community of dreamers.",
      dreamLeveling: "Dream Leveling",
      dreamLevelingDesc: "Progress through unique dream levels as you journal, from Dreamwalker to Ascended Dreamer. Each level comes with a unique aura color and title.",
      progressSystem: "Progress System",
      progressSystemTitle: "Level Up Your Dream Journey",
      progressSystemDesc: "Track your growth as a dreamer with our unique leveling system. Start as a Dreamwalker and progress through 8 distinctive levels, each with its own aura color and title.",
      levelFeatures: "Level Features",
      levelFeaturesDesc: "• Unique titles from Dreamwalker to Ascended Dreamer\n• Beautiful aura colors that evolve with your progress\n• Visual progress tracking with dynamic spheres\n• Personalized experience that grows with you",
      dreamLevelProgression: "Dream Level Progression",
    dreamLevelDesc: "From Dreamwalker to Ascended Dreamer, each level unlocks new auras reflecting your journey through the dream realm.",
    entriesRequired: "entries required",
    levelTitles: {
      dreamwalker: "Dreamwalker",
      novicedreamer: "Novice Dreamer",
      dreamseeker: "Dream Seeker",
      dreamweaver: "Dream Weaver",
      dreamsage: "Dream Sage",
      dreammaster: "Dream Master",
      dreamoracle: "Dream Oracle",
      ascendeddreamer: "Ascended Dreamer"
    },
  },
    hi: {
      title: "नींद की कहानियों को अनलॉक करें",
      description: "एक सुरुचिपूर्ण और प्रज्ञापूर्ण सपनों की डायरी, जिसे आपको अपने सपनों को आसानी से पकड़ने, खोजने और समझने में मदद करने के लिए डिज़ाइन किया गया है।",
      startDreaming: "सपनों की दुनिया में प्रवेश करें",
      joinNow: "अभी जुड़ें",
      signIn: "साइन इन करें",
      signUp: "साइन अप करें",
      features: "विशेषताएं",
      readyToStart: "क्या आप अपनी सपनों की यात्रा शुरू करने के लिए तैयार हैं?",
      explore: "अपने बारे में नई अंतर्दृष्टि खोजने के लिए हमारी सपनों की डायरी और विज़ुअलाइज़ेशन टूल्स का एक्सप्लोर करें।",
      startExploring: "एक्सप्लोर करना शुरू करें",
      dreamJournal: "सपनों की डायरी",
      dreamJournalDesc: "हमारे सहज जर्नलिंग इंटरफ़ेस के साथ आसानी से अपने सपनों को रिकॉर्ड और व्यवस्थित करें।",
      patternRecognition: "पैटर्न पहचान",
      patternRecognitionDesc: "समय के साथ अपने सपनों में दोहराए जाने वाले विषयों और प्रतीकों की खोज करें।",
      dreamVisualization: "सपनों का विज़ुअलाइज़ेशन",
      dreamVisualizationDesc: "हमारे अनूठे 3D विज़ुअलाइज़ेशन टूल के साथ एक नए तरीके से अपने सपनों का अनुभव करें।",
      exploreDescription: "आज ही अपने सपनों को कैप्चर करना और एक्सप्लोर करना शुरू करें। हमारे सपनों के समुदाय में शामिल हों।",
      dreamLeveling: "ड्रीम लेवलिंग",
      dreamLevelingDesc: "जर्नलिंग करते समय विशिष्ट स्तरों से गुजरें, ड्रीमवॉकर से लेकर एसेंडेड ड्रीमर तक। प्रत्येक स्तर के साथ एक विशिष्ट ऑरा कलर और शीर्षक आता है।",
      progressSystem: "प्रगति प्रणाली",
      progressSystemTitle: "अपनी सपनों की यात्रा को बढ़ाएं",
    progressSystemDesc: "हमारी अनूठी लेवलिंग सिस्टम के साथ एक सपनेदार के रूप में अपनी वृद्धि को ट्रैक करें।",
    levelFeatures: "स्तर विशेषताएं",
    levelFeaturesDesc: "• ड्रीमवॉकर से एसेंडेड ड्रीमर तक अनूठे शीर्षक\n• सुंदर ऑरा कलर जो आपकी प्रगति के साथ विकसित होते हैं\n• गतिशील गोलों के साथ विजुअल प्रगति ट्रैकिंग\n• व्यक्तिगत अनुभव जो आपके साथ बढ़ता है",
    dreamLevelProgression: "सपनों का स्तर प्रगति",
    dreamLevelDesc: "ड्रीमवॉकर से एसेंडेड ड्रीमर तक, प्रत्येक स्तर सपनों की दुनिया में आपकी यात्रा को दर्शाने वाले नए ऑरा को अनलॉक करता है।",
    entriesRequired: "आवश्यक प्रविष्टियां",
    levelTitles: {
      dreamwalker: "ड्रीमवॉकर",
      novicedreamer: "नौसिखिया ड्रीमर",
      dreamseeker: "ड्रीम सीकर",
      dreamweaver: "ड्रीम वीवर",
      dreamsage: "ड्रीम सेज",
      dreammaster: "ड्रीम मास्टर",
      dreamoracle: "ड्रीम ओरेकल",
      ascendeddreamer: "एसेंडेड ड्रीमर"
    }
    }
  }

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])


  return (
    <div className="min-h-screen landing-page relative">
      {/* Meteors Background */}
      <Meteors number={50} className="z-0" />
      
      {/* Header with Logo and Language Switcher */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 relative z-10">
        {/* Logo and Text */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <Image
              src="/newlogo.svg"
              alt="Aetherial Logo"       //change it to  ...............................
              fill
              className="object-contain" 
              priority
            />
          </div>
          <span className="text-white text-lg font-semibold">DreamAI</span>
        </Link>
        
        {/* Language Switcher */}
        <div className="flex items-center">
          <span 
            onClick={() => handleLanguageChange('en')} 
            className={`mr-4 cursor-pointer ${language === 'en' ? 'text-white font-bold' : 'text-gray-400'}`}
          >
            EN
          </span>
          <span 
            onClick={() => handleLanguageChange('hi')} 
            className={`cursor-pointer ${language === 'hi' ? 'text-white font-bold' : 'text-gray-400'}`}
          >
            Hindi
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden z-10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"> {translations[language].title}
            <Cover><span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400">DreamAI</span></Cover>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8">
              {translations[language].description}
            </p>
            <div className="flex justify-center">
              <Link href="/login" className="w-full sm:w-auto">
                <GradientButton className="w-full px-8 py-3 text-lg flex items-center justify-center gap-2 group">
                  {translations[language].startDreaming}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    ✧
                  </span>
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{translations[language].features}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto ">
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 cursor-pointer transform 0.2s transition-all duration-300 hover:-translate-y-4">
              <div className="mb-4 text-blue-400">
                <Moon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translations[language].dreamJournal}</h3>
              <p className="text-zinc-400">
                {translations[language].dreamJournalDesc}
              </p>
              
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 cursor-pointer transform 0.2s transition-all duration-300 hover:-translate-y-4">
              <div className="mb-4 text-purple-400">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translations[language].patternRecognition}</h3>
              <p className="text-zinc-400">
                {translations[language].patternRecognitionDesc}
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 cursor-pointer transform 0.2s transition-all duration-300 hover:-translate-y-4">
              <div className="mb-4 text-amber-400">
                <CloudLightning className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translations[language].dreamVisualization}</h3>
              <p className="text-zinc-400">
                {translations[language].dreamVisualizationDesc}
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 cursor-pointer transform 0.2s transition-all duration-300 hover:-translate-y-4 ">
            
              <div className="mb-4 text-green-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translations[language].dreamLeveling}</h3>
              <p className="text-zinc-400">
                {translations[language].dreamLevelingDesc}
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Progress System Section */}
<section className="py-8 md:py-16 relative z-10">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Introduction Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
          {translations[language].dreamLevelProgression}
        </h2>
        <p className="text-lg text-zinc-400">
          {translations[language].dreamLevelDesc}
        </p>
      </div>

            {/* Level Cards */}
      <div className="grid gap-4">
        {DREAM_LEVELS.map((level, index) => {
          const [ref, isVisible] = useElementOnScreen({ threshold: 0.2 })

          const levelKey = level.title.toLowerCase().replace(/\s+/g, '') as DreamLevel

          return (
            <div
              key={level.title}
              ref={ref}
              className={`bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 fade-in-section ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <DreamSphere dreamCount={level.minEntries} size="md" />
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: getAuraColorValue(level) }}>
                  {translations[language].levelTitles[levelKey]}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {level.minEntries}+ {translations[language].entriesRequired}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full progress-bar ${isVisible ? 'is-visible' : ''}`}
                    style={{ 
                            backgroundColor: getAuraColorValue(level),
                            transitionDelay: `${index * 100 + 300}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900/50 py-8 md:py-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations[language].readyToStart}</h2>
          <p className="text-lg text-zinc-400 mb-6 max-w-2xl mx-auto">
            {translations[language].exploreDescription}
          </p>
          <Link href="/signup">
            <GradientButton className="px-8 py-3 text-lg">
              {translations[language].joinNow}
            </GradientButton>
          </Link>
        </div>
      </section>
    </div>
  )
}
