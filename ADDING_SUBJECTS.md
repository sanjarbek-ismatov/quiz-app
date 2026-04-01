# Adding New Subjects - Quick Guide

The app now uses a **modular subject system** that makes adding new subjects incredibly easy!

## Quick Start: 2 Steps

### 1. **Update `src/config/subjects.ts`**

Add your new subject to the `SUBJECTS` array:

```typescript
{
  id: 'my-subject',              // Unique ID (lowercase with hyphens)
  name: 'My Subject',            // Display name
  description: 'What you learn here',
  icon: 'book',                  // Icon type: book, zap, award, globe, brain, target
  color: 'from-indigo-500 to-blue-500',  // Tailwind gradient colors
}
```
*Note: `questionsCount` and `groupsCount` are now automatically calculated from the data file.*

### 2. **Create Subject Data File**

Create a new JSON file: `src/data/subjects/my-subject.json`

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
    },
    ...
  ]
}
```

**Note:**
- Mark the correct answer with `#` prefix
- The file must be named exactly `{subject-id}.json` and placed in `src/data/subjects/`
- Each subject file should have a `questions` array at the root level
- You can use the built-in [Importer](/import) tool to generate this file.

### 3. **Done!** 🎉

The subject will automatically appear in:
- ✅ Home page subject list
- ✅ All navigation throughout the app

## Available Icons

- `book` - FiBookOpen
- `zap` - FiZap
- `award` - FiAward
- `globe` - FiGlobe
- `brain` - FiBrain
- `target` - FiTarget

## Architecture Benefits

✅ **No hardcoding** - Subject counts and group mapping is dynamic
✅ **Scalable** - Add any number of subjects without code changes
✅ **Lazy Loading** - Questions only load when needed

## Tips

1. **Question Format** - Prefix correct answer with `#`, others without
2. **Question Count** - Any number of questions is supported; they are automatically grouped into sets of 25.
