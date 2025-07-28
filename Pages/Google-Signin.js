import { expect } from "@playwright/test";
import { url } from "inspector";

export class GooglePage{
    constructor(page){
        this.page=page;
        // CSS locators
        this.loginButton=this.page.locator(".h-sid.h-sid-s");
        // XPath locators
        this.googleButton=this.page.locator("[data-track-label='Popup_Login/Register_with_Google']");
    }

    async NavigateUrl(baseURL) {
      await this.page.goto(baseURL, {
      waituntil: "networkidle",
      });
    }

    async assertNavigationSuccess() {
      await expect(this.page).toHaveURL(/zigwheels\.com/);
      await expect(this.page).toHaveTitle(/ZigWheels/);
    }

    async loginWithGoogle(){  
        // Tp  Click on the Login Button
        await this.page.waitForSelector(".h-sid.h-sid-s",{timeout:10000});
        await this.loginButton.click();
        
        // To click on the Google Button
        const googleBtn= this.googleButton
        await expect(googleBtn).toBeVisible({timeout:10000});

        // Click on the Google Button
        const [newPage] = await Promise.all([
        this.page.waitForEvent("popup",{timeout:15000}),
        this.googleButton.click()
        ]);
        this.newPage = newPage;
        // To Fill the Email Id
        const emailBox=await this.newPage.waitForSelector("#identifierId",{timeout:10000,});
        expect(emailBox).not.toBeNull();
        expect(await emailBox.isVisible()).toBe(true);
        await emailBox.fill("rohith");

        // To Click on the Next Button
        const NextButton= await this.newPage.getByText("Next",{timeout:10000});
        expect(await NextButton.isVisible()).toBe(true);
        await NextButton.click();
        
        // Waiting For the page to load then taking the screenshot of invalid email
        await this.newPage.waitForTimeout(5000);
        await this.newPage.screenshot({path:"Screenshots/google.jpg"});
    }
}