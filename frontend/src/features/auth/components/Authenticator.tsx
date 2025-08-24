import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

function Authenticator() {

    const [authenticated, setAuthenticated] = useState(false)

    if(!authenticated) {
        return (
            <div className="p-2 flex flex-row justify-around">
                <Link to="/signUp" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl">Sign Up</Link>
                <button onClick={() => setAuthenticated(true)} className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl">Sign In</button>
            </div>
        )
    }

    return (
        <div className="p-2 flex flex-row items-center">
            <div className="text-2xl font-bold flex-1">Your name</div>
            <ArrowRightStartOnRectangleIcon onClick={() => setAuthenticated(false)} className="w-1/5 text-text size-8 outline-2 outline-offset-3 rounded-xl"/> 
        </div>
    )

}

export default Authenticator;