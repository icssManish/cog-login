function isMobileDevice() 
{
	var mobileDevice = false;
	
	if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.match(/android/i)) 
	{
		mobileDevice = true;		
	}
	
	return mobileDevice;
}

var sessionCheckerID_ = -1;

function setMobileSessionCheckingTimer()
{
	if (sessionCheckerID_ != -1) window.clearTimeout(sessionCheckerID_);
	sessionCheckerID_ = setTimeout('checkMobileSessionExpireTime()',5000);
}

var isMobileSessionWarningVisable = false;
var sessionLastRefreshTime = -1;

function checkMobileSessionExpireTime()
{
	var now = new Date().getTime();
	
	if(sessionLastRefreshTime + taleo.core.beacon.sessionTimeoutInterval < now)
	{
		taleo.core.beacon.manageSessionTimeout();
		return;
	}
	
	if (!isMobileSessionWarningVisable && sessionLastRefreshTime + taleo.core.beacon.sessionWarningInterval < now)
	{
		isMobileSessionWarningVisable = true;
		taleo.core.beacon.manageSessionWarning();
	}
	
	setMobileSessionCheckingTimer();
}

function initMobileSessionBeacon()
{
	var a = false;

	try {
		a = window.frameElement;
	} catch (e) {
		a = false;
	}
	
	if (!a) 
	{
		isMobileSessionWarningVisable = false;
		sessionLastRefreshTime = new Date().getTime();
		setMobileSessionCheckingTimer();
	}
}

function isLoggedIn() 
{
	var isLogged = findElementsEndingWithId(document, "Logged", null, true)[0];
	return isLogged.value == "true";
}

function installMobileSessionBeacon()
{		
	if(taleo.core.beacon.sessionTimeoutInterval != null && isLoggedIn())
	{
		initMobileSessionBeacon();
	}
}

if(isMobileDevice())
{	
	installMobileSessionBeacon();
	
	taleo.core.beacon.resetSessionBeacon = function()
	{
		initMobileSessionBeacon();
	}
}
