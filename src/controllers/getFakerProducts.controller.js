import { default as faker } from "@faker-js/faker";

export const getFakerProducts = (req, res) =>{
    const products = [];
    for(let i = 0; i < 5; i++){
        const product = {
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            imageURL: faker.image.imageUrl()
        };
        products.push(product);
    }
    res.json({products: products});
}