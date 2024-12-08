// __test__/test-setup.tsx
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { jest } from '@jest/globals';

const createMockRouter = () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    route: '/',
    pathname: '/',
    isFallback: false
});

export function TestWrapper({ children }: { children: React.ReactNode }) {
    const mockRouter = createMockRouter();

    return (
        <AppRouterContext.Provider value={mockRouter}>
            {children}
        </AppRouterContext.Provider>
    );
}