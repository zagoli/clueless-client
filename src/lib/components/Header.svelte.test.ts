import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Header from './Header.svelte';
import { goto } from '$app/navigation';
import { playerNames } from '$lib/stores/players.svelte';

vi.mock('$app/navigation', () => ({
    goto: vi.fn()
}));

describe('Header Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset playerNames
        while (playerNames.length > 0) {
            playerNames.pop();
        }
    });

    it('should display Clueless title', () => {
        render(Header);
        expect(screen.getByText('Clueless')).toBeTruthy();
    });

    it('should display reset button', () => {
        render(Header);
        expect(screen.getByTestId("reset-button")).toBeTruthy();
    });

    it('should show confirmation modal when reset button is clicked', async () => {
        render(Header);
        const resetButton = screen.getByTestId("reset-button");
        await fireEvent.click(resetButton);

        const modal = screen.getByTestId('reset-modal');
        expect(modal).toBeTruthy();
        expect(modal).toHaveProperty('open');
        expect(screen.getByText('Sei sicuro di voler ricominciare il gioco?')).toBeTruthy();
    });

    it('should reset game and navigate to home when confirmed', async () => {
        // Add a player to verify it gets cleared
        playerNames.push('TestPlayer');

        render(Header);
        const resetButton = screen.getByTestId("reset-button");
        await fireEvent.click(resetButton);

        const confirmButton = screen.getByText('Si, ricomincia');
        await fireEvent.click(confirmButton);

        expect(playerNames.length).toBe(0);
        expect(goto).toHaveBeenCalledWith('/');

        const modal = screen.queryByTestId('reset-modal');
        expect(modal?.getAttribute('open')).toBeFalsy();
    });

    it('should close modal without resetting when canceled', async () => {
        playerNames.push('TestPlayer');

        render(Header);
        const resetButton = screen.getByTestId("reset-button");
        await fireEvent.click(resetButton);

        const cancelButton = screen.getByText('Close');
        await fireEvent.click(cancelButton);

        expect(playerNames.length).toBe(1);
        expect(goto).not.toHaveBeenCalled();

        const modal = screen.queryByTestId('reset-modal');
        expect(modal?.getAttribute('open')).toBeFalsy();
    });
});
