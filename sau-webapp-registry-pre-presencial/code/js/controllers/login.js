(function() {

  'use strict';

var loginApp = angular.module('loginApp', ['formly', 'formlyBootstrap','ngSanitize', 'ngRoute']);
//'$location',
loginApp.controller('loginController', [ '$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
  $scope.message = 'Login controller!!';
  $scope.viewClass = 'view-login';
  $scope.showBar = false;
  var login = this;

  //modelo de objeto que se referencia en el formulario
  login.model ={

  };

  login.modelFields=[
      // {
      //   key: 'userName',
      //   type: 'input',
      //   model: login.model,
      //   templateOptions: {
      //     type: 'text',
      //     label: 'Nombre usuario',
      //     placeholder: 'Ingrese su nombre de usuario',
      //     addonLeft: {
      //         class: "glyphicon glyphicon-user"
      //      },
      //     minlength: 5,
      //     required: true
      //   }
      // },
      // {
      //   key: 'password',
      //   type: 'input',
      //   model: login.model,
      //   templateOptions: {
      //     type: 'password',
      //     label: 'Contraseña de usuario',
      //     placeholder: 'Ingrese su contraseña',
      //     addonLeft: {
      //         class: "glyphicon glyphicon-lock"
      //      },
      //     minlength: 5,
      //     required: true
      //   }
      // }
    ];

    jQuery('#title-bar').hide();
    jQuery('#cerrar-sesion').hide();
    document.getElementById('userName1').value="";
    $scope.redirectToPrincipal = function(){
      window.location= "http://192.168.1.17:9764/oauth2/authorize?scope=default&response_type=token&redirect_uri=http://192.168.1.29:58627/index.html&client_id=OwsJM_hvO1I1RJ5x_cluMvBf77Aa";
      //window.location.href= "/";
    };
}]);

})();
