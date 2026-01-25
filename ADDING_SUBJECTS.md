# Adding New Subjects - Quick Guide

The app now uses a **modular subject system** that makes adding new subjects incredibly easy!

## Quick Start: 3 Steps

### 1. **Update `src/config/subjects.ts`**

Add your new subject to the `SUBJECTS` array:

```typescript
{
  id: 'my-subject',              // Unique ID (lowercase with hyphens)
  name: 'My Subject',            // Display name
  description: 'What you learn here',
  icon: 'book',                  // Icon type: book, zap, award, globe, brain, target
  color: 'from-indigo-500 to-blue-500',  // Tailwind gradient colors
  questionsCount: 200,           // Total questions
  groupsCount: 10,               // Number of groups (20 questions each)
}
```

### 2. **Add Questions to `src/data/sample-data.json`**

Add your subject's questions with the ID as the key:

```json
{
  "my-subject": {
    "questions": [
      {
        "text": "Question text?",
        "options": [
          "#Correct answer",
          "Wrong answer 1",
          "Wrong answer 2",
          "Wrong answer 3"
        ]
      },
      ...
    ]
  }
}
```

**Note:** Mark the correct answer with `#` prefix.

### 3. **Done!** 🎉

The subject will automatically appear in:
- ✅ Home page subject list
- ✅ Subject dropdown in Importer
- ✅ All navigation throughout the app

## Available Icons

- `book` - FiBookOpen
- `zap` - FiZap
- `award` - FiAward
- `globe` - FiGlobe
- `brain` - FiBrain
- `target` - FiTarget

## Available Gradient Colors

Use any Tailwind gradient:
- `from-blue-500 to-cyan-500`
- `from-purple-500 to-pink-500`
- `from-orange-500 to-red-500`
- `from-green-500 to-emerald-500`
- `from-rose-500 to-pink-500`
- etc.

## Example: Adding Biology Subject

### Step 1: Update `src/config/subjects.ts`

```typescript
{
  id: 'biology',
  name: 'Biology Fundamentals',
  description: 'Master cell biology, genetics, and ecology',
  icon: 'brain',
  color: 'from-green-500 to-teal-500',
  questionsCount: 200,
  groupsCount: 10,
}
```

### Step 2: Add to `src/data/sample-data.json`

```json
{
  "biology": {
    "questions": [
      {
        "text": "What is the powerhouse of the cell?",
        "options": [
          "#Mitochondria",
          "Nucleus",
          "Chloroplast",
          "Ribosome"
        ]
      },
      ...
    ]
  }
}
```

### Step 3: Visit the app ✅

Biology will now appear on the home page and everywhere else!

## Architecture Benefits

The modular approach means:

✅ **No hardcoding** - All subjects in one config file  
✅ **Type-safe** - TypeScript prevents mistakes  
✅ **DRY** - Don't repeat yourself  
✅ **Scalable** - Add 10 more subjects without code changes  
✅ **Flexible** - Each subject can have different question counts  
✅ **Maintainable** - One place to manage all subjects  

## File Structure

```
src/
├── config/
│   ├── subjects.ts      ← Add subjects here
│   └── icons.ts         ← Icon mappings
├── hooks/
│   └── useSubjects.ts   ← Custom hook for accessing subjects
└── data/
    └── sample-data.json ← Add questions here
```

## Tips

1. **Question Format** - Prefix correct answer with `#`, others without
2. **Always 200 Questions** - The importer will pad with placeholders if needed
3. **Question Count** - Dynamically groups 200 questions into chunks of 20
4. **Metadata** - The app displays question counts and descriptions from config

Happy adding! 🚀
