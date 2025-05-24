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

        it('should handle isUpdating state', () => {
            expect(game.isUpdating).toBe(false);
            game.isUpdating = true;
            expect(game.isUpdating).toBe(true);
            game.reset();
            expect(game.isUpdating).toBe(false);
        });

        it('should handle lastAskedByPlayer state', () => {
            expect(game.lastAskedByPlayer).toBe('');
            game.lastAskedByPlayer = 'Mario';
            expect(game.lastAskedByPlayer).toBe('Mario');
            game.reset();
            expect(game.lastAskedByPlayer).toBe('');
        });

        it('should handle lastAskedByPlayer state with validation', () => {
            game.addPlayer('Mario');

            // Should set valid player
            game.lastAskedByPlayer = 'Mario';
            expect(game.lastAskedByPlayer).toBe('Mario');

            // Should not set invalid player
            game.lastAskedByPlayer = 'Luigi';
            expect(game.lastAskedByPlayer).toBe('Mario');

            // Should allow empty string
            game.lastAskedByPlayer = '';
            expect(game.lastAskedByPlayer).toBe('');
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

        it('should handle empty envelope additions', () => {
            game.addToEnvelope([]);
            expect(game.envelope).toEqual([]);
        });

        it('should concatenate multiple envelope additions', () => {
            game.addToEnvelope(['Candlestick']);
            game.addToEnvelope(['Library']);
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

        it('should handle empty updates', () => {
            const update = {
                diff: {},
                envelope: []
            };
            game.updateGame(update);
            expect(game.getHand('Mario')).toEqual([]);
            expect(game.getAbsentCards('Mario')).toEqual([]);
            expect(game.envelope).toEqual([]);
        });

        it('should handle updates with invalid player indices', () => {
            const update = {
                diff: {
                    hands: {
                        '99': ['Candlestick']
                    },
                    absent_cards: {
                        '99': ['Library']
                    }
                },
                envelope: []
            };
            game.updateGame(update);
            expect(game.getAllCardsInHands()).toEqual([]);
            expect(Object.values(game.getAbsentCards('Mario'))).toEqual([]);
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
