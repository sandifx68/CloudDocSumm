import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { doSignOut } from "../../../firebase/auth";
import { useState } from "react";

function Authenticator() {

    const { userLoggedIn, currentUser } = useAuth()

    if (!userLoggedIn) {
        return (
            <div className="p-2 flex flex-row justify-around">
                <Link to="/signUp" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl">Sign Up</Link>
                <button onClick={() => console.log("Redirecting...")} className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl">Sign In</button>
            </div>
        )
    }

    return (
        <div className="p-2 flex flex-row items-center">
            <div className="text-2xl font-bold flex-1">{currentUser?.email}</div>
            <ArrowRightStartOnRectangleIcon onClick={() => doSignOut()} className="w-1/5 text-text size-8 outline-2 outline-offset-3 rounded-xl" />
        </div>
    )

}

export default Authenticator;