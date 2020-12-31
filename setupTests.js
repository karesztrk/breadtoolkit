import '@testing-library/jest-dom/extend-expect';

jest.mock('@/locales/en');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    locale: {},
  }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
