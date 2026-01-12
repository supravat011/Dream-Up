import db from '../config/database.js';

class Order {
    static create(userId, items, totalAmount) {
        const createOrder = db.prepare(`
      INSERT INTO orders (user_id, total_amount)
      VALUES (?, ?)
    `);

        const createOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
      VALUES (?, ?, ?, ?)
    `);

        const transaction = db.transaction((userId, items, totalAmount) => {
            const orderResult = createOrder.run(userId, totalAmount);
            const orderId = orderResult.lastInsertRowid;

            for (const item of items) {
                createOrderItem.run(orderId, item.id, item.quantity, item.price);
            }

            return orderId;
        });

        return transaction(userId, items, totalAmount);
    }

    static findByUserId(userId) {
        const stmt = db.prepare(`
      SELECT o.*, 
        json_group_array(
          json_object(
            'id', oi.product_id,
            'name', p.name,
            'price', oi.price_at_purchase,
            'quantity', oi.quantity,
            'category', p.category,
            'image', p.image_url,
            'description', p.description
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);

        const orders = stmt.all(userId);
        return orders.map(order => ({
            ...order,
            items: JSON.parse(order.items)
        }));
    }

    static findById(id) {
        const stmt = db.prepare(`
      SELECT o.*, 
        json_group_array(
          json_object(
            'id', oi.product_id,
            'name', p.name,
            'price', oi.price_at_purchase,
            'quantity', oi.quantity,
            'category', p.category,
            'image', p.image_url,
            'description', p.description
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = ?
      GROUP BY o.id
    `);

        const order = stmt.get(id);
        if (order) {
            order.items = JSON.parse(order.items);
        }
        return order;
    }

    static updateStatus(id, status) {
        const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
        stmt.run(status, id);
        return this.findById(id);
    }
}

export default Order;
