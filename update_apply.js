import * as fs from 'fs';

let applyContent = fs.readFileSync('src/pages/apply.tsx', 'utf8');

// Stop redirecting to /register if not logged in
applyContent = applyContent.replace(
  'useEffect(() => {\n    if (!loading && !user) {\n      navigate(`/${locale}/register`);\n    }\n  }, [user, loading, navigate, locale]);',
  'useEffect(() => {\n    // No longer redirect to register\n  }, [user, loading, navigate, locale]);'
);

// If not logged in, stop loadingData
applyContent = applyContent.replace(
  '  useEffect(() => {\n    if (user) {\n      fetchSubmission();\n    }\n  }, [user]);',
  '  useEffect(() => {\n    if (user) {\n      fetchSubmission();\n    } else if (!loading) {\n      setLoadingData(false);\n    }\n  }, [user, loading]);'
);

// Form submit logic: generate submissionId if no user
applyContent = applyContent.replace(
  'const handleSubmit = async (e?: React.FormEvent) => {\n    if (e) e.preventDefault();\n    if (!user) return;\n',
  `const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const submissionId = user ? user.uid : crypto.randomUUID();
`
);

// Replace user.uid to submissionId in upload route
applyContent = applyContent.replace(
  'const fileRef = ref(storage, `applications/${user.uid}/${file.name}`);',
  'const fileRef = ref(storage, `applications/${submissionId}/${file.name}`);'
);
// Make sure to replace user.uid in docRef too!
applyContent = applyContent.replace(
  "const docRef = doc(db, 'submissions', user.uid);",
  "const docRef = doc(db, 'submissions', submissionId);"
);

applyContent = applyContent.replace(
  'userId: user.uid,',
  'userId: submissionId,' // wait, if not logged in, user is undefined.
);

applyContent = applyContent.replace(
  'handleFirestoreError(err, OperationType.WRITE, `submissions/${user.uid}`);',
  'handleFirestoreError(err, OperationType.WRITE, `submissions/${submissionId}`);'
);


fs.writeFileSync('src/pages/apply.tsx', applyContent, 'utf8');

let regContent = fs.readFileSync('src/pages/registerForm.tsx', 'utf8');
// remove <div ...> RSEF </div>
regContent = regContent.replace(
  '<div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 font-bold text-xl">\n                  RSEF\n               </div>',
  ''
);
// replace Create Your RSEF Account to Create Your Account
regContent = regContent.replace(
  'Create Your RSEF Account',
  'Create Your Account'
);
fs.writeFileSync('src/pages/registerForm.tsx', regContent, 'utf8');

console.log('done modifying JS');
