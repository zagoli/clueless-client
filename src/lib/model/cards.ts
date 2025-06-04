export type CardCategory = "rooms" | "suspects" | "weapons";

export const cardsByCategory: Record<CardCategory, string[]> = {
    suspects: ["Green", "Mustard", "Peacock", "Plum", "Scarlet", "White"],
    weapons: ["Chiave inglese", "Candeliere", "Pugnale", "Pistola", "Tubo di piombo", "Corda"],
    rooms: ["Stanza da bagno", "Studio", "Sala da pranzo", "Sala del biliardo", "Garage", "Camera da letto", "Cucina", "Soggiorno", "Ingresso"],
}

export const suspects = cardsByCategory.suspects;
export const weapons = cardsByCategory.weapons;
export const rooms = cardsByCategory.rooms;

export const cards = suspects.concat(weapons, rooms);

export function isCardInOneOrMoreCategory(card: string, categories: CardCategory[]): boolean {
    return categories.some(category => cardsByCategory[category].includes(card));
}