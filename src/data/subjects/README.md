# Modular Subject Data Structure

## Overview

The quiz app now uses a **modular data structure** where each subject's questions are stored in a separate JSON file. This makes the app much more scalable and easier to manage.

## File Structure

```
src/
├── config/
│   ├── subjects.ts          ← Subject metadata
│   └── icons.ts             ← Icon mappings
├── data/
│   └── subjects/            ← Individual subject data files
│       ├── academic-writing.json
│       ├── information-technology.json
│       ├── economic-theories.json
│       ├── programming.json
│       └── ...
├── utils/
│   └── dataLoader.ts        ← Dynamic data loader
└── pages/
    ├── Quiz.tsx             ← Uses dataLoader
    └── ...
```

## Key Files

### 1. `src/config/subjects.ts`
Defines all subject metadata (single source of truth):
```typescript
{
  id: 'subject-id',
  name: 'Subject Name',
  description: 'Subject description',
  icon: 'book',
  color: 'from-blue-500 to-cyan-500',
  questionsCount: 200,
  groupsCount: 10,
}
```

### 2. `src/data/subjects/{subject-id}.json`
Contains the actual questions for each subject:
```json
{
  "questions": [
    {
      "text": "Question text?",
      "options": [
        "#Correct answer",
        "Wrong answer 1",
        "Wrong answer 2",
        "Wrong answer 3"
      ]
    }
  ]
}
```

### 3. `src/utils/dataLoader.ts`
Dynamically loads question data from JSON files:
```typescript
export async function loadSubjectData(subjectId: string)
export function getQuestionsFromData(data: QuestionsData | null)
```

## Benefits

✅ **Smaller Bundle Size** - Only loaded questions are included, not all subjects upfront  
✅ **Better Performance** - Asynchronous loading doesn't block the UI  
✅ **Easy Scalability** - Add a new subject file without touching existing code  
✅ **Cleaner Codebase** - Separation of concerns (config vs data)  
✅ **Lazy Loading** - Questions only load when needed  

## Adding a New Subject

### Step 1: Add Subject Configuration
Edit `src/config/subjects.ts`:
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

### Step 2: Create Subject Data File
Create `src/data/subjects/biology.json`:
```json
{
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
```

### Step 3: Done! ✅
The subject automatically appears everywhere:
- Home page subject list
- Subject selector in Importer
- All navigation

## How It Works

1. **Quiz Page Initialization**
   - User navigates to `/subject/{subjectId}/group/{groupId}`
   - Quiz component mounts with loading state
   
2. **Data Loading**
   - `useEffect` triggers `loadSubjectData(subjectId)`
   - Questions are fetched from `src/data/subjects/{subjectId}.json`
   - Loading state is displayed while fetching

3. **Question Processing**
   - Questions are shuffled
   - Options within questions are shuffled
   - Questions are split into groups of 20

4. **Rendering**
   - Questions display with full interactivity
   - User can answer and see results
   - Progress tracking works normally

## File Size Comparison

**Before (Single File):**
- sample-data.json: ~500KB (all subjects)

**After (Modular):**
- academic-writing.json: ~40KB
- information-technology.json: ~50KB
- economic-theories.json: ~35KB
- programming.json: ~45KB
- Total when all loaded: same, but loaded on-demand

## Error Handling

If a subject file is missing or fails to load:
- User sees: "No questions found for this subject"
- A "Back to Subjects" button is provided
- The app doesn't crash

## Future Enhancements

You can further extend this by:
- **Caching** - Store loaded data in localStorage
- **Compression** - Compress JSON files
- **Pagination** - Load questions in chunks
- **Remote Storage** - Load from API instead of local files
- **Versioning** - Add version field to track updates

## Example Directory Tree

```
src/data/subjects/
├── academic-writing.json      (200 questions)
├── information-technology.json (200 questions)
├── economic-theories.json      (200 questions)
├── programming.json            (200 questions)
└── README.md                   (this file)
```

Each file is independently maintained and can be edited without affecting others!
