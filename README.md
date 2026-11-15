<div align="center">

# 🛰️ Silent Sentinels
### *Interactive 3D Deep-Space Educational Platform*

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA_Space_Apps-2026-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)](https://www.spaceappschallenge.org/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_2-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**An immersive, 3D web platform honoring humanity's legendary robotic explorers—bringing NASA's historic deep-space probes and planetary surface missions to life for students and space enthusiasts (ages 14–19).**

[🚀 Live Website](https://silent-sentinels.vercel.app) • [📖 NASA Data Citations](#-authentic-nasa-data--resources) • [🛠️ Tech Stack](#-tech-stack) • [🤖 AI Disclosure](#-super-intelligence-si--ai-disclosure)

</div>

---

## 🌌 Overview

For over five decades, NASA’s robotic explorers have quietly ventured into the unknown—crossing radiation belts, braving interplanetary dust, and crossing the heliopause into interstellar space. 

**Silent Sentinels** transforms dry archival spreadsheets and textbook articles into an interactive, game-like experience. Learners can inspect spacecraft hardware in 360° 3D, spin Martian and Lunar globes to discover landing sites, and solve real astrophysical challenges like radio signal latency across billions of kilometers.

---

## ✨ Key Features

### 🛸 1. Interactive 3D Spacecraft Stage
- **360° Turntable Inspection:** Full orbit, pitch, and zoom controls built with Three.js and WebGL 2.
- **Hardware Hotspots:** Interactive scientific markers highlighting critical engineering subsystems (RTG nuclear power generators, high-gain antennas, cosmic ray analyzers, and imaging sensors).
- **Probes Featured:** *Voyager 1, Pioneer 10 & 11, New Horizons, Cassini-Huygens, and Apollo Lunar Modules.*

### 🌕 2. 3D Celestial Surface Globes
- **Realistic Moon & Mars Globes:** Procedurally textured relief spheres showing authentic planetary craters, maria, and volcanic plains.
- **Historic Landing Beacons:** Pinpointed surface landing and resting coordinates for Surveyor 1, Apollo 11–17, Viking 1, Mars Pathfinder, Opportunity, InSight, and Perseverance.

### 📡 3. Speed-of-Light Signal Latency Challenge
- **Interactive Space Physics:** Flight-control mini-game where users calculate the round-trip radio transmission delay across Astronomical Units (AU) using the constant speed of light ($c \approx 299,792\text{ km/s}$).
- **Interstellar Decoder:** Decodes scientific binary telemetry and historical plaque messages.

### 🎖️ 4. Astronaut Badge Locker & Leaderboard
- **Gamified STEM Progression:** Unlock achievement badges as you explore spacecraft, decode signals, and complete science milestones.
- **Cloud State:** Powered by Supabase PostgreSQL database with Row Level Security (RLS) for learner profiles and progress tracking.

---

## 📡 Authentic NASA Data & Resources

Every distance, coordinate, and technical specification on this platform is verified against official NASA public archives:

1. **[NASA Space Science Data Coordinated Archive (NSSDCA)](https://nssdc.gsfc.nasa.gov/nmc/):** Spacecraft Master Catalog records, trajectories, launch dates, and scientific payload instrument data.
2. **[NASA Image and Video Library](https://images.nasa.gov/):** Curated archival photography from NASA Ames (ARC), Jet Propulsion Laboratory (JPL), and Kennedy Space Center (KSC).
3. **[NASA 3D Resources Portal](https://nasa3d.arc.nasa.gov/):** Geometric and architectural CAD references for authentic 3D spacecraft modeling.
4. **[NASA JPL Deep Space Network (DSN Now)](https://eyes.nasa.gov/dsn/):** Deep-space telecommunications data and signal delay calculations.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React |
| **3D & Graphics** | Three.js, WebGL 2, Custom Canvas Procedural Textures |
| **Backend & Database** | Supabase (PostgreSQL, Row Level Security, Auth Gate) |
| **Performance** | Device Pixel Ratio clamping (1.5x), Viewport Visibility Culling (`IntersectionObserver`) |
| **Deployment** | Vercel (Global Edge Network, SPA Rewrites via `vercel.json`) |

---

## ⚡ Performance Optimizations

To ensure smooth accessibility for students on everyday school laptops, Chromebooks, and mobile devices without dedicated GPUs:
- **Frame Rate Optimization:** Clean 60 FPS rendering with hardware-accelerated lerp interpolation.
- **Viewport Visibility Culling:** 3D WebGL canvases automatically pause rendering loops when scrolled out of view using `IntersectionObserver`, reducing CPU/GPU load to near zero.
- **Memory Management:** Texture and gradient caching eliminates garbage collection stutter.

---

## 🤖 Super Intelligence (SI) & AI Disclosure

In accordance with the **NASA Space Apps Challenge** rules:
- **Code & 3D Engineering:** Utilized Google Gemini / Antigravity AI for React component development, Three.js WebGL rendering pipeline implementation, and Supabase SQL schema design.
- **Visual Assets:** AI image generation was used to synthesize deep-space cosmic background textures. All spacecraft technical schematics, historical photographs, and telemetry data are authentic NASA NSSDCA archival material.
- **Human Direction & Research:** Concept ideation, NSSDCA data research, UI/UX design, and STEM educational pedagogy were directed by the team.
- **NASA Branding Compliance:** No NASA logos, flags, or official insignias were created or altered using AI.

---

## 📜 License & Acknowledgments
Built with ❤️ for the **NASA Space Apps Challenge 2026**.  
Special thanks to NASA, JPL, and the NSSDCA for maintaining humanity's greatest open space science archives.
