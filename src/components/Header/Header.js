import React from "react";
import { Link } from "gatsby";

import "./Header.scss";

const Header = ({ siteTitle, siteDescription, type, language = "kor" }) => {
    const isMain = type === "main";
    const prefix = language === "eng" ? "/eng" : "";

    const switchLanguage = (targetLang) => {
        if (typeof window === "undefined") return;
        const pathname = window.location.pathname;
        if (targetLang === "eng") {
            window.location.href = "/eng" + pathname;
        } else {
            window.location.href = pathname.replace(/^\/eng/, "") || "/";
        }
    };

    return (
        <header className={!isMain ? "simple" : null}>
            <div className="header-inner">
                <h1>
                    <Link to={prefix + "/"}>{siteTitle}</Link>
                </h1>
                <ul>
                    <li>
                        <a href={prefix + "/"}>Home</a>
                    </li>
                    <li>
                        <a href={prefix + "/category"}>Category</a>
                    </li>
                    <li>
                        <a href={prefix + "/about"}>About</a>
                    </li>
                    <li>
                        <a href="https://github.com/yuhodots">GitHub</a>
                    </li>
                    <li className="lang-divider"></li>
                    <li className="lang-toggle">
                        <span
                            className={language === "kor" ? "active" : ""}
                            onClick={() => switchLanguage("kor")}
                            onKeyDown={(e) => e.key === "Enter" && switchLanguage("kor")}
                            role="button"
                            tabIndex={0}
                        >
                            KR
                        </span>
                        <span className="lang-dot">&middot;</span>
                        <span
                            className={language === "eng" ? "active" : ""}
                            onClick={() => switchLanguage("eng")}
                            onKeyDown={(e) => e.key === "Enter" && switchLanguage("eng")}
                            role="button"
                            tabIndex={0}
                        >
                            EN
                        </span>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
