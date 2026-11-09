const pool = require('../config/db');

/**
 * Kiểm tra xem user có gói tập đang active và chưa hết hạn hay không.
 * @param {number} userId
 * @returns {number|null} Trả về membership_id nếu có, null nếu không.
 */
async function checkActiveMembership(userId) {
  const query = `
    SELECT membership_id
    FROM memberships
    WHERE user_id = $1
      AND status = 'active'
      AND end_date >= CURRENT_DATE
    ORDER BY end_date DESC
    LIMIT 1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0] ? result.rows[0].membership_id : null;
}

/**
 * Tạo bản ghi check-in mới.
 * @param {number} userId
 * @param {number} membershipId
 * @param {string} method - 'qr' hoặc 'manual'
 * @returns {Object}
 */
async function createCheckin(userId, membershipId, method) {
  const query = `
    INSERT INTO checkins (user_id, membership_id, checkin_time, method)
    VALUES ($1, $2, NOW(), $3)
    RETURNING checkin_id, user_id, membership_id, checkin_time, method, created_at, updated_at
  `;
  const result = await pool.query(query, [userId, membershipId, method]);
  return result.rows[0];
}

/**
 * Lấy danh sách check-in hôm nay.
 * @returns {Array<Object>}
 */
async function getTodayCheckins() {
  const query = `
    SELECT c.checkin_id, c.checkin_time, c.method, u.full_name, u.email, mp.name as plan_name
    FROM checkins c
    JOIN users u ON c.user_id = u.user_id
    LEFT JOIN memberships m ON c.membership_id = m.membership_id
    LEFT JOIN membership_plans mp ON m.plan_id = mp.plan_id
    WHERE c.checkin_time::date = CURRENT_DATE
    ORDER BY c.checkin_time DESC
  `;
  const result = await pool.query(query);
  return result.rows;
}

module.exports = { checkActiveMembership, createCheckin, getTodayCheckins };
