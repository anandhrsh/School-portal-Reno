// Global type declarations for better TypeScript support

declare global {
  interface FormData {
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob): void;
    append(name: string, value: string | Blob): void;
    delete(name: string): void;
    forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<FormDataEntryValue>;
    entries(): IterableIterator<[string, FormDataEntryValue]>;
  }
}

export {};
