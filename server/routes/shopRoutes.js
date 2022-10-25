const express = require("express");
const shopController = require("../controllers/shopControllers");
const checkToken = require("../middlewares/checkToken");
const router = express.Router();

router.use(checkToken);
router.post("/add_product", shopController.addProduct);
router.get("/get_product/:id", shopController.getProduct);
router.get("/fetch_products", shopController.getProducts);

router.post("/add_order", shopController.addOrder);
router.get("/get_orders", shopController.getOrders);

module.exports = router;
