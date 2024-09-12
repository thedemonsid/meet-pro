'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Users, Zap, Shield, Moon, Sun } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#111116] text-[#171E27] dark:text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#EBEDF0] dark:border-[#1a2330]">
        <Link className="flex items-center justify-center" href="#">
          <Video className="h-6 w-6 text-[#076DDD] dark:text-[#428ECC]" />
          <span className="ml-2 font-bold text-xl text-[#076DDD] dark:text-[#428ECC]">MeetPro</span>
        </Link>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <Link className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]" href="#">
            About
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC]">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-[#076DDD] dark:text-[#428ECC]">
                  Effortless Video Calls for Small Teams
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-[#475569] dark:text-[#969ea7] md:text-2xl">
                  High-definition, low-latency video conferencing optimized for 2-3 participants.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-[#F6F7F8] dark:bg-[#000000] border-[#EBEDF0] dark:border-[#1a2330] text-[#171E27] dark:text-white" placeholder="Enter meeting code" type="text" />
                  <Button type="submit" className="bg-[#076DDD] dark:bg-[#428ECC] text-white hover:bg-[#0550a0] dark:hover:bg-[#3270a0]">Join</Button>
                </form>
                <Button className="w-full bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B]">Create New Meeting</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F6F7F8] dark:bg-[#000000]">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Video call interface"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#076DDD] dark:text-[#428ECC]">
                    Designed for Clarity
                  </h2>
                  <p className="max-w-[600px] text-[#475569] dark:text-[#969ea7] text-xl">
                    Our technology ensures pristine audio and video quality, even on slower networks. Ideal for quick team syncs and collaborative sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-12 w-12 text-[#076DDD] dark:text-[#428ECC]" />
                <h3 className="text-xl font-bold text-[#076DDD] dark:text-[#428ECC]">Small Team Optimization</h3>
                <p className="text-lg text-[#475569] dark:text-[#969ea7]">
                  Tailored for 2-3 participants, ensuring equal screen presence and engagement.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-12 w-12 text-[#076DDD] dark:text-[#428ECC]" />
                <h3 className="text-xl font-bold text-[#076DDD] dark:text-[#428ECC]">Minimal Latency</h3>
                <p className="text-lg text-[#475569] dark:text-[#969ea7]">
                  Advanced protocols reduce delay, creating a natural conversational flow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Shield className="h-12 w-12 text-[#076DDD] dark:text-[#428ECC]" />
                <h3 className="text-xl font-bold text-[#076DDD] dark:text-[#428ECC]">Enhanced Security</h3>
                <p className="text-lg text-[#475569] dark:text-[#969ea7]">
                  End-to-end encryption safeguards your conversations and shared content.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#EBEDF0] dark:border-[#1a2330]">
        <p className="text-sm text-[#475569] dark:text-[#969ea7]">© 2023 MeetPro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm hover:text-[#076DDD] dark:hover:text-[#428ECC]" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:text-[#076DDD] dark:hover:text-[#428ECC]" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}