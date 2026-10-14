export default {
  resolve: { preserveSymlinks: true },
  build: {
    // Slidev/UnoCSS can emit selectors that Lightning CSS rejects.
    // Preserve the readable stylesheet for this local presentation.
    cssMinify: false,
  },
}
