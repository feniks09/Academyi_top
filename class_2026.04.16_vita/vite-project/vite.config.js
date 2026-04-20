import {defineConfig} from 'vite';
import pugPlugin from 'vite-plugin-pug';
import {articles} from "./src/mock"
export default defineConfig({
    plugins: [pugPlugin({localTypes: true}, {})]
});