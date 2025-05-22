/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Game from './Game.svelte';
import { Game as GameClass } from '$lib/stores/game.svelte';

describe('Game Component', () => {
    let game: GameClass;

    beforeEach(() => {
        game = new GameClass();
    });

    it('should render empty state when no players', () => {
        render(Game, { game });
        // Should render an empty div with no players
        expect(document.querySelector('.w-full')?.children.length).toBe(0);
    });

    it('should render player sections for each player', () => {
        game.addPlayers(['Mario', 'Luigi', 'Peach']);
        render(Game, { game });
        expect(screen.getByText('MARIO')).toBeTruthy();
        expect(screen.getByText('LUIGI')).toBeTruthy();
        expect(screen.getByText('PEACH')).toBeTruthy();
    });

    it('should render horizontal rules between players except last', () => {
        game.addPlayers(['Mario', 'Luigi', 'Peach']);
        render(Game, { game });
        // Should be 2 horizontal rules for 3 players
        const hrs = document.querySelectorAll('hr');
        expect(hrs.length).toBe(2);
    });

    it('should pass correct props to PlayerSection components', () => {
        game.addPlayer('Mario');
        // Add an absent card to test both sections
        game.addAbsentCard('Mario', 'Revolver');
        render(Game, { game });

        // Should pass player name
        expect(screen.getByText('MARIO')).toBeTruthy();

        // Should have hand section
        expect(screen.getByText('Carte in mano')).toBeTruthy();

        // Should have absent cards
        expect(screen.getByText('Revolver')).toBeTruthy();
    });
});
