const Suggestion = {
    SUGGESTIONS: ["Create Next App", "Create a React App", "Create Vite"],
  
    DEFAULT_FILE: {
      "/public/index.html": {
        code: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandpack Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`
      },
      "/App.css": {
        code: `@tailwind base;
  @tailwind components;
  @tailwind utilities;`
      },
      "/tailwind.config.js": {
        code: `/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {},
    },
    plugins: [],
  };`
      },
      "/postcss.config.js": {
        code: `module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };`
      }
    },
  
    DEPENDENCY: {
      "postcss": "^8.4.31",
      "autoprefixer": "^10.4.16",
      "tailwindcss": "^3.4.1",
      "uuid": "^9.0.1", // Fixed package name (uuid4 → uuid)
      "tailwind-merge": "^2.4.0",
    //   "tailwind-animate": "^1.0.7",
      "lucide-react": "latest",
      "react-router-dom": "^6.22.1",
      "firebase": "^11.1.0",
      "@google/generative-ai": "^0.21.0"
    }
  };
  
  export default Suggestion;
  