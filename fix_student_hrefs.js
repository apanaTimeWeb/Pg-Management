const fs = require('fs');
const path = require('path');

const fixHrefs = (filePath, regex, prefix, replacementPattern) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(regex, (match, p1) => {
    return replacementPattern(p1, prefix);
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed hrefs in ${filePath}`);
  }
};

const replacement = (p1, prefix) => `href: '/${prefix}/${prefix}_${p1}'`;
const replacementDoubleQuote = (p1, prefix) => `href: "/${prefix}/${prefix}_${p1}"`;

// Student Nav
fixHrefs(
  path.join(__dirname, 'src/app/frontend_student/student_components/StudentNav.tsx'),
  /href:\s*['"]\/student\/([^'"]+)['"]/g,
  'frontend_student',
  replacement
);

// Student Layout
fixHrefs(
  path.join(__dirname, 'src/app/frontend_student/student_components/StudentLayout.tsx'),
  /href:\s*['"]\/student\/([^'"]+)['"]/g,
  'frontend_student',
  replacement
);

console.log("Done checking extra navigation links.");
