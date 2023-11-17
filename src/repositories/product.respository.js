import productModel from "../models/products.model";
import Repository from "./repository";

export default class ProductRepository extends Repository {
	constructor(dao) {
		super(dao, productModel);
	}
}
