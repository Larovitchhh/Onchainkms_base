"use client"
import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { userSession } from '../lib/stacksAuth'

const WalletContext = createContext({ isSignedIn: false })

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setIsSignedIn(true)
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isSignedIn }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
