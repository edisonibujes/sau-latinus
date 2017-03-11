/* global angular */
(function() {

  'use strict';

  var presencialApp = angular.module('presencialApp', ['formly', 'formlyBootstrap', 'ngSanitize']);

  // presencialApp.run(function($rootScope) {
  //   //$rootScope.host = 'http://192.168.1.17';
  //   $rootScope.host = 'http://186.46.187.202';
  //   //$rootScope.port = '8282';
  //   $rootScope.port = '3335';
  //   $rootScope.basePath = 'sau/api/v1/user/';
  //   $rootScope.url = $rootScope.host + ':' + $rootScope.port + '/' + $rootScope.basePath;
  //   //$rootScope.domain = 'WSO2.ORG/';
  //   $rootScope.domain = 'SAU/';
  // });

  presencialApp.config (['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/presencial/usuario', {
      templateUrl : 'views/presencial/view-pre-registro-presencial-usuario.html',
      controller : 'presencialUsuarioController'
    })
    // .when('/presencial/juridica', {
    //   templateUrl : 'views/presencial/view-pre-registro-presencial-juridica.html',
    //   controller : 'presencialJuridicaController'
    // })
    .otherwise({
      redirectTo: '/presencial'
    });
  }]);

  presencialApp.controller('presencialUsuarioController', ['$rootScope','$scope', '$http','$location','$timeout', function($rootScope, $scope, $http,$location,$timeout){
    $scope.message = 'Change pass controller!!';
    $scope.viewClass = 'view-inscribirInstitucion';

    $scope.validacion = "presencialUsuario.modelForm.$invalid || (preregistroUsuario=='no' && !observaciones)";

    $scope.fotografia = " ";
    $scope.firma = " ";
    $scope.observaciones = "";

    var presencialUsuario = this;

    //Fedatario:
    var fedaratarioUser = document.getElementById('userName').value.split('/')[1];
    console.log("fedaratarioUser: "+fedaratarioUser);
    var fedaratarioNombre = document.getElementById('nombreFull').value;
    console.log("fedaratarioNombre: "+fedaratarioNombre);

    presencialUsuario.model ={
      tipoUsuario: "567",
      numeroDocumentoCiudadano: "",
      nombresCiudadano: "",
      fechaNacimientoCiudadano: "",
      emailCiudadano: "",
      indiceCiudadano: "",
      observacion: "",
      ruc: "",
      denominacion: "",
      emailJuridica: "",
      estadoRuc: "",
      numRepresentanteLegal: "",
      nombresRepresentanteLegal: "",
      fechaNacimientoJuridica: "",
      indiceJuridica: ""
    };

    presencialUsuario.confirmationModel={

    };

    //campos del formulario
    presencialUsuario.modelFields=[
      //Ciudadano-567
      {
        key: 'tipoUsuario',
        type: 'radio',
        templateOptions: {
          inline: true,
          label: 'Tipo de Usuario:',
          options: [
            {
              value: '567',
              name: 'Ciudadano',
            },
            {
              value: '568',
              name: 'Persona Jurídica'
            }
          ],
          onClick: function(model, options, _this, event) {
            console.log("tipoUsuario: "+presencialUsuario.model.tipoUsuario);
            //Ciudadano-567
            presencialUsuario.model.numeroDocumentoCiudadano="";
            presencialUsuario.model.nombresCiudadano= "";
            //presencialUsuario.model.apellidosCiudadano= "";
            presencialUsuario.model.fechaNacimientoCiudadano= "";
            presencialUsuario.model.indiceCiudadano= "";
            presencialUsuario.model.emailCiudadano= "";
            //Juridica
            presencialUsuario.model.ruc= "";
            presencialUsuario.model.denominacion= "";
            presencialUsuario.model.estadoRuc= "";
            presencialUsuario.model.numRepresentanteLegal= "";
            presencialUsuario.model.nombresRepresentanteLegal= "";
            //presencialUsuario.model.apellidosRepresentanteLegal= "";
            presencialUsuario.model.fechaNacimientoJuridica= "";
            presencialUsuario.model.indiceJuridica= "";
            presencialUsuario.model.emailJuridica= "";
            //Ambos
            $scope.fotografia= " ";
            $scope.firma= " ";
            $scope.preregistroUsuario="si";
            $scope.observaciones = " ";
            //Alerts
            $scope.alerta = '<div ng-bind-html="alerta"> </div>';
            $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
          }
        }
      },
      {
        key: 'numeroDocumentoCiudadano',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Número de Documento:',
          pattern: '^$|^[0-9]+',
          placeholder: 'Ingrese un número de documento',
          onKeydown: function(model, options, _this, event) {
            var numeroDocumento = presencialUsuario.model.numeroDocumentoCiudadano;
            console.log("Busqueda numeroDocumento: "+numeroDocumento);
            if (event.which === 9 && numeroDocumento!=null){
              console.log("Busqueda numeroDocumento: "+numeroDocumento);
              $scope.buscarNumeroDocumento(numeroDocumento);
            }else{
              presencialUsuario.model.nombresCiudadano= "";
              //presencialUsuario.model.apellidosCiudadano= "";
              presencialUsuario.model.fechaNacimientoCiudadano= "";
              presencialUsuario.model.indiceCiudadano= "";
              $scope.fotografia= " ";
              $scope.firma= " ";
            }
          },
          addonLeft: {
            class: "glyphicon glyphicon-search"
          },
          // addonRight: {
          //   class: "btn btn-secondary",
          //   type: "input"
          // },
          maxlength: 10,
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          //console.log("tipoUsuario hideExpression: "+presencialUsuario.model.tipoUsuario);
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      {
        key: 'nombresCiudadano',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Nombres:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      // {
      //   key: 'apellidosCiudadano',
      //   type: 'input',
      //   model: presencialUsuario.model,
      //   templateOptions: {
      //     type: 'text',
      //     label: 'Apellidos:',
      //     disabled: true,
      //     addonLeft: {
      //       class: "glyphicon glyphicon-user"
      //     },
      //     required:presencialUsuario.model.tipoUsuario != '568'
      //   },
      //   hideExpression: function($viewValue, $modelValue, scope) {
      //     return presencialUsuario.model.tipoUsuario === '568';
      //   }
      // },
      {
        key: 'fechaNacimientoCiudadano',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Fecha de Nacimiento:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-calendar"
          },
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      {
        key: 'emailCiudadano',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'email',
          label: 'Correo Electrónico:',
          placeholder: 'Ingrese su correo electrónico:',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          matchField: {},
          maxlength: 150,
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      {
        key: 'emailMatchCiudadano',
        optionsTypes: [
          "matchField"
        ],
        type: 'input',
        model: presencialUsuario.confirmationModel,
        templateOptions: {
          type: 'email',
          label: 'Confirmación de Correo Electrónico:',
          placeholder: 'Ingrese la confirmación de su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          maxlength: 150,
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        data: {
          fieldToMatch: "emailCiudadano",
          modelToMatch: presencialUsuario.model,
          matchFieldMessage: "Los correos electrónicos no son iguales"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      {
        key: 'indiceCiudadano',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Indice Dactilar:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          required:presencialUsuario.model.tipoUsuario != '568'
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '568';
        }
      },
      {
        key: 'observacion',
        model: presencialUsuario.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      },
      {
        key: 'fotografia',
        model: presencialUsuario.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      },
      {
        key: 'firma',
        model: presencialUsuario.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      },
      //Juridica ---------------------------------------------------------------------
      {
        key: 'ruc',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'RUC:',
          pattern: '^$|^[0-9]+',
          placeholder: 'Ingrese un número de RUC',
          onKeydown: function(model, options, _this, event) {
            var ruc = presencialUsuario.model.ruc;
            console.log("Busqueda ruc: "+ruc);
            if (event.which === 9 && ruc!=null){
              console.log("Busqueda ruc: "+ruc);
              $scope.buscarRUC(ruc);
            }else{
              presencialUsuario.model.denominacion= "";
              presencialUsuario.model.estadoRuc= "";
              presencialUsuario.model.numRepresentanteLegal= "";
              presencialUsuario.model.nombresRepresentanteLegal= "";
              //presencialUsuario.model.apellidosRepresentanteLegal= "";
              presencialUsuario.model.fechaNacimientoJuridica= "";
              presencialUsuario.model.indiceJuridica= "";
              $scope.fotografia= " ";
              $scope.firma= " ";
            }
          },
          //disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-search"
          },
          maxlength: 150,
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          // console.log("tipoUsuario hideExpression: "+presencialUsuario.model.tipoUsuario);
          // console.log("tipoUsuario hideExpression condicional: "+presencialUsuario.model.tipoUsuario ==="568");
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'denominacion',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Denominación:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-briefcase"
          },
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'emailJuridica',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'email',
          label: 'Correo Electrónico:',
          placeholder: 'Ingrese su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          matchField: {},
          maxlength: 150,
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'emailMatchJuridica',
        optionsTypes: [
          "matchField"
        ],
        model: presencialUsuario.confirmationModel,
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Confirmación de Correo Electrónico:',
          placeholder: 'Ingrese la confirmación de su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          maxlength: 150,
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        data: {
          fieldToMatch: "emailJuridica",
          modelToMatch: presencialUsuario.model,
          matchFieldMessage: "Las correos no son iguales"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },

      {
        key: 'estadoRuc',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Estado RUC:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-tag"
          },
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'numRepresentanteLegal',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Número de Cédula del Representante Legal:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'nombresRepresentanteLegal',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Nombres de Representante Legal:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          //required: true
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      // {
      //   key: 'apellidosRepresentanteLegal',
      //   type: 'input',
      //   model: presencialUsuario.model,
      //   templateOptions: {
      //     type: 'text',
      //     label: 'Apellidos de Representante Legal:',
      //     disabled: true,
      //     addonLeft: {
      //       class: "glyphicon glyphicon-user"
      //     },
      //     required: presencialUsuario.model.tipoUsuario === "567"
      //   },
      //   hideExpression: function($viewValue, $modelValue, scope) {
      //     return presencialUsuario.model.tipoUsuario === '567';
      //   }
      // },
      {
        key: 'fechaNacimientoJuridica',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Fecha de Nacimiento:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-calendar"
          },
          required: presencialUsuario.model.tipoUsuario === "567",
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      },
      {
        key: 'indiceJuridica',
        type: 'input',
        defaultValue: '',
        model: presencialUsuario.model,
        templateOptions: {
          type: 'text',
          label: 'Indice Dactilar:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          required: presencialUsuario.model.tipoUsuario === "567"
        },
        hideExpression: function($viewValue, $modelValue, scope) {
          return presencialUsuario.model.tipoUsuario === '567';
        }
      }
    ];

    $scope.sendMessage = function(){
      jQuery('#myModal').modal('hide');
      console.log("Formulario es valido: "+$scope.presencialUsuario.modelForm.$valid);
      $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
      $scope.alerta = '<div ng-bind-html="alerta"> </div>';
      if($scope.presencialUsuario.modelForm.$valid){
        $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
        $scope.alerta = '<div ng-bind-html="alerta"> </div>';
        console.log("preregistroUsuario: "+$scope.preregistroUsuario);
        presencialUsuario.model.observacion=$scope.observaciones;
        if($scope.preregistroUsuario=="no"){
          console.log("observaciones: "+presencialUsuario.model.observacion);
          console.log("Se procede a registrar registrarSolicitud");
          $scope.registrarSolicitud();
        }else{
          console.log("Se procede a registrar verificarNumDocumento");
          $scope.verificarNumDocumento();
        }
      }
    };
    $scope.verificarNumDocumento=function(){
      var numeroDocumento = "";
      if(presencialUsuario.model.tipoUsuario==="567"){
        numeroDocumento = presencialUsuario.model.numeroDocumentoCiudadano;
      }else{
        numeroDocumento = presencialUsuario.model.ruc;
      }

      var model = {
        "user": {
          "userName":$rootScope.domain+numeroDocumento
        }
      };
      console.log("model: "+angular.toJson(model));

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"user/exist", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueNumDocumento ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("existe:"+data.isExistingUserResponse.return);
        if(data.isExistingUserResponse.return==="true"){
          console.log("true, ya existe");
          if(presencialUsuario.model.tipoUsuario==="567"){
            $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Ciudadano ya registrado.</div>';
          }else{
            $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Persona Jurídica ya registrada.</div>';
          }
        }else{
          console.log("false, no existe")
          console.log("Se procede a verificarEmail usuario");
          $scope.verificarEmail();
        }
      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo isExistingUser");
        console.log("data: "+angular.toJson(data));
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>Operación fallida!</strong></br>Error en el servicio.</div>';
      });
      jQuery('#myModal').modal('hide');
    };

    $scope.verificarEmail=function(){
      var email = "";
      if(presencialUsuario.model.tipoUsuario==="567"){
        email = presencialUsuario.model.emailCiudadano;
      }else{
        email = presencialUsuario.model.emailJuridica;
      }
      console.log(email);
      var model = {"verifyUniqueClaim": { "claimUri":"http://wso2.org/claims/emailaddress","value": email }};
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };
      $http.post($rootScope.url +"user/claim/verify", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueEmail ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("data unique:"+data.verifyUniqueClaimResponse.unique);
        if(data.verifyUniqueClaimResponse.unique===false){
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Correo electrónico ya registrado.</div>';
          console.log("false, no es unico");
        }else{
          console.log("true, es unico");
          console.log("Se procede a preregistrar usuario");
          $scope.enviarData();
        }
      })
      .error( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log("Error consumiendo verifyUniqueEmail");
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

    $scope.enviarData=function(){
      //var model = presencialUsuario.model;
      var model = " ";
      //console.log("Desde submit model: "+ angular.toJson(model));
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      if(presencialUsuario.model.tipoUsuario==="567"){
        model = {
          "tipoUsuario": "567",
          "numeroDocumento": presencialUsuario.model.numeroDocumentoCiudadano,
          "nombres": presencialUsuario.model.nombresCiudadano,
          "fechaNacimiento": presencialUsuario.model.fechaNacimientoCiudadano,
          "email": presencialUsuario.model.emailCiudadano,
          "indiceDactilar": presencialUsuario.model.indiceCiudadano,
          "observacion": presencialUsuario.model.observacion,
          "ruc": "",
          "denominacion": "",
          "fotografia": presencialUsuario.model.fotografia,
          "firma": presencialUsuario.model.firma,
          "numeroDocumentoFedatario": fedaratarioUser,
          "nombresFedatario": fedaratarioNombre,
        };
        console.log("enviarData Ciudadano model: "+ angular.toJson(model));
        $http.post($rootScope.url +"user/register/new", angular.toJson(model), config)
        .success( function (data, status, headers, config){
          console.log('Ciudadano/enviarData -----> Servicio registro ha sido consumido exitosamente');
          console.log("data: "+angular.toJson(data));
          $scope.alerta = '<div class="alert alert-success alert-dismissable"><strong>¡Operación exitosa!</strong></br>El usuario ha sido registrado satisfactoriamente.</div>';
          $timeout( function(){
            $location.path('/presencial');
          }, 4000 );

        })
        .error( function (data, status, headers, config){
          console.log("567 Error consumiendo el servicio de registro");
          console.log("data: "+angular.toJson(data));
          console.log("data Mensaje: "+data.Mensaje);
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
        });
      }else{
        model = {
          "tipoUsuario": "568",
          "numeroDocumento": presencialUsuario.model.numRepresentanteLegal,
          "nombres": presencialUsuario.model.nombresRepresentanteLegal,
          "fechaNacimiento": presencialUsuario.model.fechaNacimientoJuridica,
          "email": presencialUsuario.model.emailJuridica,
          "indiceDactilar": presencialUsuario.model.indiceJuridica,
          "observacion": presencialUsuario.model.observacion,
          "ruc": presencialUsuario.model.ruc,
          "denominacion": presencialUsuario.model.denominacion,
          "fotografia": presencialUsuario.model.fotografia,
          "firma": presencialUsuario.model.firma,
          "numeroDocumentoFedatario": fedaratarioUser,
          "nombresFedatario": fedaratarioNombre
        };
        console.log("enviarData Juridica model: "+ angular.toJson(model));
        $http.post($rootScope.url +"user/register/new", angular.toJson(model), config)
        .success( function (data, status, headers, config){
          console.log('Juridica/enviarData -----> Servicio registro ha sido consumido exitosamente');
          console.log("data: "+angular.toJson(data));
          //console.log("data id_registro: "+data.id_registro);
          $scope.alerta = '<div class="alert alert-success alert-dismissable"><strong>¡Operación exitosa!</strong></br>El usuario ha sido registrado satisfactoriamente.</div>';
          $timeout( function(){
            $location.path('/presencial');
          }, 4000 );
        })
        .error( function (data, status, headers, config){
          console.log("568 Error consumiendo el servicio de registro");
          console.log("data: "+angular.toJson(data));
          console.log("data Mensaje: "+data.Mensaje);
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
        });
      }
    };

    $scope.registrarSolicitud=function(){
      var   model = "";
      if(presencialUsuario.model.tipoUsuario==="567"){
        model = {
          "tipoUsuario": "567",
          "id": presencialUsuario.model.numeroDocumentoCiudadano,
          "observacion": presencialUsuario.model.observacion,
          "numeroDocumentoFedatario": fedaratarioUser,
          "rolFedatario": "admin"
        };
        console.log("registrarSolicitud Juridica model: "+ angular.toJson(model));
      }else{
        model = {
          "tipoUsuario": "568",
          "id": presencialUsuario.model.ruc,
          "observacion": presencialUsuario.model.observacion,
          "numeroDocumentoFedatario": fedaratarioUser,
          "rolFedatario": "admin"
        };
        console.log("registrarSolicitud Juridica model: "+ angular.toJson(model));
      }

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };
      $http.post($rootScope.url +"user/preregister/not", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio registrarSolicitud ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        $scope.alerta = '<div class="alert alert-success alert-dismissable"><strong>¡Operación exitosa!</strong></br>Solicitud registrada satisfactoriamente.</div>';
        $timeout( function(){
          $location.path('/presencial');
        }, 4000 );
      })
      .error( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log("Error consumiendo registrarSolicitud");
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

    $scope.buscarNumeroDocumento=function(numeroDocumento){
      console.log("Function, numeroDocumento: "+numeroDocumento);
      var model = {"getFichaGeneral": {"codigoPaquete":"567","numeroIdentificacion": numeroDocumento}};

      console.log("buscarNumeroDocumento Ciudadano model: "+ angular.toJson(model));
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"user/file", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));

        if(presencialUsuario.model.tipoUsuario==="567"){
          console.log('Ciudadano -----> Servicio getFichaGeneral ha sido consumido exitosamente');
          presencialUsuario.model.nombresCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[0].valor;
          //presencialUsuario.model.apellidosCiudadano= "";
          presencialUsuario.model.fechaNacimientoCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
          presencialUsuario.model.indiceCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[2].valor;

          if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor!=undefined){
            $scope.fotografia = "data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
            presencialUsuario.model.fotografia = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
          }

          if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor!=undefined){
            $scope.firma="data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
            presencialUsuario.model.firma = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
          }
        }else{
          //Solo asigna los datos de Persona Juridica
          console.log('Juridica -----> Servicio getFichaGeneral ha sido consumido exitosamente');
          presencialUsuario.model.fechaNacimientoJuridica= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
          presencialUsuario.model.indiceJuridica= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[2].valor;

          if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor!=undefined){
            $scope.fotografia = "data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
            presencialUsuario.model.fotografia = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
          }

          if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor!=undefined){
            $scope.firma="data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
            presencialUsuario.model.firma = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
          }
        }
      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo el servicio de getFichaGeneral/Ciudadano");
        console.log("data: "+angular.toJson(data));
        //console.log("data Exception: "+data.Exception);
        // if(data.Exception==="04:CEDULA INVALIDA" && presencialUsuario.model.tipoUsuario==="567"){
        //   $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Cédula Inválida.</div>';
        // }else{
        //   console.log("aqui");
        //   $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
        // }
        $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

    $scope.buscarRUC=function(numeroDocumento){
      console.log("Function, numeroDocumento: "+numeroDocumento);
      var model = {"getFichaGeneral": {"codigoPaquete":"568","numeroIdentificacion": numeroDocumento}};
      console.log("buscarRUC Juridica model: "+ angular.toJson(model));

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"user/file", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log('Juridica -----> Servicio registro ha sido consumido exitosamente');
        presencialUsuario.model.denominacion= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[0].valor;
        presencialUsuario.model.estadoRuc= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
        presencialUsuario.model.numRepresentanteLegal=data.getFichaGeneralResponse.return.instituciones.detalle.items.registros[0].valor;
        presencialUsuario.model.nombresRepresentanteLegal= data.getFichaGeneralResponse.return.instituciones.detalle.items.registros[1].valor;
        //presencialUsuario.model.apellidosRepresentanteLegal= "";

        if(presencialUsuario.model.estadoRuc==="ACTIVO"){
          $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
        }else{
          $scope.alertaEstado = '<div class="alert alert-warning alert-dismissable"><strong>¡Atención!</strong></br>Solo se puede preregistrar usuarios cuando el estado del RUC es ACTIVO.</div>';
        }
        //Busca los datos del Representante Legal
        if(presencialUsuario.model.numRepresentanteLegal!=null && presencialUsuario.model.estadoRuc==="ACTIVO"){
          $scope.buscarNumeroDocumento(presencialUsuario.model.numRepresentanteLegal);
        }
      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo el servicio de getFichaGeneral/RUC");
        console.log("data: "+angular.toJson(data));
        $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

  }]);
})();
