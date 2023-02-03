import mongoose from "mongoose";

const altmonSchema = new mongoose.Schema({
    id: { type: Number, required: true },
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
});

const Altmon = mongoose.model("Altmon", altmonSchema);

export = Altmon;
