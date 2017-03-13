(function() {
  var app = angular.module('latinusAdmin', ['ngRoute',
  'ngAnimate',
  'formly',
  'formlyBootstrap',
  'ngSanitize',
  'certificadoApp'
]);

app.constant('formlyExampleApiCheck', apiCheck());
app.config (['$routeProvider', '$locationProvider','formlyConfigProvider','formlyExampleApiCheck',
function($routeProvider, $locationProvider, formlyConfigProvider, formlyExampleApiCheck){
  $routeProvider
  .when('/', {
    templateUrl : 'views/view-home.html',
    controller : 'mainController'
  })
  .when('/certificado', {
    templateUrl : 'views/view-pre-registro-certificado.html',
    controller : 'certificadoController'
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

app.run(function(){

});

app.controller('mainController', function($scope){
  //$scope.viewClass = 'view-instituciones';
  $scope.message = "Enrolamiento";
  $(".enrolamiento").on("click",
  function(){
    $scope.message = "Enrolamiento";
  }
);
$(".admin-gen").on("click",
function(){
  $scope.message = "Enrolamiento General del SAU";
}
);
});

})();
