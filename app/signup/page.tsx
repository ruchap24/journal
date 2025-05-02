"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import { FloatingStars } from "@/components/floatingstars"
import { Meteors } from "@/components/ui/meteors"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)
  const [showVerificationUI, setShowVerificationUI] = useState(false)
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [cooldownTime, setCooldownTime] = useState(0)

  // Load saved language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Countdown effect for resend cooldown
  useEffect(() => {
    if (cooldownTime <= 0) return

    const interval = setInterval(() => {
      setCooldownTime(time => {
        if (time <= 1) return 0
        return time - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [cooldownTime])

  const translations = {
    en: {
      signup: "Sign Up",
      backHome: "Back to home",
      emailAddress: "Email address",
      password: "Password",
      confirmPassword: "Confirm Password",
      createAccount: "Create Account",
      login: "Already have an account? Login",
      signupFailed: "Signup failed",
      signupSuccess: "Account created successfully",
      passwordMatch: "Passwords must match",
      passwordLength: "Password must be at least 6 characters",
      emailVerification: "Verify Your Email",
      emailVerificationDescription: "We've sent a verification link to your email. Please check your inbox and click the link to verify your account.",
      emailVerificationNote: "If you don't see the email, check your spam folder or request a new verification email.",
      resendVerification: "Resend Verification Email",
      verificationSent: "Verification email sent. Please check your inbox.",
      verificationFailed: "Failed to send verification email. Please try again.",
      goToLogin: "Go to Login",
      cooldownMessage: "You can request another email in {seconds} seconds"
    },
    hi: {
      signup: "साइन अप",
      backHome: "होम पेज पर वापस जाएं",
      emailAddress: "ईमेल पता",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      createAccount: "खाता बनाएं",
      login: "क्या आपका पहले से खाता है? लॉगिन करें",
      signupFailed: "साइन अप विफल रहा",
      signupSuccess: "खाता सफलतापूर्वक बनाया गया",
      passwordMatch: "पासवर्ड मेल खाना चाहिए",
      passwordLength: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
      emailVerification: "अपना ईमेल सत्यापित करें",
      emailVerificationDescription: "हमने आपके ईमेल पर एक सत्यापन लिंक भेजा है। कृपया अपना इनबॉक्स चेक करें और खाता सत्यापित करने के लिए लिंक पर क्लिक करें।",
      emailVerificationNote: "यदि आपको ईमेल नहीं दिख रहा है, तो अपना स्पैम फ़ोल्डर चेक करें या नया सत्यापन ईमेल भेजने का अनुरोध करें।",
      resendVerification: "सत्यापन ईमेल पुनः भेजें",
      verificationSent: "सत्यापन ईमेल भेज दिया गया है। कृपया अपना इनबॉक्स चेक करें।",
      verificationFailed: "सत्यापन ईमेल भेजने में विफल। कृपया पुनः प्रयास करें।",
      goToLogin: "लॉगिन पर जाएं",
      cooldownMessage: "आप {seconds} सेकंड में दूसरा ईमेल भेज सकते हैं"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast.error(translations[language].passwordMatch)
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      toast.error(translations[language].passwordLength)
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error(translations[language].signupFailed)
        console.error("Signup error:", error.message)
        return
      }

      toast.success(translations[language].signupSuccess)
      setShowVerificationUI(true)
      // Start the cooldown timer immediately since an email was already sent during signup
      setCooldownTime(45)
      
    } catch (error) {
      console.error("Unexpected error during signup:", error)
      toast.error(translations[language].signupFailed)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (cooldownTime > 0) return
    
    setIsSendingVerification(true)
    try {
      const supabase = createClient()
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        // Check if it's a cooldown error
        if (error.message.includes("security purposes") || error.message.includes("45 seconds")) {
          setCooldownTime(45)
          toast.error(translations[language].cooldownMessage.replace('{seconds}', '45'))
        } else {
          toast.error(translations[language].verificationFailed)
        }
        console.error("Verification resend error:", error.message)
        return
      }  

      toast.success(translations[language].verificationSent)
      // Set cooldown after successful send
      setCooldownTime(45)
    } catch (error) {
      console.error("Unexpected error during verification resend:", error)
      toast.error(translations[language].verificationFailed)
    } finally {
      setIsSendingVerification(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <FloatingStars count={40} />
      <Meteors number={100} className="z-0" />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[70px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      {/* Grid overlay for a more tech/dream-like feel */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10"></div>
      <header className="p-4">
        <Link href="/" className="flex items-center text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>{translations[language].backHome}</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        
        <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50">
          {!showVerificationUI ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                  {translations[language].signup}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    {translations[language].emailAddress}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dreamjournal@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-200">
                    {translations[language].password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-zinc-200">
                    {translations[language].confirmPassword}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>

                <GradientButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    translations[language].createAccount
                  )}
                </GradientButton>
              </form>

              <div className="text-center">
                <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
                  {translations[language].login}
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  {translations[language].emailVerification}
                </h2>
                <p className="text-zinc-400">
                  {translations[language].emailVerificationDescription}
                </p>
                <p className="text-zinc-500 text-sm">
                  {translations[language].emailVerificationNote}
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <div>
                  <Button
                    onClick={handleResendVerification}
                    disabled={isSendingVerification || cooldownTime > 0}
                    variant="outline"
                    className="w-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800/50 h-11"
                  >
                    {isSendingVerification ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : cooldownTime > 0 ? (
                      translations[language].cooldownMessage.replace('{seconds}', cooldownTime.toString())
                    ) : (
                      translations[language].resendVerification
                    )}
                  </Button>
                </div>
                
                <Link href="/login" className="block w-full">
                  <GradientButton className="w-full h-11">
                    {translations[language].goToLogin}
                  </GradientButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    </div>
  )
} 