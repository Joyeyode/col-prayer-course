# Setup Instructions

## Prerequisites

- Node.js (v18 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

## Installation & Running

### 1. Navigate to the project directory

```bash
cd "~/Library/Mobile Documents/com~apple~CloudDocs/COL Prayer Min/prayer-course-app"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:5173`

### 4. Build for production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Features

✅ **Dashboard** - View your overall progress at a glance
✅ **Course Navigation** - View all 10 weeks and 70 lessons
✅ **Daily Lessons** - Access scripture, prayer focus, and next steps
✅ **Progress Tracking** - Mark lessons complete and track your progress
✅ **Prayer Journal** - Record reflections, prayer requests, and breakthroughs
✅ **Note Taking** - Add personal notes to each lesson
✅ **Persistence** - All data is saved locally in your browser

## Project Structure

```
prayer-course-app/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx
│   │   ├── CourseLayout.tsx
│   │   ├── LessonView.tsx
│   │   └── JournalView.tsx
│   ├── data/               # Course content
│   │   └── courseContent.ts
│   ├── store/              # State management
│   │   └── appStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── styles/             # CSS files
│   │   ├── global.css
│   │   └── components.css
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Zustand** - State management with persistence
- **React Router** - Client-side routing (ready for expansion)

## Expanding the Course

The course is currently set up with the first 2 weeks of content as an example. To add weeks 3-10:

1. Open `src/data/courseContent.ts`
2. Add more weeks following the existing structure:

```typescript
{
  weekNumber: 3,
  title: "Your Week Title",
  description: "Brief description",
  focusArea: "Focus area",
  lessons: [
    // 7 lessons per week
  ]
}
```

Each lesson should include:
- Title
- Content (main lesson text)
- Scripture reference
- Prayer focus
- Next steps

## Troubleshooting

### Port already in use?
The dev server runs on port 5173 by default. If that's in use, modify `vite.config.ts`:

```typescript
server: {
  port: 5174, // Change to different port
}
```

### Data not persisting?
Data is stored in browser's localStorage. Clear cache if there are issues:
- Open DevTools (F12)
- Application tab → Local Storage → Clear All

### Need to reset progress?
In browser DevTools console, run:
```javascript
localStorage.clear()
```

## Support

For questions or issues, refer to the course materials in the COL Prayer Min folder.

Happy praying! 🙏
