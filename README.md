# Opto Privacy Policy Website

This repository contains the privacy policy website for [Opto](https://optophoto.com), a photo organization app designed with privacy at its core.

## 🌐 Live Site

The privacy policy is hosted at: **[www.optophoto.com/privacy](https://www.optophoto.com/privacy)**

## 📋 About

This website dynamically loads and displays the privacy policy from the `PRIVACY_POLICY.md` file using:
- **Vanilla HTML/CSS/JavaScript** for fast loading and simplicity
- **Responsive design** optimized for both desktop and mobile
- **Automatic dark/light theme** detection based on user's system preference
- **Opto brand styling** with gradient logo and consistent design language

## 🎨 Design System

The website follows the [Opto Brand Design System](OPTO_BRAND_DESIGN_SYSTEM-temp-2025-09-22.md) with:
- Blue to purple gradient branding (`#007AFF` → `#AF52DE`)
- Dark mode: `#1A1D26` background, `#2A2B36` cards
- Light mode: `#FEFCF7` background, `#FFFFFF` cards
- SF Pro font family with Inter fallback
- Mobile-first responsive design

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/finbarallan/Project-Privacy.git
   cd Project-Privacy
   ```

2. **Serve locally:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have npx)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000`

## 📝 Updating the Privacy Policy

1. **Edit the markdown file:**
   ```bash
   # Edit the privacy policy content
   vim PRIVACY_POLICY.md
   ```

2. **Commit and push changes:**
   ```bash
   git add PRIVACY_POLICY.md
   git commit -m "Update privacy policy"
   git push origin main
   ```

3. **GitHub Pages will automatically deploy** the changes within a few minutes.

## 🏗️ Architecture

### File Structure
```
├── index.html              # Main page
├── styles.css              # Opto brand styling
├── script.js               # Markdown parser and interactivity
├── PRIVACY_POLICY.md       # Source of truth content
├── favicon.svg             # Opto icon
├── 404.html                # Custom 404 page
├── CNAME                   # Custom domain configuration
├── _config.yml             # GitHub Pages configuration
└── README.md               # This file
```

### Technology Stack
- **Frontend:** Vanilla HTML5, CSS3, ES6 JavaScript
- **Markdown Parser:** [marked.js](https://marked.js.org/)
- **Hosting:** GitHub Pages
- **Domain:** Custom domain via CNAME
- **Theme System:** CSS custom properties with `prefers-color-scheme`

### Key Features
- 📱 **Mobile-responsive** design
- 🌙 **Automatic dark/light theme** switching
- ⚡ **Fast loading** with minimal dependencies
- 🎨 **Brand-consistent** styling
- 📝 **Markdown-driven** content management
- 🔗 **Automatic anchor links** for headers
- 🚀 **SEO optimized** with proper meta tags

## 🌍 Domain Configuration

The site is configured to serve from `www.optophoto.com/privacy` using:
- **CNAME file** pointing to `www.optophoto.com`
- **DNS A records** pointing to GitHub Pages IPs
- **GitHub Pages custom domain** configuration

### DNS Setup Required
To complete the domain setup, configure these DNS records:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     finbarallan.github.io
```

## 🔮 Future Enhancements

The site is structured to easily support:
- **Terms of Service** page at `/termsofservice`
- **About page** at `/about`
- **Additional legal documents**
- **Multi-language support**
- **Contact forms**

## 📧 Contact

For questions about this website or Opto's privacy practices:
- **Email:** [contact@optophoto.com](mailto:contact@optophoto.com)
- **Developer:** Finbar

## 📄 License

The privacy policy content is proprietary to Opto. The website code structure may be used as reference for similar projects.

---

*Built with ❤️ for privacy-focused photo organization*