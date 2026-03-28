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