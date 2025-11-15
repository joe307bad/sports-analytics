import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Sports Analytics Resources',
  tagline: 'Curated collection of sports analytics tools and resources',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://sports-analytics.example.com',
  baseUrl: '/',

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
          label: 'Join the discord!',
          position: 'right',
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
