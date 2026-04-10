import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Post } from './models/post';
import { Comment } from './models/comment';

dotenv.config();

const pe = process.env;

const sequelize = new Sequelize({
    username: pe.DB_USERNAME as string,
    password: pe.DB_PASSWORD as string,
    database: pe.DB_DATABASE as string, 
    host: pe.DB_HOST as string,
    port: Number(pe.DB_PORT) || 5432, 
    dialect: "postgres",
    models: [Post, Comment],
    logging: true
});

const app = express();
app.use(express.json());

const postRouter = express.Router();
app.use('/api/post', postRouter);

// get all post
postRouter.get('/', async (req, rest) => {
    try {
        const posts = await Post.findAll();
        rest.status(200).json({data: posts });
    } catch (error) {
        rest.status(500).json ({ message: "server error" })
    }
})

// tambah post
postRouter.post('/', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.username || !payload.title || !payload.content) {
            return res.status(400).json({ message: "Body request masih kosong" });
        }

        const newPost = await Post.create({
            username: payload.username, 
            title: payload.title, 
            content: payload.content
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error menyimpan data" });
    }
})

// get post by id
postRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id, {
            include: [{ model: Comment }]
        });

        if (!post) {
            return res.status(404).json({ success: false, message: "Post tidak ditemukan" });
        }

        res.status(200).json({ data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server", error });
    }
});

// update post
postRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post tidak ditemukan" });
        }

        await post.update(payload);

        res.json({ success: true, message: "Data post berhasil diupdate", data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengupdate data", error });
    }
});

// delete post
postRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post tidak ditemukan" });
        }

        await post.destroy();
        res.json({ success: true, message: "Data post berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal menghapus data", error });
    }
});

const commentRouter = express.Router();
app.use('/api/post-comment', commentRouter)

// get list comment
commentRouter.get("/", async (req, res) => {
})

const PORT = 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Koneksi ke database berhasil");

        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Tidak dapat terhubung ke database: ", error)
    }
};

startServer();