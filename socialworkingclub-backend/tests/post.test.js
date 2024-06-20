const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Post = require('../models/post.model');

describe('Post Routes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:3000/socialworkingclub-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await Post.deleteMany();
        await mongoose.disconnect();
    });

    describe('GET /api/posts', () => {
        it('should get all posts', async () => {
            await Post.create({ content: 'Test post 1' });
            await Post.create({ content: 'Test post 2' });

            const res = await request(app).get('/api/posts');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(2);
        });
    });

    // Ajoutez d'autres tests pour les autres routes
});
