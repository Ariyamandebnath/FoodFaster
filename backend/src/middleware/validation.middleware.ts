import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import asyncHandler from '../utils/asyncHandler';

const handleValidationError = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
})

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be string"),

    body("addressLine1").isString().notEmpty().withMessage("AdressLine1 must be string "),

    body("city").isString().notEmpty().withMessage("City must be string"),
    
    body("country").isString().notEmpty().withMessage("Country must be string"),

    handleValidationError

]

export const validateMyResturantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("RestaurantName must be string"),

    body("body").isString().notEmpty().withMessage("City must be string"),

    body("country").isString().notEmpty().withMessage("Country must be String"),

    body("deliveryPrice").isFloat({ min: 0 }).withMessage("DeliveryPrice must be a positive number"),

    body("estimatedDeliveryTime").isFloat({ min: 0 }).withMessage("Estimated Delivery Time must be a positive numnber"),
    
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),

    body("menuItems").isArray().withMessage("Menu items must be an array"),

    body("menuItems.*.name").notEmpty().withMessage("Menu items name is required"),

    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu item is required and must be a positive number"),
    
    handleValidationError,
    
]