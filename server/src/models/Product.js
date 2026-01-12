import db from '../config/database.js';

class Product {
    static getAll(category = null) {
        let query = 'SELECT * FROM products';
        if (category && category !== 'All') {
            query += ' WHERE category = ?';
            const stmt = db.prepare(query);
            return stmt.all(category);
        }
        const stmt = db.prepare(query);
        return stmt.all();
    }

    static findById(id) {
        const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
        return stmt.get(id);
    }

    static create(data) {
        const { name, category, price, image_url, description, stock_quantity } = data;
        const stmt = db.prepare(`
      INSERT INTO products (name, category, price, image_url, description, stock_quantity)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
        const result = stmt.run(name, category, price, image_url, description, stock_quantity || 100);
        return result.lastInsertRowid;
    }

    static update(id, data) {
        const { name, category, price, image_url, description, stock_quantity } = data;
        const stmt = db.prepare(`
      UPDATE products
      SET name = ?, category = ?, price = ?, image_url = ?, description = ?, stock_quantity = ?
      WHERE id = ?
    `);
        stmt.run(name, category, price, image_url, description, stock_quantity, id);
        return this.findById(id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        return stmt.run(id);
    }
}

export default Product;
