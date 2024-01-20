import { PrismaClient } from "@prisma/client";
import  generateId  from "../utils/generateId.js";

const prisma = new PrismaClient();

export const getAllItems = async (req, res, next) => {
    const items = await prisma.item.findMany();

    return res.status(200).json({
        success: true,
        count: items.length,
        items: items
    });
};

export const postItem = async (req, res, next) => {
    const { name } = req.body

    const item = await prisma.item.create({
        data: {
            id: generateId(),
            name: name,
        }
    });

    return res.status(200).json({
        success: true,
        item: item
    });
};

export const getItem = async (req, res, next) => {
    const { itemId } = req.params;

    const item = await prisma.item.findUnique({
        where: {
            id: itemId
        }
    });

    if (!item) {
        throw new Error('item Not Found');
    };

    return res.status(200).json({
        success: true,
        item: item
    });
};

export const deleteItem = async (req, res, next) => {
    const { itemId } = req.params;
    const deletedItem = await prisma.item.delete({
        where: {
            id: itemId
        }
    });

    return res.status(200).json({
        success: true,
        deletedItem: deletedItem
    });
};

export const patchItem = async (req, res, next) => {
    const { itemId } = req.params;
    const { name } = req.body;
    console.log(itemId);
    console.log(req.body);
    const updatedItem = await prisma.item.update({
        where: {
            id: itemId
        }, 
        data: {
            name: name
        }
    }); 

    return res.status(200).json({
        success: true,
        updatedItem: updatedItem
    });
};
