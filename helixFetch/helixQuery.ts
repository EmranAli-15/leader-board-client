import { HelixFetch } from "./helixFetch";

export class HelixQuery {
    url = "";
    helixFetch: any = null;
    token: string | any = ""

    constructor(helixFetch: HelixFetch, url: string, token: string | any) {
        this.url = url;
        this.helixFetch = helixFetch;
        this.token = token;
    };

    async query() {
        if (this.helixFetch.cached[this.url])
            return {
                success: true,
                result: this.helixFetch.cached[this.url]
            }
        else {
            try {
                const response = await fetch(this.url, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.token,
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (!response.ok) throw new Error(result.message)

                this.helixFetch.cached[this.url] = result;
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
};