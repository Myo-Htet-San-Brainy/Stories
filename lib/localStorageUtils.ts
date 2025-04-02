export function getImagesFromStorage(): string[] | null {
  if (typeof window === "undefined") return null; // SSR safety

  const stored = localStorage.getItem("images");
  return stored ? JSON.parse(stored) : null;
}

export function storeImage(image: string): void {
  if (typeof window === "undefined") return;
  const current = getImagesFromStorage() ?? [];
  localStorage.setItem("images", JSON.stringify([...current, image]));
}
