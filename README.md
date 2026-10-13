# Personal Portfolio Website - Madhavendra Pratap Singh Gautam

A modern, responsive, and accessible personal portfolio website built with clean HTML5, CSS3, and vanilla JavaScript. Features dark/light theme switching, smooth scrolling, interactive cards, mobile drawer navigation, and a copy-to-clipboard email badge.

---

## 🚀 How to Preview the Site Locally

You have three easy ways to preview your website on your computer:

### Option 1: Direct File Preview (Fastest & Zero Setup)
1. Open your file explorer and navigate to this folder: `e:\antigaravityy`.
2. Double-click **`index.html`**.
3. It will immediately open and run in your default web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: VS Code Live Server (Recommended for Live Editing)
1. Open this folder in **VS Code**.
2. Install the **"Live Server"** extension (by *Ritwick Dey*) from the Extensions tab (`Ctrl + Shift + X`).
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. Any time you make an edit and save, your browser will reload automatically!

### Option 3: Using Python Built-in Web Server
If you have Python installed, open your terminal/command prompt in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🛠️ How to Edit Your Information

All your text, links, and projects are centralized in [`index.html`](index.html). Here is an exact breakdown of what to edit:

### 1. Updating Social Profile Links
Search for `EDIT HERE` in [`index.html`](index.html):
- **Hero & Contact Social Links**:
  - Replace `https://github.com` with your exact GitHub username profile URL (e.g. `https://github.com/madhavendra-psg`).
  - Replace `https://linkedin.com` with your LinkedIn profile URL (e.g. `https://linkedin.com/in/madhavendra-gautam`).

### 2. Updating About Me & Education
- Look for `<section id="about">` in [`index.html`](index.html).
- You can update your university details, semesters, or personal introduction paragraph inside `<p class="about-text">`.

### 3. Adding or Updating Skills
- Look for `<section id="skills">` in [`index.html`](index.html).
- To add a new skill, simply add a new `<span class="skill-pill">` tag inside any category card:
  ```html
  <span class="skill-pill"><i data-lucide="code"></i> Java</span>
  ```

### 4. Updating or Adding Projects
- Look for `<section id="projects">` in [`index.html`](index.html).
- Each project is wrapped inside an `<article class="project-card">` block:
  - **Title**: Inside `<h3 class="project-title">`
  - **Description**: Inside `<p class="project-desc">`
  - **Tags**: Inside `<div class="project-tags">`
  - **GitHub URL**: In `<a class="project-btn project-btn-outline" href="YOUR_GITHUB_LINK">`
  - **Live Demo URL**: In `<a class="project-btn project-btn-primary" href="YOUR_DEMO_LINK">`
- To add a new project, simply copy an existing `<article class="project-card">...</article>` block and paste it below.

### 5. Customizing Colors & Theme
- Open [`css/style.css`](css/style.css).
- Under `:root`, you will find all the color variables (e.g., `--accent-primary`, `--bg-primary`, `--accent-secondary`). You can tweak hex values to adjust the colors to your liking.

---

## 🌐 Deploying to GitHub Pages (Free & Takes 2 Minutes)

Because this website is built with vanilla HTML, CSS, and JavaScript, **no complex build or compiler setup is required**. It deploys natively to GitHub Pages!

### Step 1: Push your code to a GitHub repository
1. Go to [GitHub](https://github.com) and create a new public repository (for example, named `portfolio` or `<your-username>.github.io`).
2. In your local terminal inside `e:\antigaravityy`, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages in your Repository Settings
1. Open your repository on GitHub in your web browser.
2. Click on the **Settings** tab at the top.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and keep the folder as `/ (root)`.
   - Click **Save**.
5. Wait about 30 to 60 seconds, and GitHub will provide you with your live URL:
   ```text
   https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
   ```

---

## 📁 File Structure

```text
e:/antigaravityy/
├── index.html        # Main semantic website structure & content
├── css/
│   └── style.css     # Responsive design, color themes, glassmorphism, animations
├── js/
│   └── script.js     # Dark/light theme toggle, mobile drawer, scroll animations, copy email
└── README.md         # Documentation, local preview guide, and deployment manual
```
