'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import styles from './Header.module.css'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Need a Tutor', path: '/need-a-tutor' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Join as Tutor', path: '/join-as-tutor' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const close = () => setIsMobileMenuOpen(false)

  return (
    <>
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.container}>
          <a href="/" className={styles.logo}>
            <div className={styles.logoImage}>
              <Image src="/images/image.png" alt="Simrit Gyan Logo" width={50} height={50} priority />
            </div>
            <span className={styles.logoText}>SIMRIT GYAN</span>
          </a>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {navLinks.map(item => (
              <a
                key={item.name}
                href={item.path}
                className={`${styles.navLink}
                  ${item.name === 'Join as Tutor' ? styles.navHighlight : ''}
                  ${item.name === 'Need a Tutor' ? styles.navNeedTutor : ''}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <a href="/teacher/login" className={styles.teacherBtn}>
            <GraduationCap size={17} />
            <span>Teacher Login</span>
          </a>

          <button
            className={styles.menuButton}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer — rendered outside header so it covers full screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Drawer header row */}
            <div className={styles.drawerHeader}>
              <a href="/" className={styles.logo} onClick={close}>
                <div className={styles.logoImage}>
                  <Image src="/images/image.png" alt="Simrit Gyan Logo" width={50} height={50} priority />
                </div>
                <span className={styles.logoText}>SIMRIT GYAN</span>
              </a>
              <button className={styles.drawerClose} onClick={close} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className={styles.drawerNav}>
              {navLinks.map(item => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={close}
                  className={`${styles.drawerLink}
                    ${item.name === 'Join as Tutor' ? styles.navHighlight : ''}
                    ${item.name === 'Need a Tutor' ? styles.navNeedTutor : ''}`}
                >
                  {item.name}
                </a>
              ))}

              <a href="/teacher/login" className={styles.teacherBtnMobile} onClick={close}>
                <GraduationCap size={18} />
                Teacher Login
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
    </>
  )
}
