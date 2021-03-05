describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    //await device.reloadReactNative();
  });

  it("should have welcome screen", async () => {
    await expect(element(by.label("Login"))).toBeVisible();
  });

  it("should show home screen after login", async () => {
    await element(by.label("Login")).tap();
    await expect(element(by.text("Home Page"))).toBeVisible();
  });
});
