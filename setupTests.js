import '@testing-library/jest-dom/extend-expect';

jest.mock('next-localization', () => ({
  useI18n: jest.fn().mockReturnValue({
    t: (key) => key,
  }),
}));

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
