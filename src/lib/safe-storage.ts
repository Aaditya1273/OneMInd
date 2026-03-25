// Safe Storage Polyfill for restricted environments
if (typeof window !== 'undefined') {
    try {
        // Test if localStorage is accessible
        const storage = window.localStorage;
        storage.getItem('test');
    } catch (e) {
        console.warn('LocalStorage access denied. Using in-memory fallback.');
        const mockStorage: Record<string, string> = {};
        try {
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: (key: string) => mockStorage[key] || null,
                    setItem: (key: string, value: string) => { mockStorage[key] = value; },
                    removeItem: (key: string) => { delete mockStorage[key]; },
                    clear: () => { for (const key in mockStorage) delete mockStorage[key]; },
                    length: 0,
                    key: (index: number) => Object.keys(mockStorage)[index] || null,
                },
                writable: true,
                configurable: true
            });
        } catch (err) {
            console.error('Failed to polyfill localStorage:', err);
        }
    }
}

export { };
