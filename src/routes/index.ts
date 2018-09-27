import * as guitars from "./guitars";

const register = async ( app: any, db: any ) => {
    const api = {
        get: ( url: string, handler: (req: any) => any ) => {
            app.get( "/api" + url, (req: any, res: any) => {
                handler(req)
                    .then( (data: any) => {
                        res.json(data);
                    } )
                    .catch( (error: any) => {
                        res.json( { error: error.message || error } );
                    } );
            } );
        },
    };
    guitars.register( { db, api } );
};

export { register };
