# COL Prayer Course App - Quick Start Guide

## 🎯 What is this app?

An interactive web application for the **10-Week COL Intercessory Prayer Course** with:

- 📚 10 weeks × 7 days = 70 daily lessons
- 📊 Progress tracking dashboard
- 📖 Prayer journal with reflections
- 📝 Personal note-taking
- 💾 Auto-saving to browser storage

## 🚀 Quick Start (3 steps)

### Step 1: Open Terminal
Open your terminal/command prompt

### Step 2: Navigate to the app
```bash
cd "~/Library/Mobile Documents/com~apple~CloudDocs/COL Prayer Min/prayer-course-app"
```

### Step 3: Run the app
```bash
npm install
npm run dev
```

The app will open automatically! 🎉

## 📱 App Features

### 🏠 Dashboard
- View your overall progress percentage
- See current week and statistics
- Quick access to all features

### 📚 Course
- Browse all 10 weeks and their focus areas
- View all 70 daily lessons
- See completion status for each lesson
- Visual progress bars per week

### 📖 Lessons
Each daily lesson includes:
- Main teaching content
- Scripture references
- Specific prayer focus
- Suggested next steps

Features per lesson:
- ✓ Mark as complete
- 📝 Take personal notes
- 💾 Auto-save all notes

### 📔 Prayer Journal
- Record daily reflections on lessons
- Document prayer requests
- Celebrate breakthroughs and answered prayers
- Full edit/delete capabilities
- Organized by week and date

## 🎓 Course Structure

**Week 1:** Foundation of Intercession
- What is intercessory prayer?
- The power of agreement
- Biblical intercessors (Old & New Testament)
- Your authority in prayer

**Week 2:** Preparing Your Heart
- Repentance and forgiveness
- Humility in prayer
- Fasting and prayer
- Holiness and spiritual purity
- Faith, surrender, and submission

*(Weeks 3-10 ready to add with same structure)*

## 💾 Data Storage

All your data is saved automatically:
- ✅ Lesson completions
- ✅ Personal notes
- ✅ Journal entries
- ✅ Progress tracking

Everything is stored locally in your browser - no account needed!

## 🛠️ Technical Details

- **Built with:** React, TypeScript, Vite
- **State Management:** Zustand with localStorage
- **Styling:** Modern CSS with CSS variables
- **Responsive Design:** Works on desktop and mobile

## 📖 Project Structure

```
prayer-course-app/
├── package.json          - Dependencies
├── index.html            - Main page
├── vite.config.ts        - Build config
├── tsconfig.json         - TypeScript config
├── SETUP.md              - Detailed setup
├── README.md             - Full documentation
└── src/
    ├── App.tsx           - Main app
    ├── main.tsx          - Entry point
    ├── components/       - UI components
    ├── store/            - State management
    ├── data/             - Course content
    ├── types/            - TypeScript types
    └── styles/           - CSS styling
```

## 🎨 Customization

### Change colors?
Edit `src/styles/global.css` and modify CSS variables in `:root`

### Add more weeks?
Edit `src/data/courseContent.ts` and add more weeks following the existing pattern

### Change app title?
Edit `index.html` `<title>` tag or `src/App.tsx`

## 📞 Support

For issues or questions about the prayer content, refer to:
- `COL_Intercessory_Prayer_Course.pdf`
- `COL_Intercessory_Prayer_Student_Handbook.pdf`
- `COL_Intercessory_Prayer_Leaders_Guide.pdf`

## 🙏 Blessings

May this app enhance your prayer journey and intercessory ministry!

**Church of the Lord Prayer Ministry**
2026

---

**Next Steps:**
1. ✅ Install dependencies with `npm install`
2. ✅ Start the dev server with `npm run dev`
3. ✅ Open the app in your browser
4. ✅ Complete your first week of prayer!
