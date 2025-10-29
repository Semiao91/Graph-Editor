# Graph Editor

A modern, interactive graph editor built with React, TypeScript, and Vite. Create, edit, and visualize node-based graphs with real-time synchronization and offline support.

## Features

- 🎨 **Interactive Graph Canvas** - Create and edit nodes and edges with drag-and-drop
- 🔌 **Offline-First** - Works offline with local storage, syncs when online
- 💾 **Auto-Save** - Automatic persistence to IndexedDB
- 🔄 **Real-time Sync** - Mock server synchronization with conflict resolution
- 🎯 **Snap to Grid** - Toggle grid snapping for precise positioning
- 📊 **Property Editor** - Edit node and edge properties in real-time
- 🌐 **Network Simulator** - Test offline/online scenarios

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd graph-editor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file** (optional)

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your settings:

   ```env
   # Storage configuration
   VITE_STORAGE_KEY=graph-editor:v1
   VITE_SAVE_DEBOUNCE_MS=800

   # API configuration (for future use)
   # VITE_API_URL=http://localhost:3000
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Usage

### Creating Nodes

- Click the **+** button in the toolbar
- Or drag from an existing node handle to create a connected node

### Editing Properties

- Click on a node or edge to open the properties panel
- Edit label, color, weight, and other properties
- Changes save automatically

### Network Simulation

- Use the **Network Simulator** (top-right) to toggle online/offline mode
- Test how the app handles offline changes and synchronization
- Watch the sync status in the header

### Keyboard Shortcuts

- `Delete` - Remove selected node or edge
- Drag nodes to reposition
- Click background to deselect

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **@xyflow/react** - Graph visualization
- **Zustand** - State management
- **IndexedDB** - Local persistence with idb Keyval
- **Ant Design** - UI components
- **React Scan** - For rendering optimization

## Project Structure

```
src/
├── components/       # React components
│   ├── atoms/       # Basic UI components
│   ├── molecules/   # Composite components
│   └── organisms/   # Complex components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── interfaces/      # TypeScript interfaces
├── services/        # Business logic
├── store/           # Zustand store
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Development

### Environment Variables

Create a `.env` file in the root directory:

```env
# Storage Key (for IndexedDB)
VITE_STORAGE_KEY=graph-editor:v1

# Debounce time for auto-save (milliseconds)
VITE_SAVE_DEBOUNCE_MS=800
```


```

```
