import { ProductDAO } from "../dao/persitanceFactory.js";
import ProductRepository from "./product.respository.js";

export const ProductService = new ProductRepository(new ProductDAO());
