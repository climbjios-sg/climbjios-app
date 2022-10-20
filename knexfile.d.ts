declare const knexConfig: {
    wrapIdentifier(identifier: string, origWrap: import("objection").Identity<string>): string;
    postProcessResponse(response: any): any;
    client: string;
    connection: {
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
    };
    migrations: {
        directory: string;
        loadExtensions: string[];
    };
    seeds: {
        directory: string;
        loadExtensions: string[];
    };
};
export default knexConfig;
