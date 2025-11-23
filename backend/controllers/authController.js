const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { generateToken } = require("../utils/tokenUtils");

exports.register = async (req, res) => {
    try {
        const { username, password, role = "guest", email = null } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "username e password são obrigatórios" });

        const [dup] = await pool.query("SELECT id FROM utilizadores WHERE username = ?", [username]);
        if (dup.length) return res.status(409).json({ message: "Username já existe" });

        const hash = await bcrypt.hash(password, 10);
        const [r] = await pool.query(
            "INSERT INTO utilizadores (username,email,password,role) VALUES (?,?,?,?)",
            [username, email, hash, role]
        );
        res.status(201).json({ message: "Utilizador registado", id: r.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro no registo" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "username e password são obrigatórios" });

        const [rows] = await pool.query(
            "SELECT id, username, password, role FROM utilizadores WHERE username = ? LIMIT 1",
            [username]
        );
        if (!rows.length) return res.status(400).json({ message: "Credenciais inválidas" });

        const u = rows[0];
        const ok = await bcrypt.compare(password, u.password);
        if (!ok) return res.status(400).json({ message: "Credenciais inválidas" });

        const token = generateToken({ id: u.id, username: u.username, role: u.role });
        res.json({ token, role: u.role, username: u.username });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro no login" });
    }
};