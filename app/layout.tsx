import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Lumina AI', description: 'A premium multi-provider AI workspace.' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}