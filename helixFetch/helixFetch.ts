import { HelixQuery } from "./helixQuery";

export class HelixFetch {
    baseURL: any = "";
    token?: () => string | null;
    protected cached: any = {};

    constructor({ baseURL, setToken }: { baseURL?: string, setToken?: () => string }) {
        this.baseURL = baseURL;
        this.token = setToken;
    }

    async query(url: string) {
        console.log(this.token?.())


        const fullurl = `${this.baseURL}${url}`;

        const query = new HelixQuery(this, fullurl);
        const result = await query.query();
        return result;
    }
};

export const baseQuery = new HelixFetch(
    {
        baseURL: "http://localhost:5000/api",
        setToken() {
            return "hello hello token."
        },
    }
);