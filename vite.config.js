import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        gallery: 'gallery.html',
        contact: 'contact.html'
      }
    }
  }
});
