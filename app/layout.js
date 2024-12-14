import localFont from "next/font/local";
import "./globals.css";
// import {Roboto} from "mext/font/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const RobotoBlack = localFont({
  src: "./fonts/Roboto-Bold.ttf",
  variable: "--roboto-Black",
  weight: "100 900",
});
// favicon.ico



export const metadata = {
  title: {
    default: "Pj1Gigbase - Showcase and Book Talent Worldwide",
    template: "%s | Pj1Gigbase - Talent Marketplace"
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    //apple: '/apple-touch-icon.png',
  },
  description: 
    "Pj1Gigbase is your go-to online platform for discovering and booking talented individuals like drummers, organists, rappers, and more. Showcase your skills or find the perfect talent for your event or project. Available on web and mobile apps for seamless access.",
  keywords: [
    "Pj1Gigbase",
    "online booking site",
    "talent marketplace",
    "hire drummers",
    "book organists",
    "find rappers",
    "showcase talent",
    "gig booking platform",
    "mobile talent app",
    "Pj1Gigbase app"
  ],
  author: "Pj1Gigbase",
  openGraph: {
    title: "Pj1Gigbase - Talent Booking Made Easy",
    description: 
      "Discover and hire top talent across various fields on Pj1Gigbase. Whether you're a drummer, rapper, or event organizer, our platform connects you with the right opportunities. Available on web and mobile apps.",
    url: "https://pj1gigbase.com",
    type: "website",
    images: [
      {
        url: "https://pj1gigbase.com/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pj1Gigbase Talent Marketplace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pj1Gigbase - Hire and Showcase Talent",
    description: 
      "Pj1Gigbase connects talented individuals with opportunities. Showcase your skills or hire talent like drummers, organists, and more via our web and mobile app.",
    images: [
      {
        url: "https://pj1gigbase.com/assets/twitter-card.jpg",
        alt: "Pj1Gigbase Logo and Talents"
      }
    ]
  },
  robots: "index, follow"
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
