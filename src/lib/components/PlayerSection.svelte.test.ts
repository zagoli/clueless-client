/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PlayerSection from './PlayerSection.svelte';

describe('PlayerSection Component', () => {
    const mockProps = {
        playerName: 'Luigi',
        hand: ['Pistola', 'Plum'],
        absent_cards: ['Scarlet', 'Cucina']
    };

    it('should display player name in uppercase', () => {
        render(PlayerSection, mockProps);
        expect(screen.getByText('LUIGI')).toBeTruthy();
    });

    it('should display cards in hand', () => {
        render(PlayerSection, mockProps);
        expect(screen.getByText('Pistola')).toBeTruthy();
        expect(screen.getByText('Plum')).toBeTruthy();
    });

    it('should display absent cards', () => {
        render(PlayerSection, mockProps);
        expect(screen.getByText('Scarlet')).toBeTruthy();
        expect(screen.getByText('Cucina')).toBeTruthy();
    });

    it('should display section headers', () => {
        render(PlayerSection, mockProps);
        expect(screen.getByText('Carte in mano')).toBeTruthy();
        expect(screen.getByText('Carte assenti')).toBeTruthy();
    });

    it('should display add card button', () => {
        render(PlayerSection, mockProps);
        const addButton = screen.getByRole('button', { name: 'Aggiungi una carta' });
        expect(addButton).toBeTruthy();
    });

    it('should display empty hand section when no cards in hand', () => {
        render(PlayerSection, {
            ...mockProps,
            hand: []
        });
        expect(screen.getByText('Carte in mano')).toBeTruthy();
        // Should still display the section but with no cards
        const handSection = screen.getByText('Carte in mano').nextElementSibling;
        expect(handSection?.children.length).toBe(0);
    });

    it('should not display absent cards section when no absent cards', () => {
        render(PlayerSection, {
            ...mockProps,
            absent_cards: []
        });
        expect(screen.queryByText('Carte assenti')).toBeNull();
    });
});
