export function saveToStorage<T>(name: string, element: T[]) {
    localStorage.setItem(name, JSON.stringify(element));
}

export function getFromStorage<T>(name: string): T[] | null {
    const item = localStorage.getItem(name);
    return item !== null ? (JSON.parse(item) as T[]) : null;
}