// repositories/index.js

import { CartDAO, ProductDAO } from "../dao/persitanceFactory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.respository.js";

const productRepository = new ProductRepository(new ProductDAO());
const cartRepository = new CartRepository(new CartDAO());

export const ProductService = productRepository;
export const CartService = cartRepository;
