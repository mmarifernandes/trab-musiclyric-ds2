const users = [];

class UsersController {
    async cadastrar(req, res) {
        console.log('UsersController/cadastrar');
        if (req.body.nome == '' || req.body.email == '' || req.body.senha == '') {
            return res.send('Você precisa preencher todos os campos...');
        }
        const user = req.body;
        users.push(user);  // salvando no banco

        console.log({ users });
        req.session.user = user;

        res.redirect('/musicas');
    } 

    async login(req, res) {
        // ACHAR COM O EMAIL CERTO
        const { email, senha } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);

        if (!usuarioEcontrado) return res.send('User nao encontrado');

        // VERIFICAR A SENHA
        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            return res.redirect('/musicas');
        } else {
            return res.send('Senha nao confere...');
        }

    }
}

module.exports = UsersController;
