import {test,expect,chromium} from "@playwright/test";
import { GooglePage } from "../Pages/Google-Signin";
const testData = require("../Utils/InputData.json");

test.describe('Google-sign in page Tests', () => {
let browser;
let context;
let google;
let page;

    test.beforeAll(async () => {
        browser = await chromium.launch({ args: ['--start-maximized']});
        context=await browser.newContext({viewport:null,deviceScaleFactor: undefined});
        page = await context.newPage();
        google=new GooglePage(page);
        await google.NavigateUrl(testData.BaseURL);
    });


    test("Google URL Navigation", async () => {
    //   await google.NavigateUrl(testData.BaseURL);
      await google.assertNavigationSuccess();
    });

    test("Google Sign in test ",async()=>{
    // Google sign in  page Test Scenario
      await google.NavigateUrl(testData.BaseURL);
      await google.loginWithGoogle();
    })

});