# Data Structure Refactoring Summary

## What Changed

The quiz app has been refactored from a **single monolithic JSON file** to a **modular, per-subject JSON file structure**.

### Before ❌
```
src/data/
└── sample-data.json (500KB, all subjects mixed - DEPRECATED)
```

### After ✅
```
src/data/subjects/
├── academic-writing.json
├── information-technology.json
├── economic-theories.json
├── programming.json
└── ...
```

## Why This is Better

| Aspect | Before | After |
|--------|--------|-------|
| **File Management** | One huge file | Small, focused files |
| **Editing** | Risk of breaking entire file | Edit one subject safely |
| **Scalability** | Difficult to add subjects | Just add a new JSON file |
| **Performance** | Load all questions at start | Load on-demand (lazy) |
| **Maintenance** | Hard to track changes | Clear per-subject history |

## How It Works

### 1. **Subject Config** (`src/config/subjects.ts`)
- Centralized subject metadata
- Controls what appears in the UI
- Links to data files

### 2. **Subject Data Files** (`src/data/subjects/{id}.json`)
- Individual question files
- One file per subject
- Light and manageable

### 3. **Dynamic Loader** (`src/utils/dataLoader.ts`)
- Async loading mechanism
- Prevents UI blocking
- Handles errors gracefully

## Usage Examples

### Adding Biology Questions

**File:** `src/data/subjects/biology.json`
```json
{
  "questions": [
    {
      "text": "What is photosynthesis?",
      "options": [
        "#Process by which plants convert light to chemical energy",
        "Process by which animals digest food",
        "Process by which cells reproduce",
        "Process by which organisms breathe"
      ]
    }
  ]
}
```

**File:** `src/config/subjects.ts`
```typescript
{
  id: 'biology',
  name: 'Biology Fundamentals',
  description: 'Cell biology, genetics, ecology',
  icon: 'brain',
  color: 'from-green-500 to-teal-500',
  questionsCount: 200,
  groupsCount: 10,
}
```

**Result:** Biology instantly appears in the app! ✨

## File Organization

```
quiz-app/
├── src/
│   ├── config/
│   │   ├── subjects.ts          ← Metadata (DO NOT EDIT)
│   │   └── icons.ts             ← Icon mappings (DO NOT EDIT)
│   │
│   ├── data/
│   │   └── subjects/            ← YOUR DATA GOES HERE
│   │       ├── academic-writing.json
│   │       ├── information-technology.json
│   │       ├── economic-theories.json
│   │       ├── programming.json
│   │       └── ...
│   │
│   ├── utils/
│   │   └── dataLoader.ts        ← Handles loading (DO NOT EDIT)
│   │
│   └── pages/
│       ├── Quiz.tsx             ← Updated to use new loader
│       └── ...
```

## Migration Notes

- Old `sample-data.json` is still in place (can be deleted when ready)
- Quiz.tsx now loads data dynamically instead of importing statically
- All subject metadata is in one place (`subjects.ts`)
- Questions are loaded on-demand (faster initial load!)

## Current Subjects

- **Academic Writing** - 200 questions, 8 groups
- **Information Technology** - 131 questions, 6 groups  
- **Economic Theories** - 151 questions, 7 groups
- **Programming** - 146 questions, 6 groups

## Next Steps

1. **Add more subjects** following the pattern shown in ADDING_SUBJECTS.md
2. **Update question counts** as you add more questions to existing subjects
3. **Report issues** via Telegram: @Sanjarbek_Ismatov

## FAQ

**Q: Why use separate JSON files?**  
A: Easier to edit, faster to load, easier to version control.

**Q: Can I still have all questions in one file?**  
A: Yes, but you'd need to revert the Quiz.tsx changes and go back to importing a single file.

**Q: How do I bulk upload questions?**  
A: Use the Importer page to generate a JSON file, then split it into subject files.

**Q: Can I load data from an API instead?**  
A: Yes! Modify `dataLoader.ts` to fetch from your API endpoint instead of local JSON files.

## Support Files

- See [ADDING_SUBJECTS.md](../../../ADDING_SUBJECTS.md) for the original guide
- See [src/data/subjects/README.md](./subjects/README.md) for data file specs
