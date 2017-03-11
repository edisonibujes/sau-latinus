function getAcceesToken() {

	var fragment = window.location.hash.substring(1);
	
	 if (fragment.indexOf("&") > 0) {

		var arrParams = fragment.split("&");
		var i = 0;

		for (i=0;i<arrParams.length;i++) {

			var sParam =  arrParams[i].split("=");

			if (sParam[0] == "access_token") {
				return sParam[1];
			}
		}
	 }

	 return "";
}
