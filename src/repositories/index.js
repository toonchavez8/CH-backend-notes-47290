// repositories/index.js

import { CartDAO, ProductDAO, TicketDAO } from "../dao/persitanceFactory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.respository.js";
import TicketRepository from "./ticket.repository.js";

const productRepository = new ProductRepository(new ProductDAO());
const cartRepository = new CartRepository(new CartDAO());
const ticketRepository = new TicketRepository(new TicketDAO());

export const ProductService = productRepository;
export const CartService = cartRepository;
export const TicketService = ticketRepository;
