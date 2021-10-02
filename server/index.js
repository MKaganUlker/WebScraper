const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const puppeteer = require("puppeteer");

//middleware
app.use(cors());
app.use(express.json());

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    
    await page.waitForXPath('//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img');
    const [el] = await page.$x('//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    await page.waitForXPath('//*[@id="listing-page-cart"]/div[2]/h1');
    const [el2] = await page.$x('//*[@id="listing-page-cart"]/div[2]/h1');
    const txt2 = await el2.getProperty('textContent');
    const lngtitle = await txt2.jsonValue();

    await page.waitForXPath('//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p');
    const [el3] = await page.$x('//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p');
    const txt3 = await el3.getProperty('textContent');
    const lngprice = await txt3.jsonValue();

    
    price = lngprice.trim();
    price = price.substring(1);
    title = lngtitle.trim();
    title = title.replace('Read the full title\n    ','');
    
    console.log({imgURL, title, price});
    
    var obj = {
        imgURL:  await imgURL,
        title: await title,
        price: await price
      };
      
      
    await browser.close();
    return obj;
}

//routes create a todo get all todos get a todo update a todo

app.post("/products", async (req, res)=> {
    try{
        const {url}=req.body;
        console.log(url);
        var product = await scrapeProduct(url);
        console.log(product);
        const newProduct = await pool.query("INSERT INTO product (name,image,price) VALUES($1,$2,$3) RETURNING *",[product.title,product.imgURL,product.price]);

        res.json(newProduct.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

app.get("/products", async(req,res)=>{
    try {
        const allProducts = await pool.query("SELECT * FROM product");
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/products/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await pool.query("SELECT * FROM product WHERE id = $1",[id]);
        res.json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
app.listen(5000, ()=>{
    console .log("server has started at port 5000");

});