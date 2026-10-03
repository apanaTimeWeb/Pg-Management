const fs = require('fs');
const path = require('path');

const fixHrefs = (filePath, regex, prefix) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(regex, (match, p1) => {
    return `href: '/${prefix}/${prefix}_${p1}'`;
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed hrefs in ${filePath}`);
  }
};

// Owner
fixHrefs(
  path.join(__dirname, 'src/app/frontend_owner/owner_components/OwnerLayout.tsx'),
  /href:\s*['"]\/owner\/([^'"]+)['"]/g,
  'frontend_owner'
);

// Manager
fixHrefs(
  path.join(__dirname, 'src/app/frontend_manager/manager_components/ManagerLayout_constants.ts'),
  /href:\s*['"]\/manager\/([^'"]+)['"]/g,
  'frontend_manager'
);

// Student
fixHrefs(
  path.join(__dirname, 'src/app/frontend_student/student_components/StudentLayout_constants.ts'),
  /href:\s*['"]\/student\/([^'"]+)['"]/g,
  'frontend_student'
);

// Staff
fixHrefs(
  path.join(__dirname, 'src/app/frontend_staff/staff_components/StaffLayout_constants.ts'),
  /href:\s*['"]\/staff\/([^'"]+)['"]/g,
  'frontend_staff'
);

// Parent
fixHrefs(
  path.join(__dirname, 'src/app/frontend_parent/parent_components/ParentLayout_constants.ts'),
  /href:\s*['"]\/parent\/([^'"]+)['"]/g,
  'frontend_parent'
);

console.log("Done checking navigation links.");
