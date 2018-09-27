const register = async ( { db, api }: { db: any, api: any } ) => {
    api.get("/guitars/create", () => db.guitars.create());
    api.get("/guitars/find/:userId/:name", (req: any) => db.guitars.find(req.params));
    api.get("/guitars/all/:userId", (req: any) => db.guitars.all(req.params));
    api.get("/guitars/total/:userId", (req: any) => db.guitars.total(req.params));
};

export { register };
