import logoMindo from "../../assets/mindoLogo.svg"
import darkMode from "../../assets/dark_mode.svg"
import lightMode from "../../assets/light_mode.svg"
import { toggleDarkMode } from "@/lib/theme"

export const Navbar = () => {
    return(
        <>
            <header className="w-full bg-card border-b border-border sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <img src={logoMindo} alt="Mindo" />
                    </div>

                    <button
                    onClick={toggleDarkMode}
                    className="
                        p-2 rounded-full
                        bg-transparent
                        text-muted-foreground
                        hover:bg-accent
                        hover:text-foreground
                        transition-colors
                    "
                    >
                    <img
                        className="dark:hidden w-5 h-5"
                        src={darkMode}
                        alt="dark mode"
                    />
                    <img
                        className="hidden dark:block w-5 h-5"
                        src={lightMode}
                        alt="light mode"
                    />
                    </button>
                </div>
            </header>
        </>
    )
}