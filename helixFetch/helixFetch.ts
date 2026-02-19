import Cookies from "js-cookie";
import { HelixQuery } from "./helixQuery";
import { HelixMutation } from "./helixMutation";

export class HelixFetch {
    baseURL: any = "";
    protected token?: () => string | null;
    protected cached: any = {};

    constructor({ baseURL, setToken }: { baseURL?: string, setToken?: () => any }) {
        this.baseURL = baseURL;
        this.token = setToken;
    }

    async query(url: string) {
        const fullurl = `${this.baseURL}${url}`;

        const query = new HelixQuery(this, fullurl, this.token?.());
        const result = await query.query();
        return result;
    }

    async mutation({ url, data, method }: { url: string, data: any, method: "PATCH" | "PUT" | "DELETE" | "POST" }){
        const fullurl = `${this.baseURL}${url}`;

        const mutation = new HelixMutation(this, fullurl, this.token?.(), method, data);
        const result = await mutation.mutation();
        return result;
    }
};

export const Helix = new HelixFetch(
    {
        baseURL: "http://localhost:5000/api",
        setToken() {
            const token = Cookies.get("auth");
            if (token) return token;
            return null;
        },
    }
);