# Isak Teklehaimanot Portfolio

A modern, responsive portfolio website built with pure HTML5, CSS3, and JavaScript. No frameworks, no build process - just upload and go!

## Features

- **Pure HTML/CSS/JS** - No dependencies, no build tools required
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - AOS library for scroll animations
- **Interactive Elements** - Particle background, animated skill bars, counter animations
- **Contact Form** - Ready to connect with visitors
- **Download CV** - Easy access to your resume

## File Structure

```
static-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All JavaScript functionality
├── images/
│   └── profile.jpg     # Your profile photo
├── CV_I.T.Teklehaimanot.pdf  # Your CV
└── README.md           # This file
```

## Deployment Options (All Free!)

### 1. GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be live at `https://yourusername.github.io/repository-name`

### 2. Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your folder
4. Your site is live instantly!

### 3. Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import from GitHub or upload files
4. Deploy instantly

### 4. Surge.sh

1. Install Surge: `npm install -g surge`
2. Navigate to your folder: `cd static-portfolio`
3. Run: `surge`
4. Follow the prompts

### 5. Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Customization

### Change Profile Photo
Replace `images/profile.jpg` with your own photo (recommended: 800x800px, square)

### Update CV
Replace `CV_I.T.Teklehaimanot.pdf` with your updated CV

### Edit Content
Open `index.html` and modify the text in each section:
- Hero section (name, title, description)
- About section (bio, personal info)
- Experience section (jobs, descriptions)
- Skills section (technologies, proficiency levels)
- Education section (degrees, certifications)
- Contact section (email, phone, location)

### Change Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --gold: #c9a962;  /* Change this to your preferred accent color */
    --gold-rgb: 201, 169, 98;
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- No external dependencies (except Google Fonts and Font Awesome CDN)
- Optimized images
- Lazy loading for animations
- Touch-friendly for mobile devices

## License

This portfolio template is free to use for personal and commercial projects.

---

**Created with ❤️ for Isak Teklehaimanot**
