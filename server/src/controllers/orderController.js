import Order from '../models/Order.js';

export const createOrder = (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const orderId = Order.create(req.userId, items, totalAmount);
        const order = Order.findById(orderId);
        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getUserOrders = (req, res) => {
    try {
        const orders = Order.findByUserId(req.userId);
        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getOrderById = (req, res) => {
    try {
        const order = Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        // Verify order belongs to user
        if (order.user_id !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
