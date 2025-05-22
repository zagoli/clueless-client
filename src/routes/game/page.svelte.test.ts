import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { game } from '$lib/stores/game.svelte';
import { API_BASE_URL } from '$lib/config';
import axios from 'axios';

vi.mock('axios');

describe('Game Page', () => {
    beforeEach(() => {
        // Reset game state before each test
        game.reset();
        game.addPlayer('Player 1');
        game.addPlayer('Player 2');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should show loading spinner while creating new game', async () => {
        // Mock axios to return a pending promise
        vi.mocked(axios.post).mockImplementation(() => new Promise(() => { }));

        render(Page);

        expect(screen.getByRole('status')).toBeDefined();
        expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/new_game`, { players: 2 });
    });

    it('should start game when API call is successful', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({ status: 201 });

        render(Page);

        // Wait for the game to start
        await vi.waitFor(() => {
            expect(game.isStarted()).toBe(true);
        });
    });

    it('should show error message when API call fails', async () => {
        vi.mocked(axios.post).mockRejectedValueOnce(new Error('Failed to create game'));

        render(Page);

        // Get the error message element by its class
        await vi.waitFor(() => {
            const errorElement = screen.getByText('Impossibile creare la partita.', { selector: '.text-xl' });
            expect(errorElement).toBeDefined();
        });
    });

    it('should not create new game if game is already started', () => {
        game.start();
        render(Page);
        expect(axios.post).not.toHaveBeenCalled();
    });
});
