"use client"

import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react';

const CacheContext = createContext<any>(null);



export default function CacheContextApp({ children }: { children: React.ReactNode }) {
    const [cached, setCached] = useState({})

    const values = {
        cached,
        setCached
    }

    return (
        <CacheContext value={values}>
            {
                children
            }
        </CacheContext>
    )
};


export const useCacheContext = () => {
    const context = useContext(CacheContext);

    if (!context) {
        throw new Error("The component not inside the context provider");
    };
    return context;
};

