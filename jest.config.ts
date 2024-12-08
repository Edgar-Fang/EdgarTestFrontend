import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',  // Next.js 專案的根目錄
});

const config: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost:3000'  // 這裡設定來源域名
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
        "**/__tests__/**/*.ts?(x)",
        "**/?(*.)+(spec|test).ts?(x)"
    ]
};

export default createJestConfig(config);
