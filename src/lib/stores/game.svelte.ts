export interface Question {
    asked_by: string;
    responded_by: string;
    suspect: string;
    weapon: string;
    room: string;
}

export const hands = $state<Record<string, string[]>>({});
export const absent_cards = $state<Record<string, string[]>>({});
export const questions = $state<Question[]>([]);