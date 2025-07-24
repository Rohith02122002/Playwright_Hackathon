import {test,expect,chromium} from "@playwright/test";
import {HondaPage} from "../Pages/HomePage"; 
import fs from "fs" ;
import path from "path";

const testData = require("../Utils/InputData.json");
const FILE_PATH = path.join(__dirname, "../Utils/output.json");

test.describe('Honda Bikes Tests', () => {
let browser;
let context;
let home;
let page;

    test.beforeAll(async() => {
             // Reset the JSON file before tests run
             fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
             browser = await chromium.launch({ args: ['--start-maximized'] });
             context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
             page = await context.newPage();
             home = new HondaPage(page);
             await home.navigateToUrl(testData.BaseURL);
             console.log(' clearing Json  at the beginning of test suite');
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
        // await home.assertUpcomingTabVisible();
    });

    test('Fetch Bike Data', async () => {
        await home.upcomingBikesFilter();
        await home.upcomingHondaBike();
        await home.bikeData();
    });

});