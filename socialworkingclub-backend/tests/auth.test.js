const request = require('supertest');
const app = require('../server'); // Assurez-vous d'importer correctement votre application Express
const mongoose = require('mongoose');

describe('Authentification', () => {
    let token;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:3000/socialworkingclub-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Devrait retourner un token JWT valide lors de la connexion', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'mot_de_passe_secret',
            })
            .expect(200)
            .end((err, response) => {
                if (err) return done(err);
                token = response.body.token; // Stocker le token pour les tests ultérieurs
                expect(token).toBeDefined();
                done();
            });
    });

    it('Devrait retourner une erreur si l\'email ou le mot de passe est incorrect', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                email: 'email_invalide@example.com',
                password: 'mot_de_passe_invalide',
            })
            .expect(401)
            .end((err, response) => {
                if (err) return done(err);
                expect(response.body.error).toBe('Identifiants invalides');
                done();
            });
    });

    // Ajoutez d'autres tests pour vérifier le comportement d'authentification selon vos besoins
});
