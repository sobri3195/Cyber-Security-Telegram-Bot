import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-main">
            <motion.div
              className="footer-logo"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              🔐
            </motion.div>
            <h3 className="footer-title">Cyber Security Bot</h3>
            <p className="footer-description">
              Bot Telegram untuk edukasi keamanan digital dan tools cyber security
            </p>

            <div className="footer-links">
              <motion.a
                href="https://t.me/winlincommunity_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                whileHover={{ scale: 1.05, color: '#fff' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>💬</span> Telegram Bot
              </motion.a>
              <motion.a
                href="https://github.com/sobri3195"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                whileHover={{ scale: 1.05, color: '#fff' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>💻</span> GitHub
              </motion.a>
              <motion.a
                href="https://lynk.id/muhsobrimaulana"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                whileHover={{ scale: 1.05, color: '#fff' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>❤️</span> Donasi
              </motion.a>
            </div>
          </div>

          <div className="footer-info">
            <div className="info-section">
              <h4 className="info-title">📊 Statistik</h4>
              <ul className="info-list">
                <li>20+ Fitur Lengkap</li>
                <li>30+ Istilah Cyber Security</li>
                <li>24/7 Aktif</li>
                <li>Real-time News Update</li>
              </ul>
            </div>

            <div className="info-section">
              <h4 className="info-title">🔗 Quick Links</h4>
              <ul className="info-list">
                <li><a href="#commands">Daftar Perintah</a></li>
                <li><a href="https://github.com/sobri3195/cyber-security-telegram-bot" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="mailto:muhammadsobrimaulana31@gmail.com">Contact</a></li>
              </ul>
            </div>

            <div className="info-section">
              <h4 className="info-title">👨‍💻 Developer</h4>
              <p className="developer-name">
                Letda Kes dr. Muhammad Sobri Maulana
              </p>
              <p className="developer-creds">
                S.Kom, CEH, OSCP, OSCE
              </p>
              <p className="developer-contact">
                <a href="mailto:muhammadsobrimaulana31@gmail.com">
                  muhammadsobrimaulana31@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-badges">
              <span className="footer-badge">🛡️ Serverless</span>
              <span className="footer-badge">⚡ Netlify</span>
              <span className="footer-badge">🤖 Telegram Bot API</span>
              <span className="footer-badge">⚛️ React</span>
            </div>

            <div className="footer-copyright">
              <p>
                © {currentYear} Cyber Security Bot. All rights reserved.
              </p>
              <p className="footer-tagline">
                🔐 Tetap aman di dunia digital!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="footer-wave"
        animate={{
          x: [0, -100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </motion.div>
    </footer>
  );
};

export default Footer;
