import { cardsByCategory, type CardCategory } from "./cards";

export interface Question {
    askedBy: string;
    answeredBy: string;
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
    revealed_cards?: string[];
}

interface GameUpdate {
    diff: GameDiff;
    envelope: string[];
}

export class Game {
    #hands = $state<Hands>({});
    #absentCards = $state<AbsentCards>({});
    #questions = $state<Questions>([]);
    #envelope = $state<string[]>([]);
    #revealedCards = $state<string[]>([]);
    #isGameStarted = $state(false);
    #players = $state<string[]>([]);
    #isUpdating = $state(false);
    #lastAskedByPlayer = $state<string>('');

    start() {
        this.#isGameStarted = true;
    }

    reset() {
        this.#isGameStarted = false;
        this.#hands = {};
        this.#absentCards = {};
        this.#questions = [];
        this.#players = [];
        this.#isUpdating = false;
        this.#envelope = [];
        this.#lastAskedByPlayer = '';
        this.#revealedCards = [];
    }

    isStarted() {
        return this.#isGameStarted;
    }

    getHand(player: string) {
        const hand = this.#hands[player];
        return hand ? hand : [];
    }

    getAbsentCards(player: string) {
        const absent_cards = this.#absentCards[player];
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

    get revealedCards() {
        return this.#revealedCards;
    }

    set lastAskedByPlayer(value: string) {
        if (value === '' || this.#players.includes(value)) {
            this.#lastAskedByPlayer = value;
        }
    }

    get envelope() {
        return this.#envelope;
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
        if (!this.#absentCards[player]) {
            this.#absentCards[player] = [];
        }
        if (!this.#absentCards[player].includes(card)) {
            this.#absentCards[player].push(card);
        }
    }

    updateGame(update: GameUpdate) {
        if (update.diff.hands) {
            this.updatePlayerHands(update.diff.hands);
        }

        if (update.diff.absent_cards) {
            this.updatePlayerAbsentCards(update.diff.absent_cards);
        }

        if (update.diff.revealed_cards) {
            this.updateRevealedCards(update.diff.revealed_cards);
        }

        if (update.envelope) {
            this.updateEnvelope(update.envelope);
        }
    }

    private updateRevealedCards(revealed_cards: string[]) {
        for (const card of revealed_cards) {
            this.#revealedCards.push(card);
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
                if (!this.#absentCards[player]) {
                    this.#absentCards[player] = [];
                }
                this.#absentCards[player].push(...cards);
            }
        }
    }

    private updateEnvelope(cards: string[]) {
        this.#envelope = cards;
    }

    getAllCardsInHands() {
        const cards = [];
        for (const hand of Object.values(this.#hands)) {
            cards.push(...hand);
        }
        return cards;
    }

    addQuestion(question: Question) {
        this.#questions.push(question);
    }

    get questions() {
        return this.#questions;
    }

    discoveredCardCategories(): CardCategory[] {
        const categories = [];
        for (const [category, cards] of Object.entries(cardsByCategory)) {
            if (this.#envelope.some(card => cards.includes(card))) {
                categories.push(category);
            }
        }
        return categories as CardCategory[];
    }
}

export const game = new Game();