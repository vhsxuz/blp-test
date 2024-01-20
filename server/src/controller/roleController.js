import { PrismaClient } from "@prisma/client";
import generateId from "../utils/generateId.js";

const prisma = new PrismaClient();

// Create a new role
export const postRole = async (req, res) => {
    const { description } = req.body;
    console.log('Request Body:', req);
    try {
        const newRole = await prisma.role.create({
            data: {
                id: generateId(),
                description: description,
            }
        });
        return res.status(201).json({
            success: true,
            role: newRole,
        });
    } catch (error) {
        console.error('Error creating role:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await prisma.role.findMany({
            include: { users: true }
        });

        return res.status(200).json({
            success: true,
            count: roles.length,
            roles: roles,
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Get a specific role by ID
export const getRole = async (req, res) => {
    const { roleId } = req.params;

    try {
        const role = await prisma.role.findUnique({
            where: {
                id: roleId
            },
            include: { users: true }
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Role not found',
            });
        }

        return res.status(200).json({
            success: true,
            role: role,
        });
    } catch (error) {
        console.error('Error fetching role:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Update a role by ID
export const updateRole = async (req, res) => {
    const { roleId } = req.params;
    const { description } = req.body;

    try {
        const updatedRole = await prisma.role.update({
            where: {
                id: roleId
            },
            data: {
                description: description,
            }
        });

        return res.status(200).json({
            success: true,
            role: updatedRole,
        });
    } catch (error) {
        console.error('Error updating role:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Delete a role by ID
export const deleteRole = async (req, res) => {
    const { roleId } = req.params;

    try {
        const deletedRole = await prisma.role.delete({
            where: {
                id: roleId
            }
        });

        return res.status(200).json({
            success: true,
            deletedRole: deletedRole,
        });
    } catch (error) {
        console.error('Error deleting role:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};
