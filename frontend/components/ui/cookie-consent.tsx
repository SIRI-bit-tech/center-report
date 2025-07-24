"use client"
import React, { useState, useEffect } from "react"

const COOKIE_KEY = "central_report_cookie_consent"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if not already accepted
    if (typeof window !== "undefined" && !localStorage.getItem(COOKIE_KEY)) {
      setTimeout(() => setVisible(true), 800)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/95 border border-gray-200 shadow-xl rounded-lg px-6 py-4 max-w-md w-full flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
        <div className="flex-1 text-sm text-gray-800">
          We use cookies to improve your experience and to show relevant content. By using this site, you agree to our <a href="/privacy" className="underline text-accent hover:text-accent-700">Privacy Policy</a>.
        </div>
        <button
          onClick={acceptCookies}
          className="bg-accent hover:bg-accent-700 text-white font-semibold px-5 py-2 rounded transition-colors shadow"
        >
          Accept
        </button>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  )
} 