declare global {
  interface Window {
    Cursor: any;
  }
}

export interface Config {
  cursorId: string;
  activeClass: string;
  defaultColor: string;
  activeTag: string;
  content?: {
    [x: string]: any
  } 
}