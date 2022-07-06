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
        "gatsby-plugin-react-helmet",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        "gatsby-plugin-sass",
        'gatsby-plugin-sitemap',
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "G-T7DDYNCDL6",
                head: true,
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
                name: "markdown-components",
                path: `${__dirname}/contents`
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [{
                        resolve: `gatsby-remark-katex`,
                        options: {
                            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
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
                    "gatsby-remark-relative-images",
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
                        allMarkdownRemark.edges.map(edge =>
                            Object.assign({}, edge.node.frontmatter, {
                                description: edge.node.frontmatter.description,
                                date: edge.node.frontmatter.date,
                                url: site.siteMetadata.site_url + edge.node.frontmatter.path,
                                guid: site.siteMetadata.site_url + edge.node.frontmatter.path,
                                custom_elements: [{ "content:encoded": edge.node.html }]
                            })
                        ),
                    query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
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
                }
              }
            `,
                    output: "/rss.xml",
                    title: siteMetadata.title
                }]
            }
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                output: "/sitemap.xml",
                exclude: [],
                query: `
          {
            site { siteMetadata { siteUrl: url } }
            allSitePage { nodes { path } }
          }`,
                resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
                serialize: ({ site, allSitePage }) =>
                    allSitePage.nodes.map(node => {
                        return {
                            url: `${site.siteMetadata.siteUrl}${node.path}`,
                            changefreq: "daily",
                            priority: 0.7
                        };
                    })
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