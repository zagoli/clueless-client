/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from './game.svelte';

describe('Game Store', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    describe('Game State Management', () => {
        it('should initialize with default values', () => {
            expect(game.isStarted()).toBe(false);
            expect(game.players).toEqual([]);
            expect(game.getAllCardsInHands()).toEqual([]);
            expect(game.envelope).toEqual([]);
        });

        it('should properly start and reset game', () => {
            game.start();
            expect(game.isStarted()).toBe(true);

            game.reset();
            expect(game.isStarted()).toBe(false);
            expect(game.players).toEqual([]);
        });
    });

    describe('Player Management', () => {
        it('should add single player', () => {
            game.addPlayer('Mario');
            expect(game.players).toEqual(['Mario']);
        });

        it('should add multiple players', () => {
            game.addPlayers(['Mario', 'Luigi', 'Peach']);
            expect(game.players).toEqual(['Mario', 'Luigi', 'Peach']);
        });

        it('should not add duplicate players', () => {
            game.addPlayer('Mario');
            game.addPlayer('Mario');
            expect(game.players).toEqual(['Mario']);
        });
    });

    describe('Card Management', () => {
        beforeEach(() => {
            game.addPlayers(['Mario', 'Luigi']);
        });

        it('should return empty array for player with no cards', () => {
            expect(game.getHand('Mario')).toEqual([]);
            expect(game.getAbsentCards('Mario')).toEqual([]);
        });

        it('should add absent cards for a player', () => {
            game.addAbsentCard('Mario', 'Candlestick');
            expect(game.getAbsentCards('Mario')).toEqual(['Candlestick']);
        });

        it('should not add duplicate absent cards', () => {
            game.addAbsentCard('Mario', 'Candlestick');
            game.addAbsentCard('Mario', 'Candlestick');
            expect(game.getAbsentCards('Mario')).toEqual(['Candlestick']);
        });

        it('should add cards to envelope', () => {
            game.addToEnvelope(['Candlestick', 'Library']);
            expect(game.envelope).toEqual(['Candlestick', 'Library']);
        });
    });

    describe('Game Updates', () => {
        beforeEach(() => {
            game.addPlayers(['Mario', 'Luigi']);
        });

        it('should handle game updates with hands', () => {
            const update = {
                diff: {
                    hands: {
                        '0': ['Candlestick'],
                        '1': ['Library']
                    }
                },
                envelope: []
            };

            game.updateGame(update);
            expect(game.getHand('Mario')).toEqual(['Candlestick']);
            expect(game.getHand('Luigi')).toEqual(['Library']);
        });

        it('should handle game updates with absent cards', () => {
            const update = {
                diff: {
                    absent_cards: {
                        '0': ['Candlestick'],
                        '1': ['Library']
                    }
                },
                envelope: []
            };

            game.updateGame(update);
            expect(game.getAbsentCards('Mario')).toEqual(['Candlestick']);
            expect(game.getAbsentCards('Luigi')).toEqual(['Library']);
        });

        it('should handle game updates with envelope', () => {
            const update = {
                diff: {},
                envelope: ['Candlestick', 'Library']
            };

            game.updateGame(update);
            expect(game.envelope).toEqual(['Candlestick', 'Library']);
        });
    });

    describe('Card Collection Methods', () => {
        beforeEach(() => {
            game.addPlayers(['Mario', 'Luigi']);
        });

        it('should return all cards in hands', () => {
            game.updateGame({
                diff: {
                    hands: {
                        '0': ['Candlestick', 'Library'],
                        '1': ['Rope']
                    }
                },
                envelope: []
            });

            expect(game.getAllCardsInHands()).toEqual(['Candlestick', 'Library', 'Rope']);
        });
    });
});
