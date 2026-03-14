import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

import Comment from "./Comment";
import PostInfo from "./PostInfo";

import "./Post.scss";

const Post = ({ title, date, category, html, tocItems, path }) => {
    const [showTopButton, setShowTopButton] = useState(false);
    const onScroll = () => {
        setShowTopButton(window.scrollY > 100);
    };
    const toTop = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            themeVariables: {
                primaryColor: "#f5f5f5",
                primaryTextColor: "#333333",
                primaryBorderColor: "#d4d4d4",
                lineColor: "#a3a3a3",
                secondaryColor: "#fafafa",
                tertiaryColor: "#f5f5f5",
                noteBkgColor: "#f5f5f5",
                noteBorderColor: "#d4d4d4",
                noteTextColor: "#333333",
                fontSize: "13px",
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            },
        });
        const renderMermaidBlocks = async () => {
            const blocks = document.querySelectorAll("code.language-mermaid");
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const container = block.parentElement;
                try {
                    let code = block.innerHTML;
                    code = code.replace(/<br\s*\/?>/gi, "\n");
                    code = code.replace(/<[^>]*>/g, "");
                    code = code
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&amp;/g, "&")
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'");
                    const { svg } = await mermaid.render(
                        `mermaid-${i}`,
                        code
                    );
                    const wrapper = document.createElement("div");
                    wrapper.className = "mermaid-diagram";
                    wrapper.innerHTML = svg;
                    container.parentElement.replaceChild(wrapper, container);
                } catch (e) {
                    console.error("Mermaid rendering failed:", e);
                }
            }
        };
        renderMermaidBlocks();
    }, [html]);
    return (
        <div className="post-container">
            <div className="post-info-container">
                <PostInfo category={category} date={date} />
                <h2 className="post-title">{title}</h2>
            </div>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
            {showTopButton && (
                <button type="button" className="to-top" onClick={toTop}>
                    top
                </button>
            )}
            <Comment path={path} title={title} />
        </div>
    );
};

export default Post;
