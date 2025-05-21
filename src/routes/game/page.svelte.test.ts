import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { game } from '$lib/stores/game.svelte';
import { playerNames } from '$lib/stores/players.svelte';
import { API_BASE_URL } from '$lib/config';

describe('Game Page', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        // Reset game state before each test
        game.game_started = false;
        playerNames.length = 0;
        playerNames.push('Player 1', 'Player 2');
        vi.spyOn(global, 'fetch');
    });

    afterEach(() => {
        global.fetch = originalFetch;
        vi.clearAllMocks();
    });

    it('should show loading spinner while creating new game', async () => {
        // Mock fetch to return a pending promise
        global.fetch = vi.fn().mockImplementation(() => new Promise(() => { }));

        render(Page);

        expect(screen.getByRole('status')).toBeDefined();
        expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/new_game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ players: 2 })
        });
    });

    it('should start game when API call is successful', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true
        });

        render(Page);

        // Wait for the game to start
        await vi.waitFor(() => {
            expect(game.game_started).toBe(true);
        });
    });

    it('should show error message when API call fails', async () => {
        global.fetch = vi.fn().mockRejectedValueOnce(new Error('Failed to create game'));

        render(Page);

        // Wait for error message to appear
        await vi.waitFor(() => {
            expect(screen.getByText('Impossibile creare la partita.')).toBeDefined();
        });
    });

    it('should not create new game if game is already started', () => {
        game.game_started = true;
        render(Page);
        expect(global.fetch).not.toHaveBeenCalled();
    });
});
