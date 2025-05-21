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

export interface Game {
    hands: Hands;
    absent_cards: AbsentCards;
    questions: Questions;
    game_started: boolean;
}

export const game = $state<Game>({ hands: {}, absent_cards: {}, questions: [], game_started: false });