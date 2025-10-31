import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '📚',
      title: 'Edukasi & Informasi',
      description: 'Pelajari dasar-dasar cyber security, tips keamanan, dan kamus istilah lengkap',
      items: ['Materi Dasar', 'Tips Harian', 'Kamus 30+ Istilah', 'Kuis Interaktif']
    },
    {
      icon: '🛡️',
      title: 'Tools Keamanan',
      description: 'Alat-alat praktis untuk cek keamanan password, deteksi phishing, dan enkripsi',
      items: ['Cek Password', 'Deteksi Phishing', 'Enkripsi Base64', 'URL Scanner']
    },
    {
      icon: '📰',
      title: 'Berita & Update',
      description: 'Dapatkan berita cyber security terbaru dan rekomendasi tools keamanan',
      items: ['RSS News', 'Security Tools', 'Event Terbaru', 'Trending Topics']
    },
    {
      icon: '🚨',
      title: 'Keamanan & Laporan',
      description: 'Panduan pelaporan insiden dan checklist keamanan untuk bisnis',
      items: ['Lapor Insiden', 'Security Checklist', 'Business Tips', 'Simulasi Phishing']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="features section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">✨ Fitur Unggulan</h2>
          <p className="section-subtitle">
            Lebih dari 20 fitur lengkap untuk pembelajaran dan praktik cyber security
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="feature-icon"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-items">
                {feature.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <span className="item-check">✓</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
