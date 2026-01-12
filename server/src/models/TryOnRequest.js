import db from '../config/database.js';

class TryOnRequest {
    static create(userId, personImageUrl, garmentImageUrl) {
        const stmt = db.prepare(`
      INSERT INTO tryon_requests (user_id, person_image_url, garment_image_url)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(userId, personImageUrl, garmentImageUrl);
        return result.lastInsertRowid;
    }

    static findById(id) {
        const stmt = db.prepare('SELECT * FROM tryon_requests WHERE id = ?');
        return stmt.get(id);
    }

    static updateResult(id, resultImageUrl, status = 'completed') {
        const stmt = db.prepare(`
      UPDATE tryon_requests
      SET result_image_url = ?, status = ?
      WHERE id = ?
    `);
        stmt.run(resultImageUrl, status, id);
        return this.findById(id);
    }

    static findByUserId(userId) {
        const stmt = db.prepare(`
      SELECT * FROM tryon_requests
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);
        return stmt.all(userId);
    }
}

export default TryOnRequest;
