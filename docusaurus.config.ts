import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Sports Analytics',
  tagline: 'Curated collection of sports analytics tools and resources',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://spana.joebad.com',
  baseUrl: '/',

  headTags: [
    // Open Graph meta tags
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:title',
        content: 'Sports Analytics - Curated Tools & Resources',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'Curated collection of sports analytics tools and resources for data analysis, visualization, and insights.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://spana.joebad.com/img/logo.png',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:url',
        content: 'https://spana.joebad.com',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'Sports Analytics',
      },
    },
    // Twitter/X Card meta tags
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:title',
        content: 'Sports Analytics - Curated Tools & Resources',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:description',
        content: 'Curated collection of sports analytics tools and resources for data analysis, visualization, and insights.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image',
        content: 'https://spana.joebad.com/img/logo.png',
      },
    },
  ],

  organizationName: 'sports-analytics',
  projectName: 'sports-analytics',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Sports Analytics',
      logo: {
        alt: 'Sports Analytics Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://discord.gg/KtqmASc6jn',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord server',
          label: 'Discord',
        },
        {
          href: 'https://github.com/joe307bad/sports-analytics',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          label: 'Github',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Sports Analytics Resources.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
