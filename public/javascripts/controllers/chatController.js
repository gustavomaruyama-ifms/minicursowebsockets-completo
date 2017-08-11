/**
 * Created by Gustavo on 11/08/2017.
 */
angular.module("chat-web").controller("chatController",
    function ($scope, $websocket, $anchorScroll, $location) {
        $scope.mensagens = [];

        var contatoDeMensagens = 0;

        var dataStream = $websocket('ws://localhost:3000/chat/websocket');

        dataStream.onMessage(function (mensagemRecebida) {
            mensagemRecebida = JSON.parse(mensagemRecebida.data);
            mensagemRecebida.id = contatoDeMensagens++;
            $scope.mensagens.push(mensagemRecebida);
            rolarParaBaixo(mensagemRecebida.id);
        });

        $scope.enviar = function () {
            var dados = {
                nome: $scope.nome,
                mensagem: $scope.mensagem
            };
            dataStream.send(dados);
            $scope.mensagem = null;
        };

        var rolarParaBaixo = function(idMessage) {
            $location.hash(idMessage);
            $anchorScroll();
        };
    });