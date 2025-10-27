// setupTests.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills para TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Limpiar después de cada test
afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
