/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PlayerSection from './PlayerSection.svelte';

describe('PlayerSection Component', () => {
    const mockProps = {
        playerName: 'Luigi',
        hand: ['Pistola', 'Plum'],
        absentCards: ['Scarlet', 'Cucina'],
        canAddCard: true,
        openAddCardModal: vi.fn()
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

    it('should handle add card button interaction', () => {
        render(PlayerSection, mockProps);
        const addButton = screen.getByRole('button', {
            name: `Aggiungi una carta alla mano di ${mockProps.playerName}`
        });
        expect(addButton).toBeTruthy();
        expect(addButton.getAttribute('disabled')).toBeFalsy();
    });

    it('should call openAddCardModal with correct parameters when add button is clicked', async () => {
        render(PlayerSection, mockProps);
        const addButton = screen.getByRole('button', {
            name: `Aggiungi una carta alla mano di ${mockProps.playerName}`
        });
        addButton.click();
        expect(mockProps.openAddCardModal).toHaveBeenCalledWith('Luigi', ['Pistola', 'Plum']);
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
            absentCards: []
        });
        expect(screen.queryByText('Carte assenti')).toBeNull();
    });
});
