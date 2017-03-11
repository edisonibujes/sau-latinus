angular.module( 'moduleDirective', [] )

.directive('permission', function(){
  return {
    restrict: 'A',
    scope:{
      permission: '='
    },
    link: function ($scope, elem, attrs){

        $scope.$on('rolChange', function(event, rolValue) {
          // console.log("Hello rolUsuario cambio a "+rolValue);
          // console.log("Hello rolUsuario cambio a "+$scope.permission);
          if (rolValue=='SAU-SUPER-ADMIN' && ($scope.permission.indexOf('administration')!==-1)){
            elem.show();
          }else{
            elem.show();
          }
        });
        if (document.getElementById('rolUser').value=='SAU-SUPER-ADMIN' && ($scope.permission.indexOf('administration')!==-1)){
          elem.show();
        }else{
          elem.show();
        }
    }
  }
});
