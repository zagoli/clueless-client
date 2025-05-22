/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { goto } from '$app/navigation';
import { game } from '$lib/stores/game.svelte';

vi.mock('$app/navigation', () => ({
    goto: vi.fn()
}));

describe('Players Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        game.reset();
    });

    it('should show empty list initially', () => {
        render(Page);
        expect(screen.queryByRole('list')).toBeFalsy();
    });

    it('should show error when submitting empty name', async () => {
        render(Page);
        const addButton = screen.getByText('Aggiungi');
        await fireEvent.click(addButton);
        expect(screen.getByText('Il nome non può essere vuoto')).toBeTruthy();
    });

    it('should add player to list when submitting valid name', async () => {
        render(Page);
        const input = screen.getByPlaceholderText('Nome');
        await fireEvent.input(input, { target: { value: 'Luigi' } });
        const addButton = screen.getByText('Aggiungi');
        await fireEvent.click(addButton);

        expect(screen.getByText('Luigi')).toBeTruthy();
        // Should not be added to game store yet
        expect(game.players).not.toContain('Luigi');
    });

    it('should show error when continuing without players', async () => {
        render(Page);
        const continueButton = screen.getByText('Continua');
        await fireEvent.click(continueButton);
        expect(screen.getByText('Aggiungi almeno un altro giocatore')).toBeTruthy();
    });

    it('should add players to store and navigate when continuing', async () => {
        render(Page);
        // Add a player
        const input = screen.getByPlaceholderText('Nome');
        const addButton = screen.getByText('Aggiungi');

        await fireEvent.input(input, { target: { value: 'Mario' } });
        await fireEvent.click(addButton);

        // Verify player is in list but not in store
        expect(screen.getByText('Mario')).toBeTruthy();
        expect(game.players).not.toContain('Mario');

        // Continue and verify player is added to store
        const continueButton = screen.getByText('Continua');
        await fireEvent.click(continueButton);

        expect(game.players).toContain('Mario');
        expect(goto).toHaveBeenCalledWith('/game');
    });
});
