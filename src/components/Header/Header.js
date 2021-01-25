import React from "react";
import { Link } from "gatsby";

import "./Header.scss";

const Header = ({ siteTitle, siteDescription, type }) => {
    const isMain = type === "main";
    const isCategory = type === "category";
    const isAbout = type === "about";
    const clikedStyle = {
        opacity: '1',
        textDecoration: 'underline'
    }
    console.log(type);
    return (
        <header className={!isMain ? "simple" : null}>
            <div className="header-inner">
                <h1>
                    <Link to="/">{siteTitle}</Link>
                </h1>
                <div className="description">{siteDescription}</div>
                <ul>
                    <li>
                        <a href="/" style={isMain ? clikedStyle : {}}>Home</a>
                    </li>
                    <li>
                        <a href="/category" style={isCategory ? clikedStyle : {}}>Category</a>
                    </li>
                    <li>
                        <a href="/about" style={isAbout ? clikedStyle : {}}>About</a>
                    </li>
                    <li>
                        <a href="https://github.com/yuhodots">GitHub</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;