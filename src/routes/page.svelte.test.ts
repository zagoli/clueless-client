/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import Page from './+page.svelte';
import { goto } from '$app/navigation';
import { game } from '$lib/stores/game.svelte';
import axios from 'axios';

vi.mock('$app/navigation', () => ({
    goto: vi.fn()
}));

vi.mock('axios');

describe('Main Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        game.reset();
        vi.mocked(axios.get).mockResolvedValue({
            status: 200,
            data: 'pong'
        });
    });

    it('should show loading spinner initially', () => {
        render(Page);
        expect(screen.getByRole('status')).toBeTruthy();
    });

    it('should show error message when API call fails', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('API Error'));
        render(Page);
        await waitFor(() => {
            expect(screen.getByText('L\'applicazione non è disponibile.')).toBeTruthy();
        });
    });

    it('should show error message when API returns wrong status', async () => {
        vi.mocked(axios.get).mockResolvedValue({
            status: 500,
            data: 'error'
        });
        render(Page);
        await waitFor(() => {
            expect(screen.getByText('L\'applicazione non è disponibile.')).toBeTruthy();
        });
    });

    it('should show name input after successful ping', async () => {
        render(Page);
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Inserisci il tuo nome')).toBeTruthy();
        });
    });

    it('should show error when submitting empty name', async () => {
        render(Page);
        await waitFor(() => screen.getByText('Continua'));
        const submitButton = screen.getByText('Continua');
        await fireEvent.click(submitButton);
        expect(screen.getByText('Il nome non può essere vuoto')).toBeTruthy();
        expect(goto).not.toHaveBeenCalled();
    });

    it('should navigate to players page and store name when submitting valid name', async () => {
        render(Page);
        await waitFor(() => screen.getByPlaceholderText('Inserisci il tuo nome'));
        const input = screen.getByPlaceholderText('Inserisci il tuo nome');
        await fireEvent.input(input, { target: { value: 'Mario' } });
        const submitButton = screen.getByText('Continua');
        await fireEvent.click(submitButton);

        expect(game.players[0]).toBe('Mario');
        expect(goto).toHaveBeenCalledWith('/players');
    });
});
