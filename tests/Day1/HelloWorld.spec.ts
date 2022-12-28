import { test, expect } from "@playwright/test";

test("Hello, World!", async () => {
    const message = 'Hello, World!';
    expect(message).toBe('Hello, World!');
});