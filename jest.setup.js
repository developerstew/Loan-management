import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));
