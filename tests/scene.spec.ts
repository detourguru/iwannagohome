import { test, expect } from "@playwright/test";
import {
  GET_RESULT_DETAIL,
  GET_SCENE,
  GET_SCENE_DETAIL,
  POST_SCENE_DETAIL,
} from "./mockups/mockups";

test("scene 페이지에서 카드를 선택 해 /scene/[id]로 이동", async ({ page }) => {
  await page.goto("/scene");

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  const lastCard = page.getByRole("img", {
    name: "두 남녀가 밤을 배경으로 대치하고 있는 사진",
  });
  await lastCard.scrollIntoViewIfNeeded();
  await lastCard.click({ force: true });

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await expect(page).toHaveURL(`/scene/1`);
});

test("scene/[id] 페이지의 입력창에서 enter를 눌러 채팅 추가", async ({
  page,
}) => {
  await page.goto(`/scene/${GET_SCENE_DETAIL.data[0].story_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.waitForSelector("span");
  await page.waitForSelector("input", { state: "visible" });

  const initPrimary = await page.$$("span.bg-primary");
  const initGray = await page.$$("span.bg-gray-100");

  expect(initPrimary.length).toBe(1);
  expect(initGray.length).toBe(0);

  const input = await page.getByPlaceholder(
    `${GET_SCENE_DETAIL.data[0].story_info.character}에게 말을 걸어보세요`
  );

  await input.click({ force: true });
  await input.fill("걱정이없어");
  await input.press("Enter");

  const updatePrimary = await page.$$("span.bg-primary");
  const updateGray = await page.$$("span.bg-gray-100");

  expect(updatePrimary.length).toBe(2);
  expect(updateGray.length).toBe(1);
});

test("scene/[id] 페이지에서 전송 버튼을 눌러 채팅 추가", async ({ page }) => {
  await page.goto(`/scene/${GET_SCENE_DETAIL.data[0].story_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.waitForSelector("span");
  await page.waitForSelector("button");

  const initPrimary = await page.$$("span.bg-primary");
  const initGray = await page.$$("span.bg-gray-100");

  expect(initPrimary.length).toBe(1);
  expect(initGray.length).toBe(0);

  const input = page.getByPlaceholder(
    `${GET_SCENE_DETAIL.data[0].story_info.character}에게 말을 걸어보세요`
  );

  await input.click({ force: true });
  await input.fill("걱정이없어");
  await page
    .getByRole("button", { name: "전송 아이콘" })
    .click({ force: true });

  const updatePrimary = await page.$$("span.bg-primary");
  const updateGray = await page.$$("span.bg-gray-100");

  expect(updatePrimary.length).toBe(2);
  expect(updateGray.length).toBe(1);
});

test("scene/[id] 페이지에서 사용자 채팅 5개 이상일 때 result로 이동하는 분석 버튼 노출", async ({
  page,
}) => {
  await page.goto(`/scene/${GET_SCENE_DETAIL.data[0].story_id}`);

  await page.route("**/api/**", async (route) => {
    const mockData = GET_SCENE_DETAIL;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.waitForSelector("input", { state: "visible" });
  await page.waitForSelector("button");

  const input = await page.getByPlaceholder(
    `${GET_SCENE_DETAIL.data[0].story_info.character}에게 말을 걸어보세요`
  );

  for (let index = 0; index < 5; index++) {
    await input.click({ force: true });
    await input.fill("테스트");
    await input.press("Enter");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await expect(page.getByText("현재 대화 5턴 / 최대 15턴")).toBeVisible();

  const analyzeButton = await page.getByRole("button", { name: "분석하기" });
  await expect(analyzeButton).toBeVisible();

  await Promise.all([
    analyzeButton.click({ force: true }),

    await page.route("**/api/**", async (route) => {
      const mockData = POST_SCENE_DETAIL;
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    }),

    await page.waitForURL(/result\/.*/),

    await page.route("**/api/**", async (route) => {
      const mockData = GET_RESULT_DETAIL;
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    }),
  ]);

  await expect(page).toHaveURL(/result\/.*/);
});
