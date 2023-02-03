import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const getPokemons = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: "Get pokemons"});
});

const getPokemon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get pokemon ${req.params.id}`});
});

const postPokemon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update pokemon ${req.params.id}`});
});

const putPokemon = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please provide a text");
    }

    res.status(200).json({message: `Add pokemon`});
});

const deletePokemon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete pokemon ${req.params.id}`});
});

export {
    getPokemons,
    getPokemon,
    postPokemon,
    putPokemon,
    deletePokemon
}
