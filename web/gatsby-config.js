module.exports = {
  pathPrefix: '/FocusOverlay',
  siteMetadata: {
    title: 'Focus Overlay',
    author: 'Maurice (mmahandev)',
    description: 'Library for creating overlays on focused elements'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'focus-overlay',
        short_name: 'focusoverlay',
        pathPrefix: '/FocusOverlay',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/logo.svg' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ]
};
