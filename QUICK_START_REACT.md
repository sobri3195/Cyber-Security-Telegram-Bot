# ⚡ Quick Start - React Frontend

Panduan cepat untuk menjalankan dan mengembangkan React frontend.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Buka browser: http://localhost:3000

### 3. Build Production
```bash
npm run build
```
Output: folder `build/`

### 4. Preview Build
```bash
npx serve -s build
```
Buka browser: http://localhost:3000

## 📁 Struktur Project

```
cyber-security-telegram-bot/
├── src/                      # Source code React
│   ├── App.js               # Main component
│   ├── App.css              # Global styles
│   ├── index.js             # Entry point
│   ├── index.css            # Base styles
│   └── components/          # React components
│       ├── ParticlesBackground.js  # Animated background
│       ├── Hero.js                 # Hero section
│       ├── Features.js             # Features showcase
│       ├── Commands.js             # Commands list
│       ├── Tools.js                # Security tools
│       └── Footer.js               # Footer
├── public/                   # Static files
│   ├── index.html           # HTML template
│   └── manifest.json        # PWA manifest
├── netlify/                  # Netlify serverless
│   └── functions/           # Backend functions
│       ├── webhook.js       # Bot logic
│       ├── health.js        # Health check
│       └── setup-webhook.js # Webhook setup
├── build/                    # Production build (generated)
├── netlify.toml             # Netlify config
└── package.json             # Dependencies

```

## 🎨 Komponen & Animasi

### Hero Section
```javascript
import Hero from './components/Hero';

// Features:
// - Floating logo animation
// - CTA buttons with hover effects
// - Statistics display
// - Scroll indicator
```

### Features Cards
```javascript
import Features from './components/Features';

// Features:
// - 4 feature cards
// - Stagger animation on scroll
// - 3D hover effects
// - Animated icons
```

### Commands List
```javascript
import Commands from './components/Commands';

// Features:
// - Category filtering
// - Smooth transitions
// - 17+ bot commands
// - Icon + description
```

### Tools Showcase
```javascript
import Tools from './components/Tools';

// Features:
// - Security tools grid
// - Animated icons
// - Color-coded categories
// - CTA button
```

## 🎯 Customize

### Ubah Warna
Edit `src/index.css`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Tambah Command
Edit `src/components/Commands.js`:
```javascript
const commands = [
  // ... existing commands
  { 
    cmd: '/newcmd', 
    desc: 'Description', 
    category: 'tools', 
    icon: '🎯' 
  }
];
```

### Ubah Animasi
Edit motion props di component:
```javascript
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
>
```

## 🛠️ Development Tools

### React DevTools
Install extension:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Netlify Dev
Run full environment locally:
```bash
npm run netlify-dev
```
- Frontend: http://localhost:8888
- Functions: http://localhost:8888/.netlify/functions/

## 📊 Build Analysis

### View Bundle Size
```bash
npm run build

# Output shows:
# File sizes after gzip:
#   84.87 kB  build/static/js/main.48cdf6e3.js
#   2.47 kB   build/static/css/main.e468fefc.css
```

### Optimize Bundle
Sudah optimal dengan:
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking
- ✅ Gzip compression

## 🎭 Animation Library

### Framer Motion
```bash
# Already installed
npm list framer-motion
```

### Basic Usage
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Effects
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Scroll Animations
```javascript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build Failed
```bash
# Clear cache
rm -rf node_modules build
npm install
npm run build
```

### Animation Laggy
Check browser performance. Reduce particle count di `ParticlesBackground.js`:
```javascript
// Line ~48
const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);
// Increase divider (15000 -> 20000) untuk less particles
```

## 📚 Learn More

### React
- [React Docs](https://react.dev/)
- [React Tutorial](https://react.dev/learn)

### Framer Motion
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)

### Create React App
- [CRA Docs](https://create-react-app.dev/)
- [Deployment](https://create-react-app.dev/docs/deployment/)

## 🎯 Next Steps

1. ✅ Customize colors & branding
2. ✅ Add more commands
3. ✅ Optimize animations
4. ✅ Test on mobile devices
5. ✅ Deploy to Netlify
6. ✅ Setup custom domain
7. ✅ Monitor analytics

## 💡 Pro Tips

### Performance
- Use `React.memo` untuk prevent unnecessary re-renders
- Lazy load heavy components
- Optimize images (jika ada)
- Use production build untuk deploy

### Animations
- Keep animations under 500ms untuk snappy feel
- Use `ease-out` untuk enter animations
- Use `ease-in` untuk exit animations
- Test on low-end devices

### Code Quality
- Follow React best practices
- Use ESLint recommendations
- Keep components small & focused
- Write semantic HTML

## 🆘 Need Help?

- **Documentation:** See `REACT_FRONTEND.md`
- **Deployment:** See `DEPLOY_GUIDE.md`
- **Issues:** Create issue on GitHub
- **Email:** muhammadsobrimaulana31@gmail.com

---

**Happy Coding! 🚀**
