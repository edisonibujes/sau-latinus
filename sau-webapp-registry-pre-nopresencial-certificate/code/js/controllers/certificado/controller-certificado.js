/* global angular */
(function() {

  'use strict';

  var certificadoApp = angular.module('certificadoApp', ['formly', 'formlyBootstrap', 'ngSanitize']);
  certificadoApp.config (['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/certificado/usuario', {
      templateUrl : 'views/certificado/view-pre-registro-concertificado-usuario.html',
      controller : 'certificadoController'
    })
    .when('/certificado/juridica', {
      templateUrl : 'views/certificado/view-pre-registro-concertificado-juridica.html',
      controller : 'certificadoJuridicaController'
    })
    .otherwise({
      redirectTo: '/certificado'
    });
  }]);

  certificadoApp.run(function($rootScope) {
    //$rootScope.host = 'http://192.168.1.17';
    $rootScope.host = 'http://186.46.187.202';
    //$rootScope.port = '8282';
    $rootScope.port = '3335';
    $rootScope.basePath = 'sau/api/v1/user/';
    $rootScope.url = $rootScope.host + ':' + $rootScope.port + '/' + $rootScope.basePath;
    //$rootScope.domain = 'WSO2.ORG/';
    $rootScope.domain = 'SAU/';
  });

  certificadoApp.controller('certificadoController', ['$rootScope','$scope', '$http','$location','$timeout', function($rootScope, $scope, $http,$location,$timeout){
    $scope.message = 'Change pass controller!!';
    $scope.viewClass = 'view-certificado-usuario';

    $scope.fotografia = " ";
    $scope.firma = " ";

    var certificado = this;

    certificado.model ={

    };

    certificado.confirmationModel={

    };

    //campos del formulario
    certificado.modelFields=[
      {
        key: 'numeroDocumentoCiudadano',
        type: 'input',
        model: certificado.model,
        templateOptions: {
          type: 'text',
          label: 'Número de Documento:',
          disabled: true,
          placeholder: 'Ingrese un número de documento',
          addonLeft: {
            class: "glyphicon glyphicon-search"
          },
          // required: true
        }
      },
      {
        key: 'nombresCiudadano',
        type: 'input',
        model: certificado.model,
        templateOptions: {
          type: 'text',
          label: 'Nombres:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          }
        }
      },
      // {
      //   key: 'apellidosCiudadano',
      //   type: 'input',
      //   model: certificado.model,
      //   templateOptions: {
      //     type: 'text',
      //     label: 'Apellidos:',
      //     disabled: true,
      //     addonLeft: {
      //       class: "glyphicon glyphicon-user"
      //     }
      //   }
      // },
      {
        key: 'fechaNacimientoCiudadano',
        type: 'input',
        model: certificado.model,
        templateOptions: {
          type: 'text',
          label: 'Fecha de Nacimiento:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-calendar"
          }
        }
      },
      {
        key: 'emailCiudadano',
        type: 'input',
        model: certificado.model,
        templateOptions: {
          type: 'email',
          label: 'Correo Electrónico:',
          placeholder: 'Ingrese su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          matchField: {},
          maxlength: 150,
          required: true,
        }
      },
      {
        key: 'emailMatchCiudadano',
        optionsTypes: [
          "matchField"
        ],
        type: 'input',
        model: certificado.confirmationModel,
        templateOptions: {
          type: 'email',
          label: 'Confirmación de Correo Electrónico:',
          placeholder: 'Ingrese la confirmación de su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          maxlength: 150,
          required: true
        },
        data: {
          fieldToMatch: "emailCiudadano",
          modelToMatch: certificado.model,
          matchFieldMessage: "Los correos electrónicos no son iguales"
        }
      },
      {
        key: 'indiceCiudadano',
        type: 'input',
        model: certificado.model,
        templateOptions: {
          type: 'text',
          label: 'Indice Dactilar:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          }
        }
      },
      {
        key: 'fotografia',
        model: certificado.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      },
      {
        key: 'firma',
        model: certificado.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      }
    ];

    $scope.sendMessage = function(){
      console.log("Formulario es valido: "+$scope.certificado.modelForm.$valid);
      if($scope.certificado.modelForm.$valid){
        $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
        $scope.alerta = '<div ng-bind-html="alerta"> </div>';
        $scope.verificarNumDocumento();
      }
    };

    $scope.verificarNumDocumento=function(){

      var model = {
        "user": {
          "userName":$rootScope.domain+certificado.model.numeroDocumentoCiudadano
        }
      };

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"exist", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueNumDocumento ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("existe:"+data.isExistingUserResponse.return);
        if(data.isExistingUserResponse.return==="true"){
          console.log("true, ya existe");
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Ciudadano ya registrado.</div>';
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

    $scope.buscarNumeroDocumento=function(){

      var numeroDocumento = "0401195078";
      console.log("Function, numeroDocumento: "+numeroDocumento);
      var model = {"getFichaGeneral": {"codigoPaquete":"567","numeroIdentificacion": numeroDocumento}};

      console.log("buscarNumeroDocumento Ciudadano model: "+ angular.toJson(model));
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"file", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log('Ciudadano -----> Servicio getFichaGeneral ha sido consumido exitosamente');

        certificado.model.numeroDocumentoCiudadano= numeroDocumento;
        certificado.model.nombresCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[0].valor;
        //presencialUsuario.model.apellidosCiudadano= "";
        certificado.model.fechaNacimientoCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
        certificado.model.indiceCiudadano= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[2].valor;

        if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor!=undefined){
          $scope.fotografia = "data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
          certificado.model.fotografia = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
        }

        if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor!=undefined){
          $scope.firma="data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
          certificado.model.firma = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
        }

      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo el servicio de getFichaGeneral");
        console.log("data: "+angular.toJson(data));
        //console.log("data Exception: "+data.Exception);
        if(data.Exception==="04:CEDULA INVALIDA"){
          $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Cédula Inválida.</div>';
        }
      });
    };

    $scope.verificarEmail=function(){
      var email = certificado.model.emailCiudadano;
      console.log(email);
      var model = {"verifyUniqueClaim": { "claimUri":"http://wso2.org/claims/emailaddress","value": email }};
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"claim/verify", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueEmail ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("data unique:"+data.verifyUniqueClaimResponse.unique);
        if(data.verifyUniqueClaimResponse.unique===false){
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Correo electrónico ya registrado.</div>';
          console.log("false, no es unico");
        }else{
          console.log("true, es unico");
          console.log("Se procede a registrar usuario");
          $scope.enviarData();
        }
      })
      .error( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log("Error consumiendo de verificar email");
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>Operación fallida!</strong></br>Error en el servicio.</div>';
      });
      jQuery('#myModal').modal('hide');
    };

    $scope.enviarData=function(){
      var model = {
        "tipoUsuario": "567",
        "numeroDocumento": certificado.model.numeroDocumentoCiudadano,
        "nombres": certificado.model.nombresCiudadano,
        "fechaNacimiento": certificado.model.fechaNacimientoCiudadano,
        "email": certificado.model.emailCiudadano,
        "indiceDactilar": certificado.model.indiceCiudadano,
        "observacion": "",
        "ruc": "",
        "denominacion": "",
        "fotografia": certificado.model.fotografia,
        "firma": certificado.model.firma,
        "numeroDocumentoFedatario": "1718413055",
        "nombresFedatario": "JUAN ALBERTO PEREZ LOPEZ",
      };

      console.log("enviarData Ciudadano model: "+ angular.toJson(model));

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"register/new", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Ciudadano/enviarData -----> Servicio registro ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        //console.log("data id_registro: "+data.id_registro);
        $scope.alerta = '<div class="alert alert-success alert-dismissable"><strong>¡Operación exitosa!</strong></br>El usuario ha sido registrado satisfactoriamente.</div>';
        $timeout( function(){
          $location.path('/certificado');
        }, 4000 );
      })
      .error( function (data, status, headers, config){
        console.log("567 Error consumiendo el servicio de registro");
        console.log("data: "+angular.toJson(data));
        console.log("data Mensaje: "+data.Mensaje);
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };
  }]);

  certificadoApp.controller('certificadoJuridicaController', ['$rootScope','$scope', '$http','$location','$timeout', function($rootScope, $scope, $http,$location,$timeout){

    $scope.message = 'Change pass controller!!';
    $scope.viewClass = 'view-certificadoJuridica';

    $scope.fotografia = " ";
    $scope.firma = " ";

    var certificadoJuridica = this;

    certificadoJuridica.model ={

    };
    certificadoJuridica.confirmationModel={

    };

    //campos del formulario
    certificadoJuridica.modelFields=[

      {
        key: 'ruc',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'RUC:',
          placeholder: 'Ingrese un número de RUC',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-search"
          },
          //required: true
        }
      },

      {
        key: 'denominacion',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Denominación:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-briefcase"
          },
          //required: true
        }
      },
      {
        key: 'emailJuridica',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'email',
          label: 'Correo Electrónico:',
          placeholder: 'Ingrese su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          matchField: {},
          maxlength: 150,
          required: true
        }
      },
      {
        key: 'emailMatch',
        optionsTypes: [
          "matchField"
        ],
        model: certificadoJuridica.confirmationModel,
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Confirmación de Correo Electrónico:',
          placeholder: 'Ingrese la confirmación de su correo electrónico',
          addonLeft: {
            class: "glyphicon glyphicon-envelope"
          },
          maxlength: 150,
          required: true
        },
        data: {
          fieldToMatch: "emailJuridica",
          modelToMatch: certificadoJuridica.model,
          matchFieldMessage: "Las correos no son iguales"
        }
      },

      {
        key: 'estadoRuc',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Estado RUC:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-tag"
          },
          //required: true
        }
      },
      {
        key: 'numRepresentanteLegal',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Número de Cédula del Representante Legal:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          //required: true
        }
      },
      {
        key: 'nombresRepresentanteLegal',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Nombres de Representante Legal:',
          placeholder: '',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          },
          //required: true
        }
      },
      // {
      //   key: 'apellidosRepresentanteLegal',
      //   type: 'input',
      //   model: certificadoJuridica.model,
      //   templateOptions: {
      //     type: 'text',
      //     label: 'Apellidos de Representante Legal:',
      //     disabled: true,
      //     addonLeft: {
      //       class: "glyphicon glyphicon-user"
      //     }
      //   }
      // },
      {
        key: 'fechaNacimientoJuridica',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Fecha de Nacimiento:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-calendar"
          }
        }
      },
      {
        key: 'indiceJuridica',
        type: 'input',
        model: certificadoJuridica.model,
        templateOptions: {
          type: 'text',
          label: 'Indice Dactilar:',
          disabled: true,
          addonLeft: {
            class: "glyphicon glyphicon-user"
          }
        }
      },
      {
        key: 'fotografia',
        model: certificadoJuridica.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      },
      {
        key: 'firma',
        model: certificadoJuridica.model,
        type: "input",
        defaultValue: "",
        templateOptions: {
          type: "hidden"
        }
      }
    ];

    $scope.sendMessage = function(){
      console.log("Formulario es valido: "+$scope.certificadoJuridica.modelForm.$valid);
      if($scope.certificadoJuridica.modelForm.$valid){
        $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
        $scope.alerta = '<div ng-bind-html="alerta"> </div>';
        $scope.verificarRUC();
      }
    };

    $scope.verificarRUC=function(){
      var model = {
        "user": {
          "userName":$rootScope.domain+certificadoJuridica.model.ruc
        }
      };

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"exist", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueNumDocumento ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("existe:"+data.isExistingUserResponse.return);
        if(data.isExistingUserResponse.return==="true"){
          console.log("true, ya existe");
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Persona Jurídica ya registrada.</div>';
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

    $scope.buscarRUC=function(){

      var numeroDocumento = "0992106921001";
      console.log("Function, numeroDocumento: "+numeroDocumento);
      var model = {"getFichaGeneral": {"codigoPaquete":"568","numeroIdentificacion": numeroDocumento}};

      console.log("buscarNumeroDocumento Juridica model: "+ angular.toJson(model));
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"file", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log('Juridica -----> Servicio getFichaGeneral ha sido consumido exitosamente');

        certificadoJuridica.model.ruc=numeroDocumento;
        certificadoJuridica.model.denominacion= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[0].valor;
        certificadoJuridica.model.estadoRuc= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
        certificadoJuridica.model.numRepresentanteLegal=data.getFichaGeneralResponse.return.instituciones.detalle.items.registros[0].valor;
        certificadoJuridica.model.nombresRepresentanteLegal= data.getFichaGeneralResponse.return.instituciones.detalle.items.registros[1].valor;

        if(certificadoJuridica.model.estadoRuc==="ACTIVO"){
          $scope.alertaEstado = '<div ng-bind-html="alertaEstado"> </div>';
        }else{
          $scope.alertaEstado = '<div class="alert alert-warning alert-dismissable"><strong>¡Atención!</strong></br>Solo se puede preregistrar usuarios cuando el estado del RUC es ACTIVO.</div>';
        }
        //Busca los datos del Representante Legal
        if(certificadoJuridica.model.numRepresentanteLegal!=null && certificadoJuridica.model.estadoRuc==="ACTIVO"){
          $scope.buscarRepresentante(certificadoJuridica.model.numRepresentanteLegal);
        }

      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo el servicio de getFichaGeneral/RUC");
        console.log("data: "+angular.toJson(data));
        $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

    $scope.buscarRepresentante=function(numeroDocumento){
      console.log("Function, numeroDocumento: "+numeroDocumento);
      var model = {"getFichaGeneral": {"codigoPaquete":"567","numeroIdentificacion": numeroDocumento}};

      console.log("buscarNumeroDocumento Ciudadano model: "+ angular.toJson(model));
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"file", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log('Juridica -----> Servicio getFichaGeneral ha sido consumido exitosamente');
        certificadoJuridica.model.fechaNacimientoJuridica= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[1].valor;
        certificadoJuridica.model.indiceJuridica= data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[2].valor;

        if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor!=undefined){
          $scope.fotografia = "data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
          certificadoJuridica.model.fotografia = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[3].valor;
        }

        if(data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor!=undefined){
          $scope.firma="data:image/png;base64,"+data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
          certificadoJuridica.model.firma = data.getFichaGeneralResponse.return.instituciones.datosPrincipales.registros[4].valor;
        }

      })
      .error( function (data, status, headers, config){
        console.log("Error consumiendo el servicio de getFichaGeneral/Representante");
        console.log("data: "+angular.toJson(data));
        $scope.alertaEstado = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });
    };

    $scope.verificarEmail=function(){
      var email = certificadoJuridica.model.emailJuridica;
      console.log(email);
      var model = {"verifyUniqueClaim": { "claimUri":"http://wso2.org/claims/emailaddress","value": email }};
      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"claim/verify", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Servicio verifyUniqueEmail ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        console.log("data unique:"+data.verifyUniqueClaimResponse.unique);
        if(data.verifyUniqueClaimResponse.unique===false){
          $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Atención!</strong></br>Correo electrónico ya registrado.</div>';
          console.log("false, no es unico");
        }else{
          console.log("true, es unico");
          console.log("Se procede a registrar usuario");
          $scope.enviarData();
        }
      })
      .error( function (data, status, headers, config){
        console.log("data: "+angular.toJson(data));
        console.log("Error consumiendo de verificar email");
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>Operación fallida!</strong></br>Error en el servicio.</div>';
      });
      jQuery('#myModal').modal('hide');
    };

    $scope.enviarData=function(){
      var model = {
        "tipoUsuario": "568",
        "numeroDocumento": certificadoJuridica.model.numRepresentanteLegal,
        "nombres": certificadoJuridica.model.nombresRepresentanteLegal,
        "fechaNacimiento": certificadoJuridica.model.fechaNacimientoJuridica,
        "email": certificadoJuridica.model.emailJuridica,
        "indiceDactilar": certificadoJuridica.model.indiceJuridica,
        "observacion": "",
        "ruc": certificadoJuridica.model.ruc,
        "denominacion": certificadoJuridica.model.denominacion,
        "fotografia": certificadoJuridica.model.fotografia,
        "firma": certificadoJuridica.model.firma,
        "numeroDocumentoFedatario": "1718413055",
        "nombresFedatario": "JUAN ALBERTO PEREZ LOPEZ"
      };

      console.log("enviarData Juridica model: "+ angular.toJson(model));

      var config = {
        headers : {
          'Content-Type': 'application/json'
        }
      };

      $http.post($rootScope.url +"register/new", angular.toJson(model), config)
      .success( function (data, status, headers, config){
        console.log('Juridica/enviarData -----> Servicio registro ha sido consumido exitosamente');
        console.log("data: "+angular.toJson(data));
        //console.log("data id_registro: "+data.id_registro);
        $scope.alerta = '<div class="alert alert-success alert-dismissable"><strong>¡Operación exitosa!</strong></br>El usuario ha sido registrado satisfactoriamente.</div>';
        $timeout( function(){
          $location.path('/certificado');
        }, 4000 );
      })
      .error( function (data, status, headers, config){
        console.log("568 Error consumiendo el servicio de registro");
        console.log("data: "+angular.toJson(data));
        console.log("data Mensaje: "+data.Mensaje);
        $scope.alerta = '<div class="alert alert-danger alert-dismissable"><strong>¡Operación fallida!</strong></br>Error en el servicio.</div>';
      });

    };

  }]);

})();
