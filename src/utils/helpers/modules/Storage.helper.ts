abstract class StorageHelper {
  private static getLocalStorageItem(key: string) {
    const storedValue = localStorage.getItem(key) ?? '';
    return typeof storedValue === 'string' ? storedValue : JSON.parse((localStorage.getItem(key) as string) ?? '');
  }

  static local = {
    get(key: string): string {
      return StorageHelper.getLocalStorageItem(key);
    },
    set(key: string, value: unknown): void {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    getIMObject() {
      return Object.keys(localStorage).reduce((acc, current) => {
        if (!current.endsWith('IM_APPLICATION')) {
          return acc;
        }
        const key = current.replace('@secure.s.', '');
        acc = { ...acc, [key]: localStorage.getItem(key) as string };
        return acc;
      }, {} as { [key: string]: string });
    },
    clean(endsWith: string[]) {
      Object.keys(localStorage).forEach((key) => {
        endsWith.forEach((item) => {
          const KEY = key.endsWith(item);
          if (KEY) {
            localStorage.removeItem(key);
          }
        });
      });
    },
  };
}

export default StorageHelper;
