export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'esnext', // Ensure modern JavaScript compatibility
    outDir: 'dist', // Make sure the output folder is 'dist'
  },
})
