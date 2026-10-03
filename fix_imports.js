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

// Define the exact mapping of old SubDir prefixes to new ones
// Since we used PascalCase originally like SuperAdminUsers_components -> superadmin_users_components

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Regex to find things like /SuperAdminUsers_components/
  // and replace with /superadmin_users_components/
  
  // We want to match /([A-Za-z0-9]+)_(components|hooks|types|utils|constants|api|store|schemas|locales|tests|mocks)/
  
  content = content.replace(/\/([A-Za-z0-9]+)_(components|hooks|types|utils|constants|api|store|schemas|locales|tests|mocks)\//g, (match, prefix, suffix) => {
    
    // If the prefix already has underscores and is fully lowercase, leave it
    if (prefix === prefix.toLowerCase() && prefix.includes('_')) {
      return match;
    }
    
    // We need to convert PascalCase to snake_case.
    // e.g., SuperAdminUsers -> superadmin_users
    // But wait! SuperAdmin is one word in the prefix `superadmin_`.
    // So SuperAdminUsers -> superadmin_users
    // StudentAttendance -> student_attendance
    
    let snakePrefix = prefix.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    
    // Fix specific roles if they got split weirdly
    snakePrefix = snakePrefix.replace('super_admin', 'superadmin');
    
    return `/${snakePrefix}_${suffix}/`;
  });
  
  // Wait, there's another issue:
  // Layout components import from `SuperAdmin_components` -> `superadmin_components` ? No! 
  // I didn't rename `SuperAdmin_components` because it was explicitly skipped in my previous script.
  // Let's also fix the role folder itself if it was imported incorrectly.
  
  // Wait, look at the grep output:
  // import { SuperadminUserManagementMain } from '@/app/frontend_superadmin/superadmin_users/SuperAdminUsers_components/SuperadminUserManagementMain';
  // This will be replaced to: /superadmin_users_components/
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed imports in: ${file}`);
  }
});
