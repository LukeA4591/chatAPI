import * as users from '../models/user.server.model';
import Logger from '../../config/logger';
import {Request, Response} from 'express';
import {validate} from "../../config/validator";
import * as schemas from '../../resources/schemas.json';

const list = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET all users`)
    try {
        const result = await users.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(500)
            .send(`ERROR getting users ${err}`);
    }
};

const create = async (req: Request, res: Response) : Promise<void> => {
    Logger.http(`POST create a user with username: ${req.body.username}`)
    const validation = await validate(schemas.user_register, req.body);
    if (validation !== true) {
        res.statusMessage = `Bad Request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }
    const username = req.body.username;
    try {
        const result = await users.insert( username );
        res.status( 201 ).send({"user_id": result.insertId});
    } catch( err ) {
        res.status( 500 ).send( `ERROR creating user ${username}: ${ err }`);
    }
};

const read = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET single user id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const result = await users.getOne(parseInt(id, 10));
        if (result.length === 0) {
            res.status(404).send({"User": "not found"});
        } else {
            res.status(200).send(result[0]);
        }
    } catch( err ) {
        res.status( 500 ).send(`ERROR reading user ${id}: ${ err }`);
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`PUT update user with id: ${req.params.id}`)
    const validation = await validate(schemas.user_register, req.body);
    if (validation !== true) {
        res.statusMessage = `Bad Request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }
    const id = req.params.id;
    const username = req.body.username;
    try {
        const result = await users.alter(parseInt(id, 10), username);
        res.status(200).send({"updated user_id": result.insertId});
    } catch ( err ) {
        res.status( 500 ).send(`ERROR updating user ${id}: ${ err }`);
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`DELETE user with id ${req.params.id}`);
    const id = parseInt(req.params.id, 10);
    try {
        const result = await users.remove(id);
        res.status(200).send({"deleted user_id": result.insertId});
    } catch ( err ) {
        res.status(404).send(`ERROR deleteing user ${id}: ${ err }`);
    }
};

export { list, create, read, update, remove }