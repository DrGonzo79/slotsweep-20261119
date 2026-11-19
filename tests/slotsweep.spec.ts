import {expect,test} from "@playwright/test";

test("scans archive, prioritizes findings, and opens evidence",async({page},testInfo)=>{
  await page.goto("/");
  await expect(page.getByRole("heading",{name:/Find the sponsor reads/i})).toBeVisible();
  await page.getByRole("button",{name:"Scan 3 episodes"}).click();
  await expect(page.getByRole("heading",{name:"2 stale-read candidates"})).toBeVisible();
  await expect(page.locator(".queue article").first()).toContainText("The Pricing Reset");
  await page.screenshot({path:`evidence/${testInfo.project.name}.png`,fullPage:true});
  await page.getByRole("button",{name:/View evidence for The Pricing Reset/}).click();
  await expect(page.getByRole("dialog")).toContainText("EVIDENCE PACKET");
  await page.getByRole("button",{name:"Close details"}).click();
});

test("validates empty selection and supports approval",async({page})=>{
  await page.goto("/");
  for(const box of await page.getByRole("checkbox").all())await box.uncheck();
  await page.getByRole("button",{name:"Scan 0 episodes"}).click();
  await expect(page.locator(".error")).toContainText("Choose at least one episode");
  await page.getByRole("checkbox").first().check();
  await page.getByRole("button",{name:"Scan 1 episode"}).click();
  await page.getByRole("button",{name:"Approve slot"}).click();
  await expect(page.getByRole("button",{name:"Undo approval"})).toBeVisible();
});

test("mobile has no horizontal overflow and primary flow works",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="mobile");
  await page.goto("/");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.getByRole("button",{name:"Scan 3 episodes"}).click();
  await expect(page.getByText("The Pricing Reset")).toBeVisible();
});
