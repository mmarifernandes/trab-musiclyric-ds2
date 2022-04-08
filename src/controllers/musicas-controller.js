let musicas = [{
    user: 'marinafernandess103@gmail.com',
    id: 'wJhUGr7g',
    titulo: 'the 1',
    genero: 'Country, Pop',
    letra: 'Make sure nobody sees you leave\r\n' +
        'Hood over your head, keep your eyes down\r\n' +
        "Tell your friends you're out for a run\r\n" +
        "You'll be flushed when you return\r\n" +
        'Take the road less traveled by\r\n' +
        'Tell yourself you can always stop\r\n' +
        'What started in beautiful rooms\r\n' +
        'Ends with meetings in parking lots\r\n' +
        "And that's the thing about illicit affairs\r\n" +
        'And clandestine meetings and longing stares\r\n' +
        "It's born from just one single glance\r\n" +
        'But it dies, and it dies, and it dies\r\n' +
        'A million little times\r\n' +
        'Leave the perfume on the shelf\r\n' +
        'That you picked out just for him\r\n' +
        'So you leave no trace behind\r\n' +
        "Like you don't even exist\r\n" +
        'Take the words for what they are\r\n' +
        'A dwindling, mercurial high\r\n' +
        'A drug that only worked\r\n' +
        'The first few hundred times\r\n' +
        "And that's the thing about illicit affairs\r\n" +
        'And clandestine meetings and stolen stares\r\n' +
        'They show their truth one single time\r\n' +
        'But they lie, and they lie, and they lie\r\n' +
        'A million little times\r\n' +
        'And you wanna scream\r\n' +
        `Don't call me "kid"\r\n` +
        `Don't call me "baby"\r\n` +
        'Look at this godforsaken mess that you made me\r\n' +
        'You showed me colors\r\n' +
        "You know I can't see with anyone else\r\n" +
        `Don't call me "kid"\r\n` +
        `Don't call me "baby"\r\n` +
        'Look at this idiotic fool that you made me\r\n' +
        'You taught me a secret language\r\n' +
        "I can't speak with anyone else\r\n" +
        'And you know damn well\r\n' +
        'For you I would ruin myself\r\n' +
        'A million little times',
    album: 'folklore',
    status: 'like',
    lancamento: '2022-03-28',
    artista: 'Taylor Swift',
    url: 'https://youtu.be/vv3um0BlygY'
}];
let aprovarmusicas = [];
let favoritas = [];
const { nanoid } = require('nanoid');

class MusicasController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar', { user: req.session.user, });
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({
            aprovarmusicas
        });
        console.log("SESSION")
        console.log({ session: req.session.user });
        if (req.session.user !== undefined) {
            return res.render('listagem', { user: req.session.user, musicas: musicas, aprovarmusicas: aprovarmusicas, favoritas: favoritas });
        } else {
            return res.send('Você precisa estar logado para ver está página');
        }
    }


    async mostraAlterar(req, res) {
        const { id } = req.params;
        const musicaFiltrado = musicas.filter(f => f.id == id);
        return res.render('alterar', { user: req.session.user, musica: musicaFiltrado[0], musicas: musicas });

    }

    async alterar(req, res) {
        const { id } = req.params;

        const musicaFiltrado = musicas.filter(f => f.id == id);
        musicas.splice(musicas.indexOf(musicaFiltrado[0]), 1);

        musicas.push({
            user: req.session.user.email,
            userlike: '',
            id: id,
            ...req.body
        });
        console.log(musicas);
        return res.redirect('/musicas');
    }

    async datacresc(req, res) {
        musicas.sort(function (a, b) {
            var c = new Date(a.lancamento);
            var d = new Date(b.lancamento);
            return d - c;
        });
        return res.redirect('/musicas')
    }

    async datadecresc(req, res) {
        musicas.sort(function (a, b) {
            var c = new Date(a.lancamento);
            var d = new Date(b.lancamento);
            return c - d;
        });
        return res.redirect('/musicas')
    }

    async titulocresc(req, res) {
        musicas.sort(function (a, b) {
            var tituloA = a.titulo.toLowerCase(),
                tituloB = b.titulo.toLowerCase();
            if (tituloA < tituloB)
                return -1;

        });
        console.log(musicas)

        return res.redirect('/musicas')
    }

    async titulodecresc(req, res) {
        musicas.sort(function (a, b) {
            var tituloA = a.titulo.toLowerCase(),
                tituloB = b.titulo.toLowerCase();
            if (tituloA > tituloB)
                return -1;
        });
        console.log(musicas)
        return res.redirect('/musicas')
    }

    async deletar(req, res) {
        const { id } = req.params;
        console.log("Aaaaa");
        const musicaIdx = musicas.findIndex(f => f.id == id);
        musicas.splice(musicaIdx, 1);
        return res.redirect('/musicas')
    }

    async detalhar(req, res) {
        const { id } = req.params;
        const musicaFiltrado = musicas.filter(f => f.id == id);
        if (musicaFiltrado.length > 0) {
            return res.render('detalhar', { user: req.session.user, musica: musicaFiltrado[0] });
        } else {
            return res.send('MÚSICA NÃO ENCONTRADA');
        }
    }


    async cadastrar(req, res) {
        console.log(`Aguardando aprovação`);
        console.log({ body: req.body });
        aprovarmusicas.push({
            user: req.session.user.email,
            status: 'like',
            id: nanoid(8),
            ...req.body
        });
        return res.redirect('/musicas');
    }

    async aprova(req, res) {
        console.log(`AQUI`);
        const { id } = req.params;
        const musicaFiltrado = aprovarmusicas.filter(f => f.id == id);
        if (musicaFiltrado.length > 0) {
            aprovarmusicas.splice(aprovarmusicas.indexOf(musicaFiltrado[0]), 1);

            musicas.push(musicaFiltrado[0]);

        }
        return res.redirect('/musicas');
    }

    async naoaprova(req, res) {
        const { id } = req.params;
        const musicaFiltrado = aprovarmusicas.filter(f => f.id == id);
        if (musicaFiltrado.length > 0) {
            aprovarmusicas.splice(aprovarmusicas.indexOf(musicaFiltrado[0]), 1);
        }
        return res.redirect('/musicas');
    }

    async favoritar(req, res) {
        const { id } = req.params;
        const musicaFiltrado = musicas.filter(f => f.id == id);
        const favFiltrado = favoritas.filter(f => f.musicas.id == id && f.userlike == req.session.user.email);
        if (favFiltrado[0]) {
            console.log("ERRO");
            favoritas.splice(favoritas.indexOf(favFiltrado[0]), 1);
 

        }
        else {
            console.log('CERTO')
            favoritas.push({ musicas: musicaFiltrado[0], userlike: req.session.user.email});
            for (let i = 0; i<favoritas.length; i++) {
                if (favoritas[i].musicas.id == id) {
                    favoritas[i].musicas.status = 'liked';
                    break;
                }
            }
        }
        console.log(favoritas);
        return res.redirect('/musicas');
    }
}

module.exports = { MusicasController }