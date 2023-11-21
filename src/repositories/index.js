import { CartDAO, ProductDAO } from "../dao/persitanceFactory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.respository.js";

export const ProductService = new ProductRepository(new ProductDAO());
export const CartService = new CartRepository(new CartDAO());
