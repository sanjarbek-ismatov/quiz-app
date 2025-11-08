# Quiz App

Simple quiz app scaffold generated for the user.

Run:

```bash
npm install
npm run dev
```

Add full question sets by replacing or extending `src/data/sample-data.json`. Each subject key should map to an object with a `questions` array. Each question has `text`, `options` (array), and `correctIndex` (0-based).

The UI shows subjects -> groups (1-20, 21-40) -> quiz. Clicking an option marks it green if correct or red if wrong and shows the correct answer below.
