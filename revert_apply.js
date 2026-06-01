import * as fs from 'fs';

let applyContent = fs.readFileSync('src/pages/apply.tsx', 'utf8');

applyContent = applyContent.replace(
  'useEffect(() => {\n    // No longer redirect to register\n  }, [user, loading, navigate, locale]);',
  'useEffect(() => {\n    if (!loading && !user) {\n      navigate(`/${locale}/register`);\n    }\n  }, [user, loading, navigate, locale]);'
);

applyContent = applyContent.replace(
  '  useEffect(() => {\n    if (user) {\n      fetchSubmission();\n    } else if (!loading) {\n      setLoadingData(false);\n    }\n  }, [user, loading]);',
  '  useEffect(() => {\n    if (user) {\n      fetchSubmission();\n    }\n  }, [user]);'
);

applyContent = applyContent.replace(
  'const handleSubmit = async (e?: React.FormEvent) => {\n    if (e) e.preventDefault();\n    const submissionId = user ? user.uid : crypto.randomUUID();',
  'const handleSubmit = async (e?: React.FormEvent) => {\n    if (e) e.preventDefault();\n    if (!user) return;'
);

applyContent = applyContent.replace(
  'const fileRef = ref(storage, `applications/${submissionId}/${file.name}`);',
  'const fileRef = ref(storage, `applications/${user.uid}/${file.name}`);'
);

applyContent = applyContent.replace(
  "const docRef = doc(db, 'submissions', submissionId);",
  "const docRef = doc(db, 'submissions', user.uid);"
);

applyContent = applyContent.replace(
  'userId: submissionId,',
  'userId: user.uid,'
);

applyContent = applyContent.replace(
  'handleFirestoreError(err, OperationType.WRITE, `submissions/${submissionId}`);',
  'handleFirestoreError(err, OperationType.WRITE, `submissions/${user.uid}`);'
);

fs.writeFileSync('src/pages/apply.tsx', applyContent, 'utf8');

let rules = fs.readFileSync('firestore.rules', 'utf8');
rules = rules.replace(
  "(data.userId is string) &&",
  "data.userId is string && data.userId == request.auth.uid &&"
);

rules = rules.replace(
  "allow create: if isValidId(submissionId) &&",
  "allow create: if isSignedIn() && isOwner(submissionId) && isValidId(submissionId) &&"
);
fs.writeFileSync('firestore.rules', rules, 'utf8');

let regContent = fs.readFileSync('src/pages/registerForm.tsx', 'utf8');
regContent = regContent.replace(
  'Create Your Account',
  'Create Your RSEF Account'
);
fs.writeFileSync('src/pages/registerForm.tsx', regContent, 'utf8');

console.log('done reverting');
