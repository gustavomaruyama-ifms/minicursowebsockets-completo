/**
 * Created by Gustavo on 10/08/2017.
 */
var sockjs = require('sockjs');
var chatServer = sockjs.createServer();

var pessoas = [];

chatServer.on('connection', function (socket) {
    console.log('Um novo usuário se conectou!');
    adicionarNaListaDePessoas(socket);
    socket.on('data', broadcast);
    socket.on('close', sair);
    setInterval(function () {
            socket.write(new Date().toTimeString());
        }, 1000
    );
});

var adicionarNaListaDePessoas = function (socket) {
    var pessoa = {
        socket: socket
    };
    pessoas.push(pessoa);
};

var broadcast = function (dados) {
    for (var i in pessoas) {
        pessoas[i].socket.write(dados);
    }
};

var sair = function () {
    console.log("Pessoa saiu");
};

module.exports = chatServer;