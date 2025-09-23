import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { doSignOut } from "../../../services/auth";
import { useAuth } from "../contexts/useAuth";
import { useSummary } from "../../documents/contexts/useSummary";

function Authenticator() {

    const { userLoggedIn, currentUser } = useAuth()
    const { setCurrentSummary } = useSummary()

    const handleSignOut = () => {
        doSignOut()
        setCurrentSummary(undefined)
    }

    if (!userLoggedIn) {
        return (
            <div className="mt-2 flex flex-row justify-around">
                <Link to="/sign-up" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl hover:opacity-90">Sign Up</Link>
                <Link to="/sign-in" className="text-2xl font-bold text-text outline-2 outline-offset-3 rounded-xl hover:opacity-90">Sign In</Link>
            </div>
        )
    }

    return (
        <div className="mt-2 flex flex-row items-center">
            <div className="text-xl flex-1 truncate">{currentUser?.email}</div>
            <ArrowRightStartOnRectangleIcon onClick={() => handleSignOut()} className="min-w-1/5 text-text size-8 outline-2 outline-offset-3 rounded-xl cursor-pointer" />
        </div>
    )

}

export default Authenticator;