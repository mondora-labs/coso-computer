export const FIREBASE_API_KEY = process.env.REACT_APP_API_KEY;

export const GOOGLE_FOLDER =
  process.env.GOOGLE_FOLDER ||
  "https://drive.google.com/drive/u/0/folders/1tkTVZ5snIbjTXbUL0FgCnBrD0fKWXUTj";

export const DATE_FORMAT = "DD/MM/YYYY";

export const ASSET_TYPES = [
  "Computer",
  "Tablet",
  "Mouse",
  "Tastiera",
  "Monitor",
  "Headset",
  "Accessori",
].map((item) => ({
  key: item.toLocaleLowerCase(),
  text: item,
}));

export const ASSET_MODELS = [
  'MacBook Pro 16"',
  'MacBook Pro 15"',
  'MacBook Pro 14"',
  'MacBook Pro 13"',
  'MacBook Air 13"',
  "Dell XPS 15 9500",
  "Surface Pro 8",
  "Surface Pro 7",
  "Surface Book 3",
  "ThinkPad X1",
  "iPad Pro",
  "iPad Air",
  "iPad mini",
  "iPad",
  "Altro (Note)",
].map((item) => ({ key: item, text: item }));

export const UPCYCLE_FACTOR = 365 * 3.2;

export const ICONS = {
  notebook: "ThisPC",
  computer: "ThisPC",
  tablet: "Tablet",
  mouse: "KeyboardClassic",
  tastiera: "KeyboardClassic",
  monitor: "TVMonitor",
  headset: "Headset",
  accessori: "Puzzle",
  smartphone: "CellPhone",
};
