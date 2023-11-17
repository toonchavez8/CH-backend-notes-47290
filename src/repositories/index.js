import { product } from "../dao/persitanceFactory";
import ProductRepository from "./product.respository";

export const ProductService = new ProductRepository(new product());
