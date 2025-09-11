interface CredentialsTextbox {
    label: string,
    password?: boolean,
    autoComplete?: boolean,
    placeholder: string
    value: string | undefined
    stateFunction: React.Dispatch<React.SetStateAction<string>>
}

export default function CredentialsTextbox({label, password = false, autoComplete = true, placeholder, value, stateFunction} : CredentialsTextbox) {

    let autoCompleteValue;
    if(!autoComplete && password)
        autoCompleteValue = "new-password"
    else if(!autoComplete)
        autoCompleteValue = "off"

    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                id={label.toLowerCase()}
                type={password ? "password" : "email" }
                autoComplete={autoCompleteValue}
                placeholder={placeholder}
                value={value}
                onChange={(e) => stateFunction(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-muted bg-background/50 focus:border-accent focus:ring-2 focus:ring-accent outline-none"
            />
        </div>  
    )
}