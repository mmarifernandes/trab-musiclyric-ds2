let musicas = [];
let aprovarmusicas = [];

const { nanoid } = require('nanoid');

class MusicasController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({
            aprovarmusicas
        });

        console.log({ session: req.session });
        // LISTAGEM DE TODOS OS musicaS MOSTRANDO O NOME
        // O NOME É CLICAVEL E REDIRECIONA PARA O DETALHAR DO musica
        // let html = '';
        // musicas.forEach(musica => {
        //     html += `<a href="/musicas/${musica.id}">${musica.nome}</a><br></br>`
        // })
        
        // return res.send(html);
        return res.render('listagem', { user: req.session.user, musicas: musicas, aprovarmusicas: aprovarmusicas });
    }

    async deletar(req, res) {
        const { id } = req.params;
        // BUSCAR O musica E REMOVER DO VETOR
        const musicaIdx = musicas.findIndex(f => f.id == id);
        musicas.splice(musicaIdx, 1);

        // FILTRAR O VETOR DE musicaS BASEADO NO ID != DO ID DA REMOÇÃO
        // musicas = musicas.filter(f => f.id != id);
        
        // BANCO - SQL COM DELETE WHERE

        return res.redirect('/musicas')
    }

    async detalhar(req, res) {
        const { id } = req.params;
        // for  / filter
        for (let index = 0; index < musicas.length; index++) {
            if (musicas[index].id == id) {
                // retorna esse cara!
            }
        }

        const musicaFiltrado = musicas.filter(f => f.id == id);
        if (musicaFiltrado.length > 0) {
            // return res.send(`<pre>
            //     ${JSON.stringify(musicaFiltrado[0], null, 2)}
            // </pre>`)
            return res.render('detalhar', { musica: musicaFiltrado[0] });
        } else {
            return res.send('MÚSICA NÃO ENCONTRADA');
        }

        // MOSTRA TODOS OS DADOS DO musica
        //return res.send('Essa deveria detalhar um musica ' + req.params.id);
    }


    async cadastrar(req, res) {
        //DEPOIS DE CADASTRAR, REDIRECIONA PARA A LISTAGEM
        console.log(`Aguardando aprovação`);
        console.log({ body: req.body });
        aprovarmusicas.push({
            user: req.session.user.email,
            id: nanoid(8),
            ...req.body
        });
        return res.redirect('/musicas');
        // return res.send('Deveria cadastrar um musica');
    }
}

module.exports = { MusicasController }