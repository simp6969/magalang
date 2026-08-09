# Magalang

A fast-paced, memory card matching web game built with a modern web stack and a sleek dark anime aesthetic. 
Compete on the global leaderboard for the fastest time!

## Features

- **Memory Matching Gameplay**: Find all 6 pairs as fast as possible.
- **Speedrun Leaderboard**: Global ranking board showing the fastest completion times.
- **Authentication**: Secure user login and management powered by Clerk.
- **Modern UI/UX**: Dark mode aesthetic, glassmorphism UI, and smooth animations using Framer Motion and CSS keyframes.
- **Responsive Design**: Flawless experience on both desktop and mobile devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
- **Styling**: Vanilla CSS with Tailwind CSS for utility classes
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & pure CSS transitions
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (SQLite in WAL mode for high performance)
- **Deployment**: Configured for standard Node.js environments

## Getting Started

### Prerequisites
- Node.js v18 or newer
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables by creating a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## Database

The application uses SQLite as its database, managed natively through `better-sqlite3`. The database file (`magalang.db`) will be automatically created in the root directory on the first API hit. 

The `scores` table automatically manages user rankings, ensuring only the player's personal best time is kept.

## Build for Production

To create an optimized production build:
```bash
npm run build
npm start
```
