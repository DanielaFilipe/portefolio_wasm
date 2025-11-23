const pool = require("../config/db");

exports.getProjects = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, description, created_by, created_at FROM projects ORDER BY id DESC"
        );
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro a obter projetos" });
    }
};

exports.addProject = async (req, res) => {
    try {
        const { title, description = "" } = req.body;
        if (!title) return res.status(400).json({ message: "title é obrigatório" });

        const userId = req.user?.id || null;
        const [r] = await pool.query(
            "INSERT INTO projects (title, description, created_by) VALUES (?, ?, ?)",
            [title, description, userId]
        );
        const [one] = await pool.query("SELECT * FROM projects WHERE id = ?", [r.insertId]);
        res.status(201).json(one[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao criar projeto" });
    }
};