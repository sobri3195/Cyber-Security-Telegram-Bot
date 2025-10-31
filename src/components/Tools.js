import React from 'react';
import { motion } from 'framer-motion';
import './Tools.css';

const Tools = () => {
  const tools = [
    {
      name: 'Burp Suite',
      category: 'Web Security',
      description: 'Tool untuk testing keamanan aplikasi web',
      icon: '🕷️',
      color: '#ff6b35'
    },
    {
      name: 'Wireshark',
      category: 'Network Analysis',
      description: 'Analisis traffic jaringan secara mendalam',
      icon: '🦈',
      color: '#1e88e5'
    },
    {
      name: 'Metasploit',
      category: 'Penetration Testing',
      description: 'Framework untuk penetration testing',
      icon: '🎯',
      color: '#e53935'
    },
    {
      name: 'Nmap',
      category: 'Network Scanner',
      description: 'Scanning network dan port',
      icon: '🔍',
      color: '#43a047'
    },
    {
      name: 'John the Ripper',
      category: 'Password Cracking',
      description: 'Tool untuk crack password',
      icon: '🔓',
      color: '#fb8c00'
    },
    {
      name: 'OWASP ZAP',
      category: 'Web Security',
      description: 'Scanner keamanan aplikasi web',
      icon: '⚡',
      color: '#8e24aa'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="tools section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">🛠️ Security Tools</h2>
          <p className="section-subtitle">
            Tools keamanan yang direkomendasikan untuk pembelajaran cyber security
          </p>
        </motion.div>

        <motion.div
          className="tools-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="tool-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="tool-icon"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                {tool.icon}
              </motion.div>
              <h3 className="tool-name">{tool.name}</h3>
              <div 
                className="tool-category"
                style={{ 
                  background: `${tool.color}33`,
                  color: tool.color,
                  border: `1px solid ${tool.color}66`
                }}
              >
                {tool.category}
              </div>
              <p className="tool-description">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="tools-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://t.me/winlincommunity_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💬</span> Pelajari lebih lanjut di Bot
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
