import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Footer() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "silk";
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        const fromDoc = document.documentElement.getAttribute("data-theme");
        if (fromDoc) return fromDoc;
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "halloween"
            : "silk";
    });

    useEffect(() => {
        const initial =
            localStorage.getItem("theme") ||
            document.documentElement.getAttribute("data-theme") ||
            (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "halloween"
                : "silk");

        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "halloween" ? "silk" : "halloween";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    const isDark = theme === "halloween";

    return (
        <footer className="footer footer-horizontal footer-center bg-primary text-primary-content rounded p-10">
            {/* Theme Toggle Button (Dark / Light) */}
            <nav className="grid grid-flow-col gap-4">
                <div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="btn btn-sm rounded-full bg-primary-content text-primary hover:bg-primary-content/90 border-none flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDark ? (
                            <>
                                <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span>Light Mode</span>
                            </>
                        ) : (
                            <>
                                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                                <span>Dark Mode</span>
                            </>
                        )}
                    </button>
                </div>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>

            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>

                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by GAMESHELF</p>
            </aside>
        </footer>
    );
}
