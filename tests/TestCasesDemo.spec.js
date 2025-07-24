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

let browser;
let context;
let page;
let home;
let cars;
let google;
test.beforeAll(async() => {
    // Reset the JSON file before tests run
     browser = await chromium.launch({ args: ['--start-maximized'] });
     context = await browser.newContext({viewport:null,deviceScaleFactor: undefined});
     page = await context.newPage();

    home = new HondaPage(page);
    cars = new UsedCars(page);
    google = new GooglePage(page);
    
    await home.navigateToUrl(testData.BaseURL);
    await cars.navigation(testData.BaseURL);
    await google.NavigateUrl(testData.BaseURL);

  });
  test.afterAll("Closing the Browser",async()=>{
    await browser.close();
  });
test.describe('Honda Bikes Tests', () => {

    test.beforeAll(() => {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    console.log(" Cleared output.json for Honda bikes");
    });

    test('Navigation', async () => {
    //    await home.navigateToUrl(testData.BaseURL);
       await google.assertNavigationSuccess();
    });

    test('Navigate to Honda Page', async () => {
    //   await home.navigateToUrl(testData.BaseURL);
      await home.upcomingBikesFilter();
      await home.upcomingHondaBike();
      await expect(page).toHaveTitle(/Honda/i);
    });

    test('Apply Upcoming Bikes Filter', async () => {
      const urlBefore = page.url();
      await home.upcomingBikesFilter();
      await home.upcomingHondaBike();
      const urlAfter = page.url();
      expect(urlAfter).not.toEqual(urlBefore); // Filter triggers navigation
    });

    test('Fetch Bike Data', async () => {
    //   await home.navigateToUrl(testData.BaseURL);
        await home.upcomingBikesFilter();
        await home.upcomingHondaBike();
        await home.bikeData();
    });

});

test.describe('Used Cars Tests', () => {

    test.beforeAll(() => {
    fs.writeFileSync(FILE_PATH1, JSON.stringify([], null, 2));
    console.log(" Cleared usedcars.json fro used cars ");
  });
    test('Navigate to Used Cars Page', async () => {
        await cars.navigation(testData.BaseURL);
        await google.assertNavigationSuccess();    
    });

    test('Filter by Popular Brands', async () => {
        // await cars.navigation(testData.BaseURL);
        await cars.moreOption();
        await cars.usedCarsOption();
        await cars.preferredLocation(testData.CityName);
        await cars.popularBrands();
    });

    test('Select Options', async () => {
        // await cars.navigation(testData.BaseURL);
        await cars.moreOption();
    });
        
    test('Choose Preferred Location', async () => {
        // await cars.navigation(testData.BaseURL);
        await cars.moreOption();
        await expect(page).toHaveTitle(/Used Cars/);
    });

});

test.describe.configure({mode:'parallel'})
// test.describe.configure({mode:'parallel'})('Google-sign in page Tests', () => {
    test("Google URL Navigation", async () => {
    //   await google.NavigateUrl(testData.BaseURL);
       await google.assertNavigationSuccess();
    });

    test("Google Sign in test ",async()=>{
    // Google sign in  page Test Scenario
    //   const google= new GooglePage(page);
    //   await google.NavigateUrl(testData.BaseURL);
      await google.loginWithGoogle();
    })

