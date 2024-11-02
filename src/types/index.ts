export interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
    isStatic: boolean;
    isPinned?: boolean;
}
  
export interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}