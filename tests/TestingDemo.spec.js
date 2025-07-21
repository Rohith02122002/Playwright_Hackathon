import {test,expect,chromium} from "@playwright/test";
import {HondaPage} from "../Pages/HomePage"; 
import { UsedCars } from "../Pages/UsedCarsPage";
import fs from "fs" ;
import path from "path";
import { GooglePage } from "../Pages/Google-Signin";


// Reset JSON once per test suite
const FILE_PATH = path.join(__dirname, "../Utils/output.json");
const FILE_PATH1 = path.join(__dirname, "../Utils/UsedCars.json");

test.describe("ZigWheels total pages",async()=>{
let browser ;
let context ;
let page ;

test.beforeAll(async () => {
    // Reset the JSON file before tests run
    browser = await chromium.launch({ args: ['--start-maximized']});
    context=await browser.newContext({viewport:null,deviceScaleFactor: undefined});
    page = await context.newPage();
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    fs.writeFileSync(FILE_PATH1, JSON.stringify([], null, 2));
    console.log('flightResults.json cleared at the beginning of test suite');
  });

test("ZigWheels",async()=>{
      const home= new  HondaPage(page);
      //Home page Test Scenario
      await home.navigateToUrl();
      await home.upcomingBikesFilter();
      await home.bikeData();   
});

test("Used Cars",async()=>{
        // Usedcars page Test Scenario
        const cars= new UsedCars(page);
        await cars.navigation();
        await cars.selectOption();
        await cars.preferredLoction();
        await cars.popularBrands();
});

test("Google",async()=>{
    // Google sign in  page Test Scenario
      const google= new GooglePage(page);
      await google.NavigateUrl();

})

});
