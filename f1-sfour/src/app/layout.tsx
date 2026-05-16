import type { Metadata } from 'next'
import { Big_Shoulders, Rajdhani, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";
import SplashCursor from '@/components/SplashCursor';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-big-shoulders',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'F1 Arch',
  description: 'Cinematic motorsport scroll experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(bigShoulders.variable, rajdhani.variable, "font-sans", geist.variable)}
    >
      <body className="antialiased">
        {children}
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </body>
    </html>
  )
}