# Complete Project Learning Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [How React Works](#how-react-works)
5. [Understanding Components](#understanding-components)
6. [Styling System](#styling-system)
7. [Data Management](#data-management)
8. [Common Tasks & How-Tos](#common-tasks--how-tos)
9. [Neural Network Background Explained](#neural-network-background-explained)
10. [Troubleshooting](#troubleshooting)

---

## 1. Project Overview

### What is this project?
This is a **GenAI Lab website** - a portfolio/research website built with modern web technologies. It showcases:
- Research areas and projects
- Team members
- Publications
- Events
- Contact form

### What makes it special?
- **React-based**: Uses components (reusable building blocks)
- **Vite**: Super fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Animated Neural Network**: Custom canvas animation in the hero section

---

## 2. Technology Stack

### Core Technologies

#### React
**What it is:** A JavaScript library for building user interfaces using components.

**Why we use it:**
- Build reusable UI pieces (components)
- Automatically updates the page when data changes
- Makes complex UIs manageable

**Key concepts:**
- **Components**: Reusable pieces of UI (like Lego blocks)
- **Props**: Data passed from parent to child component
- **State**: Data that can change over time
- **Hooks**: Special functions (useState, useEffect, useRef)

#### Vite
**What it is:** A build tool that makes development super fast.

**What it does:**
- Starts a local development server
- Hot-reloads your changes instantly
- Builds optimized production files

**Commands:**
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
```

#### Tailwind CSS
**What it is:** A CSS framework with pre-made utility classes.

**Example:**
```html
<!-- Instead of writing CSS -->
<div class="bg-blue-500 text-white p-4 rounded">

<!-- Tailwind provides classes for common styles -->
```

**In this project:** We use mostly custom CSS in `index.css`, but Tailwind is available.

---

## 3. Project Structure

```
d:\GenAi lab\
│
├── public/               # Static files (images, fonts)
│   └── gifs/            # Project demo GIFs
│
├── src/                 # Source code
│   ├── assets/          # Images and media
│   │   └── images/
│   │
│   ├── components/      # React components (UI pieces)
│   │   ├── About.jsx
│   │   ├── CallFab.jsx
│   │   ├── Collaborators.jsx
│   │   ├── Contact.jsx
│   │   ├── Events.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx          ← Neural network is here!
│   │   ├── Img.jsx
│   │   ├── Navbar.jsx
│   │   ├── Partners.jsx
│   │   ├── Process.jsx
│   │   ├── Projects.jsx
│   │   ├── Publications.jsx
│   │   ├── ResearchAreas.jsx
│   │   ├── Solutions.jsx
│   │   ├── SuccessStories.jsx
│   │   └── Team.jsx
│   │
│   ├── data/
│   │   └── content.js    ← All text, images, links stored here
│   │
│   ├── pages/
│   │   ├── Home.jsx      ← Main page that combines all sections
│   │   └── ProjectPage.jsx
│   │
│   ├── services/
│   │   └── api.js        ← Backend communication
│   │
│   ├── App.jsx           ← Root component
│   ├── main.jsx          ← Entry point
│   ├── index.css         ← All styles (including neural network)
│   └── project-main.jsx
│
├── index.html           # Main HTML file
├── project.html         # Project detail page HTML
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── README.md            # Project documentation
└── LEARNING_GUIDE.md    # This file!
```

### File Types Explained

- **`.jsx`**: React component files (JavaScript + HTML-like syntax)
- **`.js`**: Regular JavaScript files
- **`.css`**: Stylesheet files
- **`.json`**: Configuration/data files
- **`.html`**: HTML entry points

---

## 4. How React Works

### Component Structure

A React component is a JavaScript function that returns HTML-like code:

```jsx
// Simple component
function Greeting() {
  return <h1>Hello World!</h1>;
}

// Component with props (input data)
function Greeting({ name }) {
  return <h1>Hello {name}!</h1>;
}

// Usage
<Greeting name="Amna" />  // Renders: Hello Amna!
```

### JSX Syntax

JSX looks like HTML but it's JavaScript:

```jsx
// HTML-like syntax in JavaScript
const element = (
  <div className="card">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);
```

**Key differences from HTML:**
- `className` instead of `class`
- `{variable}` to insert JavaScript values
- Self-closing tags need `/` (e.g., `<img />`)

### React Hooks

#### useState - Managing changing data

```jsx
import { useState } from "react";

function Counter() {
  // [currentValue, functionToUpdateValue] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

#### useEffect - Running code when component loads/updates

```jsx
import { useEffect } from "react";

function DataFetcher() {
  useEffect(() => {
    // This code runs when component mounts
    console.log("Component loaded!");

    // Cleanup function (runs when component unmounts)
    return () => {
      console.log("Component removed!");
    };
  }, []); // Empty array = run once on mount

  return <div>Data Fetcher</div>;
}
```

#### useRef - Accessing DOM elements directly

```jsx
import { useRef } from "react";

function CanvasComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access the actual DOM element
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Now you can draw on canvas
  }, []);

  return <canvas ref={canvasRef} />;
}
```

---

## 5. Understanding Components

### Component Hierarchy

```
App
└── Home
    ├── Navbar
    ├── Hero (contains neural network canvas)
    ├── Features
    ├── About
    ├── Partners
    ├── ResearchAreas
    ├── Contact
    ├── Process
    ├── Publications
    ├── Solutions
    ├── Projects
    ├── Events
    ├── Team
    ├── Collaborators
    │   └── SuccessStories
    ├── Footer
    └── CallFab
```

### Example: Breaking Down a Component

Let's look at `Hero.jsx` (simplified):

```jsx
// 1. Import statements - bring in dependencies
import { Fragment, useEffect, useRef, useState } from "react";
import Img from "./Img";
import { heroCards, tickerItems, heroStats } from "../data/content";

// 2. Component function - main building block
export default function Hero() {
  
  // 3. Component logic - variables, functions, hooks
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Canvas animation code here
  }, []);

  // 4. Return JSX - what gets rendered on screen
  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-neural-bg" />
      
      <div className="hero-top">
        <h1>Research that turns Generative AI into impact.</h1>
      </div>
      
      {/* More JSX here */}
    </section>
  );
}
```

### Props Example

**Parent component passing data:**
```jsx
function Home() {
  return (
    <div>
      <Navbar logo="GenAI Lab" />
      <Hero title="Welcome" subtitle="Research Lab" />
    </div>
  );
}
```

**Child component receiving data:**
```jsx
function Hero({ title, subtitle }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
```

---

## 6. Styling System

### How Styles Work in This Project

#### 1. Main Stylesheet: `src/index.css`

This file contains ALL styles, organized in sections:

```css
/* 1. Tailwind base */
@tailwind base;

/* 2. CSS Variables (Theme) */
:root {
  --c-brand: #7a0a4f;    /* Main brand color */
  --c-text: #4a2a3d;     /* Text color */
  /* ... more variables */
}

/* 3. Component styles */
.hero {
  min-height: 100vh;
  background: var(--bg);
  /* ... more styles */
}

.hero-neural-bg {
  position: absolute;
  inset: 0;
  opacity: 0.6;
}
```

#### 2. Changing Colors

**To change the entire site's color scheme:**

Edit the `:root` block in `src/index.css` (lines 15-64):

```css
:root {
  /* Change these colors */
  --c-brand: #7a0a4f;      /* Change to your brand color */
  --c-rose: #b0568a;       /* Secondary color */
  --c-ink: #2a0a1d;        /* Dark text color */
  --c-vapor: #fafafa;      /* Background color */
}
```

#### 3. CSS Classes Explained

```css
/* Class selector */
.hero {
  /* Styles for elements with class="hero" */
}

/* Multiple classes */
.hero.scrolled {
  /* Styles when element has both classes */
}

/* Child selector */
.hero .hero-top {
  /* Styles for .hero-top inside .hero */
}

/* Pseudo-classes */
.button:hover {
  /* Styles when hovering over button */
}
```

---

## 7. Data Management

### The content.js File

**Location:** `src/data/content.js`

This file stores ALL content (text, images, links) in one place.

**Why?** So you can change content without touching component code.

#### Structure Example:

```javascript
// Hero section data
export const heroCards = [
  {
    id: "hic-1",
    img: "https://example.com/image1.jpg",
    icon: "fas fa-brain",
    label: "Neural Networks"
  },
  // ... more cards
];

// Team members data
export const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead Researcher",
    spec: "NLP & Transformers",
    img: "/team/sarah.jpg"
  },
  // ... more members
];
```

#### How to Update Content:

**Example: Adding a team member**

1. Open `src/data/content.js`
2. Find `teamMembers` array
3. Add new object:

```javascript
export const teamMembers = [
  // ... existing members
  {
    name: "Your Name",
    role: "Your Role",
    spec: "Your Specialty",
    img: "/path/to/your/image.jpg"
  }
];
```

4. The `Team.jsx` component automatically displays it!

---

## 8. Common Tasks & How-Tos

### Task 1: Change Text on Homepage

**Example: Change hero heading**

1. Open `src/components/Hero.jsx`
2. Find the heading (around line 239-245):

```jsx
<h1 className="hero-h1">
  Research that
  <br />
  turns <span className="grad">Generative AI</span>
  <br />
  <span className="ghost">into impact.</span>
</h1>
```

3. Edit the text:

```jsx
<h1 className="hero-h1">
  Your New
  <br />
  Amazing <span className="grad">Headline</span>
  <br />
  <span className="ghost">goes here.</span>
</h1>
```

### Task 2: Add a New Team Member

1. Open `src/data/content.js`
2. Scroll to `teamMembers` array
3. Add new member object:

```javascript
{
  name: "John Doe",
  role: "Research Assistant",
  spec: "Computer Vision",
  img: "https://example.com/john.jpg"
}
```

### Task 3: Change Colors

1. Open `src/index.css`
2. Find `:root` section (lines 15-64)
3. Change color values:

```css
:root {
  --c-brand: #YOUR_COLOR_HEX;
  --c-rose: #YOUR_SECONDARY_COLOR;
}
```

### Task 4: Adjust Neural Network Animation Speed

1. Open `src/components/Hero.jsx`
2. Find the Node constructor (around line 34)
3. Change frequency values (lines 46-47):

```javascript
// Slower
this.frequencyX = 0.0003 + (index % 5) * 0.00005;
this.frequencyY = 0.0004 + (index % 7) * 0.00006;

// Faster
this.frequencyX = 0.0009 + (index % 5) * 0.00015;
this.frequencyY = 0.0012 + (index % 7) * 0.00018;
```

### Task 5: Add a New Section

1. **Create component file:** `src/components/NewSection.jsx`

```jsx
export default function NewSection() {
  return (
    <section className="new-section">
      <div className="container">
        <h2>New Section Title</h2>
        <p>Content goes here</p>
      </div>
    </section>
  );
}
```

2. **Add styles:** In `src/index.css`

```css
.new-section {
  padding: 100px 64px;
  background: var(--bg);
}
```

3. **Import and use:** In `src/pages/Home.jsx`

```jsx
import NewSection from "../components/NewSection";

// Add to the return statement
return (
  <>
    <Navbar />
    <Hero />
    <NewSection />  {/* Add here */}
    <Features />
    {/* ... rest */}
  </>
);
```

---

## 9. Neural Network Background Explained

### What It Is

The neural network is an **animated canvas element** in the hero section that shows:
- Glowing nodes (circles)
- Connection lines between nearby nodes
- Smooth floating animation
- Interactive hover effect

### File Locations

**Component:** `src/components/Hero.jsx` (lines 11-220)
**Styles:** `src/index.css` (lines 203-209)

### How It Works

#### 1. Canvas Setup

```javascript
// Create reference to canvas element
const canvasRef = useRef(null);

// In JSX
<canvas ref={canvasRef} className="hero-neural-bg" />
```

#### 2. Animation Loop Structure

```javascript
useEffect(() => {
  // 1. Get canvas and context
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // 2. Create nodes
  const nodes = [];
  // Initialize nodes with positions

  // 3. Animation function
  const animate = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update nodes
    nodes.forEach(node => node.update());

    // Draw connections
    drawConnections();

    // Draw nodes
    nodes.forEach(node => node.draw());

    // Repeat
    requestAnimationFrame(animate);
  };

  // 4. Start animation
  animate();

  // 5. Cleanup
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, []);
```

#### 3. Node Class Explained

```javascript
class Node {
  constructor(x, y, index) {
    // Base position (where node returns to)
    this.baseX = x;
    this.baseY = y;

    // Current position
    this.x = x;
    this.y = y;

    // Animation properties
    this.frequencyX = 0.0006 + (index % 5) * 0.0001;
    this.frequencyY = 0.0008 + (index % 7) * 0.00012;
    this.amplitudeX = 3 + (index % 3);
    this.amplitudeY = 5 + (index % 4);
  }

  update() {
    // Calculate floating offset using sine wave
    const floatX = Math.sin(time * this.frequencyX) * this.amplitudeX;
    const floatY = Math.sin(time * this.frequencyY) * this.amplitudeY;

    // Update position
    this.x = this.baseX + floatX;
    this.y = this.baseY + floatY;
  }

  draw() {
    // Draw node on canvas
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

### Key Animation Concepts

#### Sine Waves
**What:** Mathematical function that creates smooth wave motion
**Why:** Creates natural, flowing movement

```javascript
Math.sin(time * frequency) * amplitude
//       ↑           ↑           ↑
//    Current    How fast   How far
//     time     it moves   it moves
```

#### Delta Time
**What:** Time elapsed between frames
**Why:** Ensures consistent speed regardless of frame rate

```javascript
const deltaTime = currentTime - lastFrameTime;
time += deltaTime;  // Animation progresses smoothly
```

#### Canvas Drawing
**What:** HTML5 Canvas API for drawing graphics
**Key methods:**
- `ctx.clearRect()` - Clear canvas
- `ctx.beginPath()` - Start drawing
- `ctx.arc()` - Draw circle
- `ctx.moveTo()` / `ctx.lineTo()` - Draw line
- `ctx.fill()` / `ctx.stroke()` - Fill/outline shape

### Customization Guide

#### Make Animation Faster/Slower

**File:** `src/components/Hero.jsx`
**Lines:** 46-47

```javascript
// Slower (multiply by 0.5)
this.frequencyX = 0.0003 + (index % 5) * 0.00005;
this.frequencyY = 0.0004 + (index % 7) * 0.00006;

// Default
this.frequencyX = 0.0006 + (index % 5) * 0.0001;
this.frequencyY = 0.0008 + (index % 7) * 0.00012;

// Faster (multiply by 2)
this.frequencyX = 0.0012 + (index % 5) * 0.0002;
this.frequencyY = 0.0016 + (index % 7) * 0.00024;
```

#### Change Node Colors

**File:** `src/components/Hero.jsx`
**Lines:** 100-102, 112

```javascript
// Glow color
gradient.addColorStop(0, `rgba(255, 182, 193, ${0.6 * scale})`);
//                            ↑    ↑    ↑
//                            R    G    B

// Core color
ctx.fillStyle = `rgba(255, 218, 224, ${0.9})`;
```

**How to change:**
1. Pick your color (use color picker online)
2. Convert to RGB values (red, green, blue: 0-255)
3. Replace the numbers

**Example colors:**
```javascript
// Blue
rgba(100, 150, 255, 0.9)

// Green
rgba(100, 255, 150, 0.9)

// Purple
rgba(200, 100, 255, 0.9)
```

#### Change Connection Line Colors

**File:** `src/components/Hero.jsx`
**Line:** 171

```javascript
ctx.strokeStyle = `rgba(176, 86, 138, ${opacity})`;
//                       ↑    ↑   ↑
//                       R    G   B
```

#### Adjust Node Size

**File:** `src/components/Hero.jsx`
**Line:** 42

```javascript
this.radius = 3;  // Change this number
// Smaller: 2
// Default: 3
// Larger: 5
```

#### Change Node Spacing

**File:** `src/components/Hero.jsx`
**Line:** 132

```javascript
const baseSpacing = 90;  // Change this number
// Closer together: 70
// Default: 90
// Further apart: 110
```

#### Adjust Movement Range

**File:** `src/components/Hero.jsx`
**Lines:** 48-49

```javascript
this.amplitudeX = 3 + (index % 3);  // Horizontal movement
this.amplitudeY = 5 + (index % 4);  // Vertical movement

// Less movement
this.amplitudeX = 2 + (index % 2);
this.amplitudeY = 3 + (index % 2);

// More movement
this.amplitudeX = 5 + (index % 4);
this.amplitudeY = 8 + (index % 5);
```

---

## 10. Troubleshooting

### Common Issues & Solutions

#### Issue: Animation is jerky/stuttering

**Causes:**
1. `useEffect` dependency array contains changing values
2. Browser performance issues
3. Too many nodes

**Solutions:**
```javascript
// 1. Ensure empty dependency array
useEffect(() => {
  // Animation code
}, []); // ← Empty array is crucial!

// 2. Reduce node count
const baseSpacing = 110; // Increase spacing = fewer nodes

// 3. Simplify draw operations
// Remove extra gradients or effects
```

#### Issue: Changes not showing up

**Solutions:**
1. **Save the file** (Ctrl+S)
2. **Refresh browser** (Ctrl+R or F5)
3. **Check console for errors** (F12 → Console tab)
4. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C in terminal)
   # Start again
   npm run dev
   ```

#### Issue: Styles not applying

**Check:**
1. Correct class name in JSX?
   ```jsx
   <div className="hero"> {/* className not class */}
   ```

2. CSS selector correct?
   ```css
   .hero { /* Matches className="hero" */
   }
   ```

3. CSS file imported?
   ```jsx
   // In main.jsx
   import './index.css'
   ```

#### Issue: Component not displaying

**Check:**
1. Exported correctly?
   ```jsx
   export default function MyComponent() {
   ```

2. Imported correctly?
   ```jsx
   import MyComponent from "./components/MyComponent";
   ```

3. Used in JSX?
   ```jsx
   <MyComponent />
   ```

4. No JavaScript errors?
   - Open browser console (F12)
   - Look for red errors

### Debugging Tips

#### 1. Console.log Everything
```jsx
function MyComponent({ data }) {
  console.log("Component rendered!");
  console.log("Data received:", data);
  
  return <div>{data}</div>;
}
```

#### 2. Check React DevTools
1. Install React Developer Tools browser extension
2. Open browser DevTools (F12)
3. Go to "Components" tab
4. Inspect component props and state

#### 3. Simplify to Find the Problem
```jsx
// Instead of complex code
return (
  <div>
    <ComplexComponent data={processedData} />
  </div>
);

// Simplify to test
return (
  <div>
    <p>Test: {JSON.stringify(data)}</p>
  </div>
);
```

---

## Learning Resources

### Official Documentation
- **React:** https://react.dev/learn
- **Vite:** https://vitejs.dev/guide/
- **Tailwind CSS:** https://tailwindcss.com/docs

### Interactive Tutorials
- **React Tutorial:** https://react.dev/learn/tutorial-tic-tac-toe
- **JavaScript:** https://javascript.info/
- **CSS:** https://web.dev/learn/css/

### Video Resources
- **React in 100 Seconds:** https://www.youtube.com/watch?v=Tn6-PIqc4UM
- **JavaScript Crash Course:** Search YouTube for "JavaScript crash course"
- **CSS Canvas Tutorial:** Search for "HTML5 Canvas tutorial"

---

## Next Steps

### Beginner Path
1. ✅ Read this guide thoroughly
2. ✅ Make small text changes in components
3. ✅ Adjust colors in `index.css`
4. ✅ Add/remove items in `content.js`
5. ✅ Experiment with neural network settings

### Intermediate Path
1. ✅ Create a new component from scratch
2. ✅ Add new section to homepage
3. ✅ Modify existing animations
4. ✅ Customize neural network extensively

### Advanced Path
1. ✅ Build new features with React hooks
2. ✅ Connect to backend API
3. ✅ Create complex animations
4. ✅ Optimize performance

---

## Quick Reference

### Essential Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### File Extensions
- `.jsx` - React component
- `.js` - JavaScript file
- `.css` - Stylesheet
- `.json` - Data/config file

### React Hooks
```jsx
useState()   // Manage changing data
useEffect()  // Run code on mount/update
useRef()     // Access DOM elements
```

### CSS Variables (Colors)
```css
var(--c-brand)   /* Main brand color */
var(--c-rose)    /* Secondary color */
var(--c-ink)     /* Dark text */
var(--c-vapor)   /* Background */
```

### Neural Network Quick Tweaks
```javascript
// Speed: frequencyX/Y values (line 46-47)
// Size: radius value (line 42)
// Spacing: baseSpacing value (line 132)
// Movement: amplitudeX/Y values (line 48-49)
// Colors: rgba() values (lines 100, 112, 171)
```

---

## Questions?

This guide covers the fundamentals, but learning is a journey! When you get stuck:

1. **Check browser console** for error messages
2. **Read error messages carefully** - they often tell you exactly what's wrong
3. **Google the error** - others have likely solved it
4. **Experiment** - try things and see what happens (you can always undo!)
5. **Use comments** - add notes in your code to remember what things do

Remember: Every expert developer started as a beginner. Take it step by step! 🚀
