import { useState } from "react";

const languages = [
    { name: "English", value: "en" },
    { name: "Malayalam", value: "mal" },
];
export const ToogleLanguage = () => {
    const [language, setLanguage] = useState("en");
    return (
        <div className="flex items-center gap-2">
            {languages.map((language) => (
                <button
                    key={language.value}
                    onClick={() => setLanguage(language.value)}
                    className=""
                >
                    {language.name}
                </button>
            ))}
        </div>
    );
};
