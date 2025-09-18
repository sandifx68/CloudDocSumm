import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { doSignOut } from "../../../services/auth";
import { useAuth } from "../../../contexts/useAuth";

function Authenticator() {

    const { userLoggedIn, currentUser } = useAuth()

    if (!userLoggedIn) {
        return (
            <div className="p-2 flex flex-row justify-around">
                <Link to="/sign-up" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl hover:opacity-90">Sign Up</Link>
                <Link to="/sign-in" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl hover:opacity-90">Sign In</Link>
            </div>
        )
    }

    return (
        <div className="p-2 flex flex-row items-center">
            <div className="text-xl flex-1">{currentUser?.email}</div>
            <ArrowRightStartOnRectangleIcon onClick={() => doSignOut()} className="w-1/5 text-text size-8 outline-2 outline-offset-3 rounded-xl cursor-pointer" />
        </div>
    )

}

export default Authenticator;