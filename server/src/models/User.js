import db from '../config/database.js';

class User {
    static create(email, hashedPassword, name) {
        const stmt = db.prepare(`
      INSERT INTO users (email, password, name)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(email, hashedPassword, name);
        return result.lastInsertRowid;
    }

    static findByEmail(email) {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    }

    static findById(id) {
        const stmt = db.prepare('SELECT id, email, name, avatar_url, size_top, size_bottom, size_shoe, created_at FROM users WHERE id = ?');
        return stmt.get(id);
    }

    static updateProfile(id, data) {
        const { name, avatar_url, size_top, size_bottom, size_shoe } = data;
        const stmt = db.prepare(`
      UPDATE users 
      SET name = ?, avatar_url = ?, size_top = ?, size_bottom = ?, size_shoe = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
        stmt.run(name, avatar_url, size_top, size_bottom, size_shoe, id);
        return this.findById(id);
    }
}

export default User;
