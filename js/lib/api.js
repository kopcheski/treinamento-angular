angular.module("api", []);
angular.module("api").factory("CardapioAPI", function($http) {
	var _carregarCardapio = function() {
		return $http.get("http://172.23.111.112:8080/pedidosweb/cardapio");
	};
	return {
		carregarCardapio: _carregarCardapio
	};
});

angular.module("api").service("PedidoAPI", function($http) {
	this.salvarPedido = function(pedido) {
		return $http.post("http://172.23.111.112:8080/pedidosweb/pedidos", pedido);
	},
	this.deletarPedido = function(pedido) {
		return $http.delete("http://172.23.111.112:8080/pedidosweb/pedidos", pedido);
	},
	this.getPedidos = function() {
		return $http.get("http://172.23.111.112:8080/pedidosweb/pedidos");
	}
});

app.config(function($routeProvider) {
	$routeProvider.when("/pedidos", {templateUrl: "views/pedido.html", controller: "pedidosCtrl"});
	$routeProvider.otherwise({redirectTo: "/pedidos"});
});