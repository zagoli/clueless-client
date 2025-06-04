export type CardCategory = "rooms" | "suspects" | "weapons";

export const cardsByCategory: Record<CardCategory, string[]> = {
    rooms: ["Ingresso", "Sala del biliardo", "Cucina", "Sala da pranzo", "Soggiorno", "Camera da letto", "Studio", "Stanza da bagno", "Garage"],
    suspects: ["Plum", "Scarlet", "Green", "Mustard", "Peacock", "White"],
    weapons: ["Pistola", "Candeliere", "Corda", "Tubo di piombo", "Chiave inglese"]
}

export const rooms = cardsByCategory.rooms;
export const suspects = cardsByCategory.suspects;
export const weapons = cardsByCategory.weapons;

export const cards = suspects.concat(weapons, rooms);