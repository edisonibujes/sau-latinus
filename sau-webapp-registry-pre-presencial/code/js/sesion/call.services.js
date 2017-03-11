(function() {

  'use strict';

var app = angular.module('app', []);


// app.controller('invokeServices', function($scope, $http, $window, $location) {
//
// 	// Delay para dar tiempo a que se almacene el token en el WSO2 IS
// 	sleep(600);
//
// 	console.log("Inicia el controlador final");
//   $scope.usuario=function(){
//     alert('hola');
//   };
// 	// Recupero el tokenId
// 	var tokenId = getAcceesToken();
//
// 	// Invoco el servicio Validar Token
// 	validateToken($scope, $http, $window, tokenId, $location);
//
// 	console.log("Finaliza");
// });
//
// function validateToken($scope, $http, $window, tokenId, $location) {
//
// 	console.log("Invoca el servicio REST Validate Token");
//   document.getElementById('userName1').value="";
// 	//var url = 'http://10.0.200.22:8280/services/OAuth2TokenValidationProxy';
// 	//var url = 'http://10.0.200.22:8280/sau/api/v1/user/token/validate';
// 	var url = 'https://10.0.200.22:8243/sau/api/v1/user/token/validate';
// 	//var url = 'http://186.46.187.202:3335/sau/api/v1/user/token/validate';
// 	//var url = 'http://192.168.1.17:8282/sau/api/v1/user/token/validate';
//
// 	console.log("URL validateToken: " + url);
//
// 	var payload = '{"validateToken": { "identifier":"' + tokenId + '","tokenType":"bearer"}}';
//
// 	var config = {
// 		headers:  {
// 			"Content-Type" : "application/json",
// 			"Accept": "application/json"
// 		}
// 	};
//
// 	console.log("REQUEST: " + payload);
//   console.log("TOKEN: " + tokenId);
//
//   if (tokenId==""){
//     $scope.userName1="1";
//
//     $location.path('/login');
//   }
//
//   if (tokenId!=""){
//   	$http.post(url, payload, [config])
//   		.success( function (data, status, headers, config){
//   			console.log('Servicio consumido exitosamente');
//   			console.log("Response: " + angular.toJson(data));
//
//   			$scope.greeting = data;
//
//   			var valido = $scope.greeting.validateResponse.return.valid;
//
//   			console.log("El token esssssssssssssssss: " + valido);
//
//   			// Si el token es valido, recupero el usuario
//   			if(valido == 'true') {
//   				console.log("Token validado correctamente");
//   				var usuario = $scope.greeting.validateResponse.return.authorizedUser;
//           document.getElementById('userName').value = usuario;
//           var res = document.getElementById('userName').value.split("/");
//           document.getElementById('userName1').value = res[1];
//   				getUserClaimValues($scope, $http, $window, usuario);
//   			}
//   			else if(valido == 'false'){
//   				console.log("El usuario intenta acceder con un token invalido");
//   				$location.path('/login');
//   			}
//   		})
//   		.error( function (data, status, headers, config){
//   			console.log("Error consumiendo el servicio Validar Token");
//   		})
//
//   }
//
// }
//
//
// function getUserClaimValues($scope, $http, $window, usuario) {
//
// 	console.log("Invoca el servicio REST Get User Claim Values");
//
// 	//var url = 'http://10.0.200.22:8280/services/UserStoreGetUserClaimProxy';
// 	//var url = 'http://10.0.200.22:8280/sau/api/v1/user/claim/values';
// 	var url = 'https://10.0.200.22:8243/sau/api/v1/user/claim/values';
// 	//var url = 'http://186.46.187.202:3335/sau/api/v1/user/claim/values';
// 	//var url = 'http://192.168.1.17:8282/sau/api/v1/user/claim/values';
//
// 	console.log("URL getUserClaimValues: " + url);
//
// 	var payload = '{"getUserClaimValues": {"userName": "' + usuario + '","profileName":"default"}}';
//
// 	var config = {
// 		headers:  {
// 			'Accept': 'application/json',
// 			"Content-Type" : "application/json"
// 		}
// 	};
//
// 	$scope.mySplit = function(string, nb) {
// 	    var array = string.split(',');
// 	    return array[nb];
// 	}
//
// 	$http.post(url, payload, [config])
// 		.success( function (data, status, headers, config){
// 			$scope.greeting2 = data;
// 			$scope.nombre = $scope.greeting2.username.split('/')[1];
// 		//	$scope.model.datos.username1=$scope.greeting2.username;
// 			//setForm($scope.greeting2);
// 		})
// 		.error( function (data, status, headers, config){
// 			console.log("Error consumiendo el servicio Get User Claims");
// 		})
// }
//
// function sleep(milliseconds) {
// 	var start = new Date().getTime();
//
// 	for (var i = 0; i < 1e7; i++) {
// 		if ((new Date().getTime() - start) > milliseconds){
// 		  break;
// 		}
// 	}
// }

function setForm(obj) {

	var elem = Object.keys(obj).length;
	var keys = Object.keys(obj);
	var values = Object.values(obj);
	var container = document.getElementById("miformulario");
	var input = null;

	console.log("Cantidad de elementos: " + elem);

	for(i=0; i<elem; i++) {
		input = document.createElement("input");
		input.type = "hidden";
		input.name = keys[i];
		input.value = values[i];

		container.appendChild(input);
	}

	console.log("Funcion para setear el formulario");
	document.forms["miformulario"].submit();
}

})();
