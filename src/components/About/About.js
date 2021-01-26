import React from "react";

import "./About.scss";

const About = ({ html }) => {
    return (
        <div className="about-container">
            <div
                className="about-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default About;
