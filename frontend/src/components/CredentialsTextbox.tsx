interface CredentialsTextbox {
    label: string,
    password?: boolean,
    placeholder: string
    value: string | undefined
    stateFunction: any
}

export default function CredentialsTextbox({label, password = false, placeholder, value, stateFunction} : CredentialsTextbox) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                id={label.toLowerCase()}
                type={password ? "password" : "email" }
                placeholder={placeholder}
                value={value}
                onChange={(e) => stateFunction(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-muted bg-background/50 focus:border-accent focus:ring-2 focus:ring-accent outline-none"
            />
        </div>  
    )
}