import pool from '../config/db.js';

export async function getProfile() {
  const [rows] = await pool.query('SELECT * FROM student_profile LIMIT 1');
  return rows[0];
}

export async function getHobbies(studentId) {
  const [rows] = await pool.query(
    'SELECT hobby FROM student_hobbies WHERE student_id = ?',
    [studentId]
  );
  return rows.map((r) => r.hobby);
}

export async function getSkills(studentId) {
  const [rows] = await pool.query(
    'SELECT skill_name, categoria FROM student_skills WHERE student_id = ?',
    [studentId]
  );
  return rows;
}
