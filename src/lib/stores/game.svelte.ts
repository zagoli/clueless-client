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

interface GameDiff {
    hands?: Hands;
    absent_cards?: AbsentCards;
}

interface GameUpdate {
    diff: GameDiff;
    envelope: string[];
}

export class Game {
    #hands = $state<Hands>({});
    #absent_cards = $state<AbsentCards>({});
    #questions = $state<Questions>([]);
    #envelope = $state<string[]>([]);
    #game_started = $state(false);
    #players = $state<string[]>([]);
    #isUpdating = $state(false);
    #lastAskedByPlayer = $state<string>('');

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
        this.#envelope = [];
        this.#lastAskedByPlayer = '';
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

    get lastAskedByPlayer() {
        return this.#lastAskedByPlayer;
    }

    set lastAskedByPlayer(value: string) {
        if (value === '' || this.#players.includes(value)) {
            this.#lastAskedByPlayer = value;
        }
    }

    get envelope() {
        return this.#envelope;
    }

    addToEnvelope(cards: string[]) {
        this.#envelope.push(...cards);
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

    private updatePlayerHands(hands: Hands) {
        for (const [playerIdx, cards] of Object.entries(hands)) {
            const player = this.#players[parseInt(playerIdx)];
            if (player) {
                if (!this.#hands[player]) {
                    this.#hands[player] = [];
                }
                this.#hands[player].push(...cards);
            }
        }
    }

    private updatePlayerAbsentCards(absentCards: AbsentCards) {
        for (const [playerIdx, cards] of Object.entries(absentCards)) {
            const player = this.#players[parseInt(playerIdx)];
            if (player) {
                if (!this.#absent_cards[player]) {
                    this.#absent_cards[player] = [];
                }
                this.#absent_cards[player].push(...cards);
            }
        }
    }

    updateGame(update: GameUpdate) {
        if (update.diff.hands) {
            this.updatePlayerHands(update.diff.hands);
        }

        if (update.diff.absent_cards) {
            this.updatePlayerAbsentCards(update.diff.absent_cards);
        }

        if (update.envelope) {
            this.addToEnvelope(update.envelope);
        }
    }

    getAllCardsInHands() {
        const cards = [];
        for (const hand of Object.values(this.#hands)) {
            cards.push(...hand);
        }
        return cards;
    }
}

export const game = new Game();