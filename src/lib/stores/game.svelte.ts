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

    start() {
        this.#game_started = true;
    }

    reset() {
        this.#game_started = false;
        this.#hands = {};
        this.#absent_cards = {};
        this.#questions = [];
    }

    is_started() {
        return this.#game_started;
    }

    get_hand(player: string) {
        const hand = this.#hands[player];
        return hand ? hand : [];
    }

    get_absent_cards(player: string) {
        const absent_cards = this.#absent_cards[player];
        return absent_cards ? absent_cards : [];
    }

}

export const game = new Game();