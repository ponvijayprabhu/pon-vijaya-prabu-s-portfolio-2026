# Pon Vijaya Prabu S — UI/UX Designer Portfolio

Modern, high-performance portfolio website built with React, Vite, Tailwind CSS, and Motion.

## 🚀 Live Demo
- **Shared App URL**: [https://ais-pre-4a46b3ntj2knwj6jm2e2wu-165754989244.asia-east1.run.app](https://ais-pre-4a46b3ntj2knwj6jm2e2wu-165754989244.asia-east1.run.app)

---

## 📦 How to Deploy on GitHub Pages

The repository is already configured with relative asset paths (`base: './'`) and a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/new) and create a new repository (e.g. `portfolio` or `ponvijayprabhu.github.io`).

### Step 2: Push your code to GitHub
Run the following commands in your project terminal:

```bash
git init
git add .
git commit -m "Initial commit: UI/UX Portfolio for Pon Vijaya Prabu S"
git branch -M main
git remote add origin https://github.com/ponvijayprabhu/portfolio.git
git push -u origin main
```
*(Replace `portfolio.git` with your repository name if different)*

### Step 3: Enable GitHub Pages in 2 clicks
1. Open your repository on GitHub.
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. That's it! GitHub will automatically trigger the included workflow in `.github/workflows/deploy.yml` and publish your live website at:
   `https://ponvijayprabhu.github.io/portfolio/` (or `https://ponvijayprabhu.github.io/`).

---

## ⚡ Alternative One-Click Deploy (Vercel / Netlify)
You can also import this GitHub repository directly into **Vercel** or **Netlify**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
