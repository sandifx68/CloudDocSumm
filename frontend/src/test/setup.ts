import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom doesn't implement URL.createObjectURL/revokeObjectURL. Mock them for tests
const hasCreateObjectURL = (u: unknown): u is typeof URL & { createObjectURL: (obj: Blob | MediaSource) => string } =>
  typeof u === 'function' && typeof (u as { createObjectURL?: unknown }).createObjectURL === 'function';
const hasRevokeObjectURL = (u: unknown): u is typeof URL & { revokeObjectURL: (url: string) => void } =>
  typeof u === 'function' && typeof (u as { revokeObjectURL?: unknown }).revokeObjectURL === 'function';

if (!hasCreateObjectURL(URL)) {
  Object.defineProperty(URL, 'createObjectURL', {
    value: vi.fn(() => 'blob:mock'),
    writable: true,
  });
}

if (!hasRevokeObjectURL(URL)) {
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: vi.fn(),
    writable: true,
  });
}
