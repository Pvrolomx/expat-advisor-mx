import './globals.css'

export const metadata = {
  title: 'Condo Advisor - Nayarit',
  description: 'Your bilingual legal assistant for Nayarit condominium law',
  manifest: '/manifest.json',
  themeColor: '#075e54',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
