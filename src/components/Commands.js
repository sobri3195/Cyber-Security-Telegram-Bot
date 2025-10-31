import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Commands.css';

const Commands = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const commands = [
    { cmd: '/start', desc: 'Menu utama dan sambutan', category: 'basic', icon: '🚀' },
    { cmd: '/help', desc: 'Daftar perintah lengkap', category: 'basic', icon: '❓' },
    { cmd: '/basic', desc: 'Penjelasan dasar cyber security', category: 'education', icon: '📚' },
    { cmd: '/tips', desc: 'Tips keamanan harian acak', category: 'education', icon: '💡' },
    { cmd: '/glossary [istilah]', desc: 'Kamus cyber security', category: 'education', icon: '📖' },
    { cmd: '/quiz', desc: 'Kuis cyber security interaktif', category: 'education', icon: '🎯' },
    { cmd: '/phishing [url]', desc: 'Deteksi link mencurigakan', category: 'tools', icon: '🔍' },
    { cmd: '/checkpass [password]', desc: 'Cek kekuatan password', category: 'tools', icon: '🔑' },
    { cmd: '/encrypt [teks]', desc: 'Enkripsi teks ke Base64', category: 'tools', icon: '🔐' },
    { cmd: '/decrypt [teks]', desc: 'Dekripsi teks dari Base64', category: 'tools', icon: '🔓' },
    { cmd: '/news', desc: 'Berita cyber security terbaru', category: 'news', icon: '📰' },
    { cmd: '/tools', desc: 'Daftar tools keamanan', category: 'tools', icon: '🛠️' },
    { cmd: '/events', desc: 'Event cyber security terbaru', category: 'news', icon: '📅' },
    { cmd: '/report', desc: 'Cara lapor insiden siber', category: 'security', icon: '🚨' },
    { cmd: '/checklist', desc: 'Checklist keamanan lengkap', category: 'security', icon: '✅' },
    { cmd: '/simulate phishing', desc: 'Simulasi serangan phishing', category: 'security', icon: '⚠️' },
    { cmd: '/business', desc: 'Tips keamanan bisnis', category: 'security', icon: '💼' }
  ];

  const categories = [
    { id: 'all', label: 'Semua', icon: '📋' },
    { id: 'basic', label: 'Dasar', icon: '🚀' },
    { id: 'education', label: 'Edukasi', icon: '📚' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'news', label: 'Berita', icon: '📰' },
    { id: 'security', label: 'Keamanan', icon: '🔒' }
  ];

  const filteredCommands = selectedCategory === 'all' 
    ? commands 
    : commands.filter(cmd => cmd.category === selectedCategory);

  return (
    <section id="commands" className="commands section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">📖 Daftar Perintah</h2>
          <p className="section-subtitle">
            Perintah-perintah yang dapat Anda gunakan di bot Telegram
          </p>
        </motion.div>

        <motion.div
          className="category-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="commands-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCommands.map((command, index) => (
              <motion.div
                key={command.cmd}
                className="command-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="command-icon">{command.icon}</div>
                <div className="command-content">
                  <div className="command-name">{command.cmd}</div>
                  <div className="command-desc">{command.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Commands;
