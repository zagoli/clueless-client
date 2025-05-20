import { describe, test, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	beforeEach(() => {
		// Reset all mocks before each test
		vi.resetAllMocks();
	});

	test('should show spinner while loading', () => {
		// Mock fetch to return a pending promise
		vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(() => { })));
		render(Page);
		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	test('should show welcome message when API responds correctly', async () => {
		// Mock successful API response
		vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
			text: () => Promise.resolve('pong')
		} as Response));

		render(Page);

		// Verify loading state first
		expect(screen.getByRole('status')).toBeInTheDocument();

		// Wait for and verify success state
		const heading = await screen.findByText('Benvenuto!');
		expect(heading).toBeInTheDocument();
		expect(screen.getByText('L\'applicazione è attiva e funzionante.')).toBeInTheDocument();
	});

	test('should show error when API fails to respond', async () => {
		// Mock failed API response
		vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('API Error')));

		render(Page);

		// Verify loading state first
		expect(screen.getByRole('status')).toBeInTheDocument();

		// Wait for and verify error state
		const errorMsg = await screen.findByText('L\'applicazione non è disponibile.');
		expect(errorMsg).toBeInTheDocument();
		expect(screen.getByText('Riprova tra qualche mese... o tra qualche anno.')).toBeInTheDocument();
	});

	test('should show error when API response is not "pong"', async () => {
		// Mock API response with wrong text
		vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
			text: () => Promise.resolve('wrong response')
		} as Response));

		render(Page);

		// Wait for and verify error state
		const errorMsg = await screen.findByText('L\'applicazione non è disponibile.');
		expect(errorMsg).toBeInTheDocument();
	});
});
