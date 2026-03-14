const siteMetadata = {
    title: "Yuho Jeong",
    description: "",
    author: "@yuhodots",
    disqusShortname: "yuhodots",
    url: "https://yuhodots.github.io",
    siteUrl: "https://yuhodots.github.io"
};

module.exports = {
    siteMetadata,
    plugins: [
        "gatsby-plugin-image",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-plugin-sass",
            options: {
                sassOptions: {
                    silenceDeprecations: ['legacy-js-api'],
                }
            }
        },
        "gatsby-plugin-sitemap",
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["G-T7DDYNCDL6"],
                gtagConfig: {
                    anonymize_ip: true,
                },
                pluginConfig: {
                    head: true,
                },
            },
        },
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `yuhodots`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "markdown-kor",
                path: `${__dirname}/contents/kor`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "markdown-eng",
                path: `${__dirname}/contents/eng`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "content-images",
                path: `${__dirname}/contents/img`
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-katex`,
                        options: {
                            strict: `ignore`
                        }
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            className: `anchor-header`,
                            maintainCase: false,
                            removeAccents: true,
                            elements: ['h2', 'h3', 'h4', 'h5'],
                        },
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: { maxWidth: 760, withWebp: true }
                    },
                    {
                        resolve: "gatsby-remark-prismjs",
                        options: {}
                    }
                ]
            }
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: `
          {
            site {
              siteMetadata {
                site_url: url
                title
                description
              }
            }
          }`,
                feeds: [{
                    serialize: ({ query: { site, allMarkdownRemark } }) =>
                        allMarkdownRemark.nodes.map(node =>
                            Object.assign({}, node.frontmatter, {
                                description: node.frontmatter.description,
                                date: node.frontmatter.date,
                                url: site.siteMetadata.site_url + node.frontmatter.path,
                                guid: site.siteMetadata.site_url + node.frontmatter.path,
                                custom_elements: [{ "content:encoded": node.html }]
                            })
                        ),
                    query: `{
              allMarkdownRemark(
                limit: 1000
                sort: {frontmatter: {date: DESC}}
                filter: {
                  frontmatter: {template: {eq: "post"}, draft: {ne: true}}
                  fileAbsolutePath: {regex: "/contents/kor/"}
                }
              ) {
                nodes {
                  html
                  frontmatter {
                    title
                    date
                    template
                    draft
                    path
                    description
                  }
                }
              }
            }`,
                    output: "/rss.xml",
                    title: siteMetadata.title
                }]
            }
        },
        {
            resolve: "gatsby-alias-imports",
            options: { aliases: { rootFolder: "src" } }
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "gatsby-starter-default",
                short_name: "starter",
                start_url: siteMetadata.siteUrl,
                background_color: "#24292f",
                theme_color: "#24292f",
                display: "minimal-ui",
                icon: "images/profile.jpg"
            }
        }
    ]
};
