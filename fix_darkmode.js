const fs = require('fs');
const path = require('path');

const directories = [
  'src/app/frontend_owner',
];

const replacements = [
  { regex: /\bbg-white\b/g, replace: 'bg-card' },
  { regex: /\bbg-gray-50\b/g, replace: 'bg-page' },
  { regex: /\bbg-gray-100\b/g, replace: 'bg-[var(--bg-overlay)]' },
  { regex: /\btext-gray-900\b/g, replace: 'text-primary' },
  { regex: /\btext-gray-800\b/g, replace: 'text-primary' },
  { regex: /\btext-gray-700\b/g, replace: 'text-secondary' },
  { regex: /\btext-gray-600\b/g, replace: 'text-secondary' },
  { regex: /\btext-gray-500\b/g, replace: 'text-[var(--text-disabled)]' },
  { regex: /\bborder-gray-200\b/g, replace: 'border-border' },
  { regex: /\bborder-gray-100\b/g, replace: 'border-border/50' },
  { regex: /\bborder-gray-300\b/g, replace: 'border-border' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const { regex, replace } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

directories.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    processDirectory(fullDir);
  }
});
console.log('Done fixing dark mode classes.');
