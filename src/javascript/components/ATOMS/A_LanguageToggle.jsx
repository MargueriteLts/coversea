import React, { useState, useEffect } from 'react'
import '../../../stylesheets/A_LanguageToggle.scss'

const A_LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  
  const switchLanguage = (language) => {
    setCurrentLanguage(language)
    document.body.classList.remove('lang-en', 'lang-fr', 'lang-ru')
    document.body.classList.add(`lang-${language}`)
    localStorage.setItem('preferredLanguage', language)
  }
  
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage')
    if (storedLanguage && ['en', 'fr', 'ru'].includes(storedLanguage)) {
      switchLanguage(storedLanguage)
    } else {
      // Default to English if no preference is stored
      document.body.classList.add('lang-en')
    }
  }, [])
  
  return (
    <div className="language-toggle">
      <button 
        className={`language-btn ${currentLanguage === 'en' ? 'active' : ''}`} 
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button 
        className={`language-btn ${currentLanguage === 'fr' ? 'active' : ''}`} 
        onClick={() => switchLanguage('fr')}
        aria-label="Switch to French"
      >
        FR
      </button>
      <button 
        className={`language-btn ${currentLanguage === 'ru' ? 'active' : ''}`} 
        onClick={() => switchLanguage('ru')}
        aria-label="Switch to Russian"
      >
        RU
      </button>
    </div>
  )
}

export default A_LanguageToggle