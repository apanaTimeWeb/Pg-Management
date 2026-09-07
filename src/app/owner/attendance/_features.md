# Module Features

## 1. Module Purpose
Provides core functionality for this domain.

## 2. Directory Structure
```text
module/
  ├── components/
  ├── hooks/
  └── api/
```

## 3. Feature Inventory
| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| Core View | ✅ | High | |

## 4. API Contract
- Uses standard `ApiResponse<T>` wrapper.

## 5. Permissions
- Standard role-based access checks.

## 6. Loading/Error States
- Handled by `loading.tsx` and `error.tsx`.

## 7. Edge Cases
- Network failures caught by error boundaries.

## 8. Rule Compliance Checklist
- [x] Zero relative imports
- [x] No `any` types
