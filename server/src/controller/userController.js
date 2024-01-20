import { PrismaClient } from "@prisma/client";
import generateId from '../utils/generateId.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const jwtSecretKey = 'secret_key';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      const newUser = await prisma.user.create({
          data: {
              id: generateId(),
              username: username,
              email: email,
              password: hashedPassword,
              roleId: "ade5b34a-7c12-48fb-8e91-b25eac02ad86",
          }
      });

      return res.status(201).json({
          success: true,
          user: newUser,
      });
  } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({
          success: false,
          error: 'Internal Server Error',
      });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};
