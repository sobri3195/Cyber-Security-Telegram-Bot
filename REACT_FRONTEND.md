# 🎨 React Frontend - Cyber Security Bot

Frontend animasi interaktif untuk Cyber Security Telegram Bot yang dibangun dengan React dan Framer Motion.

## 🌟 Fitur Frontend

### ✨ Animasi & Interaksi
- **Loading Screen** dengan animasi logo rotasi
- **Particles Background** dengan efek jaringan interaktif
- **Hero Section** dengan floating animation
- **Features Cards** dengan hover effects dan stagger animation
- **Command List** dengan filter kategori dan smooth transitions
- **Tools Grid** dengan animated icons
- **Footer** dengan wave animation

### 🎯 Komponen Utama

#### 1. Hero Section
- Logo animasi floating
- Tombol CTA dengan hover effects
- Statistik real-time (20+ Fitur, 30+ Istilah, 24/7 Aktif)
- Badge kategori
- Scroll indicator

#### 2. Features Section
- 4 kartu fitur utama dengan animasi
- Icon yang beranimasi
- Hover effect dengan 3D transform
- Stagger animation saat scroll

#### 3. Commands Section
- Filter berdasarkan kategori (Semua, Dasar, Edukasi, Tools, Berita, Keamanan)
- 17+ perintah bot dengan icon dan deskripsi
- Smooth transition antar kategori
- Responsive grid layout

#### 4. Tools Section
- 6 security tools populer
- Animated icons dengan rotation
- Color-coded categories
- CTA button ke bot

#### 5. Footer
- Informasi developer
- Link ke GitHub, Telegram, dan Donasi
- Statistik dan quick links
- Wave animation background

## 🚀 Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000`

### Build Production
```bash
npm run build
```
Output akan ada di folder `build/`

### Preview Build
```bash
npm install -g serve
serve -s build
```

## 📦 Dependencies

### Production
- **react** (^18.2.0) - Core React library
- **react-dom** (^18.2.0) - React DOM renderer
- **react-scripts** (5.0.1) - Create React App scripts
- **framer-motion** (^10.16.4) - Animation library
- **node-fetch** (^2.6.7) - HTTP client untuk functions
- **xml2js** (^0.5.0) - XML parser untuk RSS

### DevDependencies
- **netlify-cli** (^15.0.0) - Netlify development tools

## 🎨 Styling

### Design System
- **Primary Colors**: Gradient purple-blue (#667eea to #764ba2)
- **Typography**: Inter font family
- **Glassmorphism**: Backdrop blur effects untuk cards
- **Shadows**: Layered shadows untuk depth
- **Border Radius**: Rounded corners (15px-50px)

### Responsive Design
- Desktop: Grid layouts dengan multiple columns
- Tablet: Adaptive grid
- Mobile: Single column, optimized touch targets

### Animation System
- **Entry Animations**: Fade in + slide up
- **Hover Effects**: Scale, rotate, shadow
- **Scroll Animations**: Stagger children, viewport triggers
- **Loading States**: Spinner dengan rotation
- **Transitions**: Smooth easing functions

## 🏗️ Project Structure

```
src/
├── App.js                 # Main app component
├── App.css               # Global app styles
├── index.js              # React entry point
├── index.css             # Global styles
└── components/
    ├── ParticlesBackground.js   # Animated background
    ├── ParticlesBackground.css
    ├── Hero.js                  # Hero section
    ├── Hero.css
    ├── Features.js              # Features showcase
    ├── Features.css
    ├── Commands.js              # Commands list
    ├── Commands.css
    ├── Tools.js                 # Security tools
    ├── Tools.css
    ├── Footer.js                # Footer section
    └── Footer.css

public/
├── index.html            # HTML template
└── manifest.json         # PWA manifest
```

## 🌐 Deployment ke Netlify

### Via Netlify Dashboard
1. Push ke GitHub repository
2. Connect repository di Netlify
3. Build settings otomatis terbaca dari `netlify.toml`
4. Deploy!

### Via Netlify CLI
```bash
# Login
netlify login

# Deploy
npm run deploy
```

### Environment Variables (Netlify)
Set di Netlify dashboard:
- `BOT_TOKEN` - Token bot Telegram
- `WEBHOOK_URL` - URL deployment Netlify

## 🎯 Performance

### Optimizations
- Code splitting dengan React lazy loading
- Image optimization (jika ada)
- CSS minification
- JavaScript minification
- Gzip compression via Netlify

### Build Output
- Main JS bundle: ~85kb (gzipped)
- Main CSS bundle: ~2.5kb (gzipped)
- Total load time: < 2 seconds

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Mengganti Warna
Edit gradient di `src/index.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Menambah Command
Edit array `commands` di `src/components/Commands.js`:
```javascript
{ 
  cmd: '/newcommand', 
  desc: 'Deskripsi command', 
  category: 'tools', 
  icon: '🎯' 
}
```

### Mengubah Animasi
Edit motion properties di komponen:
```javascript
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 2 }}
>
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Create React App](https://create-react-app.dev/)

## 🐛 Troubleshooting

### Build Error
```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

### Animation Not Working
Check browser support untuk Framer Motion. Update browser ke versi terbaru.

### Deploy Failed
1. Check `netlify.toml` configuration
2. Verify build command: `npm run build`
3. Check publish directory: `build`
4. Review Netlify deploy logs

## 📄 License

MIT License - Free to use and modify

---

**Dibuat dengan ❤️ menggunakan React + Framer Motion**
