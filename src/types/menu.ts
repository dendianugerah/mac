export interface MenuItem {
  label: string;
  action: string;
  shortcut?: string;
}

export interface MenuSection {
  items: MenuItem[];
  withDivider?: boolean;
}

export type MenuSections = {
  [key: string]: MenuSection[];
}

export const menuSections: MenuSections = {
  file: [
    {
      items: [
        { label: 'New Note', action: 'new', shortcut: '⌘N' },
        { label: 'Open...', action: 'open', shortcut: '⌘O' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Save', action: 'save', shortcut: '⌘S' },
        { label: 'Save As...', action: 'saveAs', shortcut: '⇧⌘S' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Delete Note', action: 'delete', shortcut: '⌫' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Close', action: 'close', shortcut: '⌘W' },
      ]
    }
  ],
  edit: [
    {
      items: [
        { label: 'Undo', action: 'undo', shortcut: '⌘Z' },
        { label: 'Redo', action: 'redo', shortcut: '⇧⌘Z' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Cut', action: 'cut', shortcut: '⌘X' },
        { label: 'Copy', action: 'copy', shortcut: '⌘C' },
        { label: 'Paste', action: 'paste', shortcut: '⌘V' },
      ]
    }
  ],
  view: [
    {
      items: [
        { label: 'Show Sidebar', action: 'toggleSidebar', shortcut: '⌘\\' },
        { label: 'Show Notes List', action: 'toggleNotesList', shortcut: '⇧⌘1' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Enter Full Screen', action: 'toggleFullscreen', shortcut: '⌃⌘F' },
      ]
    }
  ],
  format: [
    {
      items: [
        { label: 'Bold', action: 'bold', shortcut: '⌘B' },
        { label: 'Italic', action: 'italic', shortcut: '⌘I' },
        { label: 'Underline', action: 'underline', shortcut: '⌘U' },
      ],
      withDivider: true
    },
    {
      items: [
        { label: 'Align Left', action: 'alignLeft' },
        { label: 'Center', action: 'alignCenter' },
        { label: 'Align Right', action: 'alignRight' },
      ]
    }
  ]
} as const; 