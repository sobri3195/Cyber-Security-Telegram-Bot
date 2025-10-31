import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="hero">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hero-icon"
          animate={floatingAnimation}
        >
          🔐
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-title">
          Cyber Security Bot
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtitle">
          Bot Telegram untuk Edukasi Keamanan Digital & Tools Cyber Security
        </motion.p>

        <motion.div variants={itemVariants} className="hero-buttons">
          <motion.a
            href="https://t.me/winlincommunity_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">💬</span>
            Buka Bot di Telegram
          </motion.a>

          <motion.a
            href="#commands"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">📖</span>
            Lihat Perintah
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-stats"
        >
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
          >
            <div className="stat-number">20+</div>
            <div className="stat-label">Fitur</div>
          </motion.div>
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
          >
            <div className="stat-number">30+</div>
            <div className="stat-label">Istilah</div>
          </motion.div>
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
          >
            <div className="stat-number">24/7</div>
            <div className="stat-label">Aktif</div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-badges"
        >
          <span className="badge">🛡️ Security Education</span>
          <span className="badge">🔧 Security Tools</span>
          <span className="badge">📰 Real-time News</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
};

export default Hero;
