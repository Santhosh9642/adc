const {test,expect}=require('@playwright/test');

test("1-title_check",async({page})=>{
    await page.goto("https://www.onlineshopdemo.co.uk/");
    await expect(page).toHaveTitle("Online Shop Demo – Demo Site")
})

test('2-url_check',async({page})=>{
    await page.goto("https://www.onlineshopdemo.co.uk/");
    const login_page=await page.getByRole('link', { name: 'Login' })
    await login_page.click()
    await expect(page).toHaveURL('https://www.onlineshopdemo.co.uk/my-account/');
})

test('3-search_check',async({page})=>{
    await page.goto("https://www.onlineshopdemo.co.uk/");
    const search_icon= await page.locator(".elementor-icon")
    await expect(search_icon).toBeTruthy()
})
test("4-cart_quantity",async({page})=>{
    await page.goto("https://www.onlineshopdemo.co.uk/product/cateye-sunglasses/")
    await page.locator('#pa_color').selectOption({index:1});
    await page.locator('#pa_size').click();
    await page.locator('#pa_size').selectOption({index:1});
    await page.getByRole('button', { name: 'Add to basket' }).click()
    const confirmtext=page.locator('text=“Cateye sunglasses” has been added to your basket."').isVisible()
    if (confirmtext){
        const cart_value=await page.locator(".jet-blocks-cart__count-val").textContent()
        await expect(Number(cart_value)).toBeGreaterThan(0);
    }
})

test("5-products_inStock",async({page})=>{
    await page.goto("https://www.onlineshopdemo.co.uk/product-tag/sale/")
    await page.locator("select[name='pa_feature']").selectOption({ index: 1 })
    await page.waitForTimeout(10000);
    const no_product_message=page.locator(".woocommerce-info").textContent("No products were found matching your selection.")
    if (!no_product_message){
        test.skip()
    }
    else{
        await page.locator("select[name='pa_feature']").selectOption({ index: 3 })
        await expect(page).toBeTruthy
    }
})