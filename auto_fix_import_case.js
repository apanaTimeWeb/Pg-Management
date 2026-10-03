const fs = require('fs');
const path = require('path');

// Root dir for @ alias
const rootAppDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
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

// Function to find real case-sensitive path
function findRealCasePath(targetPath) {
  if (fs.existsSync(targetPath)) return targetPath;
  
  const parts = targetPath.split(path.sep);
  let currentPath = parts[0] + path.sep;
  
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i]) continue;
    
    // If the path up to here exists, just use it, otherwise find case-insensitive match
    const testPath = path.join(currentPath, parts[i]);
    if (fs.existsSync(testPath)) {
      currentPath = testPath;
    } else {
      if (!fs.existsSync(currentPath)) return null;
      const items = fs.readdirSync(currentPath);
      const match = items.find(item => item.toLowerCase().replace(/_/g, '') === parts[i].toLowerCase().replace(/_/g, ''));
      if (match) {
        currentPath = path.join(currentPath, match);
      } else {
        // Handle .ts / .tsx / .css extensions if they were omitted in the import
        const extMatch = items.find(item => item.toLowerCase().replace(/\.(tsx|ts|js|jsx)$/, '') === parts[i].toLowerCase());
        if (extMatch) {
           currentPath = path.join(currentPath, extMatch);
        } else {
           return null; // Not found
        }
      }
    }
  }
  return currentPath;
}

const allFiles = walk(path.join(__dirname, 'src/app'));

let totalFixed = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Find all imports
  const importRegex = /(import\s+.*?from\s+['"])([^'"]+)(['"])/g;
  const dynamicImportRegex = /(import\(['"])([^'"]+)(['"]\))/g;
  
  function replacePath(match, p1, importPath, p3) {
    if (!importPath.startsWith('@/') && !importPath.startsWith('.') && !importPath.startsWith('..')) {
      return match;
    }
    
    let absPath;
    let isAlias = false;
    if (importPath.startsWith('@/')) {
      absPath = path.join(rootAppDir, importPath.substring(2));
      isAlias = true;
    } else {
      absPath = path.resolve(path.dirname(file), importPath);
    }
    
    // Normalize path
    absPath = path.normalize(absPath);
    
    const realPath = findRealCasePath(absPath);
    if (realPath && realPath !== absPath) {
      // Reconstruct the import path with correct casing
      
      let newImportPath = importPath;
      
      if (isAlias) {
         // Reconstruct @/ path
         const rel = path.relative(rootAppDir, realPath);
         newImportPath = '@/' + rel.replace(/\\/g, '/');
         // Remove extension if original didn't have it
         if (!importPath.endsWith('.ts') && !importPath.endsWith('.tsx') && !importPath.endsWith('.css')) {
            newImportPath = newImportPath.replace(/\.(tsx|ts|js|jsx)$/, '');
         }
      } else {
         const rel = path.relative(path.dirname(file), realPath);
         newImportPath = rel.replace(/\\/g, '/');
         if (!newImportPath.startsWith('.') && !newImportPath.startsWith('..')) {
            newImportPath = './' + newImportPath;
         }
         if (!importPath.endsWith('.ts') && !importPath.endsWith('.tsx') && !importPath.endsWith('.css')) {
            newImportPath = newImportPath.replace(/\.(tsx|ts|js|jsx)$/, '');
         }
      }
      
      if (newImportPath !== importPath) {
        return p1 + newImportPath + p3;
      }
    }
    
    return match;
  }
  
  content = content.replace(importRegex, replacePath);
  content = content.replace(dynamicImportRegex, replacePath);
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed import case in: ${file}`);
    totalFixed++;
  }
});

console.log(`Finished fixing case for ${totalFixed} files.`);
