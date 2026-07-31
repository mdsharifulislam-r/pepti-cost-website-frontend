import { imageUrl } from "../store/baseApi";




// Simple formatter for currency
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export const setToLocalStorage = (key: string, value: string) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  if (!key && typeof window === "undefined") {
    return;
  }
  return localStorage.getItem(key);
};

export function getImageUrl(path: string = '') {

  return path.startsWith("http") ? path : path.startsWith("/asset") ? imageUrl.replace("/files", "") + path : imageUrl + path
}


export function base64ToFile(base64: string, fileName: string): File {
  const [meta, data] = base64.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] || "";

  const byteString = atob(data);
  const buffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([buffer], { type: mime });

  return new File([blob], fileName, { type: mime });
}