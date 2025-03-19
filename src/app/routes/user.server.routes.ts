import {Express} from "express";
import * as users from '../controllers/user.server.controller';

module.exports = ( app: Express ) => {

    app.route( '/api/users' )
        .get( users.list )
        .post( users.create );

    app.route( '/api/users/:id' )
        .get( users.read )
        .put( users.update )
        .delete( users.remove );
};
