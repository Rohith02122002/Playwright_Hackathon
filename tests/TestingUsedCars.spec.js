import {test,chromium} from "@playwright/test";
import { UsedCars } from "../Pages/UsedCarsPage";
import fs from "fs" ;
import path from "path";
const testData = require("../Utils/InputData.json");

const FILE_PATH = path.join(__dirname, "../Utils/UsedCars.json");

test.describe('Used Cars Tests', () => {
let browser;
let context;
let cars;
let page;

    test.beforeAll(async() => {
        // Reset the JSON file before tests run
             fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
             browser = await chromium.launch({ args: ['--start-maximized'] });
             context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
             page = await context.newPage();
             cars = new UsedCars(page);
             await cars.navigation(testData.BaseURL);
             console.log(' clearing Json  at the beginning of test suite');
    });

    test('Navigate to Used Cars Page', async () => {
        await cars.assertNavigationSuccess();
    });

    test('Choose Preferred Location', async () => {
        await cars.moreOption();
        await cars.assertUsedCarsPageTitle();
    });

    test('Filter by Popular Brands', async () => {
        await cars.moreOption();
        await cars.usedCarsOption();
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