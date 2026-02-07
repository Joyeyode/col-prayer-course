# Deployment Options

Your COL Prayer Course app can be deployed to production in several ways.

## Option 1: Vercel (Recommended - Free & Easy)

Vercel is optimized for Vite apps. Deploy for free with Git.

### Steps:
1. Create a GitHub account (if you don't have one)
2. Push your project to GitHub
3. Go to [vercel.com](https://vercel.com)
4. Click "New Project"
5. Select your GitHub repository
6. Click "Deploy"

Done! Your app is live with a free `*.vercel.app` domain.

### Link a custom domain:
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `prayercourse.com`)

---

## Option 2: Netlify (Free & Easy)

Another great free hosting option.

### Steps:
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub
5. Leave build settings default (Vite is auto-detected)
6. Click "Deploy site"

Your app is live instantly!

---

## Option 3: GitHub Pages (Free)

Deploy directly from GitHub with GitHub Pages.

### Steps:
1. Create a GitHub account
2. Create a new repository named `yourusername.github.io`
3. Push this project to that repository
4. In repository settings, enable GitHub Pages
5. Your site is live at `yourusername.github.io`

---

## Option 4: Self-hosting (Advanced)

Host on your own server (AWS, DigitalOcean, etc.)

### Build the app:
```bash
npm run build
```

### Deploy the `dist/` folder to your server

### Using nginx (example config):
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/prayer-course;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Option 5: Docker (For containers)

### Create a Dockerfile:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and run:
```bash
docker build -t prayer-course-app .
docker run -p 80:80 prayer-course-app
```

---

## Environment Variables

If you need to add environment variables (API keys, API endpoints, etc.):

### Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_PRAYER_API_KEY=your_key_here
```

### Use in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Performance Tips

### Before deploying:
1. Run build: `npm run build`
2. Check bundle size: `npm run build` (check dist/ folder)
3. Test production build: `npm run preview`

### Optimize your app:
```bash
# Analyze bundle
npx vite-plugin-visualizer
```

### Result:
- ~50KB gzipped for this app (very fast!)
- Light on resources
- Quick loading on all devices

---

## Pre-deployment Checklist

- [ ] Test all features locally (`npm run dev`)
- [ ] Test production build (`npm run build && npm run preview`)
- [ ] Update course content (add weeks 3-10)
- [ ] Customize branding/colors if needed
- [ ] Test on mobile devices
- [ ] Check for console errors (F12)
- [ ] Update `index.html` title/meta tags
- [ ] Review privacy/terms if needed
- [ ] Add your own favicon
- [ ] Set up analytics (optional)

---

## After Deployment

### Monitor your app:
- Check error logs
- Monitor performance
- Collect user feedback
- Add Google Analytics (optional)

### Google Analytics Setup (Optional):
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your measurement ID
3. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Recommended Deployment Path

For COL Prayer Ministry:

1. **Start:** Deploy to Vercel (easiest, free, auto-updates)
2. **Custom Domain:** Add your church domain
3. **Monitor:** Use built-in analytics
4. **Share:** Distribute link to your community

**Total cost:** $0 (if using free tier with custom domain)

---

## Troubleshooting Deployment

### App shows blank page?
- Check browser console for errors (F12)
- Verify all files were deployed
- Clear browser cache

### Routes not working?
- Make sure your hosting supports SPA (single page app) redirects
- Ensure `index.html` fallback is configured
- Check routing paths are correct

### Styles look wrong?
- Clear cache and hard refresh (Ctrl+Shift+R)
- Check CSS files are loading (F12 Network tab)
- Verify all imports are correct

### Data not loading?
- Check if localStorage is working
- Verify no CORS issues
- Check browser console for errors

---

## Contact & Support

For deployment questions:
- Check the hosting provider's documentation
- Review Vite deployment guide: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy.html)
- Test locally first: `npm run dev`

---

## Quick Deploy Commands

### Vercel:
```bash
npm install -g vercel
vercel
```

### Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages:
```bash
# See your repo settings
# Enable GitHub Pages from the Settings tab
```

---

Happy deploying! 🚀

Your prayer course app will soon be reaching others in your community! 🙏
