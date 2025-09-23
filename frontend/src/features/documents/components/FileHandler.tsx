import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid"
import { useAuth } from "../../auth/contexts/useAuth"

type FileHandlerProps = {
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
    setError: React.Dispatch<React.SetStateAction<string>>
}

export default function FileHandler({file, setFile, setError} : FileHandlerProps) {
    
    const { userLoggedIn } = useAuth()
    const isDisabled = !userLoggedIn;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;

        const file = e.target.files[0]
        if(file.type!='application/pdf') {
            setError("File is not a pdf!")
            setFile(null)
            return;
        }
        if(file.size > 5 * 1024 * 1024) {
            setError("File size is too large!")
            return;
        }
        
        setError("")
        setFile(e.target.files[0])
        
    }
    
    return (
        <>
            <input
                id="file"
                type="file"
                disabled={isDisabled}
                aria-disabled={isDisabled}
                onChange={handleFileChange}
                className="peer sr-only"
                accept="application/pdf"
            />
            <div className="flex items-center gap-2">
                <label
                    htmlFor={isDisabled ? undefined : "file"}
                    onClick={(e) => { if (isDisabled) e.preventDefault(); }}
                    className={`rounded-md bg-sidebar px-4 py-2 text-text shadow transition-colors ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
                >
                    {isDisabled ? "Log in to upload a file!" : file ? "Choose other file to upload" : "Choose file to upload"}
                </label>
                <div className="relative group" title="Only PDFs up to 5 MB accepted">
                    <QuestionMarkCircleIcon
                        tabIndex={0}
                        aria-describedby="file-help-tooltip"
                        className="size-5 text-text/80 hover:text-text cursor-help outline-none"
                    />
                    <div
                        id="file-help-tooltip"
                        role="tooltip"
                        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                    >
                        Only PDFs up to 5 MB accepted.
                    </div>
                </div>
            </div>
        </>
    )
}
