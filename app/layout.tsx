import "./globals.css"
import { Special_Gothic_Expanded_One, Alexandria } from "next/font/google"

const special = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-en",
  display: "block",
})

const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ar"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${special.variable} ${alexandria.variable}`}>
      <head>
        {/* منع الرمشة البيضاء فوراً */}
        <style>{`html, body { background: #000; } #initial-loader { position: fixed; inset: 0; background: #000; z-index: 99999; display: flex; align-items: center; justify-content: center; }`}</style>
      </head>
      <body className="bg-black">
        {/* لودر البدء السريع - يختفي بمجرد تحميل الصفحة */}
        <div id="initial-loader">
          <img src="/logo.svg" alt="Seto" style={{ width: '120px', animation: 'pulse 1.5s infinite' }} />
        </div>

        {/* محتوى الموقع */}
        <div id="main-content" style={{ opacity: 0 }}>
          {children}
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              const loader = document.getElementById('initial-loader');
              const content = document.getElementById('main-content');
              if (loader) loader.style.display = 'none';
              if (content) content.style.opacity = '1';
              if (content) content.style.transition = 'opacity 0.8s ease-in-out';
            });
          `
        }} />
      </body>
    </html>
  )
}