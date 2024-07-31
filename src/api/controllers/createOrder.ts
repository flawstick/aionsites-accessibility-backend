import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderModel from "@/models/order";
import MenuModel from "@/models/menu";
import { log } from "@/utils/log";

// Utility to handle precise floating-point arithmetic
const toFixedFloat = (num: number, decimalPlaces: number) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};

export async function createOrder(req: Request, res: Response) {
  const { items } = req.body;
  const { tenantId } = req.headers;
  const { _id } = req.body.user;

  if (!_id || !items || items.length < 1) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const groupedItems: { [key: string]: any[] } = {};
    for (const item of items) {
      if (!groupedItems[item.restaurantId]) {
        groupedItems[item.restaurantId] = [];
      }
      groupedItems[item.restaurantId].push(item);
    }

    const restaurantsData = [];
    let totalPrice = 0.0;

    for (const restaurantId in groupedItems) {
      const menu = await MenuModel.findOne({ restaurantId });
      if (!menu) {
        return res.status(404).json({
          message: `Menu not found for restaurant ID ${restaurantId}`,
        });
      }

      const itemsData = groupedItems[restaurantId].map((orderItem: any) => {
        const menuItem = menu.items.find((menuItem: any) =>
          menuItem._id.equals(orderItem._id),
        );
        if (!menuItem) {
          throw new Error(
            `Menu item with ID ${orderItem._id} not found in restaurant ID ${restaurantId}`,
          );
        }
        const price = parseFloat(menuItem.price);
        const quantity = parseInt(orderItem.quantity, 10);
        if (isNaN(price) || isNaN(quantity)) {
          throw new Error(
            `Invalid price or quantity for menu item with ID ${orderItem._id}`
          );
        }
        return { ...menuItem, price, quantity };
      });

      const restaurantTotalPrice = itemsData.reduce(
        (sum: number, item: any) => sum + (item.price * item.quantity),
        0,
      );

      totalPrice += restaurantTotalPrice;
      restaurantsData.push({
        restaurantId,
        items: itemsData,
        totalPrice: restaurantTotalPrice,
      });
    }

    // Round the final total price to 2 decimal places
    totalPrice = toFixedFloat(totalPrice, 2);

    const newOrder = new OrderModel({
      userId: new mongoose.Types.ObjectId(_id),
      restaurants: restaurantsData,
      totalPrice,
      status: "pending",
      tenantId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error: any) {
    log.error("Failed to create order:", error as Error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

