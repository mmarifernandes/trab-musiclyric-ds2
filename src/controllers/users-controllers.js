const users = [];

class UsersController {

     async mostraCadastro(req, res) {
         return res.render('cadastrouser');
     }
    async cadastrar(req, res) {
        console.log('UsersController/cadastrouser');
        if (req.body.nome == '' || req.body.email == '' || req.body.senha == '') {
            return res.send('Você precisa preencher todos os campos...');
        }
        const user = req.body;
        const userEncontrado = users.find(u => u.email == user.email);
        if (userEncontrado) {
            return res.send('Este email já está em uso');

        } else {
            users.push(user);
            req.session.user = user;
            return res.redirect('/musicas');
        }

    }
    async mostraLogin(req, res) {
        return res.render('login');
    }

    async login(req, res) {
        const { email, senha } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);

        if (!usuarioEcontrado) return res.send('User nao encontrado');

        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            return res.redirect('/musicas');
        } else {
            return res.send('Senha nao confere...');
        }

    }
}

module.exports = UsersController;
