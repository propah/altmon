import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { blobFromSync } from 'node-fetch';
import logging from '../Config/logging';
import { Altmon, IAltmon } from '../Models/altmon.model';
const NAMESPACE = 'AltmonController';

function validateId(id: string) {
    if (!id) throw new Error(`missing id`); // This is not supposed to happen
    if (!(/^\d+$/.test(id))) throw new Error(`invalid id, numbers only`);
}

function validateAltmon(altmon: IAltmon) {
    if (altmon.hp < 0) throw new Error(`invalid hp`);
    if (altmon.name.length < 5 || altmon.name.length > 20) throw new Error(`invalid name`);
    if (!(/^[a-zA-Z]+$/).test(altmon.name)) throw new Error(`invalid name regex`);
    if (altmon.types.length < 1 || altmon.types.length > 2) throw new Error(`invalid types`);
    if (altmon.attack < 0) throw new Error(`invalid attack`);
}

// @desc   Get all altmons
// @route  GET /api/altmons
// @access Private
const getAltmons = asyncHandler(async (req: Request, res: Response) => {
    logging.debug(NAMESPACE, `Getting all altmons`, req.socket.remoteAddress);
    const altmons = await Altmon.find({});
    logging.debug(NAMESPACE, `Got all altmons`, req.socket.remoteAddress);
    res.status(200).json({ size: altmons.length, altmons });
});

// @desc   Get specified altmon
// @route  GET /api/altmons/:id
// @access Private
const getAltmon = asyncHandler(async (req: Request, res: Response) => {
    try {
        validateId(req.params.id);

        logging.debug(NAMESPACE, `Getting altmon ${req.params.id}`, req.socket.remoteAddress);
        const altmon = await Altmon.findById(req.params.id);
        if (altmon){
            logging.debug(NAMESPACE, `Got altmon ${req.params.id}`, req.socket.remoteAddress);
            res.status(200).json(altmon);
        } else {
            logging.error(NAMESPACE, `Altmon with id ${req.params.id} not found`, req.socket.remoteAddress);
            res.status(404).json({ message: `Altmon not found` });
        }
    } catch (err: any) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not get altmon, invalid request: ${err}`, req.socket.remoteAddress);
        }
        res.status(400).json({ message: `Could not get altmon, invalid request` });
    }
});

// @desc   Update an altmon
// @route  PUT /api/altmons/:id
// @access Private
const putAltmon = asyncHandler(async (req: Request, res: Response) => {
    try {
        validateId(req.params.id);

        logging.debug(NAMESPACE, `Updating altmon ${req.params.id}`, req.socket.remoteAddress);
        const altmon = await Altmon.findByIdAndUpdate(req.params.id, req.body);
        if (altmon){
            logging.debug(NAMESPACE, `Updated altmon ${req.params.id}`, req.socket.remoteAddress);
            res.status(200).json(altmon);
        } else {
            logging.error(NAMESPACE, `Altmon with id ${req.params.id} not found`, req.socket.remoteAddress);
            res.status(404).json({ message: `Altmon not found` });
        }
    } catch (err: any) {
        res.status(400);
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not update altmon, invalid request: ${err}`, req.socket.remoteAddress);
        }
        res.status(404).json({ message: `Could not update altmon, invalid request` });
    }


});

// @desc   Create an altmon
// @route  POST /api/altmons
// @access Private
const postAltmon = asyncHandler(async (req: Request, res: Response) => {
    try {
        logging.debug(NAMESPACE, `Creating altmon with id ${req.body._id}`, req.socket.remoteAddress);
        const altmon = new Altmon(req.body);
        validateAltmon(altmon);
        await altmon.save();
        logging.debug(NAMESPACE, `Created altmon with id ${req.body._id}`, req.socket.remoteAddress);
        res.status(200).json({altmon});
    } catch (err: any) {
        res.status(400);
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not create altmon, missing, invalid or unknown fields: ${err}`, req.socket.remoteAddress);
        }
        res.status(404).json({ message: `Could not create altmon, missing, invalid or unknown fields` });  
    }
});

// @desc   Delete an altmon
// @route  DELETE /api/altmons/:id
// @access Private
const deleteAltmon = asyncHandler(async (req: Request, res: Response) => {
    try {
        validateId(req.params.id);
        logging.debug(NAMESPACE, `Deleting altmon ${req.params.id}`, req.socket.remoteAddress);
        const altmon = await Altmon.findByIdAndDelete(req.params.id);
        if (altmon){
            logging.debug(NAMESPACE, `Deleted altmon ${req.params.id}`, req.socket.remoteAddress);
            res.status(200).json(altmon);
        } else {
            logging.error(NAMESPACE, `Altmon with id ${req.params.id} not found`, req.socket.remoteAddress);
            res.status(404).json({ message: `Altmon not found` });
        }
    } catch (err: any) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not delete altmon, invalid request: ${err}`, req.socket.remoteAddress);
        }
        res.status(400).json({ message: `Could not delete altmon, invalid request` });
    }
});

export {
    getAltmons,
    getAltmon,
    postAltmon,
    putAltmon,
    deleteAltmon
}
