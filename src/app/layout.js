import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header/header'
import {CustomFooter} from '@/components/footer/footer'
import CoinsProvider from '@/context/coinsContext/coinsContext'
import Favicon from '/public/favicon.ico'
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Importax',
  description: 'Calculadora de custos de importação',
  icons: [{ rel: 'icon', url: Favicon.src }],

}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
          <Script
          id="Adsense-id"
          data-ad-client="ca-pub-6145567383725007"
          async="true"
          strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6145567383725007"
        />
        </head>

      
      <body className={inter.className}>
        <CoinsProvider>
        <Header/>
        {children}
        <CustomFooter/>
        </CoinsProvider>
        </body>
    </html>
  )
}
