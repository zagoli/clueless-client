import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock for Web Animations API
if (typeof Element !== 'undefined') {
	Element.prototype.animate = vi.fn().mockReturnValue({
		finished: Promise.resolve(),
		addEventListener: vi.fn(),
		cancel: vi.fn()
	});
}

// add more mocks here if you need them
