# Alejandro Carrasco - Portfolio Website

A modern, responsive portfolio website showcasing AI research and robotics engineering work at MIT ARC Lab. Built with Astro and featuring a sophisticated design with animated elements and interactive components.

## 🚀 Live Demo

**Deployed Site:** [https://stalwart-tartufo-af17de.netlify.app](https://stalwart-tartufo-af17de.netlify.app)

## 🎯 Features

- **Modern Design**: Clean, professional layout with MIT ARC Lab visual identity
- **Responsive**: Optimized for all devices from mobile to desktop
- **Interactive Elements**: Animated hero section with particle background and rotating profile image contours
- **Research Focus**: Dedicated sections for publications, projects, awards, and affiliations
- **Performance Optimized**: Built with Astro for fast loading and excellent SEO

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Fonts**: Inter & JetBrains Mono from Google Fonts
- **Icons**: Font Awesome 6
- **Deployment**: Netlify
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.astro
│   ├── Hero.astro      # Main hero section with animated profile
│   ├── Publications.astro
│   ├── ProjectShowcase.astro
│   ├── AwardsList.astro
│   ├── Affiliations.astro
│   ├── Contact.astro
│   └── Footer.astro
├── data/               # Data files for content
│   ├── publications.js # Research publications and projects
│   ├── projects.js     # Project portfolio data
│   └── awards.js       # Awards and recognition
├── layouts/
│   └── Layout.astro    # Base layout template
├── pages/
│   └── index.astro     # Main page
└── styles/
    └── arclab-theme.css # Custom ARC Lab theme
```

## 🎨 Design Features

### Hero Section
- Animated particle background with star field effect
- Professional profile image with rotating violet contours on startup
- Hover glow effects with enhanced visual feedback
- Smooth scroll indicators and navigation

### Content Sections
- **Publications**: Filterable list of research papers with citation counts
- **Projects**: Showcase of research and personal projects with media
- **Awards**: Timeline of achievements and recognition
- **Affiliations**: Academic and professional connections

### Visual Identity
- MIT ARC Lab color scheme and branding
- Consistent typography with Inter and JetBrains Mono
- Professional card layouts with hover effects
- Responsive grid systems

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alejandro-carrasco-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 📝 Content Management

### Adding Publications
Edit `src/data/publications.js` to add new research papers:

```javascript
{
  id: "pub-2024-001",
  title: "Your Paper Title",
  authors: ["Author 1", "Author 2"],
  venue: "Conference/Journal Name",
  year: 2024,
  type: "conference", // journal, conference, workshop, preprint
  citations: 0,
  doi: "https://doi.org/...",
  abstract: "Paper abstract...",
  keywords: ["AI", "Robotics"]
}
```

### Adding Projects
Edit `src/data/projects.js` to showcase new projects:

```javascript
{
  id: "project-id",
  title: "Project Title",
  shortDescription: "Brief description",
  technologies: ["Python", "ROS", "AI"],
  category: "research", // research or personal
  status: "active", // active or completed
  media: {
    type: "video", // video, image, or poster
    url: "path/to/media"
  },
  links: {
    github: "https://github.com/...",
    demo: "https://demo.url",
    paper: "https://paper.url"
  }
}
```

### Adding Awards
Edit `src/data/awards.js` to include new achievements:

```javascript
{
  id: "award-id",
  title: "Award Title",
  organization: "Awarding Organization",
  year: 2024,
  category: "research", // research, fellowship, funding, academic
  description: "Award description",
  icon: "🏆"
}
```

## 🎯 Customization

### Colors and Branding
The site uses a custom ARC Lab theme defined in `src/styles/arclab-theme.css`. Key variables:

```css
:root {
  --arclab-primary: #0f1419;
  --arclab-accent: #2563eb;
  --arclab-blue: #3b82f6;
  --arclab-cyan: #06b6d4;
}
```

### Animations
The hero section features custom animations:
- Particle background system
- Rotating profile image contours
- Hover glow effects
- Smooth scroll indicators

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔧 Performance

- **Astro**: Static site generation for optimal performance
- **Image Optimization**: Responsive images with proper loading
- **CSS**: Minimal, utility-first approach with Tailwind
- **JavaScript**: Minimal client-side JS for animations only

## 📄 License

This project is for portfolio purposes. Please respect the academic content and research citations.

## 👤 About

**Alejandro Carrasco**  
AI Researcher & Robotics Engineer  
MIT ARC Lab  
📧 acarrasco@mit.edu  
🔗 [Google Scholar](https://scholar.google.com/citations?user=6KamS70AAAAJ&hl=en)

---

Built with ❤️ using Astro and deployed on Netlify
