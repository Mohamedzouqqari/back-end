const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user.model');

describe('Admin Routes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:3000/backend-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await User.deleteMany();
        await mongoose.disconnect();
    });

    describe('GET /api/admin/credentials', () => {
        it('should get admin credentials', async () => {
            const admin = new User({
                email: 'admin@example.com',
                password: 'adminpassword',
                isAdmin: true
            });
            await admin.save();

            const res = await request(app).get('/api/admin/credentials');
            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(admin.email);
        });
    });
});
