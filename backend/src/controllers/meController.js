const { authenticate } = require('../middlewares/authMiddleware');
const pool = require('../config/db');

/**
 * Lấy hồ sơ cá nhân của member đang đăng nhập.
 * GET /api/me/profile
 */
async function getProfile(req, res) {
  try {
    const userId = req.user.user_id;

    const query = `
      SELECT user_id, email, full_name, phone, role, is_active, created_at
      FROM users
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng' },
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
      error: null,
    });
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({
      success: false,
      data: null,
      error: { code: 'SERVER_ERROR', message: err.message },
    });
  }
}

/**
 * Lấy danh sách gói tập đã đăng ký của member đang đăng nhập.
 * GET /api/me/memberships
 */
async function getMyMemberships(req, res) {
  try {
    const userId = req.user.user_id;

    const query = `
      SELECT m.membership_id, m.plan_id, m.start_date, m.end_date, m.status,
             mp.name AS plan_name, mp.duration_days, mp.price
      FROM memberships m
      JOIN membership_plans mp ON mp.plan_id = m.plan_id
      WHERE m.user_id = $1
      ORDER BY m.created_at DESC
    `;
    const result = await pool.query(query, [userId]);

    return res.status(200).json({
      success: true,
      data: result.rows,
      error: null,
    });
  } catch (err) {
    console.error('getMyMemberships error:', err);
    return res.status(500).json({
      success: false,
      data: null,
      error: { code: 'SERVER_ERROR', message: err.message },
    });
  }
}

/**
 * Lấy lịch sử check-in của member đang đăng nhập.
 * GET /api/me/checkins
 */
async function getMyCheckins(req, res) {
  try {
    const userId = req.user.user_id;

    const query = `
      SELECT c.checkin_id, c.checkin_time, c.method,
             mp.name AS plan_name
      FROM checkins c
      LEFT JOIN memberships m ON c.membership_id = m.membership_id
      LEFT JOIN membership_plans mp ON m.plan_id = mp.plan_id
      WHERE c.user_id = $1
      ORDER BY c.checkin_time DESC
    `;
    const result = await pool.query(query, [userId]);

    return res.status(200).json({
      success: true,
      data: result.rows,
      error: null,
    });
  } catch (err) {
    console.error('getMyCheckins error:', err);
    return res.status(500).json({
      success: false,
      data: null,
      error: { code: 'SERVER_ERROR', message: err.message },
    });
  }
}

module.exports = { getProfile, getMyMemberships, getMyCheckins };
