import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header/header'
import {CustomFooter} from '@/components/footer/footer'
import CoinsProvider from '@/context/coinsContext/coinsContext'
import Favicon from '/public/favicon.ico'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Importax',
  description: 'Calculadora de custos de importação',
  icons: [{ rel: 'icon', url: Favicon.src }],

}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
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
