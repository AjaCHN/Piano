// app/layout.tsx v2.0.4
import type {Metadata, Viewport} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import pkg from '../package.json';
import { ClientLayout } from './components/ClientLayout';

const { version } = pkg;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: `NoteCascade - Keyboard Practice v${version}`,
  description: 'A visual/game-like MIDI keyboard practice app with real-time scoring and achievements.',
  keywords: ['MIDI', 'Piano', 'Practice', 'Music', 'Game', 'Learning', 'Keyboard', 'Synthesizer'],
  authors: [{ name: 'Sut', url: 'https://github.com/sutchan' }],
  creator: 'Sut',
  publisher: 'Sut',
  robots: 'index, follow',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: `NoteCascade - Keyboard Practice v${version}`,
    description: 'A visual/game-like MIDI keyboard practice app with real-time scoring and achievements.',
    url: 'https://notecascade.app',
    siteName: 'NoteCascade',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'NoteCascade Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `NoteCascade - Keyboard Practice v${version}`,
    description: 'A visual/game-like MIDI keyboard practice app with real-time scoring and achievements.',
    creator: '@sutchan',
    images: ['/logo.svg'],
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'Global',
    'geo.position': '37.7749;-122.4194',
    'ICBM': '37.7749, -122.4194',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4f46e5',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('ChunkLoadError')) {
                  if (!sessionStorage.getItem('chunkLoadErrorReloaded')) {
                    sessionStorage.setItem('chunkLoadErrorReloaded', 'true');
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.getRegistrations().then(function(registrations) {
                        for(let registration of registrations) {
                          registration.unregister();
                        }
                        window.location.reload();
                      });
                    } else {
                      window.location.reload();
                    }
                  }
                }
              });
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
