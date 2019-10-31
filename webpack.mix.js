const mix = require('laravel-mix');
mix.babelConfig({
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
    ]
})
    .react('resources/js/App/Public.js', 'public/js/Auth.js')
    // .react('resources/js/App/Admin.js', 'public/js/Admin.js')
    // .react('resources/js/App/Konselor.js', 'public/js/Konselor.js')
    // .react('resources/js/App/KonselorNotHaveKelompok.js', 'public/js/Konselor1.js')
    // .react('resources/js/App/User.js', 'public/js/User.js')
    // .react('resources/js/App/UserNotHaveKelompok.js', 'public/js/User1.js');