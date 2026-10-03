const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allFiles = walk(path.join(__dirname, 'src/app'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix owner_properties -> OwnerProperties
  content = content.replace(/owner_api\/owner_properties/g, 'owner_api/OwnerProperties');
  
  // Also check if any other files had similar issues (like OwnerFinance.ts vs owner_finance dir)
  content = content.replace(/owner_api\/owner_finance/g, 'owner_api/OwnerFinance');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed api import casing in: ${file}`);
  }
});
