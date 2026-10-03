const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Map of old paths to new paths
const renames = {
  '/superadmin/': '/frontend_superadmin/',
  '/manager/': '/frontend_manager/',
  '/student/': '/frontend_student/'
};

const folderRenames = {
  'superadmin': 'frontend_superadmin',
  'manager': 'frontend_manager',
  'student': 'frontend_student'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allFiles = walk(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace opacity modifiers
  const tokenMap = {
    'bg-success/10': 'bg-success-bg',
    'bg-success/20': 'bg-success-bg',
    'bg-warning/10': 'bg-warning-bg',
    'bg-warning/20': 'bg-warning-bg',
    'bg-danger/10': 'bg-danger-bg',
    'bg-danger/20': 'bg-danger-bg',
    'bg-info/10': 'bg-info-bg',
    'bg-info/20': 'bg-info-bg',
    'bg-purple/10': 'bg-purple-bg',
    'bg-purple/20': 'bg-purple-bg',
    'bg-theme-primary/10': 'bg-primary-subtle',
    'bg-primary/10': 'bg-primary-subtle',
    'text-success-fg': 'text-success-text',
    'bg-[var(--bg-card)]': 'bg-card',
    'bg-[var(--bg-page)]': 'bg-page',
    'border-[var(--border)]': 'border-border',
    'text-[var(--text-primary)]': 'text-primary',
    'text-[var(--text-secondary)]': 'text-secondary'
  };

  for (const [key, val] of Object.entries(tokenMap)) {
    content = content.split(key).join(val);
  }

  // Replace imports and hrefs
  for (const [oldPath, newPath] of Object.entries(renames)) {
    content = content.split(`@/app${oldPath}`).join(`@/app${newPath}`);
    content = content.split(`href="${oldPath}`).join(`href="${newPath}`);
    content = content.split(`href=\`\${oldPath}`).join(`href=\`\${newPath}`);
    content = content.split(`push('${oldPath}`).join(`push('${newPath}`);
    content = content.split(`push(\`${oldPath}`).join(`push(\`${newPath}`);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated content: ${file}`);
  }
});

// Rename folders
const appDir = path.join(srcDir, 'app');
for (const [oldFolder, newFolder] of Object.entries(folderRenames)) {
  const oldPath = path.join(appDir, oldFolder);
  const newPath = path.join(appDir, newFolder);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed folder ${oldPath} to ${newPath}`);
  }
}
