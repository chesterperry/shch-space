# AGENTS.md

Repository review and design style documentation for the shch-space project.

---

## Repository Review

### Project Overview

**Oleg Scherbinin | shch.one** - A personal portfolio website showcasing architectural and design projects. Built as a static site using Gatsby with Tailwind CSS for styling.

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Gatsby 5.x |
| Frontend | React 18 |
| Styling | Tailwind CSS 3.x with PostCSS |
| Content | MDX (Markdown + JSX) |
| Markdown Rendering | react-markdown |
| Data Source | Google Spreadsheets |
| Package Manager | pnpm |
| Analytics | Google Analytics, Yandex Metrika |
| Deployment | S3 (s3cmd) |

### Architecture

The project follows a **component-based architecture** with Gatsby's static site generation:

```
┌─────────────────────────────────────────────────────┐
│                   Data Sources                       │
│  ┌─────────────────┐    ┌─────────────────┐        │
│  │ Google Sheets   │    │ MDX Posts       │        │
│  │ (Projects)      │    │ (Notes/Blog)    │        │
│  └────────┬────────┘    └────────┬────────┘        │
└───────────┼──────────────────────┼──────────────────┘
            │                      │
            ▼                      ▼
┌─────────────────────────────────────────────────────┐
│              Gatsby Data Layer (GraphQL)            │
└───────────────────────────┬─────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────┐
│                    Pages                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐      │
│  │ Index    │  │ Notes    │  │ Project Page │      │
│  └──────────┘  └──────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────┐
│                 Components                          │
│  Layout │ Header │ SEO │ Links │ Slideshow │ etc.  │
└─────────────────────────────────────────────────────┘
```

### Directory Structure

```
shch-space/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── about.js           - About section component
│   │   ├── cube.js            - 3D cube element
│   │   ├── element.hline.js   - Horizontal line element
│   │   ├── header.js          - Site header
│   │   ├── icon.outward.js    - External link icon
│   │   ├── imagePreview.js    - Image preview component
│   │   ├── layout.js          - Base layout wrapper
│   │   ├── layout.grid.js     - Grid layout wrapper
│   │   ├── layout.css         - Global styles (minimal)
│   │   ├── link.beautifier.js - URL formatting link
│   │   ├── link.simple.js     - Simple link component
│   │   ├── seo.js             - SEO/meta component
│   │   ├── slideshow.js       - Image slideshow
│   │   └── text.format.js     - Text formatting utility
│   ├── images/             # Static images
│   ├── pages/              # Gatsby pages (routes)
│   │   ├── 404.js              - Not found page
│   │   ├── index.js            - Home/projects list
│   │   ├── notes.js            - Notes listing
│   │   └── ...
│   ├── posts/              # MDX blog posts/notes
│   ├── styles/             # Additional styles
│   └── templates/          # Page templates
│       ├── mdx-layout.jsx      - MDX post template
│       └── projectPage.js      - Project detail template
├── static/                 # Static assets
├── gatsby-config.js        # Gatsby configuration
├── gatsby-node.js          # Node APIs (page creation)
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
└── AGENTS.md               # This documentation file
```

### Data Sources

1. **Google Spreadsheets** - Project data (titles, years, roles, images, slugs, status)
2. **MDX Files** - Blog posts and notes with frontmatter

---

## Design Style

### Code Conventions

#### File Naming

- **Components**: `lowercase.extension.js` or `camelCase.js`
- **Dotted naming**: Multi-word components use dots (e.g., `link.beautifier.js`, `element.hline.js`)
- **Pages**: `lowercase.js` for routes
- **Templates**: `camelCase.js` (e.g., `projectPage.js`)

#### Component Structure

```javascript
// Standard component pattern

import * as React from "react"
import { Link, graphql } from "gatsby"
import ComponentName from "./component"

const ComponentName = ({ prop1, prop2 }) => {
  // 1. Hooks at the top
  const [state, setState] = useState(initialValue)
  
  // 2. Event handlers
  const handleEvent = (data) => {
    // handler logic
  }
  
  // 3. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies])
  
  // 4. JSX return
  return (
    <LayoutComponent>
      {/* Content */}
    </LayoutComponent>
  )
}

export default ComponentName
```

#### Import Order

1. React imports
2. Gatsby imports (Link, graphql, etc.)
3. Component imports
4. Utility imports

```javascript
import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import LayoutGrid from "../components/layout.grid"
import Seo from "../components/seo"
import { useState, useEffect } from "react"
```

### React Patterns

#### Functional Components Only

All components use function declarations or arrow functions:

```javascript
// Preferred: function declaration
const ComponentName = ({ prop }) => {
  return <div>{prop}</div>
}

// Also acceptable
function ComponentName({ prop }) {
  return <div>{prop}</div>
}
```

#### Export Style

```javascript
// Default export at the end
export default ComponentName

// Named exports for utilities
export const helper = () => {}
```

#### GraphQL Queries

- **StaticQuery**: For component-level data
- **PageQuery**: For page-level data

```javascript
// StaticQuery (useStaticQuery hook)
const { googleSheet } = useStaticQuery(graphql`
  query ComponentQuery {
    googleSheet {
      projects {
        id
        project
      }
    }
  }
`)

// Page Query (exported)
export const query = graphql`
  query PageQuery($id: String) {
    allGoogleProjectsSheet(filter: { id: { eq: $id } }) {
      nodes {
        id
        project
      }
    }
  }
`
```

#### Markdown Rendering

The project uses `react-markdown` for rendering Markdown content in React components:

```javascript
import ReactMarkdown from "react-markdown"

// Usage in components
<ReactMarkdown className="prose max-w-none">
  {markdownContent}
</ReactMarkdown>
```

This is used in:
- Project comments (projectPage.js) - renders Markdown-formatted project descriptions

### Tailwind CSS Usage

#### Configuration

```javascript
// tailwind.config.js
const settings = {
  colorText: "#333",
  colorPrimary: "#7026b9",
  colorCodeBg: "#fff4db",
  colorCode: "#8a6534",
}
```

#### Class Application Patterns

```javascript
// Inline Tailwind classes (preferred)
<div className="my-0 mx-auto max-w-4xl p-8">

// Responsive classes with breakpoints
<div className="p-2.5 md:p-10 md:grid hidden">

// Flexbox layouts
<div className="flex flex-col md:flex-row justify-center">

// Grid layouts
<div className="grid grid-cols-2 gap-2">
```

#### Responsive Design

- Mobile-first approach
- Breakpoint prefix: `md:` for tablet/desktop
- Common pattern: hide on mobile, show on desktop

```javascript
<div className="md:grid hidden">
```

### Component Architecture

#### Layout Components

Two layout wrappers exist:

1. **`layout.js`** - Basic centered layout
2. **`layout.grid.js`** - Full-width grid layout (primary)

```javascript
// Basic layout
<div className="my-0 mx-auto max-w-4xl p-8">
  <main>{children}</main>
</div>

// Grid layout
<div className="flex flex-col h-full w-full min-h-screen">
  <main className="flex flex-1 mt-6">{children}</main>
</div>
```

#### SEO Component

Each page exports a Head component:

```javascript
export const Head = () => {
  return <Seo title="Page Title" />
}

// Or with data
export const Head = ({ data }) => {
  const project = data.allGoogleProjectsSheet.nodes[0]
  return <Seo title={`PROJECT | ${project.project} | Oleg Scherbinin`} />
}
```

### Styling Patterns

#### Link Styling

```javascript
// Remove underline, add on hover
<a className="no-underline hover:underline">

// Custom hover decoration
<Link className="hover:underline hover:decoration-3 hover:decoration-orange-500">
```

#### Typography

```javascript
// Headings
<h1 className="h-32">Title</h1>
<h3 className="h-16">Subtitle</h3>
<h4 className="h-5">Label</h4>

// Text styles
<span className="uppercase md:text-3xl text-xl font-light">
```

#### Spacing

```javascript
// Consistent padding pattern
<div className="p-2.5 md:p-10">

// Margin utilities
<div className="mb-12 mt-8">

// Gap for grid/flex
<div className="gap-2">
```

### Page Creation Pattern

Pages are created programmatically in `gatsby-node.js`:

```javascript
// Project pages from Google Sheets
projectPages.forEach(edge => {
  createPage({
    path: "/projects/" + edge.node.slug,
    component: require.resolve("./src/templates/projectPage.js"),
    context: {
      id: edge.node.id,
      previousSlug: edge?.previous?.slug || null,
      nextSlug: edge?.next?.slug || null,
    },
  })
})

// MDX posts
posts.forEach(node => {
  createPage({
    path: `/notes/${node.frontmatter.slug}`,
    component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
    context: { id: node.id },
  })
})
```

### State Management

- Local component state with `useState`
- Side effects with `useEffect`
- No global state management (Redux, Context, etc.)

```javascript
const [projectDetails, setProjectDetails] = useState({
  image: null,
  credentials: null,
  project: null,
})
```

### Best Practices

1. **Filter data at the source** when possible
2. **Use conditional rendering** for optional fields
3. **Provide fallbacks** for missing data
4. **Maintain responsive design** with Tailwind breakpoints
5. **Keep components focused** on single responsibilities
6. **Use semantic HTML** elements appropriately
7. **Implement hover interactions** for better UX

### Color Palette

| Color | Usage |
|-------|-------|
| `#333` | Primary text |
| `#7026b9` | Primary/accent |
| `#fff4db` | Code background |
| `#8a6534` | Code text |
| `orange-500` | Hover decorations, header background |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `gatsby-config.js` | Plugins, site metadata, data sources |
| `gatsby-node.js` | Programmatic page creation |
| `tailwind.config.js` | Tailwind customization |
| `src/pages/index.js` | Main projects listing |
| `src/templates/projectPage.js` | Individual project pages (with Markdown rendering) |
| `src/components/layout.grid.js` | Primary layout wrapper |
| `package.json` | Dependencies including react-markdown |
| `pnpm-lock.yaml` | pnpm lock file |

---

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Development server
pnpm develop
# or
gatsby develop

# Production build
pnpm build

# Serve production build
pnpm serve

# Clean cache
gatsby clean

# Format code
pnpm format

# Deploy to S3
pnpm deploy

# Rebuild native modules (if needed)
pnpm rebuild sharp
```

**Note**: The project uses `pnpm` as the package manager. If you encounter issues with native modules (like Sharp), use `pnpm rebuild <package-name>`.

---

## Environment Variables

Required in `.env` file:
- `CREDENTIALS` - Google Service Account credentials (JSON string with `\n` for newlines)