var app = require('./app/config/server');
var server = app.listen(80, function () {
    console.log('Servidor subiu');
});

// requisições socket e também get passam a serem escutadas na porta 80
// serão 2 protocolos diferentes sendo escutados na mesma porta (não há problemas nisso)
var io = require('socket.io').listen(server);
app.set('io', io);

// criar conexão por websocket
io.on('connection', function (socket) {
    console.log("usuario conectou");

    socket.on('disconnect', function () {
        console.log('desconectou');
    });

    socket.on('msgParaServidor', function (data) {
        /* ============diálogos============= */
        // aparece (propaga) a msg apenas para quem enviou - padrão ('nomeDoEvento', {json: dados_a_serem_passados})
        socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });
        // propaga a msg para todos os usuário (menos para quem mandou) - padrão ('nomeDoEvento', {json: dados_a_serem_passados})
        socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });

        /* ============participantes============= */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            // aparece (propaga) a msg apenas para quem enviou - padrão ('nomeDoEvento', {json: dados_a_serem_passados})
            socket.emit('participantesParaCliente', { apelido: data.apelido });
            // propaga a msg para todos os usuário (menos para quem mandou) - padrão ('nomeDoEvento', {json: dados_a_serem_passados})
            socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido });
        }
    });
});