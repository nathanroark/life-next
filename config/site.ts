export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Life",
  url: "localhost:3000",
  ogImage: "localhost:3000/og.jpg",
  description: "The melancholy of...",
  mainNav: [
    {
      title: "Team",
      href: "/team",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/nathanroark",
    github: "https://github.com/nathanroark",
  },
}
