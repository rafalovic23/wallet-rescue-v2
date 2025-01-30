import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/home/Hero'     // Vérifie que le fichier est bien Hero.tsx
import { Features } from '@/components/home/Features' // Vérifie que le fichier est bien Features.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary">
      <Header />
      <Hero />
      <Features />
    </main>
  )
}