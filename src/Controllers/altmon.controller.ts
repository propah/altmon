import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Altmon from '../Models/altmon.model';

const getAltmons = asyncHandler(async (req: Request, res: Response) => {
    const altmons = await Altmon.find({});
    res.status(200).json(altmons);
});

const getAltmon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get altmon ${req.params.id}`});
});

const postAltmon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update altmon ${req.params.id}`});
});

const putAltmon = asyncHandler(async (req: Request, res: Response) => {
    try {
        const altmon = new Altmon({
            id: req.body.id,
            name: req.body.name,
            types: req.body.types,
            moves: req.body.moves,
            image_link: req.body.image_link,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            special_attack: req.body.special_attack,
            special_defense: req.body.special_defense,
            speed: req.body.speed,
            weight: req.body.weight
        });
        await altmon.save();
        res.status(200).json({altmon});
    } catch (error) {
        res.status(400);
        throw new Error(`Could not create altmon, missing, invalid or unknown fields ${error}}`);
    }
});

const deleteAltmon = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete altmon ${req.params.id}`});
});

export {
    getAltmons,
    getAltmon,
    postAltmon,
    putAltmon,
    deleteAltmon
}
