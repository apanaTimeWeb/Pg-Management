const fs = require('fs');
const path = require('path');

const superadminDir = path.join(__dirname, 'src/app/frontend_superadmin');
const componentsDir = path.join(superadminDir, 'SuperAdmin_components');

const fileMap = {
  'SuperadminBackupsMain.tsx': 'backups',
  'SuperadminBillingPaymentsMain.tsx': 'billing',
  'SuperadminCommunicationMain.tsx': 'communication',
  'SuperadminDataManagementMain.tsx': 'data-management',
  'SuperadminMasterDataMain.tsx': 'master-data',
  'SuperadminPGManagementMain.tsx': 'pgs',
  'SuperadminProfileMain.tsx': 'profile',
  'SuperadminSystemManagementMain.tsx': 'system-management',
  'SuperadminUserManagementMain.tsx': 'users'
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
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allFiles = walk(path.join(__dirname, 'src'));

for (const [file, folder] of Object.entries(fileMap)) {
  const oldPath = path.join(componentsDir, file);
  if (!fs.existsSync(oldPath)) continue;

  let featureDir = path.join(superadminDir, folder);
  if (!fs.existsSync(featureDir)) {
    fs.mkdirSync(featureDir, { recursive: true });
  }

  // Create the specific components folder
  const componentFolderName = `SuperAdmin${folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}_components`;
  const featureComponentsDir = path.join(featureDir, componentFolderName);
  
  if (!fs.existsSync(featureComponentsDir)) {
    fs.mkdirSync(featureComponentsDir, { recursive: true });
  }

  const newPath = path.join(featureComponentsDir, file);
  fs.renameSync(oldPath, newPath);
  console.log(`Moved ${file} to ${featureComponentsDir}`);

  const oldImport = `@/app/frontend_superadmin/SuperAdmin_components/${file.replace('.tsx', '')}`;
  const relativeFromSrc = newPath.split('src\\')[1].replace(/\\/g, '/');
  const newImport = `@/${relativeFromSrc.replace('.tsx', '')}`;

  allFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes(oldImport)) {
      content = content.split(oldImport).join(newImport);
      fs.writeFileSync(f, content, 'utf8');
      console.log(`Updated import in ${f}`);
    }
  });
}
