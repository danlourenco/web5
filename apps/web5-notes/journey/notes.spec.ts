import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Web5 Notes');
});

// TODO: flesh out journey tests, test CRUD operations
test('can add a note', async({ page }) => {
    await page.goto('/')
    expect(page.getByTestId("notes-pane")).toContainText("No notes yet");
    await page.getByTestId('note-text').fill('Playwright Note');
    await page.getByRole("button", {
        name: "Save"
    }).click();
    await page.waitForTimeout(3000);
});