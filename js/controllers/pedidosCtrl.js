app.controller("pedidosCtrl", function($scope, $http, CardapioAPI, PedidoAPI) {
                    $scope.cardapio = [];
						
					var carregarCardapio = function() {
						CardapioAPI.carregarCardapio()
							.success(
								function(data) {
									$scope.cardapio = data;
								}
							)
							.error(
								function(data) {
									alert(data);
								}
							);
						};
					
					carregarCardapio(); 
					
                    $scope.pedidos = [];
					
					$scope.totalPedidos = 0;
                    $scope.add = function(pedido) {
							PedidoAPI.salvarPedido(pedido)
								.success(function() {
									PedidoAPI.getPedidos(pedido)
										.success(function(data) {
											$scope.pedidos = data;
											data.forEach(totalize);
										});
								});
							
                            delete $scope.pedido;
                        };
					
					$scope.remove = function(pedido) {
							PedidoAPI.deletarPedido(pedido)
								.success(function() {
									PedidoAPI.getPedidos(pedido)
										.success(function(data) {
											$scope.pedidos = data;
											data.forEach(totalize);
										});
								});
							
                            delete $scope.pedido;
						};
						
					var totalize = function(pedido, multiplicador) {
							pedido.item.subtotal = pedido.item.preco * pedido.quantidade;
							$scope.totalPedidos += multiplicador * pedido.item.subtotal;
						};
                });