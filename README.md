# Quiz Master

An interactive quiz platform for learning and practice. Master any subject with comprehensive question sets, instant feedback, and progress tracking.

## Quick Start

```bash
npm install
npm run dev
```

## Features

- 📚 **Multiple Subjects** - Academic Writing, Information Technology, Economic Theories, Programming
- 🎯 **Interactive Quizzes** - Answer questions and get instant feedback
- 📊 **Progress Tracking** - Track your progress with visual progress bars
- 🌍 **Multi-language Support** - English, Uzbek, and Russian
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Current Subjects

- **Academic Writing** - 200 questions across 8 groups
- **Information Technology** - 131 questions across 6 groups
- **Economic Theories** - 151 questions across 7 groups
- **Programming** - 146 questions across 6 groups

## Adding New Subjects

See [ADDING_SUBJECTS.md](./ADDING_SUBJECTS.md) for detailed instructions on adding new subjects.

## Data Structure

Each subject's questions are stored in separate JSON files in `src/data/subjects/`. Questions are organized into groups of 25 questions each.

For more details, see:
- [ADDING_SUBJECTS.md](./ADDING_SUBJECTS.md) - How to add new subjects
- [DATA_STRUCTURE_MIGRATION.md](./DATA_STRUCTURE_MIGRATION.md) - Data structure overview
- [src/data/subjects/README.md](./src/data/subjects/README.md) - Subject data file specifications
