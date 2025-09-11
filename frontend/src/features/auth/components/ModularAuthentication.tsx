import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";

type ModularAuthenticationProps = {
    Textboxes : React.ReactNode,
    Footer : React.ReactNode
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void,
    error : string | undefined,
    title : string,
    buttonText : string,
    loadingText : string,
}

export default function ModularAuthentication({Textboxes, Footer, handleSubmit, error, title, buttonText, loadingText } : ModularAuthenticationProps) {

  const { userLoggedIn, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      {userLoggedIn && (<Navigate to={"/"} replace={true}/>)}
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center text-text">
          {title}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {Textboxes}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-button text-white font-medium hover:opacity-70 transition cursor-pointer"
          >
            {loading ? loadingText : buttonText}
          </button>
        </form>

        <p className="text-center text-red-500 mt-3">
          {error}
        </p>

        {Footer}
      </div>
    </div>
  );
}
