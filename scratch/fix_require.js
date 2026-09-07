const fs = require('fs');
const files = [
  'src/app/manager/manager_components/ManagerRequireManager.tsx',
  'src/app/owner/owner_components/OwnerRequireOwner.tsx',
  'src/app/staff/staff_components/StaffRequireStaff.tsx',
  'src/app/student/student_components/StudentRequireStudent.tsx',
  'src/app/superadmin/SuperAdmin_components/SuperAdminRequireSuperAdmin.tsx'
];
const roles = ['manager', 'owner', 'staff', 'student', 'superadmin'];
files.forEach((file, index) => {
  const role = roles[index];
  let content = fs.readFileSync(file, 'utf8');
  const replacer = `
  useEffect(() => {
    const session = getSession();
    const isLoginPage = pathname.includes('/${role}/login');

    if (!session || session.role !== '${role}') {
      if (!isLoginPage) {
        router.replace('/${role}/login');
      } else {
        setAuthorized(true);
      }
      return;
    }

    if (isLoginPage) {
      router.replace(session.mustChangePassword ? '/${role}/first-login' : '/${role}/dashboard');
      return;
    }
    
    if (session.mustChangePassword && !pathname.includes('/${role}/first-login')) {
      router.replace('/${role}/first-login');
      return;
    }
    
    setAuthorized(true);
  }, [router, pathname]);
  `.trim();
  content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[router, pathname\]\);/, replacer);
  fs.writeFileSync(file, content);
});
