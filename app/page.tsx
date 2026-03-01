"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cover } from "@/components/Cover";
import { Badge } from "@/components/ui/badgee";
import Image from "next/image";
import { Logo } from "./components/logo";
import {
  ArrowRight,
  Moon,
  Brain,
  Sparkles,
  CloudLightning,
} from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { DreamSphere } from "@/components/dream-sphere";
import { DREAM_LEVELS, type LevelInfo } from "@/components/dream-level-profile";
import { Meteors } from "@/components/ui/meteors";
import { FloatingStars } from "@/components/floatingstars";
import { ScrollToTop } from "@/components/scrolltop";
import { debounce } from "lodash";
import "./styles.css";
import AuraBg from "@/components/ui/aurabg";

// Define types for level titles to ensure type safety
type DreamLevel =
  | "dreamwalker"
  | "novicedreamer"
  | "dreamseeker"
  | "dreamweaver"
  | "dreamsage"
  | "dreammaster"
  | "dreamoracle"
  | "ascendeddreamer";

type LevelTitles = {
  [K in DreamLevel]: string;
};

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
  switch (level.auraColor) {
    case "red":
      return "rgb(239, 68, 68)";
    case "orange":
      return "rgb(249, 115, 22)";
    case "white":
      return "rgb(255, 255, 255)";
    case "green":
      return "rgb(34, 197, 94)";
    case "blue":
      return "rgb(59, 130, 246)";
    case "indigo":
      return "rgb(99, 102, 241)";
    case "purple":
      return "rgb(168, 85, 247)";
    case "gold":
      return "rgb(255, 215, 0)";
    default:
      return "rgb(59, 130, 246)";
  }
};

function useElementOnScreen(
  options = { rootMargin: "100px", threshold: 0.2 }
): [RefObject<HTMLDivElement | null>, boolean] {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = containerRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [options.rootMargin, options.threshold]);

  return [containerRef, isVisible];
}

function DarkUniverseBackground() {
  return (
    <>
      <div className="dark-universe-bg" />
      <div className="nebula" style={{ '--x': '30%', '--y': '20%' } as React.CSSProperties} />
      <div className="nebula" style={{ '--x': '70%', '--y': '80%' } as React.CSSProperties} />
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            '--twinkle-duration': `${Math.random() * 3 + 2}s`
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [loadFeatures, setLoadFeatures] = useState(false);
  const [loadLevels, setLoadLevels] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as
      | "en"
      | "hi"
      | null;
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, [language]);

  useEffect(() => {
    const featuresObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadFeatures(true);
          featuresObserver.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    const levelsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadLevels(true);
          levelsObserver.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (featuresRef.current) featuresObserver.observe(featuresRef.current);
    if (levelsRef.current) levelsObserver.observe(levelsRef.current);

    return () => {
      featuresObserver.disconnect();
      levelsObserver.disconnect();
    };
  }, []);

  const handleLanguageChange = (lang: "en" | "hi") => {
    if (lang === language) return;
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(
      new StorageEvent("storage-local", { key: "language", newValue: lang })
    );
  };

  useEffect(() => {
    document.body.classList.add("landing-page");
    document.documentElement.classList.add("landing-page");

    return () => {
      document.body.classList.remove("landing-page");
      document.documentElement.classList.remove("landing-page");
    };
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
    }, 16);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translations = {
    en: {
      t: "Unlock",
      title: "the stories of slumber with ",
      name: "Somniel",
      description:
        "An elegant and insightful dream journal designed to help you capture, explore, and decode your dreams effortlessly",
      startDreaming: "Enter the Dreamscape",
      joinNow: "Join Now",
      signIn: "Sign In",
      signUp: "Sign Up",
      features: "Features",
      readyToStart: "Ready to Start Your Dream Journey?",
      explore:
        "Explore our dream journal and visualization tools to discover new insights about yourself.",
      startExploring: "Start Exploring",
      dreamJournal: "Dream Journal",
      dreamJournalDesc:
        "Easily record and organize your dreams with our intuitive journaling interface.",
      patternRecognition: "Pattern Recognition",
      patternRecognitionDesc:
        "Discover recurring themes and symbols in your dreams over time.",
      dreamVisualization: "Dream Visualization",
      dreamVisualizationDesc:
        "Experience your dreams in a new way with our unique 3D visualization tool.",
      exploreDescription:
        "Start capturing and exploring your dreams today. Join our community of dreamers.",
      dreamLeveling: "Dream Leveling",
      dreamLevelingDesc:
        "Progress through unique dream levels as you journal, from Dreamwalker to Ascended Dreamer. Each level comes with a unique aura color and title.",
      progressSystem: "Progress System",
      progressSystemTitle: "Level Up Your Dream Journey",
      progressSystemDesc:
        "Track your growth as a dreamer with our unique leveling system. Start as a Dreamwalker and progress through 8 distinctive levels, each with its own aura color and title.",
      levelFeatures: "Level Features",
      levelFeaturesDesc:
        "• Unique titles from Dreamwalker to Ascended Dreamer\n• Beautiful aura colors that evolve with your progress\n• Visual progress tracking with dynamic spheres\n• Personalized experience that grows with you",
      dreamLevelProgression: "Dream Level Progression",
      dreamLevelDesc:
        "From Dreamwalker to Ascended Dreamer, each level unlocks new auras reflecting your journey through the dream realm.",
      entriesRequired: "entries required",
      levelTitles: {
        dreamwalker: "Dreamwalker",
        novicedreamer: "Novice Dreamer",
        dreamseeker: "Dream Seeker",
        dreamweaver: "Dream Weaver",
        dreamsage: "Dream Sage",
        dreammaster: "Dream Master",
        dreamoracle: "Dream Oracle",
        ascendeddreamer: "Ascended Dreamer",
      },
    },
    hi: {
      t: "नींद",
      title: "की कहानियों को अनलॉक करें ",
      name: "सोमनियल के साथ",
      description:
        "एक सुरुचिपूर्ण और प्रज्ञापूर्ण सपनों की डायरी, जिसे आपको अपने सपनों को आसानी से पकड़ने, खोजने और समझने में मदद करने के लिए डिज़ाइन किया गया है।",
      startDreaming: "सपनों की दुनिया में प्रवेश करें",
      joinNow: "अभी जुड़ें",
      signIn: "साइन इन करें",
      signUp: "साइन अप करें",
      features: "विशेषताएं",
      readyToStart: "क्या आप अपनी सपनों की यात्रा शुरू करने के लिए तैयार हैं?",
      explore:
        "अपने बारे में नई अंतर्दृष्टि खोजने के लिए हमारी सपनों की डायरी और विज़ुअलाइज़ेशन टूल्स का एक्सप्लोर करें।",
      startExploring: "एक्सप्लोर करना शुरू करें",
      dreamJournal: "सपनों की डायरी",
      dreamJournalDesc:
        "हमारे सहज जर्नलिंग इंटरफ़ेस के साथ आसानी से अपने सपनों को रिकॉर्ड और व्यवस्थित करें।",
      patternRecognition: "पैटर्न पहचान",
      patternRecognitionDesc:
        "समय के साथ अपने सपनों में दोहराए जाने वाले विषयों और प्रतीकों की खोज करें।",
      dreamVisualization: "सपनों का विज़ुअलाइज़ेशन",
      dreamVisualizationDesc:
        "हमारे अनूठे 3D विज़ुअलाइज़ेशन टूल के साथ एक नए तरीके से अपने सपनों का अनुभव करें।",
      exploreDescription:
        "आज ही अपने सपनों को कैप्चर करना और एक्सप्लोर करना शुरू करें। हमारे सपनों के समुदाय में शामिल हों।",
      dreamLeveling: "ड्रीम लेवलिंग",
      dreamLevelingDesc:
        "जर्नलिंग करते समय विशिष्ट स्तरों से गुजरें, ड्रीमवॉकर से लेकर एसेंडेड ड्रीमर तक। प्रत्येक स्तर के साथ एक विशिष्ट ऑरा कलर और शीर्षक आता है।",
      progressSystem: "प्रगति प्रणाली",
      progressSystemTitle: "अपनी सपनों की यात्रा को बढ़ाएं",
      progressSystemDesc:
        "हमारी अनूठी लेवलिंग सिस्टम के साथ एक सपनेदार के रूप में अपनी वृद्धि को ट्रैक करें।",
      levelFeatures: "स्तर विशेषताएं",
      levelFeaturesDesc:
        "• ड्रीमवॉकर से एसेंडेड ड्रीमर तक अनूठे शीर्षक\n• सुंदर ऑरा कलर जो आपकी प्रगति के साथ विकसित होते हैं\n• गतिशील गोलों के साथ विजुअल प्रगति ट्रैकिंग\n• व्यक्तिगत अनुभव जो आपके साथ बढ़ता है",
      dreamLevelProgression: "सपनों का स्तर प्रगति",
      dreamLevelDesc:
        "ड्रीमवॉकर से एसेंडेड ड्रीमर तक, प्रत्येक स्तर सपनों की दुनिया में आपकी यात्रा को दर्शाने वाले नए ऑरा को अनलॉक करता है।",
      entriesRequired: "आवश्यक प्रविष्टियां",
      levelTitles: {
        dreamwalker: "ड्रीमवॉकर",
        novicedreamer: "नौसिखिया ड्रीमर",
        dreamseeker: "ड्रीम सीकर",
        dreamweaver: "ड्रीम वीवर",
        dreamsage: "ड्रीम सेज",
        dreammaster: "ड्रीम मास्टर",
        dreamoracle: "ड्रीम ओरेकल",
        ascendeddreamer: "एसेंडेड ड्रीमर",
      },
    },
  };

  return (
    <div className="landing-page relative">
      <AuraBg />
      <FloatingStars count={100} />
      <Meteors number={100} className="z-0" />
      <ScrollToTop />

      <nav className="flex items-center justify-between p-4 relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative" style={{ height: '1.875rem', width: '1.875rem' }}>
            <Logo />
          </div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e50e8c] via-[#e50e8c] to-[#c314b7] relative group glow-text">
            Somniel
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a21899] via-[#990adb] to-[#a21899] transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>

        <div className="flex items-center">
          <span
            onClick={() => handleLanguageChange("en")}
            className={`mr-4 cursor-pointer ${language === "en" ? "text-[#f567b5] font-bold" : "text-[#f567b5]"
              }`}
          >
            EN
          </span>
          <span
            onClick={() => handleLanguageChange("hi")}
            className={`cursor-pointer ${language === "hi" ? "text-[#e63e7b] font-bold" : "text-[#e63e7b]"
              }`}
          >
            Hindi
          </span>
        </div>
      </nav>

      <div className="h-screen relative overflow-hidden z-10 flex items-center justify-center container-block">
        <div className="container mx-auto px-4 py-6 md:py-4 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex justify-center mb-4 -mt-44">
              <div
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-2 sm:py-2 border-2 border-purple-300/20 bg-background/80 backdrop-blur-sm text-xs sm:text-base rounded-full cursor-pointer"
              >
                {/* <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors pr-1 font-sans">
                Welcome to Somniel
              </span> */}
               <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors pr-1 font-sans">
                Welcome to Somniel
              </span>
              </div>
            </div>

{/* <div className="inline-flex -mt-4 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors pr-1 font-sans">
                Welcome to Somniel
              </span>
            </div> */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 -mt-2 font-instrumental">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#dae0e8] via-[#f7f9fa] to-[#d3d3ce] relative group">

                {translations[language].t}
                {" "}
                {translations[language].title}
                {" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f01d6a] via-[#f72389] to-[#cb1abf] relative group">
                {translations[language].name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a21899] via-[#990adb] to-[#a21899] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </h1>
            <p className="text-zinc-400 mb-8  max-w-xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground">
              {translations[language].description}
            </p>
            <div className="flex justify-center">
              
               <Link href="/home" className="w-full sm:w-auto">
                {/* <GradientButton className="w-full flex items-center justify-center gap-2">
                {translations[language].startDreaming}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                    ✧
                  </span>   
                </GradientButton> */}
                <button className="sm:w-auto bg-white-500/10 hover:bg-blue-800/10 hover:border-purple-400 hover:border-purple-400 hover:shadow-[0_0_35px_rgba(59,130,246,0.6),inset_0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-300 flex group text-base font-medium text-white w-full border-purple-500 border rounded-full pt-3.5 pr-8 pb-3.5 pl-8 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_10px_rgba(59,130,246,0.2)] gap-x-2 gap-y-2 items-center justify-center">
                {translations[language].startDreaming}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                    ✧
                  </span>   
        </button>
              </Link> 
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
