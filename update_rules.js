import * as fs from 'fs';

let rules = fs.readFileSync('firestore.rules', 'utf8');

// remove user requirement for submission
rules = rules.replace(
  "data.userId is string && data.userId == request.auth.uid &&",
  "(data.userId is string) &&"
);

// modify create rule
rules = rules.replace(
  "allow create: if isSignedIn() && isOwner(submissionId) && isValidId(submissionId) &&",
  "allow create: if isValidId(submissionId) &&"
);
// Also the reading part? They can't read if they are not signed in. That's fine, we don't need them to read their submissions if they don't have an account.

fs.writeFileSync('firestore.rules', rules, 'utf8');
console.log('done modifying firestore rules');
