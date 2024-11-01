import { test, expect } from "@playwright/test";
import { GET_EMPTY_RESULT, GET_RESULT, GET_SCENE } from "./mockups/mockups";

test("/ 페이지에서 서비스 이용자 수 0 명 반환", async ({ page }) => {
  await page.goto("/");

  await page.route("**/api/**", async (route) => {
    const mockData = GET_EMPTY_RESULT;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await expect(
    page.getByText("🤯 현재까지 0명이 연인과 대화했어요")
  ).toBeVisible();
});

test("/ 페이지에서 서비스 이용자 수 1 명 반환", async ({ page }) => {
  await page.goto("/");

  await page.route("**/api/**", async (route) => {
    const mockData = GET_RESULT;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await expect(
    page.getByText("🤯 현재까지 1명이 연인과 대화했어요")
  ).toBeVisible();
});

test("/ 페이지에서 버튼을 눌러 scene 페이지로 이동", async ({ page }) => {
  await page.goto("/");

  await page.route("**/api/**", async (route) => {
    const mockData = GET_RESULT;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.click("text=속상한 연인 달래주러 가기", { force: true });

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await expect(page).toHaveURL(`/scene`);
});
