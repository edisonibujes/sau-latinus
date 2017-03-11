(function() {

  'use strict';
  var appL = angular.module('latinusAdmin', ['ngRoute',
  'ngAnimate',
  'formly',
  'formlyBootstrap',
  'ngSanitize',
  'app',
  'moduleDirective',
  'presencialApp',
  'loginApp'
]);


appL.constant('formlyExampleApiCheck', apiCheck());

appL.config (['$routeProvider', '$locationProvider','formlyConfigProvider','formlyExampleApiCheck',
function($routeProvider, $locationProvider, formlyConfigProvider, formlyExampleApiCheck){
  $routeProvider
  .when('/', {
    templateUrl : 'views/view-home.html',
    controller : 'mainController'
  })
  .when('/index.html', {
    templateUrl : 'views/view-home.html',
    controller : 'mainController'
  })
  .when('/login', {
    templateUrl : 'views/login.html',
    controller : 'loginController'
  })
  .when('/presencial', {
    templateUrl : 'views/view-pre-registro.html',
    controller : 'presencialUsuarioController',
    permission: ["admin-fedatario"]
  })
  .otherwise({
    redirectTo: '/'
  });


  ///Formly match templateOptions
  formlyConfigProvider.setType({
    name: 'matchField',
    apiCheck: function() {
      return {
        data: {
          fieldToMatch: formlyExampleApiCheck.string
        }
      }
    },
    apiCheckOptions: {
      prefix: 'matchField type'
    },
    defaultOptions: function matchFieldDefaultOptions(options) {
      return {
        extras: {
          validateOnModelChange: true
        },
        expressionProperties: {
          'templateOptions.disabled': function(viewValue, modelValue, scope) {
            var matchField = find(scope.fields, 'key', options.data.fieldToMatch);
            if (!matchField) {
              throw new Error('Could not find a field for the key ' + options.data.fieldToMatch);
            }
            var model = options.data.modelToMatch || scope.model;
            var originalValue = model[options.data.fieldToMatch];
            var invalidOriginal = matchField.formControl && matchField.formControl.$invalid;
            return !originalValue || invalidOriginal;
          }
        },
        validators: {
          fieldMatch: {
            expression: function(viewValue, modelValue, fieldScope) {
              var value = modelValue || viewValue;
              var model = options.data.modelToMatch || fieldScope.model;
              return value === model[options.data.fieldToMatch];
            },
            message: options.data.matchFieldMessage || '"Must match"'
          }
        }
      };

      function find(array, prop, value) {
        var foundItem;
        array.some(function(item) {
          if (item[prop] === value) {
            foundItem = item;
          }
          return !!foundItem;
        });
        return foundItem;
      }
    }
  });
  //FIN TEMPLATE
}]);

/*      appL.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.host = 'http://192.168.1.35';
//  $rootScope.host = 'https://10.0.200.22';
$rootScope.port = '8281';
//  $rootScope.port = '8243';
$rootScope.basePath = 'sau/api/v1/';
$rootScope.url = $rootScope.host + ':' + $rootScope.port+"/" + $rootScope.basePath;
$rootScope.domain = 'WSO2.ORG/';
}]);*/

appL.run(function($rootScope) {
  //$rootScope.host = 'http://192.168.1.17';
  $rootScope.host = 'http://186.46.187.202';
  //$rootScope.port = '8282';
  $rootScope.port = '3335';
  $rootScope.basePath = 'sau/api/v1/';
  $rootScope.url = $rootScope.host + ':' + $rootScope.port + '/' + $rootScope.basePath;
  //$rootScope.domain = 'WSO2.ORG/';
  $rootScope.domain = 'SAU/';
});


appL.controller('mainController', ['$scope','$route', '$rootScope', function($scope, $route, $rootScope){

}]);

appL.controller('invokeServices', function($scope, $http, $window, $location, $rootScope) {
  $scope.mostrarMenu=false;
  $scope.viewClass = 'view-instituciones';
  $scope.message = "Enrolamiento del SAU";
  $scope.mostrar = false;
  $scope.rolUsuario = {};
  if ($scope.nombre==""){
    $scope.mostrar = false;
  }

  $(".enrolamiento").on("click",
  function(){
    $scope.message = "Enrolamiento";
  }
);
$(".admin-gen").on("click",
function(){
  $scope.message = "Enrolamiento del SAU";
}
);
////Quitar luego de integrar todos los modulos///////////
document.getElementById('userName').value = "WSO2.ORG/josearivas";
$scope.fullname="Jose Alejandro Rivas";
$scope.nombre="josearivas";
$scope.rolUsuario.name ="SAU-SUPER-ADMIN";
$scope.institucionNombre="INSTITUCION 1";
////////////////////////////////////////////

// Delay para dar tiempo a que se almacene el token en el WSO2 IS
sleep(600);

console.log("Inicia el controlador final");
$scope.usuario=function(){
  $scope.mostrarMenu=true;
};


////DESCOMENTAR PARA INTEGRAR CON SERVICIOS DE LOGIN
// Recupero el tokenId
//	  var tokenId = getAcceesToken();

// Invoco el servicio Validar Token
//	validateToken($scope, $http, $window, tokenId, $location, $rootScope);
///////////////////////////////

console.log("Finaliza");
});

function validateToken($scope, $http, $window, tokenId, $location, $rootScope) {
  $scope.rolUsuario = {};
  console.log("Invoca el servicio REST Validate Token");
  document.getElementById('userName1').value="";
  //var url = 'http://10.0.200.22:8280/services/OAuth2TokenValidationProxy';
  //var url = 'http://10.0.200.22:8280/sau/api/v1/user/token/validate';
  //var url = 'https://10.0.200.22:8243/sau/api/v1/user/token/validate';
  //var url = 'http://186.46.187.202:3335/sau/api/v1/user/token/validate';
  //  var url = $rootScope.url + 'token/validate';
  var url = 'http://192.168.1.17:8282/sau/api/v1/user/token/validate';

  console.log("URL validateToken: " + url);

  var payload = '{"validateToken": { "identifier":"' + tokenId + '","tokenType":"bearer"}}';

  var config = {
    headers:  {
      "Content-Type" : "application/json",
      "Accept": "application/json"
    }
  };

  console.log("REQUEST: " + payload);
  console.log("TOKEN: " + tokenId);

  if (tokenId==""){
    $scope.userName1="";
    $scope.rolUsuario = {};
    $location.path('/login');
  }

  if (tokenId!=""){
    $http.post(url, payload, [config])
    .success( function (data, status, headers, config){
      console.log('Servicio consumido exitosamente');
      console.log("Response: " + angular.toJson(data));

      $scope.greeting = data;

      var valido = $scope.greeting.validateResponse.return.valid;

      console.log("El token esssssssssssssssss: " + valido);

      // Si el token es valido, recupero el usuario
      if(valido == 'true') {
        $scope.mostrarMenu=true;
        console.log("Token validado correctamente");
        var usuario = $scope.greeting.validateResponse.return.authorizedUser;
        document.getElementById('userName').value = usuario;
        var res = document.getElementById('userName').value.split("/");
        document.getElementById('userName1').value = res[1];
        getUserClaimValues($scope, $http, $window, usuario,$rootScope);
      }
      else if(valido == 'false'){
        $scope.mostrarMenu=false;
        console.log("El usuario intenta acceder con un token invalido");
        $scope.rolUsuario = {};
        $location.path('/login');
      }
    })
    .error( function (data, status, headers, config){
      console.log("Error consumiendo el servicio Validar Token");
    })
  }

}


function getUserClaimValues($scope, $http, $window, usuario,$rootScope) {

  console.log("Invoca el servicio REST Get User Claim Values");

  //var url = 'http://10.0.200.22:8280/services/UserStoreGetUserClaimProxy';
  //var url = 'http://10.0.200.22:8280/sau/api/v1/user/claim/values';
  //var url = 'https://10.0.200.22:8243/sau/api/v1/user/claim/values';
  //var url = 'http://186.46.187.202:3335/sau/api/v1/user/claim/values';
  var url = 'http://192.168.1.17:8282/sau/api/v1/user/claim/values';

  console.log("URL getUserClaimValues: " + url);

  var payload = '{"getUserClaimValues": {"userName": "' + usuario + '","profileName":"default"}}';

  var config = {
    headers:  {
      'Accept': 'application/json',
      "Content-Type" : "application/json"
    }
  };

  $scope.mySplit = function(string, nb) {
    var array = string.split(',');
    return array[nb];
  }

  $http.post(url, payload, [config])
  .success( function (data, status, headers, config){
    $scope.greeting2 = data;
    $scope.nombre = $scope.greeting2.username.split('/')[1];
    var rolesUsuarios=$scope.greeting2.role.split(',');
    //  $scope.rolUsuario.name = $scope.greeting2.role.split(',')[1];
    for(var i=0; i<rolesUsuarios.length; ++i){
      console.log(rolesUsuarios[i]);
      if (rolesUsuarios[i].includes("SAU-SUPER-ADMIN")){
        $scope.rolUsuario.name = "SAU-SUPER-ADMIN";
        $rootScope.$broadcast('rolChange', $scope.rolUsuario.name);
        break;
      }
    }


    $scope.fullname = $scope.greeting2.fullname;
    console.log($scope.greeting2);
    //	$scope.model.datos.username1=$scope.greeting2.username;
    //setForm($scope.greeting2);
  })
  .error( function (data, status, headers, config){
    console.log("Error consumiendo el servicio Get User Claims");
  })
}

function sleep(milliseconds) {
  var start = new Date().getTime();

  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
})();
