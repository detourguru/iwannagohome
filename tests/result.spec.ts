import { test, expect } from "@playwright/test";
import { GET_RESULT_DETAIL } from "./mockups/mockups";

test("텍스트 아코디언 펴고 접기", async ({ page }) => {
  await page.goto(`/result/${GET_RESULT_DETAIL.data[0].chat_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_RESULT_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  const initPrimary = await page.$$("span.bg-primary");

  expect(initPrimary.length).toBe(0);

  await page.locator("img").first().click();

  await page.waitForSelector("span");

  const updatePrimary = await page.$$("span.bg-primary");

  expect(updatePrimary.length).toBeGreaterThan(0);
});

test("홈으로 가기 버튼을 눌러 홈으로 이동", async ({ page }) => {
  await page.goto(`/result/${GET_RESULT_DETAIL.data[0].chat_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_RESULT_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.getByRole("button", { name: "홈으로 가기" }).click();

  await expect(page).toHaveURL("/");
});

test("다시 대화하기 버튼을 눌러 scene/[id]로 이동", async ({ page }) => {
  await page.goto(`/result/${GET_RESULT_DETAIL.data[0].chat_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_RESULT_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.getByRole("button", { name: "다시 대화하기" }).click();

  await expect(page).toHaveURL(/scene\/.*/);
});

// FIXME: clipboard 이슈
// test("공유하기 버튼을 눌러 복사 alert 확인", async ({ page }) => {
//   await page.goto(`/result/${GET_RESULT_DETAIL.data[0].chat_id}`);

//   await page.getByRole("button", { name: "공유하기" }).click();

//   await page.waitForTimeout(1000);

//   const clipboardText = await page.evaluate(async () => {
//     return await navigator.clipboard.readText();
//   });

//   expect(clipboardText).toBe(
//     `${process.env.NEXT_PUBLIC_HOST_NAME`/result/${GET_RESULT_DETAIL.data[0].chat_id}`
//   );
// });
