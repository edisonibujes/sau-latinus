<!DOCTYPE html>
<html>
	<head>
		<title>Callback</title>	
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
		<script src="js/util.js"></script>
		<script src="js/call.services.js"></script>			
	</head>	
	<body>
		<h1>Callback</h1>
		<h3>App PHP</h3>
		<p>Inicio de sesion exitoso!</p>
		
		<div ng-app="demo" ng-controller="invokeServices" ng-init="getAcceesToken()">
			<p>HOLAAAAA</p>
			<p>{{greeting}}</p>
			<p>{{greeting2}}</p>			
		</div>
		
		<form id="miformulario" name="miformulario" action="data.php" method="POST">
		</form>				
	</body>
</html>