import {test,chromium} from "@playwright/test";
import { UsedCars } from "../Pages/UsedCarsPage";
const testData = require("../Utils/InputData.json");

test.describe('Used Cars Tests', () => {
let browser;
let context;
let cars;
let page;

    test.beforeAll(async() => {
             browser = await chromium.launch({ args: ['--start-maximized'] });
             context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
             page = await context.newPage();
             cars = new UsedCars(page);
             await cars.navigation(testData.BaseURL);
    });

    test('Navigate to Used Cars Page', async () => {
        await cars.assertNavigationSuccess();
    });

    test('Choose Preferred Location', async () => {
        await cars.moreOption();
    });

    test('Filter by Popular Brands', async () => {
        await cars.moreOption();
        await cars.usedCarsOption();
        await cars.assertCityInputVisible();
        await cars.preferredLocation(testData.CityName);
        await cars.popularBrands();
    });

    test('Select Options', async () => {
        await cars.moreOption();
        await cars.usedCarsOption();
        await page.waitForTimeout(1000);
        await cars.assertCityInputVisible();
    });
});