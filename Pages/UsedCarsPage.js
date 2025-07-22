import { TIMEOUT } from "dns";
import fs from "fs";

export class UsedCars {
  constructor(page) {
    this.page = page;
  }
  async navigation(baseURL) {
     await this.page.goto(baseURL, {
      waituntil: "domcontentload",
    });
  }
  async selectOption() {
    await this.page.locator("//span[@class='c-p icon-down-arrow']").click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("//ul[@class='txt-l']//li[1]").click();
  }
  async preferredLoction(city) {
    await this.page.getByPlaceholder("Enter Your City").click();
    await this.page.getByPlaceholder("Enter Your City").pressSequentially(city,{timeout:5000});
    // await this.page.getByPlaceholder('Enter Your City').screenshot({ path: `Screenshots/CityInput_${Date.now()}.png` });
    // await this.page.getByPlaceholder("Enter Your City").screenshot({path: 'Screenshots/CityInput.png'});
    // it was working to select different cities
    // await this.page.waitForSelector(".ui-menu-item",{timeout:20000});
    // await this.page.waitForTimeout(2000);
    // await this.page.locator(".ui-menu-item").nth(0).click();

    // checking with other code 
    await this.page.locator(".ui-menu-item").first().waitFor({ state: 'visible', timeout: 20000 });
    await this.page.locator(".ui-menu-item").first().click();

  }
  async popularBrands() {
        const carBrands = this.page.locator(".popularModels li");
        const count = await carBrands.count();
        let  result=[];
        for (let i = 0; i < count; i++) {
          let list_Brand_Name=[];
          await carBrands.nth(i).locator("label").click();
          await this.page.waitForTimeout(2000);
          const brandName=await carBrands.nth(i).innerText();
          const AvailableCars = await this.page.locator("#data-set-body >> .zw-sr-searchTarget");
          let count=await AvailableCars.count()
          console.log(brandName,count);
            for (let index = 0; index < count; index++) {
                const Car=await AvailableCars.nth(index)
                const Totaldivs=await Car.locator(".pl-30.zw-sr-paddingLeft >> *");
                const carName=await Totaldivs.nth(0).innerText();
                const carPrice=await Totaldivs.nth(0).getAttribute('data-price')
                // console.log(carName);
                // console.log(carPrice);
                list_Brand_Name.push({BrandName:carName, BrandPrice:carPrice});
            }
            result.push({[brandName]:list_Brand_Name});
            await carBrands.nth(i).locator("label").click();
            // console.log(result);
        }
            fs.writeFileSync("Utils/UsedCars.json",JSON.stringify(result,null,2));
            // await this.page.pause();
  }
}
