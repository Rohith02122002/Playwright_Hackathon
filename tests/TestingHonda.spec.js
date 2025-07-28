import {test,expect,chromium} from "@playwright/test";
import {HondaPage} from "../Pages/HomePage"; 

const testData = require("../Utils/InputData.json");

test.describe('Honda Bikes Tests', () => {
let browser;
let context;
let home;
let page;

    test.beforeAll(async() => {
             browser = await chromium.launch({ args: ['--start-maximized'] });
             context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
             page = await context.newPage();
             home = new HondaPage(page);
             await home.navigateToUrl(testData.BaseURL);
    });

    
    test('Navigation Assertion for correct URL', async () => {
      await home.assertNavigationSuccess();
    });

    test('Navigate to Honda Page', async () => {
      await home.upcomingBikesFilter();
      await home.upcomingHondaBike();
      await expect(page).toHaveTitle(/Honda/i);
    });

    test('Apply Upcoming Bikes Filter', async () => {
      const urlBefore = page.url();
      await home.upcomingBikesFilter();
      await home.upcomingHondaBike();
      const urlAfter = page.url();
      expect(urlAfter).not.toEqual(urlBefore); 
    });

    test('Assertions for Upcoming Bikes', async () => {
        await home.upcomingBikesFilter();
    });

    test('Fetch Bike Data', async () => {
        await home.upcomingBikesFilter();
        await home.upcomingHondaBike();
        await home.bikeData();
    });

});