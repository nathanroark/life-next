export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Nathan Roark",
  url: "https://life.nathanroark.dev",
  ogImage: "https://life.nathanroark.dev/og.png", // png is the original format, jpg is there because discord keeps linking to jpg
  description: "Conway's Game of Life",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/nathanroark",
    github: "https://github.com/nathanroark",
  },
}
