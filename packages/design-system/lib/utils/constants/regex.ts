export const urlRegex =
  /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g;
export const hashtagRegex = /#\b\w+\b/g;
export const tickerRegex = /^\$[A-Za-z]{3,4}/g;
export const nostrPrefixRegex = /nostr:[a-z0-9]+/g;
export const eventPrefixRegex = /\[event\]\s*\(\d+\)/g;
export const userPrefixRegex = /\(.*\)\[member:\s*\d+\]/g;
export const imageFileRegex = /\.(png|jpg|jpeg|svg|webp|gif)$/;
export const videoFileRegex = /\.(mp4|mov|wmv|avi)$/;
export const numberRegex = /^\d+$/;
export const phoneRegex =
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
