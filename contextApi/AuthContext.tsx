"use client"

import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext<any>(null);



export default function AuthContextApp({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const values = {
        user,
        setUser,
        loading,
        setLoading
    };

    useEffect(() => {
        const authToken = Cookies.get("auth");
        if (authToken) {
            const decoded = jwtDecode(authToken);
            setUser(decoded);
        }
        else {
            setUser(null);
        }
        setLoading(false);
    }, [loading])

    return (
        <AuthContext value={values}>
            {
                children
            }
        </AuthContext>
    )
};


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("The component not inside the context provider");
    };
    return context;
};