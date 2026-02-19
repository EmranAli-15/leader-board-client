export class HelixQuery {
    url = "";
    helixFetch: any = null;
    constructor(helixFetch: Object, url: string) {
        this.url = url;
        this.helixFetch = helixFetch;
    };

    async query() {
        if (this.helixFetch.cached[this.url])
            return this.helixFetch.cached[this.url]
        else {
            try {
                const response = await fetch(this.url);
                const result = await response.json();

                if (!response.ok) throw new Error(result.message)

                this.helixFetch.cached[this.url] = result;
                return result;
            } catch (error: any) {
                return error;
            }
        }
    }
};