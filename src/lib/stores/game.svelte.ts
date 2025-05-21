export interface Question {
    asked_by: string;
    responded_by: string;
    suspect: string;
    weapon: string;
    room: string;
}

export type Hands = Record<string, string[]>;
export type AbsentCards = Record<string, string[]>;
export type Questions = Question[];

export class Game {
    #hands: Hands = $state({});
    #absent_cards: AbsentCards = $state({});
    #questions: Questions = $state([]);
    #game_started: boolean = $state(false);
    #players: string[] = $state([]);

    start() {
        this.#game_started = true;
    }

    reset() {
        this.#game_started = false;
        this.#hands = {};
        this.#absent_cards = {};
        this.#questions = [];
    }

    isStarted() {
        return this.#game_started;
    }

    getHand(player: string) {
        const hand = this.#hands[player];
        return hand ? hand : [];
    }

    getAbsentCards(player: string) {
        const absent_cards = this.#absent_cards[player];
        return absent_cards ? absent_cards : [];
    }

    get players() {
        return this.#players;
    }

    addPlayer(player: string) {
        if (!this.#players.includes(player)) {
            this.#players.push(player);
        }
    }

    addPlayers(players: string[]) {
        for (const player of players) {
            this.addPlayer(player);
        }
    }

}

export const game = new Game();