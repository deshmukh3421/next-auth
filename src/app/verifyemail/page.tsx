'use client';
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setIsVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
            console.log(error.response.message)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        setError(false)
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token? `${token}` : "no token"}</h2>
            {isVerified && (
                <div>
                    <h2 className="text-2xl">Verified</h2>
                    <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}
