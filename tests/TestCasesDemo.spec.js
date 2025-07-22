import {test,expect,chromium} from "@playwright/test";
import {HondaPage} from "../Pages/HomePage"; 
import { UsedCars } from "../Pages/UsedCarsPage";
import fs from "fs" ;
import path from "path";
import { GooglePage } from "../Pages/Google-Signin";
const testData = require("../Utils/InputData.json");


// Reset JSON once per test suite
const FILE_PATH = path.join(__dirname, "../Utils/output.json");
const FILE_PATH1 = path.join(__dirname, "../Utils/UsedCars.json");

test.beforeAll(() => {
    // Reset the JSON file before tests run
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    fs.writeFileSync(FILE_PATH1, JSON.stringify([], null, 2));
    console.log(' clearing Json  at the beginning of test suite');
  });
let page;
let home;
let cars;
let google;

test.beforeEach(async () => {
    const browser = await chromium.launch({ args: ['--start-maximized'] });
    const context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
    page = await context.newPage();
    home = new HondaPage(page);
    cars = new UsedCars(page);
    google = new GooglePage(page);
});

test.describe('Honda Bikes Tests', () => {

    test('Navigation', async () => {
      await home.navigateToUrl(testData.BaseURL);
      await expect(page).toHaveURL(/zigwheels\.com/);
      await expect(page).toHaveTitle(/ZigWheels/);
    });

    test('Navigate to Honda Page', async () => {
      await home.navigateToUrl(testData.BaseURL);
      await home.upcomingBikesFilter();
      await expect(page).toHaveTitle(/Honda/i);
    });

    test('Apply Upcoming Bikes Filter', async () => {
      await home.navigateToUrl(testData.BaseURL);
      const urlBefore = page.url();
      await home.upcomingBikesFilter();
      const urlAfter = page.url();
      expect(urlAfter).not.toEqual(urlBefore); // Filter triggers navigation
    });

    test('Fetch Bike Data', async () => {
      await home.navigateToUrl(testData.BaseURL);
        await home.upcomingBikesFilter();
        await home.bikeData();
    });

});

test.describe.only('Used Cars Tests', () => {

    test('Navigate to Used Cars Page', async () => {
        await cars.navigation(testData.BaseURL);
        await expect(page).toHaveURL(/zigwheels\.com/);
        await expect(page).toHaveTitle(/ZigWheels/);
    });

    test('Select Options', async () => {
        await cars.navigation(testData.BaseURL);
        await cars.selectOption();
    });
        
    test('Choose Preferred Location', async () => {
        await cars.navigation(testData.BaseURL);
        await cars.selectOption();
        await expect(page).toHaveTitle(/Used Cars/);
    });

    test('Filter by Popular Brands', async () => {
    await cars.navigation(testData.BaseURL);
    await cars.selectOption();
    await cars.preferredLoction(testData.CityName);
    await cars.popularBrands();
    });



});


test.describe('Google-sign in page Tests', () => {
    test("Google URL Navigation", async () => {
      await google.NavigateUrl(testData.BaseURL);
      await expect(page).toHaveURL(/zigwheels\.com/);
      await expect(page).toHaveTitle(/ZigWheels/);
    });

    test("Google Sign in test ",async()=>{
    // Google sign in  page Test Scenario
      const google= new GooglePage(page);
      await google.NavigateUrl(testData.BaseURL);
    })

});
