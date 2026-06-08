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

        if (this.cached[fullurl])
            return {
                success: true,
                result: this.cached[fullurl]
            }
        else {
            try {
                const response = await fetch(fullurl, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.token?.() as any,
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (!response.ok) throw new Error(result.message)

                this.cached[fullurl] = result;
                return {
                    success: true,
                    result
                };
            } catch (error: any) {
                return {
                    success: false,
                    error
                };
            }
        }
    }

    async mutation({ url, data, method }: { url: string, data?: any, method: "PATCH" | "PUT" | "DELETE" | "POST" }) {
        const fullurl = `${this.baseURL}${url}`;

        const mutation = new HelixMutation(this, fullurl, this.token?.(), method, data);
        const result = await mutation.mutation();
        return result;
    }
};

export const Helix = new HelixFetch(
    {
        baseURL: "http://localhost:5000/api",
        // baseURL: "https://leader-board-server-omega.vercel.app/api",
        setToken() {
            const token = Cookies.get("auth");
            if (token) return token;
            return null;
        },
    }
);