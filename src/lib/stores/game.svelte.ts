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
    #hands = $state<Hands>({});
    #absent_cards = $state<AbsentCards>({});
    #questions = $state<Questions>([]);
    #game_started = $state(false);
    #players = $state<string[]>([]);
    #isUpdating = $state(false);

    start() {
        this.#game_started = true;
    }

    reset() {
        this.#game_started = false;
        this.#hands = {};
        this.#absent_cards = {};
        this.#questions = [];
        this.#players = [];
        this.#isUpdating = false;
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

    get isUpdating() {
        return this.#isUpdating;
    }

    set isUpdating(value: boolean) {
        this.#isUpdating = value;
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

    addAbsentCard(player: string, card: string) {
        if (!this.#absent_cards[player]) {
            this.#absent_cards[player] = [];
        }
        if (!this.#absent_cards[player].includes(card)) {
            this.#absent_cards[player].push(card);
        }
    }
}

export const game = new Game();