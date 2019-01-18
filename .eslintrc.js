module.exports = {
    "extends": "airbnb",
    "globals": {
        "__REDUX_DEVTOOLS_EXTENSION__": true,
        "__DEV__": true
    },
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-unresolved": 0,
        "linebreak-style": 0,
        "react/forbid-prop-types": 0,
        "import/named": 0,
        "import/no-named-as-default-member": 0,
        "strict": 0,
        "import/prefer-default-export": 0,
        "no-console": 0
    }
};