import { useCacheContext } from "@/contextApi/CacheContext";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";

export const useHelixQuery = ({ url, wait = false }: { url: string; wait?: boolean }) => {

    const { cached, setCached } = useCacheContext();
    const cachedData = cached[url];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null);



    useEffect(() => {

        if (wait) return;


        const fetchData = async () => {
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                return;
            }

            try {
                const fullUrl = `${baseUrl}${url}`
                const response = await fetch(fullUrl);

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                setCached((prev: any) => ({
                    ...prev,
                    [url]: result.data
                }));

                setData(result.data);
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};