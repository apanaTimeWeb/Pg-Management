const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const renames = {
  '/owner/': '/frontend_owner/',
  '/parent/': '/frontend_parent/',
  '/staff/': '/frontend_staff/',
  '/login/': '/frontend_login/'
};

const folderRenames = {
  'owner': 'frontend_owner',
  'parent': 'frontend_parent',
  'staff': 'frontend_staff',
  'login': 'frontend_login'
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

const appDir = path.join(srcDir, 'app');
for (const [oldFolder, newFolder] of Object.entries(folderRenames)) {
  const oldPath = path.join(appDir, oldFolder);
  const newPath = path.join(appDir, newFolder);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed folder ${oldPath} to ${newPath}`);
  }
}
