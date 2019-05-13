module.exports = {
    "transform": {
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "preset": "jest-expo",
    "testMatch": [
        "**/__tests__/**/*.(js|ts|tsx)",
        "**/?(*.)+(spec|test).(js|ts|tsx)",
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "ios.ts",
        "ios.tsx",
        "android.ts",
        "android.tsx"
    ]
};
