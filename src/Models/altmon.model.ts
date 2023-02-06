import mongoose from "mongoose";


interface IAltmon {
    _id: number;
    name: string;
    types: [string];
    moves: [string];
    image_link: string;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    weight: number;
    rarity: string;
}

const altmonSchema = new mongoose.Schema<IAltmon>({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    types: { type: [String], required: true },
    moves: { type: [String], required: true },
    image_link: { type: String, required: true },
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    special_attack: { type: Number, required: true },
    special_defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    weight: { type: Number, required: true },
    rarity: { type: String, required: true }
});

const Altmon = mongoose.model<IAltmon>("Altmon", altmonSchema);

export {
    Altmon,
    IAltmon
}
