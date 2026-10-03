const fs = require('fs');
const path = require('path');

const superadminDir = path.join(__dirname, 'src/app/frontend_superadmin');
const componentsDir = path.join(superadminDir, 'SuperAdmin_components');

const fileMap = {
  'SuperadminAnalyticsMain.tsx': 'analytics',
  'SuperadminAuditSecurityMain.tsx': 'audit-logs',
  'SuperadminBackupsMain.tsx': 'backups',
  'SuperadminBillingPaymentsMain.tsx': 'billing',
  'SuperadminCommunicationMain.tsx': 'communication',
  'SuperadminDashboardMain.tsx': 'dashboard',
  'SuperadminDataManagementMain.tsx': 'data-management',
  'SuperadminFeatureFlagsMain.tsx': 'feature-flags',
  'SuperadminGlobalConfigMain.tsx': 'settings', // or global-config? Wait, there is no global-config folder.
  'SuperadminMasterDataMain.tsx': 'master-data',
  'SuperadminOwnerManagementMain.tsx': 'owners',
  'SuperadminPGManagementMain.tsx': 'pgs',
  'SuperadminProfileMain.tsx': 'profile',
  'SuperadminSubscriptionPlansMain.tsx': 'plans',
  'SuperadminSupportHelpdeskMain.tsx': 'tickets', // or support-helpdesk?
  'SuperadminSystemManagementMain.tsx': 'system-management',
  'SuperadminUserManagementMain.tsx': 'users'
};

for (const [file, folder] of Object.entries(fileMap)) {
  const oldPath = path.join(componentsDir, file);
  if (!fs.existsSync(oldPath)) continue;

  let featureDir = path.join(superadminDir, folder);
  if (!fs.existsSync(featureDir)) {
    console.log(`Directory does not exist for ${folder}, skipping...`);
    continue;
  }

  // Find the exact components folder inside the feature directory
  let featureComponentsDir = null;
  const list = fs.readdirSync(featureDir);
  for (const item of list) {
    if (item.endsWith('_components') && fs.statSync(path.join(featureDir, item)).isDirectory()) {
      featureComponentsDir = path.join(featureDir, item);
      break;
    }
  }

  if (!featureComponentsDir) {
    // If no components folder exists, create one using standard prefixing
    // We assume the prefix is SuperAdmin<PascalCaseFolder>
    // Just a basic fallback, better to create it properly if needed.
    continue;
  }

  const newPath = path.join(featureComponentsDir, file);
  fs.renameSync(oldPath, newPath);
  console.log(`Moved ${file} to ${featureComponentsDir}`);

  // Now we must update the imports in all files
  updateImports(file, oldPath, newPath);
}

function updateImports(file, oldPath, newPath) {
  // Rough import update for the moved files
  // Old import path: @/app/frontend_superadmin/SuperAdmin_components/SuperadminAnalyticsMain
  // New import path: @/app/frontend_superadmin/analytics/SuperAdminAnalytics_components/SuperadminAnalyticsMain

  const oldImport = `@/app/frontend_superadmin/SuperAdmin_components/${file.replace('.tsx', '')}`;
  
  // Extract the new relative path for import
  const relativeFromSrc = newPath.split('src\\')[1].replace(/\\/g, '/');
  const newImport = `@/${relativeFromSrc.replace('.tsx', '')}`;

  const allFiles = walk(path.join(__dirname, 'src'));
  allFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes(oldImport)) {
      content = content.split(oldImport).join(newImport);
      fs.writeFileSync(f, content, 'utf8');
      console.log(`Updated import in ${f}`);
    }
  });
}

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
