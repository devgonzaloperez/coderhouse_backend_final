export const productsDTO = (product) =>{
    return {
        id: product?.id || product?._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageURL: product.imageURL,
    };
};