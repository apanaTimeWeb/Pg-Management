const fs = require('fs');

const path = 'src/app/frontend_student/student_components/StudentLayout.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Chevron imports
content = content.replace(
  "import { Home, IndianRupee, Utensils, MessageSquareWarning, FileText, Bell, LogOut, User, Menu, X, ShieldAlert, Bed, Users, CalendarOff, CheckSquare, MessageCircle, HistoryIcon, Settings, Star } from 'lucide-react';",
  "import { Home, IndianRupee, Utensils, MessageSquareWarning, FileText, Bell, LogOut, User, Menu, X, ShieldAlert, Bed, Users, CalendarOff, CheckSquare, MessageCircle, HistoryIcon, Settings, Star, ChevronDown, ChevronRight } from 'lucide-react';"
);

// 2. Import Constants
if (!content.includes('STUDENT_MENU_ITEMS')) {
  content = content.replace(
    "import type { DictKey } from '@/app/frontend_student/StudentI18n';",
    "import type { DictKey } from '@/app/frontend_student/StudentI18n';\nimport { STUDENT_MENU_ITEMS } from '@/app/frontend_student/student_components/StudentLayout_constants';"
  );
}

// 3. Remove old NAV_ITEMS array to avoid clutter (Optional, but good practice. We can just leave it to not break anything if it's used elsewhere, but it's only local).
// Just keeping it is safer "koi old feature remove nhi karna" but we will switch the map to use STUDENT_MENU_ITEMS.

// 4. Add state for expanded menu
if (!content.includes('const [expandedMenu, setExpandedMenu]')) {
  content = content.replace(
    'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);',
    'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);'
  );
}

// 5. Replace NAV_ITEMS.map
const oldMapRegex = /\{NAV_ITEMS\.map\(\(item: any\) => \{[\s\S]*?\}\)\}/;

const newMap = `{STUDENT_MENU_ITEMS.map((item: any) => {
            if (item.key === 'mess' && !(profile as any)?.hasMessFacility) return null;
            const label = item.label || t(item.key as DictKey);
            const isActive = pathname.startsWith(item.href);
            const hasSub = !!item.subItems;
            const isExpanded = expandedMenu === item.key;

            return (
              <div key={item.key} className="flex flex-col">
                <div
                  onClick={() => {
                    if (hasSub) {
                      setExpandedMenu(isExpanded ? null : item.key);
                    } else {
                      if(typeof window !== 'undefined') window.location.href = item.href;
                    }
                  }}
                  className={\`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md font-bold motion-safe:transition-all cursor-pointer \${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary-subtle' 
                      : 'text-secondary hover:bg-input hover:text-primary'
                  }\`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {label}
                  </div>
                  {hasSub && (
                    isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                </div>
                {hasSub && isExpanded && (
                  <div className="pl-9 pr-3 py-1 flex flex-col gap-1 border-l-2 border-primary/20 ml-5 mt-1 mb-1">
                    {item.subItems.map((sub: any) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-secondary hover:text-primary text-xs font-semibold py-1.5 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}`;

content = content.replace(oldMapRegex, newMap);

fs.writeFileSync(path, content, 'utf8');
