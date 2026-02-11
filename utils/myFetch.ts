import { useCacheContext } from "@/contextApi/CacheContext";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";

export const useMyFetch = ({ url, headers }: { url: string; headers?: any }) => {
    const { cached, setCached } = useCacheContext();
    const cachedData = cached[url];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                return;
            }

            try {
                const fullUrl = `${baseUrl}${url}`
                const response = await fetch(fullUrl);
                console.log("called")

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setCached((prev: any) => ({
                    ...prev,
                    [url]: result.data
                }));

                setData(result.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, cachedData, headers, setCached]);

    return { data, loading };
};