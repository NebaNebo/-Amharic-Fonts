import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json'; // Add this import for JSON plugin

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            compilerOptions: {
                dev: !production
            }
        }),
        css({ output: 'public/global.css' }),
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        json(), // Ensure the JSON plugin is added here
        // Development-only plugins
        !production && livereload('public'), !production && serve({
            open: false,
            contentBase: 'public',
            historyApiFallback: true,
            port: 8080 // Set your desired port number here
        }),

        // Production-only plugins
        production && terser(),

        // Proxy configuration for API
    ],
    watch: {
        clearScreen: false
    },
};