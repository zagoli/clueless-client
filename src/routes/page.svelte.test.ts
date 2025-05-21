/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { goto } from '$app/navigation';
import { playerNames } from '$lib/stores/players.svelte';

vi.mock('$app/navigation', () => ({
    goto: vi.fn()
}));

describe('Main Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        while (playerNames.length > 0) {
            playerNames.pop(); // Properly clear the array
        }
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            text: () => Promise.resolve('pong')
        }));
    });

    it('should show loading spinner initially', () => {
        render(Page);
        expect(screen.getByRole('status')).toBeTruthy();
    });

    it('should show name input after successful ping', async () => {
        render(Page);
        const input = await screen.findByPlaceholderText('Inserisci il tuo nome');
        expect(input).toBeTruthy();
    });

    it('should show error when submitting empty name', async () => {
        render(Page);
        const submitButton = await screen.findByText('Continua');
        await fireEvent.click(submitButton);
        expect(screen.getByText('Il nome non può essere vuoto')).toBeTruthy();
        expect(goto).not.toHaveBeenCalled();
    });

    it('should navigate to game page and store name when submitting valid name', async () => {
        render(Page);
        const input = await screen.findByPlaceholderText('Inserisci il tuo nome');
        await fireEvent.input(input, { target: { value: 'Mario' } });
        const submitButton = screen.getByText('Continua');
        await fireEvent.click(submitButton);

        expect(playerNames[playerNames.length - 1]).toBe('Mario');
        expect(goto).toHaveBeenCalledWith('/game');
    });
});
