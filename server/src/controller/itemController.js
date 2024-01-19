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
        }``
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
    const { itemId } = req.body;
    const deleteditem = await prisma.item.delete({
        where: {
            id: itemId
        }
    });

    return res.status(200).json({
        success: true,
        deleteditem: deleteditem
    });
};

export const patchItem = async (req, res, next) => {
    const { itemId, itemData } = req.body; 
    const updateditem = await prisma.item.update({
        where: {
            id: itemId
        }, 
        data: itemData
    }); 

    return res.status(200).json({
        success: true,
        updateditem: updateditem
    });
}; 