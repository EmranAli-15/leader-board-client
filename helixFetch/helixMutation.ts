import { HelixFetch } from "./helixFetch";

export class HelixMutation {
    url = "";
    helixFetch: any = null;
    token: string | any = "";
    method: string = "";
    data: any = null;

    constructor(helixFetch: HelixFetch, url: string, token: string | any, method: string, data: any) {
        this.url = url;
        this.helixFetch = helixFetch;
        this.token = token;
        this.method = method;
        this.data = data
    };

    async mutation() {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: {
                    'Authorization': this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message)

            this.helixFetch.cached[this.url] = result;
            return result;
        } catch (error: any) {
            return error;
        }
    }
};