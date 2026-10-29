# Modernization Plan: React 18 + Redux Toolkit

## Current State
- Node.js: v22.18.0 (latest) ✓
- React: ^17.0.2 → Target: ^18.3.0
- Redux: ^7.2.6 → Target: Redux Toolkit (v2.x)
- Build tool: Webpack 5

## Changes Required

### 1. Dependencies Update (`package.json`)

**Remove:**
- `redux` (^7.2.6) - No longer needed with RTK
- `redux-thunk` (^2.4.1) - Built into RTK Query
- `redux-logger` (^3.0.6) - Use RTK DevTools instead
- `underscore` (^1.13.2) - Replace with native JS or lodash

**Add:**
- `react-redux` ^9.1.0 (for React 18 compatibility)
- `@reduxjs/toolkit` ^2.2.0
- `@reduxjs/toolkit-test` ^2.2.0 (optional, for testing)

### 2. Project Structure Changes

**New Folder:** `src/redux/`
```
src/redux/
├── store.js              # Redux store setup
├── api/                  # RTK Query API slices
│   ├── trendingMoviesApi.js
│   ├── trendingTVApi.js
│   ├── regionalMoviesApi.js
│   └── mediaDetailApi.js
├── slices/               # Redux slices
│   ├── appSlice.js
│   ├── trendingMoviesSlice.js
│   ├── trendingTVSlice.js
│   ├── regionalMoviesSlice.js
│   └── mediaDetailsSlice.js
└── hooks/                # Custom React hooks
    └── useMediaDetail.js
```

**Remove:**
- `src/reducers/` folder (migrate to slices)
- `src/actions/` folder (migrate to slices + API)

### 3. Key Changes by Component

#### App.jsx
- Update imports from Redux Toolkit
- Use `useSelector` instead of `connect()`

#### Home.jsx & Trending Components
- Replace manual API calls with RTK Query hooks (`useTrendingMovies`, etc.)
- Remove redundant state management

#### MediaDetail.jsx & EpisodeList.jsx
- Use RTK Query for async data fetching
- Simplify reducer logic to slices

### 4. CSS Updates
- Update CSS variables for React 18 theming support
- Ensure compatibility with new component structure

### 5. Build Configuration (`webpack.config.js`)
- Update loaders for React 18
- Add RTK Query Babel plugin if needed

## Implementation Steps

1. **Update package.json** - Install new dependencies
2. **Create Redux Toolkit structure** - Set up slices, store, API hooks
3. **Migrate App.jsx** - First component to use RTK
4. **Migrate Trending Components** - Use RTK Query for data fetching
5. **Migrate Media Detail Flow** - Complete async data pipeline
6. **Update CSS** - Ensure compatibility
7. **Test & Verify** - Build and run application

## Benefits of Migration

- ✅ Type-safe Redux with RTK
- ✅ Automatic code generation (slices)
- ✅ Built-in dev tools for debugging
- ✅ Async/await support out of the box
- ✅ Reduced boilerplate code
- ✅ Better React 18 integration
- ✅ Easier testing and debugging

## Notes

- API key remains in Constants.jsx (keep it secure in production)
- TMDB URLs remain unchanged
- Component structure stays similar for minimal UI changes
- All async operations moved to RTK Query hooks
