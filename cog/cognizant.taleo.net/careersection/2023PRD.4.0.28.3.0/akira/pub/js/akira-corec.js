var taleo={};
taleo.core={contextPath_:null,tocPage_:null,buildVersion_:null,useVerStatFiles_:null,leavingDomain_:true,currentCmd:null};
taleo.core.jsfForm=function(){if(window.document.forms.length==1){return window.document.forms[0]
}for(var a=0;
a<window.document.forms.length;
a++){if(window.document.forms[a]["bookmarkURLHF"]!=undefined){return window.document.forms[a]
}}return null
};
taleo.core.common={};
taleo.core.common.isValueInArray=function(b,d){var a=false;
if(d&&d instanceof Array){for(var c=0;
c<d.length;
c++){if(b==d[c]){return true
}}}else{throw"isElementInArray: pArray with value '"+d+"' is not a valid array object."
}return a
};
taleo.core.endsWith=function(c,a){var b=c.lastIndexOf(a);
return b!=-1&&b+a.length==c.length
};
taleo.core.trim=function(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
};
taleo.core.getEventElement=function(a){a=(a)?a:window.event;
return(a.target)?a.target:a.srcElement
};
taleo.core.forceSubmit=function(){taleo.core.stdSubmit(taleo.core.jsfForm())
};
taleo.core.forceCommandSubmit=function(a){taleo.core.subCmdSubmit(taleo.core.jsfForm().id,a,null)
};
taleo.core.setWaitCursorForSubmit=function(b){var a=document.getElementById(b);
window.document.body.style.cursor="wait";
if(a){elementWithWaitCursor=a;
elementWithWaitCursor.style.cursor="wait"
}};
taleo.core.cmdSubmit=function(pFormId,pCmdClientId,pUserOnclick,pExtraParams,pHaveActionToExecute){var cmdDisabled=false;
var cmd=document.getElementById(pCmdClientId);
if(!cmd||typeof(cmd.disabled)=="undefined"||!cmd.disabled){var form=document.forms[pFormId];
taleo.core.currentCmd=form.jsfCmdId.value;
if(taleo.core.currentCmd==null||taleo.core.currentCmd.length==0){doSubmit=true;
form.jsfCmdId.value=pCmdClientId;
if(pUserOnclick){doSubmit=eval(pUserOnclick)
}var doSubmitType=typeof(doSubmit);
if(doSubmitType=="boolean"){if(doSubmit){taleo.core.subCmdSubmit(pFormId,pCmdClientId,pExtraParams)
}else{form.jsfCmdId.value=""
}}else{if(doSubmitType=="object"){doSubmit.openerHaveActionToExecute=pHaveActionToExecute;
doSubmit.onCloseFnc=function(){form.jsfCmdId.value=pCmdClientId;
taleo.core.subCmdSubmit(pFormId,pCmdClientId,pExtraParams)
};
form.jsfCmdId.value=""
}else{taleo.core.currentCmd=null
}}}}};
taleo.core.subCmdSubmit=function(c,a,b){var d=document.forms[c];
d.jsfCmdId.value=a;
d.jsfCmdParams.value=b||"";
taleo.core.stdSubmit(d,a)
};
taleo.core.formatTimezone=function(c){var e="GMT"+(c<=0?"+":"-");
var d=Math.abs(c);
var b=d%60;
var a=(d-b)/60;
if(a<10){a="0"+a
}if(b<10){b="0"+b
}return(e+a+":"+b)
};
taleo.core.stdSubmit=function(b,c){if(typeof b.onsubmit=="function"){b.onsubmit()
}taleo.core.manageKeepScrollPos(b);
if(b.formChanged){checkFormDataChangesOnsubmit(b)
}taleo.core.setWaitCursorForSubmit(c);
var f=taleo.core.widgets.findWaitingWindow(c);
if(f){setTimeout(function(){taleo.core.widgets.openWaitingWindow(f)
},f.delay)
}var g=0;
var a=new Date();
if(a.getTimezoneOffset){g=a.getTimezoneOffset()
}b.tz.value=taleo.core.formatTimezone(g);
try{taleo.core.leavingDomain_=false;
b.submit(true)
}catch(d){taleo.core.emptyCmdHF(window);
taleo.core.clearWaitCursorForSubmit(window);
alert(d.description)
}};
taleo.core.manageKeepScrollPos=function(b){if(b.akPBXOffset&&b.akPBYOffset){var a=document.compatMode&&document.compatMode!="BackCompat"?document.documentElement:document.body;
b.akPBXOffset.value=document.all?a.scrollLeft:window.pageXOffset;
b.akPBYOffset.value=document.all?a.scrollTop:window.pageYOffset
}};
taleo.core.clearWaitCursorForSubmit=function(a){a.document.body.style.cursor="default";
if(a.elementWithWaitCursor){a.elementWithWaitCursor.style.cursor="pointer";
a.elementWithWaitCursor=null
}};
taleo.core.emptyCmdHF=function(a){var b=taleo.core.jsfForm();
if(b&&b.jsfCmdId){b.jsfCmdId.value=""
}};
taleo.core.handleOutputLinkClick=function(a){taleo.core.leavingDomain_=false
};
taleo.core.stopSubmit=function(a){if(a.stop){a.stop()
}else{a.document.execCommand("Stop")
}};
taleo.core.dontKeepScrollPosition=function(){var a=taleo.core.jsfForm();
if(a.akPBDisabled!=undefined){a.akPBDisabled.value="1"
}return true
};
taleo.core.findParentOfType=function(b,a){var c=b;
while(c.parentNode!=null){if(c.parentNode.nodeName==a){return c.parentNode
}c=c.parentNode
}return null
};
taleo.core.findElementsEndingWithId=function(j,c,h,g){if(j==null){j=window.document
}if(h==null){h=new Array()
}var a=j.childNodes;
for(var d=0;
d<a.length;
d++){var b=a[d].id;
if(b!=null){var e=b.lastIndexOf(c);
if(e!=-1&&e+c.length==b.length){h.push(a[d]);
if(g){return h
}}}if(a[d].hasChildNodes()){var f=h.length;
taleo.core.findElementsEndingWithId(a[d],c,h,g);
if(f<h.length&&g){return h
}}}return h
};
taleo.core.findElementsEndingWithName=function(j,c,g,f){if(j==null){j=window.document
}if(g==null){g=new Array()
}var a=j.childNodes;
for(var d=0;
d<a.length;
d++){var h=a[d].name;
if(h!=null){var b=h.lastIndexOf(c);
if(b!=-1&&b+c.length==h.length){g.push(a[d]);
if(f){return g
}}}if(a[d].hasChildNodes()){var e=g.length;
taleo.core.findElementsEndingWithName(a[d],c,g,f);
if(e<g.length&&f){return g
}}}return g
};
taleo.core.findAllElementsByClass=function(c,f,d){if(c==null){c=window.document
}if(d==null){d=new Array()
}var a=c.childNodes;
for(var b=0;
b<a.length;
b++){var e=a[b].id;
if(a[b].className==f){d.push(a[b])
}if(a[b].hasChildNodes()){taleo.core.findAllElementsByClass(a[b],f,d)
}}return d
};
taleo.core.findElementByClass=function(c,d){if(c==null){c=window.document
}var a=c.childNodes;
for(var b=0;
b<a.length;
b++){if(a[b].className==d){return a[b]
}}for(var b=0;
b<a.length;
b++){if(a[b].hasChildNodes()){elem=taleo.core.findElementByClass(a[b],d);
if(elem!=null){return elem
}}}return null
};
taleo.core.previousSiblingWithTag=function(c,a){var b=c.previousSibling;
if(b!=null){if(b.tagName!=null&&b.tagName.toLowerCase()==a.toLowerCase()){return b
}else{return taleo.core.previousSiblingWithTag(b,a)
}}return null
};
taleo.core.nextSiblingWithTag=function(c,a){var b=c.nextSibling;
if(b!=null){if(b.tagName!=null&&b.tagName.toLowerCase()==a.toLowerCase()){return b
}else{return taleo.core.nextSiblingWithTag(b,a)
}}return null
};
taleo.core.nextSiblingWithoutTag=function(c,a){var b=c.nextSibling;
if(b!=null){if(b.tagName!=null&&b.tagName.toLowerCase()!=a.toLowerCase()){return b
}else{return taleo.core.nextSiblingWithoutTag(b,a)
}}return null
};
taleo.core.execDefaultCmdOnEnterKeyPress=function(a){var d=taleo.core.getKeyPressed(a);
var c=13;
if(d==c){var b=taleo.core.findDefaultCmd(null);
if(b!=null){b.onclick()
}}};
taleo.core.getKeyPressed=function(a){var b;
if(window.event){b=a.keyCode
}else{if(a.which){b=a.which
}}return b
};
taleo.core.findDefaultCmd=function(a){var b=taleo.core.findElementsEndingWithId(null,"defaultCmd",null,true);
if(b.length>0){return b[0]
}return null
};
taleo.core.getElementIntValue=function(a){var b=null;
var c=taleo.core.findElementsEndingWithId(null,a,null,true);
if(c.length>0){b=c[0]
}else{return -1
}if(b.tagName=="INPUT"){return parseInt(b.value)
}return parseInt(b.innerHTML)
};
taleo.core.reloadWindow=function(){window.location.reload(true)
};
taleo.core.createIFrame=function(a,g,k,l,d,h,b,j){try{var m=document.createElement("iframe");
m.className=j;
m.setAttribute("id","pId");
m.style.width=d;
m.style.height=h;
m.title=l;
m.setAttribute("frameBorder",b);
m.src=k;
myIFrame_=taleo.core.findElementsEndingWithId(null,a,null,true)[0].appendChild(m);
if(document.frames){try{myIFrame_=document.getElementById(a)[0].frames[g]
}catch(f){}}}catch(c){iframeHTML='<iframe id="'+g+'" title="" style="';
iframeHTML+="border:"+b+";";
iframeHTML+="width:"+d+";";
iframeHTML+="height:"+h+";";
iframeHTML+='"></iframe>';
document.body.innerHTML+=iframeHTML;
myIFrame_={};
myIFrame_.document={};
myIFrame_.document.location={};
myIFrame_.document.location.iframe=document.getElementById(g);
myIFrame_.document.location.replace=function(e){this.iframe.src=e
}
}};
taleo.core.addEvent=function(a,c,b){if(a.attachEvent){a.attachEvent("on"+c,b)
}else{if(a.addEventListener){a.addEventListener(c,b,true)
}else{a["on"+c]=b
}}};
taleo.core.event={};
taleo.core.event.stopEventPropagation=function(a){if(a){a.cancelBubble=true;
if(a.stopImmediatePropagation){a.stopImmediatePropagation()
}if(a.stopPropagation){a.stopPropagation()
}}};
taleo.core.event.cancelEvent=function(a){if(a){if(a.returnValue!=undefined){a.returnValue=false
}if(a.cancel!=undefined){a.cancel=true
}if(a.preventDefault){a.preventDefault()
}taleo.core.event.stopEventPropagation(a)
}return false
};
taleo.core.event.setAndReturnFalse=function(a){if(a&&a.returnValue!=undefined){a.returnValue=false
}return false
};
taleo.core.event.isTabKeyEvent=function(a){return a&&a.keyCode==9
};
taleo.core.event.isShiftKeyEvent=function(a){return a&&a.shiftKey
};
taleo.core.event.isForwardTabEvent=function(a){return a&&taleo.core.event.isTabKeyEvent(a)&&!taleo.core.event.isShiftKeyEvent(a)
};
taleo.core.event.isBackwardTabEvent=function(a){return a&&taleo.core.event.isTabKeyEvent(a)&&taleo.core.event.isShiftKeyEvent(a)
};
taleo.core.addEventByEndingID=function(d,c,a){var b=taleo.core.findElementsEndingWithId(null,d,null,false);
for(i=0;
i<b.length;
i++){taleo.core.addEvent(b[i],c,a)
}};
taleo.core.removeEvent=function(a,c,b){if(a.detachEvent){a.detachEvent("on"+c,b)
}else{if(a.removeEventListener){a.removeEventListener(c,b,true)
}else{a["on"+c]=null
}}};
taleo.core.hasClass=function(d,c){if(!(d&&d.className)){return false
}var a=d.className.split(" ");
for(var b=a.length;
b>0;
){if(a[--b]==c){return true
}}return false
};
taleo.core.removeClass=function(e,d){if(!(e&&e.className)){return
}var a=e.className.split(" ");
var b=[];
for(var c=a.length;
c>0;
){if(a[--c]!=d){b[b.length]=a[c]
}}e.className=b.join(" ")
};
taleo.core.addClass=function(e,d){if(!e){return
}if(!e.className){e.className=d;
return
}var a=e.className.split(" ");
var b=[];
for(var c=a.length;
c>0;
){if(a[--c]!=d){b[b.length]=a[c]
}else{return
}}b[b.length]=d;
e.className=b.join(" ")
};
taleo.core.addClasses=function(c,d){if(!c){return
}if(!c.className){c.className=d;
return
}var a=d.split(" ");
for(var b=a.length;
b>0;
){if(a[--b]!=""){taleo.core.addClass(c,a[b])
}}};
taleo.core.addParameter=function(b,a,c){b+=b.indexOf("?")==-1?"?":"&";
b+=a+"="+encodeURIComponent(c);
return b
};
taleo.core.restoreScrollPos=function(a,b){window.scrollTo(a,b)
};
taleo.core.getIFrameDoc=function(a){if(a.contentDocument){return a.contentDocument
}if(a.contentWindow){return a.contentWindow.document
}try{if(a.document){return a.document
}}catch(b){}return null
};
taleo.core.installCoreRequiredEvents=function(){taleo.core.emptyCmdHF(window);
taleo.core.addEvent(window,"unload",onUnload);
window.onbeforeunload=taleo.core.unloadMess;
taleo.core.beacon.adaptExternalLinks();
if(taleo.core.widgets.callout.tt_init){taleo.core.widgets.callout.tt_init()
}};
taleo.core.unloadMess=function(a){var c="";
var b=taleo.core.jsfForm();
if(b&&b.akPBISWLD&&!b.akPBISWLD.dontcheckdomain&&taleo.core.leavingDomain_&&!taleo.core.beacon.sessionExpired){c=securityRes._g("youMightLooseYourWork");
return c
}return
};
taleo.core.onUnload=function(pEvent){var ourForm=taleo.core.jsfForm();
var altUrl=ourForm.esmurl;
var leavingDomainAndMustInvalidate=ourForm&&ourForm.akPBISWLD&&!ourForm.akPBISWLD.dontcheckdomain&&taleo.core.leavingDomain_&&!taleo.core.beacon.sessionExpired;
if(leavingDomainAndMustInvalidate){taleo.core.beacon.invalidateSession();
if(altUrl!=null){var client=new HTTPClient();
client.init(altUrl.value);
var handler="NullHandler";
client.syncGET(eval("new "+handler+"()"))
}}};
taleo.core.getBrowserInfo=function(){var m=[0,0,0];
var j=null;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){j=navigator.plugins["Shockwave Flash"].description;
if(j){j=j.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
m[0]=parseInt(j.replace(/^(.*)\..*$/,"$1"),10);
m[1]=parseInt(j.replace(/^.*\.(.*)\s.*$/,"$1"),10);
m[2]=/r/.test(j)?parseInt(j.replace(/^.*r(.*)$/,"$1"),10):0
}}else{if(typeof window.ActiveXObject!="undefined"){var k=null;
var l=false;
try{k=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
}catch(h){try{k=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
m=[6,0,21];
k.AllowScriptAccess="always"
}catch(h){if(m[0]==6){l=true
}}if(!l){try{k=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
}catch(h){}}}if(!l&&k){try{j=k.GetVariable("$version");
if(j){j=j.split(" ")[1].split(",");
m=[parseInt(j[0],10),parseInt(j[1],10),parseInt(j[2],10)]
}}catch(h){}}}}var c=navigator.userAgent.toLowerCase();
var f=navigator.platform.toLowerCase();
var b=/webkit/.test(c)?parseFloat(c.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):"";
var g={major:m[0],minor:m[1],release:m[2]};
return{platform:f,userAgent:c,flashPlayer:g,webkitVersion:b}
};
taleo.core.logging={};
taleo.core.logging.log=function(a){if(window.console&&window.console.log){window.console.log(a)
}};
taleo.core.logging.info=function(a){if(window.console){if(window.console.info){window.console.info(a)
}else{taleo.core.logging.log("INFO: "+a)
}}};
taleo.core.logging.debug=function(a){if(window.console){if(window.console.debug){window.console.debug(a)
}else{taleo.core.logging.log("DEBUG: "+a)
}}};
taleo.core.logging.warn=function(a){if(window.console){if(window.console.warn){window.console.warn(a)
}else{taleo.core.logging.log("WARN: "+a)
}}};
taleo.core.logging.error=function(a){if(window.console){if(window.console.error){window.console.error(a)
}else{taleo.core.logging.log("ERROR: "+a)
}}};
taleo.core.security=new Object();
taleo.core.security.getCSRFTokenParamName=function(){return"csrftoken"
};
taleo.core.security.getCSRFTokenHeaderName=function(){return"X-TALEO-CSRF-TOKEN"
};
taleo.core.security.getCSRFToken=function(){return csrftoken
};
taleo.core.messagereceiver=new Object();
taleo.core.messagereceiver.getUIMessageReceiverServletURL=function(){return contextPath_+"/UIMessageReceiver.jss"
};
taleo.core.messagereceiver.generateUIMessageReceiverGetURL=function(c){var b=taleo.core.messagereceiver.getUIMessageReceiverServletURL();
var a=encodeURIComponent(taleo.core.security.getCSRFToken());
return b+"?msg="+c+"&"+taleo.core.security.getCSRFTokenParamName()+"="+a
};
taleo.core.beacon={msgSenderIFrame_:null,sessionAboutToEndWindow_:null,sessionEndedWindow_:null,sessionBeaconBeatID_:-1,sessionWarningID_:-1,sessionTimeoutID_:-1,sessionTimeoutInterval:null,sessionWarningInterval:null,beaconBeatInterval:null,maxNbMissedBeat:-1,sessionExpired:false,mainFlexControlId_:null,_hasFocus:false};
taleo.core.beacon.getCSRFToken=function(){return taleo.core.security.getCSRFToken()
};
taleo.core.beacon.checkSessionIntegrity=function(){var a=true;
taleo.core.beacon.sendMessageToUIMessageReceiverServlet("checkSession","POST",false,a)
};
taleo.core.beacon.SessionHandler={onInit:function(){},onError:function(a,b){if(a==401){taleo.core.leavingDomain_=false;
taleo.core.beacon.redirectSession()
}},onProgress:function(b,a){},onLoad:function(a){}};
taleo.core.beacon.BeaconHandler={onInit:function(){},onError:function(a,b){taleo.core.beacon.maxNbMissedBeat--;
if(taleo.core.beacon.maxNbMissedBeat<=0){window.clearTimeout(taleo.core.beacon.sessionBeaconBeatID_)
}},onProgress:function(b,a){},onLoad:function(a){}};
taleo.core.beacon.adaptExternalLinks=function(){var d=taleo.core.jsfForm();
if(!(d&&d.getElementsByTagName)){return
}var c=d.getElementsByTagName("a");
for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.getAttribute("href")&&a.getAttribute("rel")=="external"){a.target="_blank"
}}};
taleo.core.beacon.sendUIMessage2OptASync=function(b,a){taleo.core.logging.warn("'sendUIMessage2OptASync' is deprecated. See code for replacement recommendation.");
return taleo.core.beacon.sendMessageToUIMessageReceiverServlet(b,"GET",a)
};
taleo.core.beacon.sendMessageToUIMessageReceiverServlet=function(d,c,h,i){var j=Boolean(i)==false;
if(j&&taleo.core.beacon.mainFlexControlId_!=null){var b=document.getElementById(taleo.core.beacon.mainFlexControlId_);
if(b&&b.notifyFlexUIMessage){b.notifyFlexUIMessage(d)
}}var a;
if(c==="GET"){a=taleo.core.messagereceiver.generateUIMessageReceiverGetURL(d)
}else{a=taleo.core.messagereceiver.getUIMessageReceiverServletURL()
}var e=new HTTPClient();
e.init(a);
if(c==="GET"){e.launchGETRequest(taleo.core.beacon.BeaconHandler,h)
}else{var g={msg:d};
var f={};
f["Content-type"]="application/x-www-form-urlencoded";
f[taleo.core.security.getCSRFTokenHeaderName()]=taleo.core.security.getCSRFToken();
e.launchPOSTRequest(taleo.core.beacon.BeaconHandler,h,g,f)
}return false
};
taleo.core.beacon.sendUIMessage2=function(a){taleo.core.logging.warn("'sendUIMessage2' is deprecated. See code for replacement recommendation.");
return taleo.core.beacon.sendMessageToUIMessageReceiverServlet(a,"GET",true)
};
taleo.core.beacon.installSessionBeacon=function(b,d,a,c){taleo.core.beacon.sessionTimeoutInterval=b;
taleo.core.beacon.sessionWarningInterval=d;
taleo.core.beacon.beaconBeatInterval=a;
taleo.core.beacon.maxNbMissedBeat=c;
taleo.core.beacon.initSessionBeacon()
};
taleo.core.beacon.reviveSession=function(a){taleo.core.beacon.sendMessageToUIMessageReceiverServlet("sessionBeaconBeat","POST",true);
taleo.core.beacon.resetSessionBeacon()
};
taleo.core.beacon.resetSessionBeacon=function(){taleo.core.beacon.sessionAboutToEndWindow_=null;
taleo.core.beacon.sessionEndedWindow=null;
taleo.core.beacon.initSessionBeacon()
};
taleo.core.beacon.initSessionBeacon=function(){var a=false;
try{a=window.frameElement
}catch(b){a=false
}if(!a){if(taleo.core.beacon.sessionBeaconBeatID_!=-1){window.clearInterval(taleo.core.beacon.sessionBeaconBeatID_)
}if(taleo.core.beacon.sessionWarningID_!=-1){window.clearTimeout(taleo.core.beacon.sessionWarningID_)
}if(taleo.core.beacon.sessionTimeoutID_!=-1){window.clearTimeout(taleo.core.beacon.sessionTimeoutID_)
}if(taleo.core.beacon.beaconBeatInterval>0){taleo.core.beacon.sessionBeaconBeatID_=setInterval("taleo.core.beacon.sendMessageToUIMessageReceiverServlet('sessionBeaconBeat', 'POST', true)",taleo.core.beacon.beaconBeatInterval)
}if(taleo.core.beacon.sessionWarningInterval>0){taleo.core.beacon.sessionWarningID_=setTimeout("taleo.core.beacon.manageSessionWarning()",taleo.core.beacon.sessionWarningInterval)
}if(taleo.core.beacon.sessionTimeoutInterval>0){taleo.core.beacon.sessionTimeoutID_=setTimeout("taleo.core.beacon.manageSessionTimeout()",taleo.core.beacon.sessionTimeoutInterval)
}}};
taleo.core.beacon.invalidateSession=function(){logViewInfo("invalidateSession");
if(!taleo.core.beacon.sessionExpired){window.clearTimeout(taleo.core.beacon.sessionWarningID_);
window.clearTimeout(taleo.core.beacon.sessionTimeoutID_);
window.clearInterval(taleo.core.beacon.sessionBeaconBeatID_);
taleo.core.beacon.sendMessageToUIMessageReceiverServlet("invalidateSession","POST",false);
taleo.core.beacon.sessionAboutToEndWindow_=null;
taleo.core.beacon.sessionExpired=true
}};
taleo.core.beacon.setFocusOn=function(){taleo.core.beacon._hasFocus=true
};
taleo.core.beacon.setFocusOff=function(){taleo.core.beacon._hasFocus=false
};
taleo.core.beacon.manageSessionWarning=function(){if(!taleo.core.beacon.sessionExpired){if(taleo.core.beacon.mainFlexControlId_!=null){var d=document.getElementById(taleo.core.beacon.mainFlexControlId_);
if(d){d.popupSessionWarning(taleo.core.beacon.sessionTimeoutInterval,taleo.core.beacon.sessionWarningInterval);
if(!AKCore._hasFocus){var e=(screen.width-450)/2;
var g=(screen.height-200)/2;
var c=window.open(contextPath_+"/akira/pub/offFocusBeaconAlert.jsp?alertClientId=sessionWarningModal&formId="+document.jsfForm().id+"&msgResGroupId="+messagesResGroupId_,"","top="+g+",left="+e+",width=450,height=200,directories=no,location=no,menubar=no,toolbar=no,resizable=no,scrollbars=no,status=yes,center=yes;");
c.focus()
}}}else{var b=findAlert("sessionWarning");
if(!b){b=createAlert("sessionWarning","","","warning",null);
b.addCommand("?ok?","okBtn",reviveSession)
}theAlert2=findAlert("sessionWarningModal");
if(!theAlert2){theAlert2=createAlert("sessionWarningModal","warning",null)
}var f=contextPath_+"/akira/pub/session/sessionWarning.jsf";
f+="?formId="+document.jsfForm().id;
f+="&msgResGroupId="+messagesResGroupId_;
showEmbeddedAlert(f,window,b,null);
taleo.core.beacon.sessionAboutToEndWindow_=window
}}};
taleo.core.beacon.manageSessionTimeout=function(){if(!taleo.core.beacon.sessionExpired){if(taleo.core.beacon.mainFlexControlId_!=null){var b=document.getElementById(taleo.core.beacon.mainFlexControlId_);
if(b){b.popupSessionTimeout(taleo.core.beacon.sessionTimeoutInterval,taleo.core.beacon.sessionWarningInterval);
taleo.core.beacon.invalidateSession()
}}else{var a=createAlert("sessionExpired","","","info",null);
a.addCommand("?ok?","okBtn",redirectSession);
var c=contextPath_+"/akira/pub/session/sessionTimeout.jsf";
c+="?formId="+document.jsfForm().id;
c+="&msgResGroupId="+messagesResGroupId_;
theAlert2=findAlert("sessionExpiredModal");
if(!theAlert2){theAlert2=createAlert("sessionExpiredModal","","","warning",null)
}showEmbeddedAlert(c,window,a,invalidateSession);
taleo.core.beacon.sessionEndedWindow_=window
}}};
taleo.core.beacon.redirectSession=function(){window.location=taleo.core.messagereceiver.generateUIMessageReceiverGetURL("sessionExpiredRedirect")
};
taleo.core.beacon.flexSessionWarningClosed=function(){taleo.core.beacon.reviveSession()
};
taleo.core.beacon.flexSessionTimeoutClosed=function(){taleo.core.beacon.gotoTOC()
};
taleo.core.beacon.resetTimeoutAndWarningTimeout=function(){if(taleo.core.beacon.sessionWarningInterval>0){window.clearTimeout(taleo.core.beacon.sessionWarningID_);
taleo.core.beacon.sessionWarningID_=setTimeout("manageSessionWarning()",taleo.core.beacon.sessionWarningInterval)
}if(taleo.core.beacon.sessionTimeoutInterval>0){window.clearTimeout(taleo.core.beacon.sessionTimeoutID_);
taleo.core.beacon.sessionTimeoutID_=setTimeout("manageSessionTimeout()",taleo.core.beacon.sessionTimeoutInterval)
}};
taleo.core.beacon.recordUserActivity=function(){taleo.core.beacon.resetTimeoutAndWarningTimeout()
};
taleo.core.beacon.gotoTOC=function(){var a;
if(sessionTimeoutUrl_){a=sessionTimeoutUrl_
}else{a=tocPage_||contextPath_+"/index.jsp"
}gotoUrl(a)
};
taleo.core.beacon.gotoUrl=function(a){if(taleo.core.beacon.sessionEndedWindow_){if(taleo.core.beacon.sessionEndedWindow_.dialogArguments){taleo.core.beacon.sessionEndedWindow_.dialogArguments.location=a
}else{taleo.core.beacon.sessionEndedWindow_.location=a
}}else{window.location=a
}};
taleo.core.widgets={currentModal:null,waitingWindows_:[],waitCursorTimeout_:2000};
taleo.core.widgets.WaitingWindow=function(b,d,a,c,e){this.commandId=b;
this.url=d;
this.delay=a;
this.withCancel=c;
this.disabled=e;
taleo.core.widgets.waitingWindows_.push(this)
};
taleo.core.widgets.openWaitingWindow=function(a){var b=a.url;
if(a.withCancel){b+="&cancel=1"
}taleo.core.widgets.openModalDialog(b,250,100)
};
taleo.core.widgets.openModalDialog=function(c,a,e){var b=(new Date()).getSeconds().toString();
var g=(screen.width-a)/2;
var f=(screen.height-e)/2;
var d="left="+g+",top="+f+",width="+a+",height="+e+",center=yes,resizable=yes,scroll=yes,help=no,status=no";
taleo.core.widgets.currentModal=window.open(c,b,d);
if(taleo.core.widgets.currentModal){taleo.core.widgets.currentModal.focus()
}};
taleo.core.widgets.findWaitingWindow=function(a){var b=null;
if(a){for(i=0;
b==null&&i<taleo.core.widgets.waitingWindows_.length;
i++){if(a.lastIndexOf(taleo.core.widgets.waitingWindows_[i].commandId)!=-1){b=taleo.core.widgets.waitingWindows_[i]
}}}for(i=0;
b==null&&i<taleo.core.widgets.waitingWindows_.length;
i++){if(taleo.core.widgets.waitingWindows_[i].commandId=="-1"){b=taleo.core.widgets.waitingWindows_[i]
}}if(b&&b.disabled){b=null
}return b
};
taleo.core.widgets.checkModal=function(){setTimeout("finishChecking()",50);
return true
};
taleo.core.widgets.finishChecking=function(){if(taleo.core.widgets.currentModal&&!taleo.core.widgets.currentModal.closed){taleo.core.widgets.currentModal.focus()
}};
taleo.core.widgets.callout={};
taleo.core.widgets.callout.config=new Object();
var FIX=19;
var CLOSEBTN_INDEX=9;
var tt_Debug=true;
var tt_Enabled=true;
var TagsToTip=true;
taleo.core.widgets.callout.config.Above=false;
taleo.core.widgets.callout.config.BgColor="#FFFFFF";
taleo.core.widgets.callout.config.BgImg="";
taleo.core.widgets.callout.config.BorderColor="#B3B3B3";
taleo.core.widgets.callout.config.BorderStyle="solid";
taleo.core.widgets.callout.config.BorderWidth=1;
taleo.core.widgets.callout.config.CenterMouse=true;
taleo.core.widgets.callout.config.ClickClose=true;
taleo.core.widgets.callout.config.ClickSticky=true;
taleo.core.widgets.callout.config.CloseBtn=false;
taleo.core.widgets.callout.config.CloseBtnColors=["","","",""];
taleo.core.widgets.callout.config.CloseBtnText='<img id="closeBtn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAARpJREFUWEftlkEKgzAQRV122V23PUKP0WWP0KN4gx7FagQ3gkco9BJd9wTppBgY0tHkRwQpsxAJUefl/z+JhbW22MK1CQgnhIKEcVBFVJHYFqEZ+a+MtG17mvO8qqpjLBOLFanr+mqMsXSVUjE/7+4IDBRW+vh5hHAgPzAM8jvfNM0lFQYCGYZhRwU6CUaAeJBF+1VA3EclGFr5ncPRGILIPn0nlPF2wBDZIF4ZWvkzUOKF2MFtgzLCXwwzwYDEboplJQtECOZ7rptiEFnWSN3R9/1hqptSIGCQcB/h3SEFGNnUIGt4MalFA5jOjVdRxHcLnTW3qe4YYUoEArYmdXU5z0HW5BRIfUdBFv+PpEqNPqfWqDWxzGwmIx9jdmiXp9+KOQAAAABJRU5ErkJggg==" class="calloutCloseBtn"></img>;';
taleo.core.widgets.callout.config.CopyContent=true;
taleo.core.widgets.callout.config.Delay=400;
taleo.core.widgets.callout.config.Duration=0;
taleo.core.widgets.callout.config.Exclusive=true;
taleo.core.widgets.callout.config.FadeIn=0;
taleo.core.widgets.callout.config.FadeOut=0;
taleo.core.widgets.callout.config.FadeInterval=30;
taleo.core.widgets.callout.config.Fix=null;
taleo.core.widgets.callout.config.FollowMouse=false;
taleo.core.widgets.callout.config.FontColor="#000044";
taleo.core.widgets.callout.config.FontFace='Arial Unicode MS", Arial, Helvetica, sans-serif';
taleo.core.widgets.callout.config.FontSize="1em";
taleo.core.widgets.callout.config.FontWeight="normal";
taleo.core.widgets.callout.config.Height=0;
taleo.core.widgets.callout.config.JumpHorz=true;
taleo.core.widgets.callout.config.JumpVert=true;
taleo.core.widgets.callout.config.Left=false;
taleo.core.widgets.callout.config.OffsetX=100;
taleo.core.widgets.callout.config.OffsetY=100;
taleo.core.widgets.callout.config.Opacity=100;
taleo.core.widgets.callout.config.Padding=0;
taleo.core.widgets.callout.config.Shadow=false;
taleo.core.widgets.callout.config.ShadowColor="#C0C0C0";
taleo.core.widgets.callout.config.ShadowWidth=1;
taleo.core.widgets.callout.config.Sticky=true;
taleo.core.widgets.callout.config.TextAlign="left";
taleo.core.widgets.callout.config.Title="";
taleo.core.widgets.callout.config.TitleAlign="left";
taleo.core.widgets.callout.config.TitleBgColor="#FFFFFF";
taleo.core.widgets.callout.config.TitleFontColor="#FFFFFF";
taleo.core.widgets.callout.config.TitleFontFace="";
taleo.core.widgets.callout.config.TitleFontSize="";
taleo.core.widgets.callout.config.TitlePadding=0;
taleo.core.widgets.callout.config.Width=0;
taleo.core.widgets.callout.config.ExtraWidth=24;
taleo.core.widgets.callout.Tip=function(){taleo.core.widgets.callout.tt_Tip(arguments,null)
};
taleo.core.widgets.callout.callTooltipFixedPosition=function(e,g,c,f,d){var b=findElementsEndingWithId(null,g,null,true)[0].id;
var a=new Array();
a.push(b);
a.push(c);
a.push(f);
taleo.core.widgets.callout.tt_Tip([e,FIX,a,CLOSEBTN_INDEX,d],null)
};
taleo.core.widgets.callout.TagToTip=function(){var a=taleo.core.widgets.callout.tt_GetElt(arguments[0]);
if(a){taleo.core.widgets.callout.tt_Tip(arguments,a)
}};
taleo.core.widgets.callout.UnTip=function(){taleo.core.widgets.callout.tt_OpReHref();
if(tt_aV[DURATION]<0&&(tt_iState&2)){tt_tDurt.Timer("taleo.core.widgets.callout.tt_HideInit()",-tt_aV[DURATION],true)
}else{if(!(tt_aV[STICKY]&&(tt_iState&2))){taleo.core.widgets.callout.tt_HideInit()
}}};
var tt_aElt=new Array(10),tt_aV=new Array(),tt_sContent,tt_t2t,tt_t2tDad,tt_musX,tt_musY,tt_over,tt_x,tt_y,tt_w,tt_h;
taleo.core.widgets.callout.tt_Extension=function(){taleo.core.widgets.callout.tt_ExtCmdEnum();
tt_aExt[tt_aExt.length]=this;
return this
};
taleo.core.widgets.callout.tt_SetTipPos=function(b,d){var c=tt_aElt[0].style;
tt_x=b;
tt_y=d;
c.left=b+"px";
c.top=d+"px";
if(tt_ie56){var a=tt_aElt[tt_aElt.length-1];
if(a){a.style.left=c.left;
a.style.top=c.top
}}};
taleo.core.widgets.callout.tt_HideInit=function(){if(tt_iState){taleo.core.widgets.callout.tt_ExtCallFncs(0,"HideInit");
tt_iState&=~(4|8);
if(tt_flagOpa&&tt_aV[FADEOUT]){tt_tFade.EndTimer();
if(tt_opa){var a=Math.round(tt_aV[FADEOUT]/(tt_aV[FADEINTERVAL]*(tt_aV[OPACITY]/tt_opa)));
taleo.core.widgets.callout.tt_Fade(tt_opa,tt_opa,0,a);
return
}}tt_tHide.Timer("taleo.core.widgets.callout.tt_Hide();",1,false)
}};
taleo.core.widgets.callout.tt_Hide=function(){if(tt_db&&tt_iState){taleo.core.widgets.callout.tt_OpReHref();
if(tt_iState&2){tt_aElt[0].style.visibility="hidden";
taleo.core.widgets.callout.tt_ExtCallFncs(0,"Hide")
}tt_tShow.EndTimer();
tt_tHide.EndTimer();
tt_tDurt.EndTimer();
tt_tFade.EndTimer();
if(!tt_op&&!tt_ie){tt_tWaitMov.EndTimer();
tt_bWait=false
}if(tt_aV[CLICKCLOSE]||tt_aV[CLICKSTICKY]){taleo.core.widgets.callout.tt_RemEvtFnc(document,"mouseup",taleo.core.widgets.callout.tt_OnLClick)
}taleo.core.widgets.callout.tt_ExtCallFncs(0,"Kill");
if(tt_t2t&&!tt_aV[COPYCONTENT]){taleo.core.widgets.callout.tt_UnEl2Tip()
}tt_iState=0;
tt_over=null;
taleo.core.widgets.callout.tt_ResetMainDiv();
if(tt_aElt[tt_aElt.length-1]){tt_aElt[tt_aElt.length-1].style.display="none"
}}};
taleo.core.widgets.callout.tt_GetElt=function(a){return(document.getElementById?document.getElementById(a):document.all?document.all[a]:null)
};
taleo.core.widgets.callout.tt_GetDivW=function(a){return(a?(a.offsetWidth||a.style.pixelWidth||0):0)
};
taleo.core.widgets.callout.tt_GetDivH=function(a){return(a?(a.offsetHeight||a.style.pixelHeight||0):0)
};
taleo.core.widgets.callout.tt_GetScrollX=function(){return(window.pageXOffset||(tt_db?(tt_db.scrollLeft||0):0))
};
taleo.core.widgets.callout.tt_GetScrollY=function(){return(window.pageYOffset||(tt_db?(tt_db.scrollTop||0):0))
};
taleo.core.widgets.callout.tt_GetClientW=function(){return taleo.core.widgets.callout.tt_GetWndCliSiz("Width")
};
taleo.core.widgets.callout.tt_GetClientH=function(){return taleo.core.widgets.callout.tt_GetWndCliSiz("Height")
};
taleo.core.widgets.callout.tt_GetEvtX=function(a){return(a?((typeof(a.pageX)!=tt_u)?a.pageX:(a.clientX+taleo.core.widgets.callout.tt_GetScrollX())):0)
};
taleo.core.widgets.callout.tt_GetEvtY=function(a){return(a?((typeof(a.pageY)!=tt_u)?a.pageY:(a.clientY+taleo.core.widgets.callout.tt_GetScrollY())):0)
};
taleo.core.widgets.callout.tt_AddEvtFnc=function(b,a,c){if(b){if(b.addEventListener){b.addEventListener(a,c,false)
}else{b.attachEvent("on"+a,c)
}}};
taleo.core.widgets.callout.tt_RemEvtFnc=function(b,a,c){if(b){if(b.removeEventListener){b.removeEventListener(a,c,false)
}else{b.detachEvent("on"+a,c)
}}};
taleo.core.widgets.callout.tt_GetDad=function(a){return(a.parentNode||a.parentElement||a.offsetParent)
};
taleo.core.widgets.callout.tt_MovDomNode=function(b,a,c){if(a){a.removeChild(b)
}if(c){c.appendChild(b)
}};
var tt_aExt=new Array(),tt_db,tt_op,tt_ie,tt_ie56,tt_bBoxOld,tt_body,tt_ovr_,tt_flagOpa,tt_maxPosX,tt_maxPosY,tt_iState=0,tt_opa,tt_bJmpVert,tt_bJmpHorz,tt_elDeHref,tt_tShow=new Number(0),tt_tHide=new Number(0),tt_tDurt=new Number(0),tt_tFade=new Number(0),tt_tWaitMov=new Number(0),tt_bWait=false,tt_u="undefined";
taleo.core.widgets.callout.tt_Init=function(){taleo.core.widgets.callout.tt_MkCmdEnum();
if(!taleo.core.widgets.callout.tt_Browser()||!taleo.core.widgets.callout.tt_MkMainDiv()){return
}taleo.core.widgets.callout.tt_IsW3cBox();
taleo.core.widgets.callout.tt_OpaSupport();
taleo.core.widgets.callout.tt_AddEvtFnc(document,"mousemove",taleo.core.widgets.callout.tt_Move);
if(TagsToTip||tt_Debug){taleo.core.widgets.callout.tt_SetOnloadFnc()
}taleo.core.widgets.callout.tt_AddEvtFnc(window,"unload",taleo.core.widgets.callout.tt_Hide)
};
taleo.core.widgets.callout.tt_MkCmdEnum=function(){var n=0;
for(var i in taleo.core.widgets.callout.config){eval("window."+i.toString().toUpperCase()+" = "+n++)
}tt_aV.length=n
};
taleo.core.widgets.callout.tt_Browser=function(){var n,nv,n6,w3c;
n=navigator.userAgent.toLowerCase(),nv=navigator.appVersion;
tt_op=(document.defaultView&&typeof(eval("window.opera"))!=tt_u);
tt_ie=n.indexOf("msie")!=-1&&document.all&&!tt_op;
if(tt_ie){var ieOld=(!document.compatMode||document.compatMode=="BackCompat");
tt_db=!ieOld?document.documentElement:(document.body||null);
if(tt_db){tt_ie56=parseFloat(nv.substring(nv.indexOf("MSIE")+5))>=5.5&&typeof document.body.style.maxHeight==tt_u
}}else{tt_db=document.documentElement||document.body||(document.getElementsByTagName?document.getElementsByTagName("body")[0]:null);
if(!tt_op){n6=document.defaultView&&typeof document.defaultView.getComputedStyle!=tt_u;
w3c=!n6&&document.getElementById
}}tt_body=(document.getElementsByTagName?document.getElementsByTagName("body")[0]:(document.body||null));
if(tt_ie||n6||tt_op||w3c){if(tt_body&&tt_db){if(document.attachEvent||document.addEventListener){return true
}}else{tt_Err("wz_tooltip.js must be included INSIDE the body section, immediately after the opening <body> tag.",false)
}}tt_db=null;
return false
};
taleo.core.widgets.callout.tt_MkMainDiv=function(){if(tt_body.insertAdjacentHTML){tt_body.insertAdjacentHTML("afterBegin",taleo.core.widgets.callout.tt_MkMainDivHtm())
}else{if(typeof tt_body.innerHTML!=tt_u&&document.createElement&&tt_body.appendChild){tt_body.appendChild(taleo.core.widgets.callout.tt_MkMainDivDom())
}}if(window.taleo.core.widgets.callout.tt_GetMainDivRefs&&taleo.core.widgets.callout.tt_GetMainDivRefs()){return true
}tt_db=null;
return false
};
taleo.core.widgets.callout.tt_MkMainDivHtm=function(){return('<div id="WzTtDiV"></div>'+(tt_ie56?('<iframe id="WzTtIfRm" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>'):""))
};
taleo.core.widgets.callout.tt_MkMainDivDom=function(){var a=document.createElement("div");
if(a){a.id="WzTtDiV"
}return a
};
taleo.core.widgets.callout.tt_GetMainDivRefs=function(){tt_aElt[0]=taleo.core.widgets.callout.tt_GetElt("WzTtDiV");
if(tt_ie56&&tt_aElt[0]){tt_aElt[tt_aElt.length-1]=taleo.core.widgets.callout.tt_GetElt("WzTtIfRm");
if(!tt_aElt[tt_aElt.length-1]){tt_aElt[0]=null
}}if(tt_aElt[0]){var a=tt_aElt[0].style;
a.visibility="hidden";
a.position="absolute";
a.overflow="hidden";
return true
}return false
};
taleo.core.widgets.callout.tt_ResetMainDiv=function(){taleo.core.widgets.callout.tt_SetTipPos(0,0);
tt_aElt[0].innerHTML="";
tt_aElt[0].style.width="0px";
tt_h=0
};
taleo.core.widgets.callout.tt_IsW3cBox=function(){var a=tt_aElt[0].style;
a.padding="10px";
a.width="40px";
tt_bBoxOld=(taleo.core.widgets.callout.tt_GetDivW(tt_aElt[0])==40);
a.padding="0px";
taleo.core.widgets.callout.tt_ResetMainDiv()
};
taleo.core.widgets.callout.tt_OpaSupport=function(){var a=tt_body.style;
tt_flagOpa=(typeof(a.KhtmlOpacity)!=tt_u)?2:(typeof(a.KHTMLOpacity)!=tt_u)?3:(typeof(a.MozOpacity)!=tt_u)?4:(typeof(a.opacity)!=tt_u)?5:(typeof(a.filter)!=tt_u)?1:0
};
taleo.core.widgets.callout.tt_SetOnloadFnc=function(){taleo.core.widgets.callout.tt_AddEvtFnc(document,"DOMContentLoaded",taleo.core.widgets.callout.tt_HideSrcTags);
taleo.core.widgets.callout.tt_AddEvtFnc(window,"load",taleo.core.widgets.callout.tt_HideSrcTags);
if(tt_body.attachEvent){tt_body.attachEvent("onreadystatechange",function(){if(tt_body.readyState=="complete"){taleo.core.widgets.callout.tt_HideSrcTags()
}})
}if(/WebKit|KHTML/i.test(navigator.userAgent)){var a=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(a);
taleo.core.widgets.callout.tt_HideSrcTags()
}},10)
}};
taleo.core.widgets.callout.tt_HideSrcTags=function(){if(!window.tt_HideSrcTags||window.tt_HideSrcTags.done){return
}window.tt_HideSrcTags.done=true;
if(!taleo.core.widgets.callout.tt_HideSrcTagsRecurs(tt_body)){taleo.core.widgets.callout.tt_Err("There are HTML elements to be converted to tooltips.\nIf you want these HTML elements to be automatically hidden, you must edit wz_tooltip.js, and set TagsToTip in the global tooltip configuration to true.",true)
}};
taleo.core.widgets.callout.tt_HideSrcTagsRecurs=function(c){var f,e;
var b=c.childNodes||c.children||null;
for(var d=b?b.length:0;
d;
){--d;
if(!taleo.core.widgets.callout.tt_HideSrcTagsRecurs(b[d])){return false
}f=b[d].getAttribute?(b[d].getAttribute("onmouseover")||b[d].getAttribute("onclick")):(typeof b[d].onmouseover=="function")?(b[d].onmouseover||b[d].onclick):null;
if(f){e=f.toString().match(/TagToTip\s*\(\s*'[^'.]+'\s*[\),]/);
if(e&&e.length){if(!taleo.core.widgets.callout.tt_HideSrcTag(e[0])){return false
}}}}return true
};
taleo.core.widgets.callout.tt_HideSrcTag=function(b){var c,a;
c=b.replace(/.+'([^'.]+)'.+/,"$1");
a=taleo.core.widgets.callout.tt_GetElt(c);
if(a){if(tt_Debug&&!TagsToTip){return false
}else{a.style.display="none"
}}else{tt_Err("Invalid ID\n'"+c+"'\npassed to TagToTip(). There exists no HTML element with that ID.",true)
}return true
};
taleo.core.widgets.callout.tt_Tip=function(a,b){if(!tt_db||(tt_iState&8)){return
}if(tt_iState){taleo.core.widgets.callout.tt_Hide()
}if(!tt_Enabled){return
}tt_t2t=b;
if(!taleo.core.widgets.callout.tt_ReadCmds(a)){return
}tt_iState=1|4;
taleo.core.widgets.callout.tt_AdaptConfig1();
taleo.core.widgets.callout.tt_MkTipContent(a);
taleo.core.widgets.callout.tt_MkTipSubDivs();
taleo.core.widgets.callout.tt_FormatTip();
tt_bJmpVert=false;
tt_bJmpHorz=false;
tt_maxPosX=taleo.core.widgets.callout.tt_GetClientW()+taleo.core.widgets.callout.tt_GetScrollX()-tt_w-1;
tt_maxPosY=taleo.core.widgets.callout.tt_GetClientH()+taleo.core.widgets.callout.tt_GetScrollY()-tt_h-1;
taleo.core.widgets.callout.tt_AdaptConfig2();
taleo.core.widgets.callout.tt_OverInit();
taleo.core.widgets.callout.tt_ShowInit();
taleo.core.widgets.callout.tt_Move()
};
taleo.core.widgets.callout.tt_ReadCmds=function(b){var d;
d=0;
for(var c in taleo.core.widgets.callout.config){tt_aV[d++]=taleo.core.widgets.callout.config[c]
}if(b.length&1){for(d=b.length-1;
d>0;
d-=2){tt_aV[b[d-1]]=b[d]
}return true
}taleo.core.widgets.callout.tt_Err("Incorrect call of Tip() or TagToTip().\nEach command must be followed by a value.",true);
return false
};
taleo.core.widgets.callout.tt_AdaptConfig1=function(){taleo.core.widgets.callout.tt_ExtCallFncs(0,"LoadConfig");
if(!tt_aV[TITLEBGCOLOR].length){tt_aV[TITLEBGCOLOR]=tt_aV[BORDERCOLOR]
}if(!tt_aV[TITLEFONTCOLOR].length){tt_aV[TITLEFONTCOLOR]=tt_aV[BGCOLOR]
}if(!tt_aV[TITLEFONTFACE].length){tt_aV[TITLEFONTFACE]=tt_aV[FONTFACE]
}if(!tt_aV[TITLEFONTSIZE].length){tt_aV[TITLEFONTSIZE]=tt_aV[FONTSIZE]
}if(tt_aV[CLOSEBTN]){if(!tt_aV[CLOSEBTNCOLORS]){tt_aV[CLOSEBTNCOLORS]=new Array("","","","")
}for(var a=4;
a;
){--a;
if(!tt_aV[CLOSEBTNCOLORS][a].length){tt_aV[CLOSEBTNCOLORS][a]=(a&1)?tt_aV[TITLEFONTCOLOR]:tt_aV[TITLEBGCOLOR]
}}if(!tt_aV[TITLE].length){tt_aV[TITLE]=" "
}}if(tt_aV[OPACITY]==100&&typeof tt_aElt[0].style.MozOpacity!=tt_u&&!Array.every){tt_aV[OPACITY]=99
}if(tt_aV[FADEIN]&&tt_flagOpa&&tt_aV[DELAY]>100){tt_aV[DELAY]=Math.max(tt_aV[DELAY]-tt_aV[FADEIN],100)
}};
taleo.core.widgets.callout.tt_AdaptConfig2=function(){if(tt_aV[CENTERMOUSE]){tt_aV[OFFSETX]-=((tt_w-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0))>>1);
tt_aV[JUMPHORZ]=false
}};
taleo.core.widgets.callout.tt_MkTipContent=function(b){if(tt_t2t){if(tt_aV[COPYCONTENT]){tt_sContent=tt_t2t.innerHTML
}else{tt_sContent=""
}}else{tt_sContent=b[0]
}taleo.core.widgets.callout.tt_ExtCallFncs(0,"CreateContentString")
};
taleo.core.widgets.callout.tt_MkTipSubDivs=function(){var b="position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;",a=' cellspacing="0" cellpadding="0" border="0"><tbody><tr><td ';
tt_aElt[0].style.width=taleo.core.widgets.callout.tt_GetClientW()+"px";
tt_aElt[0].innerHTML=(""+(tt_aV[TITLE].length?('<div id="WzTiTl" class="calloutHeaderExternalContainer" style="position:relative;z-index:1;"><table id="WzTiTlTb" class="calloutHeaderInternalContainer"'+a+'id="WzTiTlI" style="'+b+'" class="calloutTitle">'+tt_aV[TITLE]+(tt_aV[CLOSEBTN]?('<span id="WzClOsE" class="calloutCloseBtnContainer" onmouseover="taleo.core.widgets.callout.tt_OnCloseBtnOver(1)" onmouseout="taleo.core.widgets.callout.tt_OnCloseBtnOver(0)" onclick="taleo.core.widgets.callout.tt_HideInit()">'+tt_aV[CLOSEBTNTEXT]+"</span>"):"")+"</td></tr></tbody></table></div>"):"")+'<div id="WzBoDy" style="position:relative;z-index:0;"><table'+a+'id="WzBoDyI" style="'+b+'">'+tt_sContent+"</td></tr></tbody></table></div>"+(tt_aV[SHADOW]?('<div id="WzTtShDwR" style="position:absolute;overflow:hidden;"></div><div id="WzTtShDwB" style="position:relative;overflow:hidden;"></div>'):""));
if(taleo.core.widgets.callout.tt_GetElt("closeBtn")){taleo.core.widgets.callout.tt_GetElt("closeBtn").setAttribute("alt",calloutRes.closeTT)
}taleo.core.widgets.callout.tt_GetSubDivRefs();
if(tt_t2t&&!tt_aV[COPYCONTENT]){taleo.core.widgets.callout.tt_El2Tip()
}taleo.core.widgets.callout.tt_ExtCallFncs(0,"SubDivsCreated")
};
taleo.core.widgets.callout.tt_GetSubDivRefs=function(){var b=new Array("WzTiTl","WzTiTlTb","WzTiTlI","WzClOsE","WzBoDy","WzBoDyI","WzTtShDwB","WzTtShDwR");
for(var a=b.length;
a;
--a){tt_aElt[a]=taleo.core.widgets.callout.tt_GetElt(b[a-1])
}};
taleo.core.widgets.callout.tt_FormatTip=function(){var f,j,e,b=tt_aV[PADDING],d,c=tt_aV[BORDERWIDTH],a,g,i=(b+c)<<1;
if(tt_aV[TITLE].length){d=tt_aV[TITLEPADDING];
f=tt_aElt[1].style;
f.background=tt_aV[TITLEBGCOLOR];
f.borderLeftColor=f.borderTopColor=f.borderRightColor=tt_aV[BORDERCOLOR];
f.borderLeftStyle=f.borderTopStyle=f.borderRightStyle=tt_aV[BORDERSTYLE];
f.borderLeftWidth=f.borderTopWidth=f.borderRightWidth=c+"px";
f.paddingTop=f.paddingBottom=d+"px";
f.paddingLeft=f.paddingRight=(d+1)+"px";
f=tt_aElt[3].style;
f.color=tt_aV[TITLEFONTCOLOR];
if(tt_aV[WIDTH]==-1){f.whiteSpace="nowrap"
}f.fontFamily=tt_aV[TITLEFONTFACE];
f.fontSize=tt_aV[TITLEFONTSIZE];
f.fontWeight="bold";
f.textAlign=tt_aV[TITLEALIGN];
if(tt_aElt[4]){f=tt_aElt[4].style;
f.background=tt_aV[CLOSEBTNCOLORS][0];
f.color=tt_aV[CLOSEBTNCOLORS][1];
f.fontFamily=tt_aV[TITLEFONTFACE];
f.fontSize=tt_aV[TITLEFONTSIZE];
f.fontWeight="bold"
}if(tt_aV[WIDTH]>0){tt_w=tt_aV[WIDTH]
}else{tt_w=taleo.core.widgets.callout.tt_GetDivW(tt_aElt[3])+taleo.core.widgets.callout.tt_GetDivW(tt_aElt[4]);
if(tt_aElt[4]){tt_w+=b
}if(tt_aV[WIDTH]<-1&&tt_w>-tt_aV[WIDTH]){tt_w=-tt_aV[WIDTH]
}}if(tt_aV[CLOSEBTN]&&tt_aV[EXTRAWIDTH]){tt_w+=tt_aV[EXTRAWIDTH]
}a=-c
}else{tt_w=0;
a=0
}f=tt_aElt[5].style;
f.top=a+"px";
if(c){f.borderColor=tt_aV[BORDERCOLOR];
f.borderStyle=tt_aV[BORDERSTYLE];
f.borderWidth=c+"px"
}if(tt_aV[BGCOLOR].length){f.background=tt_aV[BGCOLOR]
}if(tt_aV[BGIMG].length){f.backgroundImage="url("+tt_aV[BGIMG]+")"
}f.padding=b+"px";
f.textAlign=tt_aV[TEXTALIGN];
if(tt_aV[HEIGHT]){f.overflow="auto";
if(tt_aV[HEIGHT]>0){f.height=(tt_aV[HEIGHT]+i)+"px"
}else{tt_h=i-tt_aV[HEIGHT]
}}f=tt_aElt[6].style;
f.color=tt_aV[FONTCOLOR];
f.fontFamily=tt_aV[FONTFACE];
f.fontSize=tt_aV[FONTSIZE];
f.fontWeight=tt_aV[FONTWEIGHT];
f.textAlign=tt_aV[TEXTALIGN];
if(tt_aV[WIDTH]>0){j=tt_aV[WIDTH]
}else{if(tt_aV[WIDTH]==-1&&tt_w){j=tt_w
}else{j=taleo.core.widgets.callout.tt_GetDivW(tt_aElt[6]);
if(tt_aV[WIDTH]<-1&&j>-tt_aV[WIDTH]){j=-tt_aV[WIDTH]
}}}if(tt_aV[CLOSEBTN]&&tt_aV[EXTRAWIDTH]){j+=tt_aV[EXTRAWIDTH]
}if(j>tt_w){tt_w=j
}tt_w+=i;
if(tt_aV[SHADOW]){tt_w+=tt_aV[SHADOWWIDTH];
g=Math.floor((tt_aV[SHADOWWIDTH]*4)/3);
f=tt_aElt[7].style;
f.top=a+"px";
f.left=g+"px";
f.width=(tt_w-g-tt_aV[SHADOWWIDTH])+"px";
f.height=tt_aV[SHADOWWIDTH]+"px";
f.background=tt_aV[SHADOWCOLOR];
f=tt_aElt[8].style;
f.top=g+"px";
f.left=(tt_w-tt_aV[SHADOWWIDTH])+"px";
f.width=tt_aV[SHADOWWIDTH]+"px";
f.background=tt_aV[SHADOWCOLOR]
}else{g=0
}taleo.core.widgets.callout.tt_SetTipOpa(tt_aV[FADEIN]?0:tt_aV[OPACITY]);
taleo.core.widgets.callout.tt_FixSize(a,g)
};
taleo.core.widgets.callout.tt_FixSize=function(a,g){var j,d,f,k,b=tt_aV[PADDING],c=tt_aV[BORDERWIDTH],e;
tt_aElt[0].style.width=tt_w+"px";
tt_aElt[0].style.pixelWidth=tt_w;
d=tt_w-((tt_aV[SHADOW])?tt_aV[SHADOWWIDTH]:0);
j=d;
if(!tt_bBoxOld){j-=(b+c)<<1
}tt_aElt[5].style.width=j+"px";
if(tt_aElt[1]){j=d-((tt_aV[TITLEPADDING]+2)<<1);
if(!tt_bBoxOld){d=j
}tt_aElt[1].style.width=d+"px";
tt_aElt[2].style.width=j+"px"
}if(tt_h){f=taleo.core.widgets.callout.tt_GetDivH(tt_aElt[5]);
if(f>tt_h){if(!tt_bBoxOld){tt_h-=(b+c)<<1
}tt_aElt[5].style.height=tt_h+"px"
}}tt_h=taleo.core.widgets.callout.tt_GetDivH(tt_aElt[0])+a;
if(tt_aElt[8]){tt_aElt[8].style.height=(tt_h-g)+"px"
}e=tt_aElt.length-1;
if(tt_aElt[e]){tt_aElt[e].style.width=tt_w+"px";
tt_aElt[e].style.height=tt_h+"px"
}};
taleo.core.widgets.callout.tt_DeAlt=function(c){var a;
if(c){a=c.childNodes||c.children||null;
if(a){for(var b=a.length;
b;
){taleo.core.widgets.callout.tt_DeAlt(a[--b])
}}}};
taleo.core.widgets.callout.tt_OpDeHref=function(a){if(!tt_op){return
}if(tt_elDeHref){taleo.core.widgets.callout.tt_OpReHref()
}while(a){if(a.hasAttribute&&a.hasAttribute("href")){a.t_href=a.getAttribute("href");
a.t_stats=window.status;
a.removeAttribute("href");
a.style.cursor="hand";
tt_AddEvtFnc(a,"mousedown",tt_OpReHref);
window.status=a.t_href;
tt_elDeHref=a;
break
}a=taleo.core.widgets.callout.tt_GetDad(a)
}};
taleo.core.widgets.callout.tt_OpReHref=function(){if(tt_elDeHref){tt_elDeHref.setAttribute("href",tt_elDeHref.t_href);
taleo.core.widgets.callout.tt_RemEvtFnc(tt_elDeHref,"mousedown",tt_OpReHref);
window.status=tt_elDeHref.t_stats;
tt_elDeHref=null
}};
taleo.core.widgets.callout.tt_El2Tip=function(){var a=tt_t2t.style;
tt_t2t.t_cp=a.position;
tt_t2t.t_cl=a.left;
tt_t2t.t_ct=a.top;
tt_t2t.t_cd=a.display;
tt_t2tDad=taleo.core.widgets.callout.tt_GetDad(tt_t2t);
taleo.core.widgets.callout.tt_MovDomNode(tt_t2t,tt_t2tDad,tt_aElt[6]);
a.display="block";
a.position="static";
a.left=a.top=a.marginLeft=a.marginTop="0px"
};
taleo.core.widgets.callout.tt_UnEl2Tip=function(){var a=tt_t2t.style;
a.display=tt_t2t.t_cd;
tt_MovDomNode(tt_t2t,taleo.core.widgets.callout.tt_GetDad(tt_t2t),tt_t2tDad);
a.position=tt_t2t.t_cp;
a.left=tt_t2t.t_cl;
a.top=tt_t2t.t_ct;
tt_t2tDad=null
};
taleo.core.widgets.callout.tt_OverInit=function(){if(window.event){tt_over=window.event.target||window.event.srcElement
}else{tt_over=tt_ovr_
}taleo.core.widgets.callout.tt_DeAlt(tt_over);
taleo.core.widgets.callout.tt_OpDeHref(tt_over)
};
taleo.core.widgets.callout.tt_ShowInit=function(){tt_tShow.Timer("taleo.core.widgets.callout.tt_Show()",tt_aV[DELAY],true);
if(tt_aV[CLICKCLOSE]||tt_aV[CLICKSTICKY]){taleo.core.widgets.callout.tt_AddEvtFnc(document,"mouseup",taleo.core.widgets.callout.tt_OnLClick)
}};
taleo.core.widgets.callout.tt_Show=function(){var a=tt_aElt[0].style;
a.zIndex=Math.max((window.dd&&dd.z)?(dd.z+2):0,1010);
if(tt_aV[STICKY]||!tt_aV[FOLLOWMOUSE]){tt_iState&=~4
}if(tt_aV[EXCLUSIVE]){tt_iState|=8
}if(tt_aV[DURATION]>0){tt_tDurt.Timer("taleo.core.widgets.callout.tt_HideInit()",tt_aV[DURATION],true)
}taleo.core.widgets.callout.tt_ExtCallFncs(0,"Show");
a.visibility="visible";
tt_iState|=2;
if(tt_aV[FADEIN]){tt_Fade(0,0,tt_aV[OPACITY],Math.round(tt_aV[FADEIN]/tt_aV[FADEINTERVAL]))
}taleo.core.widgets.callout.tt_ShowIfrm()
};
taleo.core.widgets.callout.tt_ShowIfrm=function(){if(tt_ie56){var a=tt_aElt[tt_aElt.length-1];
if(a){var b=a.style;
b.zIndex=tt_aElt[0].style.zIndex-1;
b.display="block"
}}};
taleo.core.widgets.callout.tt_Move=function(a){if(a){tt_ovr_=a.target||a.srcElement
}a=a||window.event;
if(a){tt_musX=taleo.core.widgets.callout.tt_GetEvtX(a);
tt_musY=taleo.core.widgets.callout.tt_GetEvtY(a)
}if(tt_iState&4){if(!tt_op&&!tt_ie){if(tt_bWait){return
}tt_bWait=true;
tt_tWaitMov.Timer("tt_bWait = false;",1,true)
}if(tt_aV[FIX]){tt_iState&=~4;
taleo.core.widgets.callout.tt_PosFix()
}else{if(!taleo.core.widgets.callout.tt_ExtCallFncs(a,"MoveBefore")){taleo.core.widgets.callout.tt_SetTipPos(taleo.core.widgets.callout.tt_Pos(0),taleo.core.widgets.callout.tt_Pos(1))
}}taleo.core.widgets.callout.tt_ExtCallFncs([tt_musX,tt_musY],"MoveAfter")
}};
taleo.core.widgets.callout.tt_Pos=function(b){var h,j,c,a,d,f,e,g,i;
if(b){j=tt_aV[JUMPVERT];
c=ABOVE;
a=OFFSETY;
d=tt_h;
f=tt_maxPosY;
e=taleo.core.widgets.callout.tt_GetScrollY();
g=tt_musY;
i=tt_bJmpVert
}else{j=tt_aV[JUMPHORZ];
c=LEFT;
a=OFFSETX;
d=tt_w;
f=tt_maxPosX;
e=taleo.core.widgets.callout.tt_GetScrollX();
g=tt_musX;
i=tt_bJmpHorz
}if(j){if(tt_aV[c]&&(!i||taleo.core.widgets.callout.tt_CalcPosAlt(b)>=e+16)){h=taleo.core.widgets.callout.tt_PosAlt(b)
}else{if(!tt_aV[c]&&i&&taleo.core.widgets.callout.tt_CalcPosDef(b)>f-16){h=taleo.core.widgets.callout.tt_PosAlt(b)
}else{h=taleo.core.widgets.callout.tt_PosDef(b)
}}}else{h=g;
if(tt_aV[c]){h-=d+tt_aV[a]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0)
}else{h+=tt_aV[a]
}}if(h>f){h=j?taleo.core.widgets.callout.tt_PosAlt(b):f
}if(h<e){h=j?taleo.core.widgets.callout.tt_PosDef(b):e
}return h
};
taleo.core.widgets.callout.tt_PosDef=function(a){if(a){tt_bJmpVert=tt_aV[ABOVE]
}else{tt_bJmpHorz=tt_aV[LEFT]
}return taleo.core.widgets.callout.tt_CalcPosDef(a)
};
taleo.core.widgets.callout.tt_PosAlt=function(a){if(a){tt_bJmpVert=!tt_aV[ABOVE]
}else{tt_bJmpHorz=!tt_aV[LEFT]
}return taleo.core.widgets.callout.tt_CalcPosAlt(a)
};
taleo.core.widgets.callout.tt_CalcPosDef=function(a){return a?(tt_musY+tt_aV[OFFSETY]):(tt_musX+tt_aV[OFFSETX])
};
taleo.core.widgets.callout.tt_CalcPosAlt=function(b){var c=b?OFFSETY:OFFSETX;
var a=tt_aV[c]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0);
if(tt_aV[c]>0&&a<=0){a=1
}return((b?(tt_musY-tt_h):(tt_musX-tt_w))-a)
};
taleo.core.widgets.callout.tt_PosFix=function(){var a,b;
if(typeof(tt_aV[FIX][0])=="number"){a=tt_aV[FIX][0];
b=tt_aV[FIX][1]
}else{if(typeof(tt_aV[FIX][0])=="string"){el=taleo.core.widgets.callout.tt_GetElt(tt_aV[FIX][0])
}else{el=tt_aV[FIX][0]
}a=tt_aV[FIX][1];
b=tt_aV[FIX][2];
if(!tt_aV[ABOVE]&&el){b+=taleo.core.widgets.callout.tt_GetDivH(el)
}for(;
el;
el=el.offsetParent){a+=el.offsetLeft||0;
b+=el.offsetTop||0
}}if(tt_aV[ABOVE]){b-=tt_h
}taleo.core.widgets.callout.tt_SetTipPos(a,b)
};
taleo.core.widgets.callout.tt_Fade=function(b,c,d,e){if(e){c+=Math.round((d-c)/e);
if((d>b)?(c>=d):(c<=d)){c=d
}else{tt_tFade.Timer("taleo.core.widgets.callout.tt_Fade("+b+","+c+","+d+","+(e-1)+")",tt_aV[FADEINTERVAL],true)
}}c?taleo.core.widgets.callout.tt_SetTipOpa(c):taleo.core.widgets.callout.tt_Hide()
};
taleo.core.widgets.callout.tt_SetTipOpa=function(a){taleo.core.widgets.callout.tt_SetOpa(tt_aElt[5],a);
if(tt_aElt[1]){taleo.core.widgets.callout.tt_SetOpa(tt_aElt[1],a)
}if(tt_aV[SHADOW]){a=Math.round(a*0.8);
taleo.core.widgets.callout.tt_SetOpa(tt_aElt[7],a);
taleo.core.widgets.callout.tt_SetOpa(tt_aElt[8],a)
}};
taleo.core.widgets.callout.tt_OnCloseBtnOver=function(b){var a=tt_aElt[4].style;
b<<=1;
a.background=tt_aV[CLOSEBTNCOLORS][b];
a.color=tt_aV[CLOSEBTNCOLORS][b+1]
};
taleo.core.widgets.callout.tt_OnLClick=function(a){a=a||window.event;
if(!((a.button&&a.button&2)||(a.which&&a.which==3))){if(tt_aV[CLICKSTICKY]&&(tt_iState&4)){tt_aV[STICKY]=true;
tt_iState&=~4
}else{if(tt_aV[CLICKCLOSE]){taleo.core.widgets.callout.tt_HideInit()
}}}};
taleo.core.widgets.callout.tt_Int=function(a){var b;
return(isNaN(b=parseInt(a))?0:b)
};
Number.prototype.Timer=function(c,b,a){if(!this.value||a){this.value=window.setTimeout(c,b)
}};
Number.prototype.EndTimer=function(){if(this.value){window.clearTimeout(this.value);
this.value=0
}};
taleo.core.widgets.callout.tt_GetWndCliSiz=function(c){var a,f=window["inner"+c],e="client"+c,d="number";
if(typeof f==d){var b;
return(((a=document.body)&&typeof(b=a[e])==d&&b&&b<=f)?b:((a=document.documentElement)&&typeof(b=a[e])==d&&b&&b<=f)?b:f)
}return(((a=document.documentElement)&&(f=a[e]))?f:document.body[e])
};
taleo.core.widgets.callout.tt_SetOpa=function(c,a){var b=c.style;
tt_opa=a;
if(tt_flagOpa==1){if(a<100){if(typeof(c.filtNo)==tt_u){c.filtNo=b.filter
}var d=b.visibility!="hidden";
b.zoom="100%";
if(!d){b.visibility="visible"
}b.filter="alpha(opacity="+a+")";
if(!d){b.visibility="hidden"
}}else{if(typeof(c.filtNo)!=tt_u){b.filter=c.filtNo
}}}else{a/=100;
switch(tt_flagOpa){case 2:b.KhtmlOpacity=a;
break;
case 3:b.KHTMLOpacity=a;
break;
case 4:b.MozOpacity=a;
break;
case 5:b.opacity=a;
break
}}};
taleo.core.widgets.callout.tt_Err=function(b,a){if(tt_Debug||!a){alert("Tooltip Script Error Message:\n\n"+b)
}};
taleo.core.widgets.callout.tt_ExtCmdEnum=function(){var s;
for(var i in taleo.core.widgets.callout.config){s="window."+i.toString().toUpperCase();
if(eval("typeof("+s+") == tt_u")){eval(s+" = "+tt_aV.length);
tt_aV[tt_aV.length]=null
}}};
taleo.core.widgets.callout.tt_ExtCallFncs=function(c,d){var a=false;
for(var e=tt_aExt.length;
e;
){--e;
var f=tt_aExt[e]["On"+d];
if(f&&f(c)){a=true
}}return a
};
taleo.core.widgets.callout.tt_init=function(){taleo.core.widgets.callout.tt_Init()
};
window.onload=OnLoadPage;
function OnLoadPage(){var a=document.getElementsByClassName("error-label");
if(a.length>0){window.document.title="Error - "+window.document.title
}}if(!document.getElementsByClassName){document.getElementsByClassName=function(b){var a=[];
var d=this.getElementsByTagName("*");
for(var c=0;
c<d.length;
c++){if((" "+d[c].className+" ").indexOf(" "+b+" ")>-1){a.push(d[c])
}}return a
}
}window.document.jsfForm=function(){return taleo.core.jsfForm()
};
String.prototype.endsWith=function(a){return taleo.core.endsWith(this,a)
};
String.prototype.trim=function(){return taleo.core.trim(this)
};
function getEventElement(a){return taleo.core.getEventElement(a)
}function forceSubmit(){taleo.core.forceSubmit()
}function forceCommandSubmit(a){taleo.core.forceCommandSubmit(a)
}function dontKeepScrollPosition(){return taleo.core.dontKeepScrollPosition()
}function findParentOfType(b,a){return taleo.core.findParentOfType(b,a)
}function findElementsEndingWithId(b,c,d,a){return taleo.core.findElementsEndingWithId(b,c,d,a)
}function findElementsEndingWithName(b,d,c,a){return taleo.core.findElementsEndingWithName(b,d,c,a)
}function findElementByClass(a,b){return taleo.core.findElementByClass(a,b)
}function findAllElementsByClass(a,c,b){return taleo.core.findAllElementsByClass(a,c,b)
}function getElementHeight(a,b){elem=findElementByClass(a,b);
if(elem!=null){rect=elem.getBoundingClientRect();
return rect.bottom-rect.top
}return 0
}function previousSiblingWithTag(b,a){return taleo.core.previousSiblingWithTag(b,a)
}function nextSiblingWithTag(b,a){return taleo.core.nextSiblingWithTag(b,a)
}function nextSiblingWithoutTag(b,a){return taleo.core.nextSiblingWithoutTag(b,a)
}function getCenterPanelHeight(a){var d=0;
var b=0;
var g=previousSiblingWithTag(a,"span");
var f=nextSiblingWithTag(a,"span");
if(g!=null){var e=g.getBoundingClientRect();
d=e.bottom-e.top
}if(f!=null){var c=f.getBoundingClientRect();
b=c.bottom-c.top
}return document.documentElement.clientHeight-d-b
}function bookmarkMe(){url=document.jsfForm()["bookmarkURLHF"].value;
name=document.jsfForm()["bookmarkNameHF"].value;
if(url!=null){window.external.AddFavorite(url,name)
}return false
}function execDefaultCmdOnEnterKeyPress(a){taleo.core.execDefaultCmdOnEnterKeyPress(a)
}function getKeyPressed(a){return taleo.core.getKeyPressed(a)
}function findDefaultCmd(a){return taleo.core.findDefaultCmd(a)
}function clearInputTime(a){var b=findElementsEndingWithId(null,a+"-h",null,true);
if(b.length>0){b[0].value="--"
}var b=findElementsEndingWithId(null,a+"-m",null,true);
if(b.length>0){b[0].value="--"
}var b=findElementsEndingWithId(null,a+"-a",null,true);
if(b.length>0){b[0].value="--"
}return false
}function clearInputDate(a){var b=findCalendarByID(a);
if(b!=null){document.jsfForm()[b.hiddenFieldID].value="emptied";
showInputDateIfEmptyFacet(a)
}return false
}function getInputDateDate(a){var b=findCalendarByID(a);
if(b!=null&&document.jsfForm()[b.hiddenFieldID].value.length>0){return parseDate(document.jsfForm()[b.hiddenFieldID].value,b.ifFormat,new Object())
}return null
}function setInputDateDate(b,a){var c=findCalendarByID(b);
if(c!=null){document.jsfForm()[c.hiddenFieldID].value=a.print(c.ifFormat);
window.document.getElementById(c.spanID).innerHTML=a.print(c.daFormat)
}}function getElementIntValue(a){var b=null;
var c=findElementsEndingWithId(null,a,null,true);
if(c.length>0){b=c[0]
}else{return -1
}if(b.tagName=="INPUT"){return parseInt(b.value)
}return parseInt(b.innerHTML)
}function manageTableSelCount(i,b,c,j){i=(i)?i:window.event;
var a=getEventElement(i);
if(a.tagName!="INPUT"||a.type!="checkbox"){return
}var e=null;
var f=null;
var k=null;
if(b!=null){elements=findElementsEndingWithId(null,b,null,true);
if(elements.length>0){f=elements[0]
}}if(c!=null){elements=findElementsEndingWithId(null,c,null,true);
if(elements.length>0){k=elements[0]
}}elements=findElementsEndingWithId(null,j,null,true);
if(elements.length>0){e=elements[0]
}var h=findParentOfType(a,"THEAD");
if(h!=null){if(a.type=="checkbox"){if(a.checked){if(f!=null&&k!=null){k.innerHTML=f.value
}e.value="3"
}else{if(k!=null){k.innerHTML="0"
}e.value="2"
}formCheckAll(a)
}}else{if(k!=null){var d=findParentOfType(a,"TBODY");
if(d!=null&&a.type=="checkbox"){var g=parseInt(k.innerHTML);
g=a.checked?g+1:g-1;
k.innerHTML=g.toString();
formSyncCheckAll2(a,true)
}}}}function clearQuickFinder(c){var b=window.document.getElementById(c);
if(b){b.value="";
if(b.fireEvent){b.fireEvent("onchange")
}else{if(document.createEvent){var a=document.createEvent("HTMLEvents");
a.initEvent("change",true,true);
b.dispatchEvent(a)
}}}}function activateQuickFinderValidation(c){var b=window.document.getElementById(c+".disValid");
if(b.length>0){var a=b[0];
a.value="false"
}}function reloadWindow(){taleo.core.reloadWindow()
}function getTableSelectionCount(c){var b=findElementsEndingWithId(null,c,null,true)[0];
var a=window.document.getElementById(b.id+"._selCount");
return parseInt(a.value)
}function disableCommand(b,c){var a=findElementsEndingWithId(null,b,null,true)[0];
disableCommandButton(a.id,2,false,c)
}function disableActionBar(b,c){var a=findElementsEndingWithId(null,b,null,true)[0];
disableCommandButton(a.id,3,false,c)
}function inputRichTextInsertHtml(b,a){var c=findElementsEndingWithId(null,b,null,true)[0];
EditorUtils.insertHtmlText(c.id,a)
}function getHelpPane(a){var b=findElementsEndingWithId(null,a,null,true);
if(b!=null&&b.length>0){return b[0]
}return null
}function displayHelp(b,a,d){if(a!=null){if(d==null){d="inline"
}var c=getHelpPane(a);
if(c!=null){c.style.display=d;
c.style.visibility=""
}}activateHelpContext(b);
return false
}function hideHelp(a){var b=getHelpPane(a);
if(b!=null){b.style.display="none";
b.style.visibility="hidden"
}return false
}function popupHelpWindow(b,a){helpWindow=b();
if(a!=null){getHelpPane(a);
helpIFrameDiv=findElementsEndingWithId(null,"iframe",null,true)[0];
if(helpIFrameDiv!=null){if(helpIFrameDiv.childNodes){var c=helpIFrameDiv.childNodes[0];
helpWindow.location=c.src
}}hideHelp(a)
}return false
}function isRichTextWithId(a,b){return a.id.endsWith(b+"___Frame")
}function createIFrame(h,e,d,c,b,f,a,g){taleo.core.createIFrame(h,e,d,c,b,f,a,g)
}var BalloonComponent={changeContent:function(a,b){BalloonRenderer.contentReady(a,b)
}};
function BalloonAjaxHandler(){}BalloonAjaxHandler.prototype.onInit=function(){};
BalloonAjaxHandler.prototype.onError=function(a,b){};
BalloonAjaxHandler.prototype.onProgress=function(b,a){};
BalloonAjaxHandler.prototype.onLoad=function(a){var c=AjaxActionComponent.getContentElement(a);
var b=AjaxActionComponent.getCallerContextComponentId(a);
var d=ElementUtils.cloneItem(c);
BalloonComponent.changeContent(b,d)
};
var AjaxActionComponent={getContentElement:function(a){return a.getElementsByTagName("content")[0].firstChild
},getCallerContextElement:function(a){return a.getElementsByTagName("callerContext")[0]
},getCallerContextComponentId:function(a){return this.getCallerContextElement(a).getElementsByTagName("componentId")[0].firstChild.nodeValue
}};
var AKCore={messagesResGroupId_:-1,_hasFocus:false,adaptExternalLinks:function(){var d=document.jsfForm();
if(!d||!d.getElementsByTagName){return
}var c=d.getElementsByTagName("a");
for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.getAttribute("href")&&a.getAttribute("rel")=="external"){a.target="_blank"
}}},activeElements:[],maxActiveELements:2,trackActiveElements:function(){var b=this;
var f=function(h){b._trackActiveElement(h)
};
if(document.attachEvent){var d=document.jsfForm();
if(d&&d.length>0){var a=d.elements;
for(var c=0,g=d.length;
c<g;
c++){var e=a[c];
addEvent(e,"focus",f)
}}}else{var b=this;
addEvent(document,"focus",f)
}},_trackActiveElement:function(a){var d=EventUtils.getTargetElement(a);
var c=d==document?null:d;
if(c){var b=this.activeElements.unshift(c);
if(b>this.maxActiveElements){this.activeElements.splice(this.maxActiveElements,b-this.maxActiveElements)
}}},$last:null};
var contextPath_;
var tocPage_;
var buildVersion_;
var useVerStatFiles_;
var currentModal;
function WaitingWindow(b,d,a,c,e){taleo.core.widgets.WaitingWindow(b,d,a,c,e)
}function writeText(a,b){if("innerText" in a){a.innerText=b
}else{a.textContent=b
}}function findWaitingWindow(a){return taleo.core.widgets.findWaitingWindow(a)
}function show(b,c){var a=document.getElementById(b);
if(a){a.style.visibility="visible";
if(c){if(a.style.display=="none"){a.style.display=""
}}}}function hide(b,c){var a=document.getElementById(b);
if(a){a.style.visibility="hidden";
if(c){a.style.display="none"
}}}function setFocusOn(){taleo.core.beacon.setFocusOn()
}function setFocusOff(){taleo.core.beacon.setFocusOff()
}function addEvent(a,c,b){taleo.core.addEvent(a,c,b)
}function addEventByEndingID(c,b,a){taleo.core.addEventByEndingID(c,b,a)
}function removeEvent(a,c,b){taleo.core.removeEvent(a,c,b)
}function hasClass(b,a){return taleo.core.hasClass(b,a)
}function removeClass(b,a){taleo.core.removeClass(b,a)
}function addClass(b,a){taleo.core.addClass(b,a)
}function addClasses(a,b){taleo.core.addClasses(a,b)
}function addParameter(b,a,c){return taleo.core.addParameter(b,a,c)
}function stopSubmit(a){taleo.core.stopSubmit(a)
}function stdSubmit(a,b){taleo.core.stdSubmit(a,b)
}function handleOutputLinkClick(a){taleo.core.handleOutputLinkClick(a)
}function logViewInfo(a){}function setWaitCursorForSubmit(a){taleo.core.setWaitCursorForSubmit(a)
}function clearWaitCursorForSubmit(a){taleo.core.clearWaitCursorForSubmit(a)
}function cmdSubmit(e,c,b,d,a){taleo.core.cmdSubmit(e,c,b,d,a)
}function subCmdSubmit(c,a,b){taleo.core.subCmdSubmit(c,a,b)
}function manageKeepScrollPos(a){taleo.core.manageKeepScrollPos(a)
}function restoreScrollPos(a,b){taleo.core.restoreScrollPos(a,b)
}function emptyCmdHF(a){taleo.core.emptyCmdHF(a)
}function getIFrameDoc(a){return taleo.core.getIFrameDoc(a)
}function sendUIMessage2(a){taleo.core.logging.warn("'sendUIMessage2' is deprecated. See code for replacement recommendation.");
return taleo.core.beacon.sendMessageToUIMessageReceiverServlet(a,"GET",true)
}function openWaitingWindow(a){taleo.core.widgets.openWaitingWindow(a)
}function openModalDialog(b,a,c){taleo.core.widgets.openModalDialog(b,a,c)
}function checkModal(){taleo.core.widgets.checkModal()
}function finishChecking(){taleo.core.widgets.finishChecking()
}function installSessionBeacon(b,d,a,c){taleo.core.beacon.installSessionBeacon(b,d,a,c)
}function reviveSession(a){taleo.core.beacon.reviveSession(a)
}function resetSessionBeacon(){taleo.core.beacon.resetSessionBeacon()
}function initSessionBeacon(){taleo.core.beacon.initSessionBeacon()
}function invalidateSession(){taleo.core.beacon.invalidateSession()
}function manageSessionWarning(){taleo.core.beacon.manageSessionWarning()
}function manageSessionTimeout(){taleo.core.beacon.manageSessionTimeout()
}function redirectSession(){taleo.core.beacon.redirectSession()
}function flexSessionWarningClosed(){taleo.core.beacon.flexSessionWarningClosed()
}function flexSessionTimeoutClosed(){taleo.core.beacon.flexSessionTimeoutClosed()
}function recordUserActivity(){taleo.core.beacon.recordUserActivity()
}function gotoTOC(){taleo.core.beacon.gotoTOC()
}function gotoUrl(a){taleo.core.beacon.gotoUrl(a)
}function installCoreRequiredEvents(){taleo.core.installCoreRequiredEvents()
}function unloadMess(a){taleo.core.unloadMess(a)
}function onUnload(a){taleo.core.onUnload(a)
}function formatTimezone(a){return taleo.core.formatTimezone(a)
}var expanders_=[];
var expandersGroups_=[];
var expandersGroupsByExpanders_=[];
function ExpanderGroup(a){this.id=a;
this.expandersIds=[];
this.firstClickDone=false
}function addExpanderToGroup(a,b){var c=expandersGroups_[a];
if(c==null){c=new ExpanderGroup(a);
expandersGroups_[a]=c
}c.expandersIds[c.expandersIds.length]=b;
expandersGroupsByExpanders_[b]=c
}function Expander(g,d,f,b,k,e,j,h,c,a){this.id=g;
this.expandedId=d;
this.expandedContentId=f;
this.collapsedId=b;
this.formId=k;
this.forId=e;
this.expandedValue=j;
this.collapsedValue=h;
this.stateValue=c;
this.expandedDisplayStyle=a;
this.expandedContentDisplayStyle=a;
if(this.forId){this.expandedForDisplayStyle=a
}}function addExpander(g,d,f,b,k,e,j,h,c,a){var l=new Expander(g,d,f,b,k,e,j,h,c,a);
expanders_[g]=l
}function expand(b,a){var d=expanders_[b];
var c=expandersGroupsByExpanders_[b];
if(c==null||a==true){document.forms[d.formId][d.id].value=d.expandedValue;
show(d.expandedId,true);
document.getElementById(d.expandedId).className=d.expandedDisplayStyle;
show(d.expandedContentId,true);
document.getElementById(d.expandedContentId).className=d.expandedContentDisplayStyle;
if(d.forId){show(d.forId,true);
document.getElementById(d.forId).className=d.expandedForDisplayStyle
}hide(d.collapsedId,true);
d.stateValue=d.expandedValue
}}function collapse(b,a){var d=expanders_[b];
var c=expandersGroupsByExpanders_[b];
if(c==null||a==true){var d=expanders_[b];
document.forms[d.formId][d.id].value=d.collapsedValue;
hide(d.expandedId,true);
hide(d.expandedContentId,true);
if(d.forId){hide(d.forId,true)
}show(d.collapsedId,true);
document.getElementById(d.collapsedId).className=d.expandedDisplayStyle;
d.stateValue=d.collapsedValue
}}function selectExpanderGroupSection(b,c){var d=expandersGroups_[b];
var a=expanders_[c];
if(d.expandersIds.length==2){for(i=0;
i<d.expandersIds.length;
i++){var e=expanders_[d.expandersIds[i]];
if(e.stateValue==e.expandedValue){collapse(e.id,true)
}else{expand(e.id,true)
}}}else{if(a.stateValue==a.collapsedValue||!d.firstClickDone){d.firstClickDone=true;
expand(a.id,true);
for(i=0;
i<d.expandersIds.length;
i++){var e=expanders_[d.expandersIds[i]];
if(e.id!=c){if(e.stateValue==e.expandedValue){collapse(e.id,true)
}}}}}}function leftTrim(a){while(a.substring(0,1)==" "){a=a.substring(1,a.length)
}return a
}function rightTrim(a){while(a.substring(a.length-1,a.length)==" "){a=a.substring(0,a.length-1)
}return a
}function trimAll(a){a=leftTrim(a);
a=rightTrim(a);
return a
}function computeWindowOffsetLeft(c){var a=0;
var b=c;
while(typeof(b.parentNode)!="undefined"&&b.parentNode){var b=b.parentNode;
if(typeof(b.offsetLeft)!="undefined"){a+=b.offsetLeft
}}return a+c.offsetLeft
}function computeWindowOffsetTop(c){var a=0;
var b=c;
while(typeof(b.parentNode)!="undefined"&&b.parentNode){var b=b.parentNode;
if(typeof(b.offsetLeft)!="undefined"){a+=b.offsetTop
}}return a+c.offsetTop
}function getBrowserInfo(){return taleo.core.getBrowserInfo()
}var Core={hideShowCovered:function(a,b){var c=function(){function e(p){var k=p.style.visibility;
if(!k){if(document.defaultView&&typeof(document.defaultView.getComputedStyle)=="function"){if(!AgentUtils.is_khtml){k=document.defaultView.getComputedStyle(p,"").getPropertyValue("visibility")
}else{k=""
}}else{if(p.currentStyle){k=p.currentStyle.visibility
}else{k=""
}}}return k
}var v=new Array("applet","iframe","select");
var d=Calendar.getAbsolutePos(a);
var h=d.x;
var f=a.offsetWidth+h;
var u=d.y;
var t=a.offsetHeight+u;
for(var l=v.length;
l>0;
){var j=document.getElementsByTagName(v[--l]);
for(var n=j.length;
n>0;
){var g=j[--n];
d=HTMLUtils.getAbsolutePosition(g);
var s=d.x;
var r=g.offsetWidth+s;
var o=d.y;
var m=g.offsetHeight+o;
var q;
if(b||(s>f)||(r<h)||(o>t)||(m<u)){q=false
}else{q=true
}if(!g.getAttributeNode("msh_save_visibility")){g.setAttribute("msh_save_visibility",e(g))
}g.style.visibility=q?"hidden":g.getAttribute("msh_save_visibility")
}}};
if(AgentUtils.is_khtml){setTimeout("continuation_for_the_khtml_browser()",10)
}else{c()
}},encodeURIComponent:function(a){return encodeURIComponent(a)
},isValueInArray:function(a,b){return taleo.core.common.isValueInArray(a,b)
}};
function CellCoords(a,e,c,d,b){this.table=a;
this.groupName=e.parentNode.tagName.toLowerCase();
this.row=e;
this.cell=c;
this.rowIndex=d;
this.columnIndex=b
}var HTMLUtils={NO_BREAK_SPACE:"\u00A0",addLabel:function(c,a,d,e){var b=this.addElement(c,"label");
if(a){b.id=a
}if(d){b.htmlFor=d
}this.addText(b,e);
return b
},getLabel:function(a){return ElementUtils.getChildElementByTagName(a,"LABEL")
},getInput:function(a){return ElementUtils.getChildElementByTagName(a,"INPUT")
},ELEMENT_NODE:1,TEXT_NODE:3,addInput:function(e,b,c,a){var d=this.addElement(null,"input");
d.setAttribute("type",b||"text");
if(c){d.setAttribute("id",c)
}d.setAttribute("value",a);
if(e){e.appendChild(d)
}return d
},addTextArea:function(e,b,d,f,a){var c=this.addElement(null,"textarea");
if(b){c.setAttribute("id",b)
}c.setAttribute("value",a);
c.setAttribute("rows",d);
c.setAttribute("cols",f);
if(e){e.appendChild(c)
}return c
},addSelect:function(e,c,b,a){var d=this.addElement(null,"select");
if(c){d.setAttribute("id",c)
}d.setAttribute("size",""+b);
if(a){d.setAttribute("multiple","multiple")
}if(e){e.appendChild(d)
}return d
},addSelectOption:function(c,a,e,d){var b=this.addElement(null,"option");
b.setAttribute("value",a);
if(d){b.setAttribute("selected","selected")
}this.addText(b,e||a);
if(c){c.appendChild(b)
}return b
},addFieldSet:function(c,a){var b=this.addElement(null,"fieldset");
if(a){b.setAttribute("id",a)
}if(c){c.appendChild(b)
}return b
},addLegend:function(b,c){var a=this.addElement(b,"legend");
if(c){this.addText(a,c)
}return a
},addSpan:function(b,c){var a=this.addElement(b,"span");
if(c){this.addText(a,c)
}return a
},addDiv:function(b,c){var a=this.addElement(b,"div");
if(c){this.addText(a,c)
}return a
},addList:function(a){return this.addElement(a,"ul")
},addListItem:function(a){return this.addElement(a,"li")
},addImg:function(b,c){var a=this.addElement(b,"img");
a.src=c;
return a
},addAnchor:function(c,a){var b=this.addElement(c,"a");
b.href=a;
return b
},addElement:function(c,a){var b=document.createElement(a);
if(c!=null){c.appendChild(b)
}return b
},addGrid:function(g,b,c){var a=this.addDiv(g);
for(var f=0;
f<b;
f++){var e=this.addDiv(a);
for(var d=0;
d<c;
d++){cell=this.addSpan(e);
cell.setAttribute("className",d===0?"cell first-line-cell":"cell");
EventUtils.addEvent(cell,"click",addCellElement,false);
this.addText(cell,"cell "+f+", "+d)
}}return a
},addTable:function(g,f,a,d,c,e,b){var h=this.addElement(g,"table");
h.summary="";
this._addTableClass(h,e,"table");
this._addTableGroup(h,"thead",f,c,e,b);
this._addTableGroup(h,"tfoot",a,c,e,b);
this._addTableGroup(h,"tbody",d,c,e,b);
return h
},_addTableClass:function(b,c,a){if(c&&c[a]){var d=c[a];
if(typeof d=="function"){d=d(b)
}if(d){StyleUtils.addClasses(b,d)
}}},_addTableGroup:function(a,j,b,l,i,h){if(b>0){var e=j=="thead"?"th":"td";
var g=this.addElement(a,j);
this._addTableClass(g,i,j);
for(var d=0;
d<b;
d++){var k=this.addElement(g,"tr");
this._addTableClass(k,i,d%2===0?"trEven":"trOdd");
for(var c=0;
c<l;
c++){var f=this.addElement(k,e);
this._addTableClass(f,i,e);
if(h){h(a,j,d,c,f)
}}}}},addTableRow:function(a,d,c,b){return this._addTableRow(a,"tbody",d,c,b)
},_addTableRow:function(a,k,h,m,f){var c=ElementUtils.getChildElementByTagName(a,k.toUpperCase());
if(!c){return null
}var i=k=="thead"?"th":"td";
var b=c.firstChild;
var g=0;
var d=null;
while(b){if(ElementUtils.isElement(b,"TR")){if(g==h){d=b;
break
}g++
}b=b.nextSibling
}var l=this.addElement(null,"tr");
if(d){c.insertBefore(l,d)
}else{c.appendChild(l)
}for(var e=0;
e<m;
e++){var j=this.addElement(l,i);
if(f){f(a,k,h,e,j)
}}return l
},removeTableRow:function(a,b){this._removeTableRow(a,"tbody",b)
},_removeTableRow:function(b,a,e){var c=ElementUtils.getChildElementByTagName(b,a.toUpperCase());
if(!c){return
}var g=c.firstChild;
var f=0;
var d=null;
while(g&&f<=e){if(ElementUtils.isElement(g,"TR")){d=g;
f++
}g=g.nextSibling
}if(d){c.removeChild(d)
}},addTableColumn:function(a,c,b){this._addTableColumn(a,"thead",c,b);
this._addTableColumn(a,"tfoot",c,b);
this._addTableColumn(a,"tbody",c,b)
},_addTableColumn:function(r,t,p,c){var m=ElementUtils.getChildElementByTagName(r,t.toUpperCase()),n=t=="thead"?"th":"td",b=n.toUpperCase(),d,j=0,e,a,h,s,k,f,g,q,l,o=function(){h=e.firstChild;
s=0;
k=null;
while(h){if(ElementUtils.isElement(h,b)){if(s==p){k=h;
break
}f=h.colSpan||1;
s+=f
}h=h.nextSibling
}a=HTMLUtils.addElement(null,n);
if(k){e.insertBefore(a,k)
}else{e.appendChild(a)
}if(c){c(r,t,j,p,a)
}};
if(m){d=m.firstChild;
while(d){l=false;
if(ElementUtils.isElement(d,"TR")){e=d;
if(n=="th"&&e.cells.length==1){a=e.cells[0];
for(q=0;
q<a.attributes.length;
q++){attribute=a.attributes[q];
if(attribute&&attribute.name=="colSpan"){attribute.value=(parseInt(attribute.value)||1)+1;
l=true;
break
}}if(!l){o()
}}else{o()
}}d=d.nextSibling;
j++
}}},removeTableColumn:function(a,b){this._removeTableColumn(a,"thead",b);
this._removeTableColumn(a,"tfoot",b);
this._removeTableColumn(a,"tbody",b)
},_removeTableColumn:function(a,k,h){var d=ElementUtils.getChildElementByTagName(a,k.toUpperCase());
if(!d){return
}var i=k=="thead"?"th":"td";
var f=i.toUpperCase();
var b=d.firstChild;
while(b){if(ElementUtils.isElement(b,"TR")){var l=b;
var c=l.firstChild;
var g=0;
var j=null;
while(c&&g<=h){if(ElementUtils.isElement(c,f)){j=c;
g+=c.colSpan||1
}c=c.nextSibling
}if(j){var e=j.colSpan||1;
if(e==1){l.removeChild(j)
}else{j.colSpan=e-1
}}}b=b.nextSibling
}},spanTableCells:function(b,f,e,a,d,c){return this._spanTableCells(b,"tbody",f,e,a,d,c)
},_spanTableCells:function(a,q,m,d,e,b,j){var o=this._getTableGroupCell(a,q,m,d);
if(e!==0){var i=o.rowSpan||1;
i+=e;
if(i>0){o.rowSpan=i
}if(e>0){var l=m+i;
for(var c=e;
c-->0;
){var r=a.rows[--l];
var k=r.cells[d];
r.removeChild(k)
}}else{var l=m+i;
for(var c=e;
c++<0;
){var r=a.rows[l++];
var f=r.insertCell(d);
if(j){j(a,q,l,d,f)
}}}}if(b!=0){var g=o.colSpan||1;
g+=b;
if(g>0){o.colSpan=g
}var r=o.parentNode;
if(b>0){for(var c=b;
c-->0;
){var p=o.nextSibling;
r.removeChild(p)
}}else{var h=d;
for(var c=b;
c++<0;
){var f=r.insertCell(++h);
if(j){j(a,q,m,h,f)
}}}}},getTableCell:function(a,c,b){return this._getTableGroupCell(a,"tbody",c,b)
},getTableHeaderCell:function(a,c,b){return this._getTableGroupCell(a,"thead",c,b)
},getTableGroupCell:function(b,a,d,c){return this._getGroupTableCell(b,a,d,c)
},_getTableGroupCell:function(a,k,g,c){var e=ElementUtils.getChildElementByTagName(a,k.toUpperCase());
if(!e){return
}var b=e.firstChild;
var h=0;
var l=null;
while(b&&h<=g){if(ElementUtils.isElement(b,"TR")){l=b;
h++
}b=b.nextSibling
}if(!l){return null
}var i=k=="thead"?"TH":"TD";
var d=l.firstChild;
var f=0;
var j=null;
while(d&&f<=c){if(ElementUtils.isElement(d,i)){j=d;
f++
}d=d.nextSibling
}return j
},isEmptyTableCell:function(a){return(a&&a.firstChild)==null
},getTableCellCoords:function(d){var i=d.parentNode;
var c=i&&i.parentNode;
var g=c&&c.tagName=="THEAD"?"TH":"TD";
var h=c&&c.parentNode;
if(!ElementUtils.isElement(h,"TABLE")){return null
}var a=c.firstChild;
var f=0;
while(a){if(ElementUtils.isElement(a,"TR")){if(i==a){break
}f++
}a=a.nextSibling
}var b=i.firstChild;
var e=0;
while(b){if(ElementUtils.isElement(b,g)){if(d==b){break
}e++
}b=b.nextSibling
}return new CellCoords(h,i,d,f,e)
},getTableOfCell:function(c){var b=c.parentNode;
var a=b.parentNode;
return a.parentNode
},getTableNbRows:function(a){return this._getTableNbRows(a,"tbody")
},_getTableNbRows:function(c,b){var d=ElementUtils.getChildElementByTagName(c,b.toUpperCase());
if(!d){return 0
}var e=d.firstChild;
var a=0;
while(e){if(ElementUtils.isElement(e,"TR")){a++
}e=e.nextSibling
}return a
},getTableNbColumns:function(a){return this._getTableNbColumns(a,"tbody")
},_getTableNbColumns:function(e,d){var c=d=="thead"?"TH":"TD";
var f=ElementUtils.getChildElementByTagName(e,d.toUpperCase());
if(!f){return 0
}var h=f.firstChild;
var b=0;
while(h){var a=0;
if(ElementUtils.isElement(h,"TR")){var g=h.firstChild;
while(g){if(ElementUtils.isElement(g,c)){a+=g.colSpan||1
}g=g.nextSibling
}}h=h.nextSibling;
b=Math.max(a,b)
}return b
},forEachTableCells:function(a,b){this._forEachTableCells(a,"thead",b);
this._forEachTableCells(a,"tfoot",b);
this._forEachTableCells(a,"tbody",b)
},_forEachTableCells:function(a,j,f){var d=ElementUtils.getChildElementByTagName(a,j.toUpperCase());
if(!d){return
}var h=j=="thead"?"TH":"TD";
var b=d.firstChild;
var g=0;
while(b){if(ElementUtils.isElement(b,"TR")){var k=b;
var c=k.firstChild;
var e=0;
while(c){if(ElementUtils.isElement(c,h)){var i=c;
f(a,j,g,e,i);
e++
}c=c.nextSibling
}g++
}b=b.nextSibling
}},forEachTableRowCells:function(a,c,b){this._forEachTableRowCells(a,"tbody",c,b)
},_forEachTableRowCells:function(a,k,g,f){var d=ElementUtils.getChildElementByTagName(a,k.toUpperCase());
if(!d){return
}var i=k=="thead"?"TH":"TD";
var b=d.firstChild;
var h=0;
while(b){if(ElementUtils.isElement(b,"TR")){var l=b;
if(h==g){var c=l.firstChild;
var e=0;
while(c){if(ElementUtils.isElement(c,i)){var j=c;
f(a,k,h,e,j);
e++
}c=c.nextSibling
}break
}h++
}b=b.nextSibling
}},forEachTableColumnCells:function(a,c,b){this._forEachTableColumnCells(a,"tbody",c,b)
},_forEachTableColumnCells:function(a,k,c,g){var e=ElementUtils.getChildElementByTagName(a,k.toUpperCase());
if(!e){return
}var i=k=="thead"?"TH":"TD";
var b=e.firstChild;
var h=0;
while(b){if(ElementUtils.isElement(b,"TR")){var l=b;
var d=l.firstChild;
var f=0;
while(d&&f<=c){if(ElementUtils.isElement(d,i)){var j=d;
if(f==c){g(a,k,h,f,j)
}f++
}d=d.nextSibling
}h++
}b=b.nextSibling
}},addTableCellsEvent:function(c,b,d,e){var g=b;
var f=d;
var a=e;
this.forEachTableCells(c,function(i,h,l,k,j){EventUtils.addEvent(j,g,f,a)
})
},addText:function(b,c){var a=document.createTextNode(c||"");
if(b){b.appendChild(a)
}return a
},replaceText:function(b,c){var a=b.firstChild;
if(a){a.replaceData(0,a.length,c||"");
return a
}else{return this.addText(b,c)
}},getHTML:function(a){if(ElementUtils.isElement(a,"TEXTAREA")){return a.value
}else{return a.innerHTML
}},setHTML:function(a,b){if(ElementUtils.isElement(a,"TEXTAREA")){a.value=b
}else{a.innerHTML=b||""
}},getAbsolutePosition:function(b){var a=0,e=0;
var d=/^div$/i.test(b.tagName);
if(d&&b.scrollLeft){a=b.scrollLeft
}if(d&&b.scrollTop){e=b.scrollTop
}var f={x:b.offsetLeft-a,y:b.offsetTop-e};
if(b.offsetParent){var c=HTMLUtils.getAbsolutePosition(b.offsetParent);
f.x+=c.x;
f.y+=c.y
}return f
}};
var EventUtils={addEvent:function(c,b,d,e){if(c.addEventListener){var a=e||false;
c.addEventListener(b,d,a)
}else{if(c.attachEvent){c.attachEvent("on"+b,d)
}else{c["on"+b]=d
}}},stopPropagation:function(a){a.cancelBubble=true;
if(a.stopPropagation){a.stopPropagation()
}},getElement:function(a){if(AgentUtils.isIE&&!AKBrowserDetection.isIE9OrMore()){return window.event.srcElement
}else{return a.currentTarget
}},getTargetElement:function(a){if(AgentUtils.isIE&&!AKBrowserDetection.isIE9OrMore()){return window.event.srcElement
}else{return a.target
}}};
var ElementUtils={ELEMENT_NODE:1,TEXT_NODE:3,isElement:function(b,a){return b&&b.nodeType==this.ELEMENT_NODE&&b.tagName==a
},getTagName:function(a){return(a&&a.nodeType==this.ELEMENT_NODE)?a.tagName:null
},findElement:function(c,d){var a=Coordinates.northwestOffset(c,true);
var e=Coordinates.southeastOffset(c,true);
if(d.inside(a,e)){var f=c.firstChild;
while(f){if(f.nodeType==HTMLUtils.ELEMENT_NODE){var b=this.findElement(f,d);
if(b){return b
}}f=f.nextSibling
}return c
}return null
},findTargetElement:function(a,c){var b=this.findElement(a,c);
while(b&&!StyleUtils.hasClass(b,"drop-target")){b=b.parentNode
}return b
},traverse:function(b,a){var c=b.firstChild;
while(c){if(c.nodeType==HTMLUtils.ELEMENT_NODE){a(c);
this.traverse(c,a)
}c=c.nextSibling
}},getElementTextByTagName:function(a,d,c){var e=this.getChildElementByTagName(a,d);
if(e){var b=this.getElementText(e);
if(b){return b
}}return c?c:""
},getElementBooleanByTagName:function(a,d,b){var e=this.getChildElementByTagName(a,d);
if(e){var c=this.getElementText(e);
if(c){c=c.toLowerCase();
return c=="true"||c=="yes"||c=="1"
}}return b?b:false
},getElementIntByTagName:function(a,e,b){var f=this.getChildElementByTagName(a,e);
if(f){var c=this.getElementText(f);
if(c){var d=parseInt(c);
if(isFinite(d)){return d
}}}return b?b:0
},getChildElementByTagName:function(a,b){var c=a&&a.firstChild;
while(c){if(this.isElement(c,b)){return c
}c=c.nextSibling
}return null
},getChildrenElementsByTagName:function(a,c){var b=[];
var d=(c instanceof Array)?c:[c];
this._getChildrenElementsByTagNameSub(a,d,b);
return b
},_getChildrenElementsByTagNameSub:function(b,e,d){var a;
var c=b&&b.firstChild;
while(c){for(a=0;
a<e.length;
a++){if(ElementUtils.isElement(c,e[a])){d[d.length]=c
}}this._getChildrenElementsByTagNameSub(c,e,d);
c=c.nextSibling
}return d
},getChildElementByClassName:function(a,c){var b=a&&a.firstChild;
while(b){if(StyleUtils.hasClass(b,c)){return b
}b=b.nextSibling
}return null
},getChildrenElementsByClassName:function(a,c){var b=[];
this._getChildrenElementsByClassNameSub(a,c,b);
return b
},_getChildrenElementsByClassNameSub:function(a,d,b){var c=a&&a.firstChild;
while(c){if(StyleUtils.hasClass(c,d)){b[b.length]=c
}this._getChildrenElementsByClassNameSub(c,d,b);
c=c.nextSibling
}return b
},getElementText:function(a){var c="";
var b=a&&a.firstChild;
while(b){if(b.nodeType==this.TEXT_NODE){if(c){c+=" "
}c+=b.nodeValue
}b=b.nextSibling
}return c
},cloneItem:function(d){if(d.nodeType==this.TEXT_NODE){return document.createTextNode(d.nodeValue)
}else{if(d.nodeType==this.ELEMENT_NODE){var e=document.createElement(d.tagName);
var b=d.attributes;
for(var c=0;
c<b.length;
c++){var a=b.item(c);
if(a.nodeName=="class"){StyleUtils.addClasses(e,a.nodeValue)
}else{if(a.nodeName=="style"){e.style.cssText=a.nodeValue
}else{e.setAttribute(a.nodeName,a.nodeValue)
}}}var g=d.firstChild;
for(;
g!=null;
g=g.nextSibling){var f=this.cloneItem(g);
if(f!=null){e.appendChild(f)
}}return e
}}return null
}};
var AgentUtils={isIE:/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent),isIE5:this.isIE&&/msie 5\.0/i.test(navigator.userAgent),isOpera:/opera/i.test(navigator.userAgent),isKhtml:/Konqueror|Safari|KHTML/i.test(navigator.userAgent)};
var StyleUtils={removeClass:function(d,e){if(!(d&&d.className)){return
}var a=d.className.split(" ");
var b=[];
for(var c=a.length;
c>0;
){if(a[--c]!=e){b[b.length]=a[c]
}}d.className=b.join(" ")
},addClass:function(a,b){this.removeClass(a,b);
if(!a.className){a.className=b
}else{a.className+=" "+b
}},addClasses:function(d,c){if(!d){return
}if(!d.className){d.className=c;
return
}var a=c.split(" ");
for(var b=a.length;
b>0;
){if(a[--b]){this.addClass(d,a[b])
}}},hasClass:function(c,d){if(!(c&&c.className)){return false
}var a=c.className.split(" ");
for(var b=0,e=a.length;
b<e;
b++){if(a[b]==d){return true
}}return false
},addHoverEffect:function(c,d){if(!AgentUtils.isIE){return
}var a=c;
var b=d?d:"hover";
EventUtils.addEvent(a,"mouseover",function(e){StyleUtils.addClass(a,b)
},false);
EventUtils.addEvent(a,"mouseout",function(e){StyleUtils.removeClass(a,b)
},false)
},setOpacity:function(a,c){if(a.style.opacity){a.style.opacity=c
}else{if(a.filters){var b=c*100;
var e="progid:DXImageTransform.Microsoft.Alpha";
var d=a.filters.alpha;
if(!d){a.style.filter+=e+"(Opacity=100) alpha()";
d=a.filters.alpha
}d.opacity=b
}else{if(a.style.MozOpacity){a.style.MozOpacity=c
}}}}};
var DragUtils={makeDragSource:function(a,b){if(!b){b=a
}Drag.makeDraggable(a);
if(b!=a){a.setDragHandle(b)
}a.setDragThreshold(5);
a.onDragStart=onDragStart;
a.onDrag=onDrag;
a.onDragEnd=onDragEnd;
a.onDragSetCursor=onDragSetCursor;
StyleUtils.addClass(a,"drag-source");
StyleUtils.addClass(b,"drag-handle")
},makeDragSourceCloned:function(a,b){if(!b){b=a
}EventUtils.addEvent(b,"mousedown",DragUtils.startDragClone);
b.dragSource=a;
StyleUtils.addClass(b,"drag-handle")
},startDragClone:function(b){var d=EventUtils.getElement(b);
var a=d.dragSource;
var g=a.cloneNode(true);
a.parentNode.appendChild(g);
g.dragSource=a;
mousePos=getMouseCoordinates(b);
var f=DragUtils.dimension(a);
g.style.position="absolute";
g.style.left=(mousePos.x-10)+"px";
g.style.right=(f.x+f.w)+"px";
var e=mousePos.y-10;
g.style.top=e+"px";
StyleUtils.setOpacity(a,0.5);
Drag.makeDraggable(g);
g.setDragThreshold(5);
g.onDragStart=onDragStart;
g.onDrag=onDrag;
g.onDragEnd=onDragEnd;
g.onDragSetCursor=onDragSetCursor;
g.onDragCleanUp=DragUtils.endDrag;
if(document.selection&&document.selection.empty){try{document.selection.empty()
}catch(c){}}Drag.startDrag(g,b)
},endDrag:function(){var a=this;
if(a.parentNode){a.parentNode.removeChild(a)
}StyleUtils.setOpacity(a.dragSource,1);
a.dragSource=null
},DU_ATTRIBUTES:function(){return" minx, miny, maxx, maxy, threshold, thresholdy, thresholdx,"
},isDragAttribute:function(a){return this.DU_ATTRIBUTES().indexOf(" "+a+",")!=-1
},dimension:function(a){var e={};
e.x=-1;
e.y=-1;
e.w=0;
e.h=0;
if(a==document){e.x=a.body.scrollLeft;
e.y=a.body.scrollTop;
e.w=a.body.clientWidth;
e.h=a.body.clientHeight
}else{if(a){var b=a;
var d=b.offsetLeft;
while((b=b.offsetParent)){d+=b.offsetLeft
}b=a;
var c=b.offsetTop;
while((b=b.offsetParent)){c+=b.offsetTop
}e.x=d;
e.y=c;
e.w=a.offsetWidth;
e.h=a.offsetHeight
}}return e
}};
function getMouseCoordinates(b){var a=0;
var e=0;
if(b.pageX||b.pageY){a=b.pageX;
e=b.pageY
}else{if(b.clientX||b.clientY){var d=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
var c=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
a=b.clientX+d;
e=b.clientY+c
}}return new Coordinate(a,e)
}function mouseY(a){if(a.pageY){return a.pageY
}else{if(a.clientY){return a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)
}else{return null
}}}function mouseX(a){if(a.pageX){return a.pageX
}else{if(a.clientX){return a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft)
}else{return null
}}}var DateUtils={ONE_YEAR:365*24*60*60*1000,addPeriod:function(a,b){var c=new Date();
c.setTime(c.getTime()+b);
return c
}};
var CookieUtils={getValue:function(a,f){var c=document.cookie;
var e=a+"=";
var b=c.indexOf("; "+e)+2;
if(b==1){b=c.indexOf(e);
if(b!==0){return f?f:""
}}b+=e.length;
toPos=c.indexOf(";",b);
if(toPos==-1){toPos=c.length
}var d=c.substring(b,toPos);
return unescape(d)
},setValue:function(c,d,b){var a=b?b:DateUtils.addPeriod(new Date(),DateUtils.ONE_YEAR);
var e=c+"="+escape(d)+"; expires="+a.toUTCString();
document.cookie=e
}};
var alerts_=[];
var splitStartingX_=-1;
var splitStartingY_=-1;
var splitVertical_;
var splitter_=null;
var ratioPrevious;
var ratioNext;
var rectPrev;
var rectNext;
var disabledButtons_=[];
var actionGroups_=[];
var calendarsParams_=[];
var calendarOnLoadEventAttached=false;
var currentTimeInput;
var currentTimeInputInterval;
var currentTimeInputTimeout;
var GLOBAL_SEARCH_BUTTON_CLICKED_FIELD="searchButtonGlobalField";
function qfValidateEnterKeyPressed(a,b){var e=13;
a=(a)?a:window.event;
var d=getEventElement(a);
if(d.value&&a.keyCode==e){var c=d.form;
theInput=c[b+".event"];
if(theInput.value=="valueChanged"){theInput.value="find";
resetModalReturnedValueHF(b);
c.submit()
}return false
}return true
}function qfFieldContentChange(b,c){b=(b)?b:window.event;
var e=getEventElement(b);
var d=e.form;
var f=d[c+".event"];
var a=d[c+".initialValue"];
if(a&&!a.value){a=null
}e.value=trimAll(e.value);
if(a&&e.value==a.value){f.value=""
}else{if(e.value){f.value="valueChanged"
}else{f.value="emptiedField"
}}resetModalReturnedValueHF(c)
}function qfButtonClick(b,c){var e=getEventElement(b);
var f=window.document.jsfForm()[c+".event"];
var d=window.document.jsfForm()[c+".disValid"];
if(d){d.value="false"
}var a=window.document.createElement("input");
a.setAttribute("id",GLOBAL_SEARCH_BUTTON_CLICKED_FIELD);
a.setAttribute("name",GLOBAL_SEARCH_BUTTON_CLICKED_FIELD);
a.setAttribute("type","hidden");
a.setAttribute("value","true");
window.document.jsfForm().appendChild(a);
if(f.value=="valueChanged"){f.value="find"
}else{if(f.value=="emptiedField"){f.value="emptiedFieldClick"
}else{f.value="openSelector"
}}resetModalReturnedValueHF(c);
return true
}function manageQFSelWinReturnedValues(c){var d=null;
var b=findElementsEndingWithId(null,".event",null,false);
for(i=0;
i<b.length;
i++){if(b[i].tagName.toLowerCase()=="input"){if(b[i].value=="selectorWindowOpened"){d=b[i]
}}}var a=null;
if(d){a=d.id.substring(0,d.id.length-".event".length)
}if(a){window.document.getElementById(a+".swcrv").value=c[0];
window.document.getElementById(a).value=c[1]
}}function resetModalReturnedValueHF(a){var b=window.document.jsfForm()[a+".modalResult"];
if(b){b.value=""
}}function getWindowTop(a,c){try{if(a.parent==a){return a
}if(a.parent.location.hostname!=c){return a
}}catch(b){return a
}return getWindowTop(a.parent,c)
}function findAlert(b){for(var c=0;
c<alerts_.length;
c++){var a=alerts_[c];
if(a.alertClientId==b){return a
}}return null
}function AlertWindow(f,d,j,a,e,b,g,h,c){this.alertClientId=f;
this.messageTitle=d;
this.message=j;
this.type=a;
this.formHtmlId=e;
this.commands=[];
this.addCommand=addCommand;
this.processClick=true;
this.hasFacetMessage=b;
this.opener=g;
this.embeddedDialog=!h||c?new EmbeddedDialog(f,c):null
}function addCommand(c,b,a,d){this.commands.push(new AlertCommand(c,b,a,d))
}function AlertCommand(c,b,a,d){this.text=c;
this.cmdId=b;
this.onClickFunction=a;
this.noActionToPerform=d
}function createAlert(f,d,h,a,e,b,c,g){if(g=="null"){g=null
}if(c==null||c=="null"){c=false
}else{if(c=="true"){c=true
}else{c=false
}}var j=new AlertWindow(f,d,h,a,e,b,window,c,g);
alerts_.push(j);
return j
}function overrideEmbeddedAlertCommandClick(c){var a=findAlert(c);
var b=a.embeddedDialog;
if(!b.initialized){initEmbeddedDialog(b.dialogId)
}for(var d=0;
d<a.commands.length;
d++){var e=a.commands[d];
overrideCommandClick(b,e)
}b.commandsOverrided=true
}function overrideCommandClick(a,c){var b=findElementsEndingWithId(a.dialogContent,c.cmdId,null,true)[0];
if(b==null){b=findElementsEndingWithName(a.dialogContent,c.cmdId,null,true)[0]
}if(c.noActionToPerform){b.onclick=function(){hideEmbeddedDialog(a,c);
return false
}
}else{if(c.onClickFunction==null){c.onClickFunction=b.onclick
}b.onclick=function(){hideEmbeddedDialog(a,c);
if(a.openerHaveActionToExecute&&a.onCloseFnc){a.onCloseFnc()
}else{c.onClickFunction()
}return false
}
}}function showModalAlert(e,h,b){var k=getWindowTop(window,window.location.hostname);
if(k.showModalDialog){var a="dialogWidth:400px;dialogHeight:0px;center:yes;resizable:no;scroll:yes;help:no;status:yes";
var j;
var c;
var g=e.indexOf("alertClientId=");
if(g>=0){g=g+"alertClientId=".length;
var f=e.indexOf("&",g);
if(f>=0){c=e.substr(g,f-g)
}else{c=e.substr(g)
}var d=findAlert(c);
d.innerHTML=d.htmlContent
}if(b){logViewInfo("showModalAlert: pre-windowtop.showModelessDialog");
j=k.showModelessDialog(e,h,a);
logViewInfo("showModalAlert: post-windowtop.showModelessDialog")
}else{logViewInfo("showModalAlert: pre-windowtop.showModalDialog");
j=k.showModalDialog(e,h,a);
logViewInfo("showModalAlert: post-windowtop.showModalDialog")
}return j
}else{var a="top=200,left=140,width=400,height=200,directories=no,location=no,menubar=no,toolbar=no,resizable=no,scrollbars=yes,status=yes,center=yes;";
logViewInfo("showModalAlert: pre-window.open");
var c;
var g=e.indexOf("alertClientId=");
if(g>=0){g=g+"alertClientId=".length;
var f=e.indexOf("&",g);
if(f>=0){c=e.substr(g,f-g)
}else{c=e.substr(g)
}var d=findAlert(c);
d.innerHTML=d.htmlContent
}currentAlert_=k.open(e,"_blank",a);
logViewInfo("showModalAlert: post-window.open");
if(currentAlert_){currentAlert_.dialogArguments=h;
currentAlert_.simulateModal=true
}return currentAlert_
}}function showEmbeddedAlert(e,d,g,c){if(!document.createElement){return true
}if(document.createElement){try{var a=document.createElement("iframe");
a.setAttribute("id","RSIFrame");
a.style.border="0px";
a.style.width="0px";
a.style.height="0px";
a.style.display="none";
a.style.visibility="hidden";
a.title="";
a.src=e;
a.name="alertIFrame";
alertIFrame=document.body.appendChild(a);
if(document.frames){alertIFrame=document.frames.RSIFrame
}}catch(b){iframeHTML='<iframe id="RSIFrame" name="alertIFrame" title="" style="';
iframeHTML+="border:0px;";
iframeHTML+="width:0px;";
iframeHTML+="height:0px;";
iframeHTML+="display:none;";
iframeHTML+="visibility:hidden;";
iframeHTML+='"></iframe>';
document.body.innerHTML+=iframeHTML;
alertIFrame={};
alertIFrame.document={};
alertIFrame.document.location={};
alertIFrame.document.location.iframe=document.getElementById("RSIFrame");
alertIFrame.document.location.replace=function(h){this.iframe.src=h
}
}}var f=getIFrameDoc(alertIFrame);
if(f==null){return true
}addEvent(alertIFrame,"load",function(){processEmbeddedAlert(alertIFrame,g);
if(c){c()
}});
return false
}function processEmbeddedAlert(a,e){var c=getIFrameDoc(a);
var d=findElementsEndingWithId(c,e.alertClientId+"-fr",null,true)[0];
if(d){var b=document.createElement("DIV");
b.id=d.id;
b.style.display="none";
b.innerHTML=d.innerHTML;
d.parentNode.removeChild(d);
document.body.appendChild(b);
showEmbeddedDialog(e.embeddedDialog)
}}function EmbeddedDialog(a,b){this.pageTitle=null;
this.dialogId=a;
if(b!="null"){this.pageContentId=b
}this.parentNode=null;
this.originalContent=null;
this.dialogContent=null;
this.pageContent=null;
this.fullPageAlert=false;
this.onCloseFnc=null;
this.initialized=false;
this.commandsOverrided=false;
this.openerHaveActionToExecute=true;
this.fadeTimer=null;
this.bgOpacity=0;
this.dialogBG=null;
this.resizeFnc=null;
this.opened=false;
this.checkboxesStates=[];
this.disabledInputs=[];
this.positionPadder=null;
this.adjustPositionTimer=null;
this.keydownFnc=null
}function isAnEmbeddedDialogOpened(){for(i=0;
i<alerts_.length;
i++){var a=alerts_[i];
if(a.embeddedDialog){if(a.embeddedDialog.opened==true){return true
}}}return false
}function keepFocusInEmbeddedDialog(a,b){trapFocus(a)
}function hideEmbeddedDialog(b,e){b.parentNode.removeChild(b.dialogContent);
if(!b.fullPageAlert){b.parentNode.appendChild(b.pageContent)
}if(b.dialogBG){b.dialogBG.parentNode.removeChild(b.dialogBG);
b.dialogBG=null;
removeEvent(window,"resize",b.resizeFnc);
b.resizeFnc=null;
b.bgOpacity=0
}b.parentNode=null;
b.pageContent=null;
for(var d=0;
d<window.document.jsfForm().elements.length;
d++){if(window.document.jsfForm().elements[d].type=="checkbox"){if(b.checkboxesStates[d]){window.document.jsfForm().elements[d].checked=b.checkboxesStates[d]
}}}while(b.disabledInputs.length>0){var a=b.disabledInputs.pop();
a.disabled=false;
a.style.visibility="visible"
}if(b.fadeTimer){clearInterval(b.fadeTimer);
b.fadeTimer=null
}b.bgOpacity=0;
if(b.adjustPositionTimer){clearInterval(b.adjustPositionTimer);
b.adjustPositionTimer=null
}var c=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
removeEvent(c,"keydown",b.keydownFnc);
b.opened=false;
window.document.title=b.pageTitle
}function adjustEmbeddedDialogPosition(b){var a=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
b.positionPadder.style.height=a.scrollTop+"px"
}function resizeEmbeddedDialogBackground(b){var a=b.pageContent;
if(b.dialogBG&&b.fullPageAlert&&a.scrollWidth){b.dialogContent.style.width=a.scrollWidth>a.clientWidth?a.scrollWidth+"px":a.clientWidth+"px";
b.dialogContent.style.height=a.scrollHeight>a.clientHeight?a.scrollHeight+"px":a.clientHeight+"px";
b.dialogBG.style.width=b.dialogContent.style.width;
b.dialogBG.style.height=b.dialogContent.style.height
}}function showModal(e,k,g,b,d,h,c){var l=getWindowTop(window,window.location.hostname);
if(h&&c){e=escape(e+"&"+h+"="+c)
}var f=contextPath_+"/akira/pub/modalFrameset.jsp?modalUrl="+escape(e)+"&title="+k;
if(l.showModalDialog){var a="dialogWidth:"+b+";dialogHeight:"+d+";center:yes;resizable:yes;scroll:yes;help:no;status:yes";
logViewInfo("showModal: pre-windowtop.showModalDialog");
var j=l.showModalDialog(f,g,a);
logViewInfo("showModal: post-windowtop.showModalDialog");
return j
}else{var a="top=200,left=140,width="+b+",height="+d+",directories=no,location=no,menubar=no,toolbar=no,resizable=yes,scrollbars=yes,status=yes,center=yes;";
logViewInfo("showModal: pre-windowtop.open");
currentModal=l.open(f,"_blank",a);
logViewInfo("showModal: post-windowtop.open");
if(currentModal){currentModal.dialogArguments=g;
currentModal.simulateModal=true
}}}function openModal(e,h,c,a,d){window.document.jsfForm().modalClientId.value=c;
var j=getWindowTop(window,window.location.hostname);
var f=contextPath_+"/akira/pub/modalFrameset.jsp?modalUrl="+escape(e)+"&title="+h;
if(j.showModalDialog){var b="dialogWidth:"+a+";dialogHeight:"+d+";center:yes;resizable:yes;scroll:yes;help:no;status:yes";
logViewInfo("openModal: pre-windowtop.showModalDialog");
var g=j.showModalDialog(f,window,b);
logViewInfo("openModal: post-windowtop.showModalDialog");
return g
}else{var b="top=200,left=140,width="+a+",height="+d+",directories=no,location=no,menubar=no,toolbar=no,resizable=yes,scrollbars=yes,status=yes,center=yes;";
logViewInfo("openModal: pre-windowtop.open");
currentModal=j.open(f,"_blank",b);
logViewInfo("openModal: post-windowtop.open");
if(currentModal){currentModal.dialogArguments=window;
currentModal.simulateModal=true
}}}function openWindow(e,j,b,a){var h=(screen.width-b)/2;
var g=(screen.height-a)/2;
var d="left="+h+",top="+g+",width="+b+"px,height="+a+"px,center=yes,location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,titlebar=no,toolbar=no";
logViewInfo("openWindow: pre-window.open");
var c=window.open(e,j,d,false);
logViewInfo("openWindow: post-window.open");
return c
}function adjustWindowWidth(){if((/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent))||(/msie 5\.0/i.test(navigator.userAgent)&&(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)))){var d=parseInt(window.dialogWidth.substring(0,window.dialogWidth.length-2));
var a=window.document.body.scrollWidth+40;
var c=top.screen.width;
if(a>c){a=c
}window.dialogWidth=a+"px";
var b=(c/2)-(a/2);
window.dialogLeft=b+"px"
}}function adjustWindowHeight(){if((/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent))||(/msie 5\.0/i.test(navigator.userAgent)&&(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)))){var c=parseInt(window.dialogHeight.substring(0,window.dialogHeight.length-2));
var e=window.document.body.scrollHeight;
var b=window.document.body.bottomMargin;
var a=c+((e+parseInt(b))-c)+40;
var f=top.screen.height;
if(a>f){a=f
}window.dialogHeight=a+"px";
var d=(f/2)-(a/2);
window.dialogTop=d+"px"
}}function showSource(c){c=(c)?c:window.event;
if(c.altKey&&c.shiftKey){var b=null;
try{b=window.open("about:blank","_blank","location=0, menubar=1, resizable=1, scrollbars=1, status=0, titlebar=1, toolbar=0")
}catch(e){b=top.open("about:blank","_blank","location=0, menubar=1, resizable=1, scrollbars=1, status=0, titlebar=1, toolbar=0")
}if(b){var f=null;
var a=window.document.childNodes;
for(var d=0;
d<a.length;
d++){if(f==null){f=""
}else{f+="\r\n"
}f+=a[d].outerHTML
}b.document.writeln("<html>");
b.document.writeln("<head>");
b.document.writeln("</head>");
b.document.writeln('<body style="background-color: white; font-family: monospace; font-size: 12px;">');
b.document.writeln("</body>");
b.document.writeln("</html>");
b.document.body.innerText=f
}}}function sendUIMessage(c){var b=taleo.core.messagereceiver.generateUIMessageReceiverGetURL(c);
var a=open(b,"messenger","top="+screen.availHeight+", left="+screen.availWidth+", width=100, height=100, resizable=no, scrollbars=no, menubar=no, toolbar=no, directories=no, location=no, status=no");
if(a){a.close()
}}function prepareSplitter2(splitterId){var theSplitter=window.document.getElementById(splitterId);
var previous=theSplitter.previousSibling;
var next=nextSiblingWithoutTag(theSplitter,"script");
var theInput=eval("document.jsfForm()['"+splitterId+"prevSize'];");
previous.runtimeStyle.width=theInput.value;
theInput=eval("document.jsfForm()['"+splitterId+"nextSize'];");
next.runtimeStyle.width=theInput.value
}function onSplitterMouseDown(c,b){c=(c)?c:window.event;
splitStartingX_=c.clientX;
splitStartingY_=c.clientY;
splitVertical_=b;
splitter_=getEventElement(c);
splitter_.setCapture();
var e=splitter_.previousSibling;
var d=nextSiblingWithoutTag(splitter_,"script");
var a=e.currentStyle.width;
var f=d.currentStyle.width;
ratioPrevious=parseFloat(a.substring(0,a.length-1));
ratioNext=parseFloat(f.substring(0,f.length-1));
rectPrev=e.getBoundingClientRect();
rectNext=d.getBoundingClientRect();
addEvent(document,"mousemove",onSplitterMouseMove);
addEvent(document,"mouseup",onSplitterMouseUp)
}function onSplitterMouseUp(pEvt){pEvt=(pEvt)?pEvt:window.event;
removeEvent(document,"mousemove",onSplitterMouseMove);
removeEvent(document,"mouseup",onSplitterMouseUp);
var previous=splitter_.previousSibling;
var next=nextSiblingWithoutTag(splitter_,"script");
var theInput=eval("document.jsfForm()['"+splitter_.id+"prevSize'];");
theInput.value=previous.currentStyle.width;
theInput=eval("document.jsfForm()['"+splitter_.id+"nextSize'];");
theInput.value=next.currentStyle.width;
splitter_.releaseCapture();
splitStartingX_=-1;
splitStartingY_=-1;
splitter_=null
}function onSplitterMouseMove(k){k=(k)?k:window.event;
if(k.button){var h=splitter_.previousSibling;
var d=nextSiblingWithoutTag(splitter_,"script");
if(splitVertical_){var l=k.clientX-splitStartingX_;
var o=ratioPrevious+ratioNext;
var m=(rectPrev.right-rectPrev.left)+l;
var p=(rectNext.right-rectNext.left)-l;
var e=m+p;
var b=(m/e*o);
var g=(ratioPrevious+ratioNext)-b;
if(b>=0&&b<=100&&g>=0&&g<=100){var f=h.currentStyle.width;
var j=d.currentStyle.width;
h.runtimeStyle.width=b+"%";
d.runtimeStyle.width=g+"%";
var a=h.getBoundingClientRect();
var c=d.getBoundingClientRect();
if((rectPrev.top==rectNext.top)&&(a.top!=rectPrev.top||c.top!=rectNext.top)){h.runtimeStyle.width=f;
d.runtimeStyle.width=j
}}}else{}}}function onModalWindowUnload(a){a=(a)?a:window.event;
if(a.clientY<0||a.altKey==true){sendUIMessage("modCloAbr")
}}function installDialogRequiredEvents(){addEvent(window.document,"click",showSource);
if(window.name=="__MODAL_FRAME_CONTENT"){addEvent(window,"beforeunload",onModalWindowUnload)
}}installDialogRequiredEvents();
function addActionGroup(a,b){actionGroups_[a]=new ActionGroup(a,b);
return actionGroups_[a]
}function findActionGroup(a){return actionGroups_[a]
}function ActionGroup(a,b){this.sActionGroupClientId=a;
this.dropDown=b;
this.actionGroupCommands=[];
this.addActionGroupCommand=addActionGroupCommand;
this.findActionGroupCommand=findActionGroupCommand
}function addActionGroupCommand(a,c,d,b){this.actionGroupCommands.push(new ActionGroupCommand(a,c,d,b))
}function findActionGroupCommand(a){for(i=0;
i<this.actionGroupCommands.length;
i++){if(this.actionGroupCommands[i].sActionGroupCommandClientId==a){return this.actionGroupCommands[i]
}}return null
}function ActionGroupCommand(a,c,d,b){this.sActionGroupCommandClientId=a;
this.sJavascript=c;
this.bIsInDropDown=d;
this.bIsInitiallyDisabled=b;
this.execute=executeActionGroupCommand
}function executeActionGroupCommand(){eval(this.sJavascript);
return false
}function actionGroupDropDownChange(a,b){if(b.options[b.selectedIndex].value!=-1){result=findActionGroup(a).findActionGroupCommand(b.options[b.selectedIndex].value).execute();
if(result==false){b.selectedIndex=0
}}else{b.selectedIndex=0
}return false
}function disableCommandButton(a,d,c,f){var b=window.document.getElementById(a);
var e=(c!=null&&c==true);
if(d==1){disableTagWithDisabledAttribute(a,e,f)
}else{if(d==2){disableNiceCommandButton(a,e,f)
}else{if(d==3){disableActionGroup(a,e,f)
}else{if(d==4){disableQuickFinder(a,e,f)
}else{if(d==5){disableInputDateTime(a,e,f)
}else{if(d==6){disableInputTime(a,e,f)
}}}}}}}function addDisablerEvent(b,f,d){var a;
if(b.tagName=="INPUT"&&(b.type=="checkbox"||b.type=="radio")){a=window.document.getElementsByName(b.name)
}else{a=[b]
}for(var c=0;
c<a.length;
c++){var e=a[c];
addEvent(e,f,d)
}}function disableTagWithDisabledAttribute(b,g,f){var c=window.document.getElementById(b);
var a;
if(c.tagName=="INPUT"&&(c.type=="checkbox"||c.type=="radio")){a=window.document.getElementsByName(c.name)
}else{a=[c]
}for(var d=0;
d<a.length;
d++){var e=a[d];
if(f==null&&g==true){e.disabled=!e.disabled
}else{if(f!=null){e.disabled=f
}else{e.disabled=true
}}}}function disableNiceCommandButton(a,o,f){var k=window.document.getElementById(a);
var c=k.getAttribute("originalState")!=null;
var j=window.document.getElementById(a+"_img");
var e=k.className.split(" ");
if(f==null&&o==true){if(e[0].lastIndexOf("-off")==(e[0].length-4)&&!c){e[0]=e[0].substr(0,(e[0].length-4));
k.disabled=false;
if(j!=null){var l=j.src;
j.src=l.substr(0,l.lastIndexOf("-off"))+l.substr(l.lastIndexOf("."),l.length)
}}else{e[0]=e[0]+"-off";
k.disabled=true;
if(j!=null){var l=j.src;
j.src=l.substr(0,l.lastIndexOf("."))+"-off"+l.substr(l.lastIndexOf("."),l.length)
}}}else{if(f!=null){if(f==true){if(e[0].lastIndexOf("-off")!=(e[0].length-4)){e[0]=e[0]+"-off";
k.disabled=true;
if(j!=null){var l=j.src;
j.src=l.substr(0,l.lastIndexOf("."))+"-off"+l.substr(l.lastIndexOf("."),l.length)
}}}else{if((e[0].lastIndexOf("-off")==(e[0].length-4)||k.disabled==true)&&!c){e[0]=e[0].substr(0,(e[0].length-4));
k.disabled=false;
if(j!=null){var l=j.src;
j.src=l.substr(0,l.lastIndexOf("-off"))+l.substr(l.lastIndexOf("."),l.length)
}}}}else{if(e[0].lastIndexOf("-off")!=(e[0].length-4)){e[0]=e[0]+"-off";
k.disabled=true;
if(j!=null){var l=j.src;
j.src=l.substr(0,l.lastIndexOf("."))+"-off"+l.substr(l.lastIndexOf("."),l.length)
}}}}k.className=e.join(" ");
if(k.tagName=="A"){if(k.className.lastIndexOf("-off")>-1){if(disabledButtons_[k.id]==null){var h=HTMLUtils.addSpan(null,null);
h.className=k.className;
for(var d=0;
d<k.childNodes.length;
d++){var g=k.childNodes[d].cloneNode(true);
g.id=g.id+"-cln";
h.appendChild(g)
}addSuffixToId(h,"-cln",true);
k.parentNode.insertBefore(h,k);
var m=HTMLUtils.addSpan(h,AccessibilityRes.disabled);
StyleUtils.addClasses(m,"hidden-audible");
k.style.display="none";
disabledButtons_[k.id]=h
}}else{var b=disabledButtons_[k.id];
if(b!=null){k.parentNode.removeChild(b);
k.style.display="";
disabledButtons_[k.id]=null
}}}}function addSuffixToId(d,b,c){if(d.id){d.id=d.id+b
}if(c==true){for(var a=0;
a<d.childNodes.length;
a++){addSuffixToId(d.childNodes[a],b,c)
}}}function disableTimeSpinner(b,e,d){var f=window.document.getElementById(b+"-s");
var c=f.className.split(" ");
var a=c[0].lastIndexOf("-off");
if(d==null&&e){if(a==(c[0].length-4)){c[0]=c[0].substr(0,(c[0].length-4))
}else{c[0]=c[0]+"-off"
}}else{if(d!=null){if(d){if(a!=(c[0].length-4)){c[0]=c[0]+"-off"
}}else{if(a==(c[0].length-4)){c[0]=c[0].substr(0,(c[0].length-4))
}}}else{if(a!=(c[0].length-4)){c[0]=c[0]+"-off"
}}}f.className=c.join(" ")
}function disableActionGroup(b,f,e){var d=window.document.getElementById(b);
var g=findActionGroup(b);
var h=window.document.getElementById(g.sActionGroupClientId);
if(e==null&&f==true){h.disabled=!h.disabled;
if(g.dropDown!=null){g.dropDown.disabled=!g.dropDown.disabled
}}else{if(e!=null){h.disabled=e;
if(g.dropDown!=null){g.dropDown.disabled=e
}}else{h.disabled=true;
if(g.dropDown!=null){g.dropDown.disabled=true
}}}var a=g.actionGroupCommands.length;
for(i=0;
i<a;
i++){var c=g.actionGroupCommands[i];
if(c.bIsInDropDown==false){disableNiceCommandButton(c.sActionGroupCommandClientId,f,g.dropDown!=null?g.dropDown.disabled:e)
}}}function disableQuickFinder(a,c,b){disableTagWithDisabledAttribute(a,c,b);
disableNiceCommandButton(a+".action",c,b)
}function disableInputDateTime(a,c,b){disableTagWithDisabledAttribute(a+".display",c,b)
}function disableInputTime(a,c,b){disableTagWithDisabledAttribute(a+"-h",c,b);
disableTagWithDisabledAttribute(a+"-m",c,b);
disableTagWithDisabledAttribute(a+"-a",c,b);
disableTimeSpinner(a,c,b)
}function CalendarParam(f,c,b,d,g,a,e){this.componentID=f;
this.hiddenFieldID=c;
this.spanID=b;
this.ifEmptyFacetID=d;
this.daFormat=g;
this.ifFormat=a;
this.params=e
}function addCalendarParams(g,c,b,d,h,a,f){var e=new CalendarParam(g,c,b,d,h,a,f);
calendarsParams_.push(e);
if(!calendarOnLoadEventAttached){addEvent(window,"load",initCalendars);
calendarOnLoadEventAttached=true
}}function initCalendars(){for(i=0;
i<calendarsParams_.length;
i++){Calendar.setup(calendarsParams_[i].params)
}}function findCalendarByID(b){for(var a=0;
a<calendarsParams_.length;
a++){if(calendarsParams_[a].componentID.lastIndexOf(b)!=-1){return calendarsParams_[a]
}}return null
}function showInputDateIfEmptyFacet(a){var b=findCalendarByID(a);
window.document.getElementById(b.spanID).innerHTML=window.document.getElementById(b.ifEmptyFacetID).innerHTML
}function setInputTime(c,d,b,e){var a=new Date();
a.setHours(d);
a.setMinutes(b);
a.setSeconds(e);
setInputDate(c,a.getYear(),a.getMonth(),a.getDate(),d,b,e)
}function adjustTextArea(f){if(f){var c=2;
var d=2;
var b=18;
var a=9;
var e=escape(f.value).split("%0D%0A");
if(e){c=e.length
}if(c>document.body.clientHeight/b){c=document.body.clientHeight/b
}if(e){var g=document.body.clientWidth-computeWindowOffsetLeft(f);
for(n=0;
n<(e.length);
n++){var h=unescape(e[n]);
if(d<h.length){d=h.length
}if(d>g/a){d=g/a;
c+=h.length/(g/a)
}}}else{d=f.value.length
}if((d+1)>=f.getAttribute("initialCols")){f.cols=(d+1)
}else{f.cols=f.getAttribute("initialCols")
}if((c+1)>=f.getAttribute("initialRows")){f.rows=(c+1)
}else{f.rows=f.getAttribute("initialRows")
}}}function prepareTextArea(){tas=document.getElementsByTagName("TEXTAREA");
for(var b=0;
b<tas.length;
b++){var a=tas[b];
if(a.onkeyup!=null&&a.onkeydown!=null){a.setAttribute("initialCols",a.cols);
a.setAttribute("initialRows",a.rows);
adjustTextArea(a)
}}}function changeTimeMouseDown(h,c,e,j,k){h=(h)?h:window.event;
var g=getEventElement(h);
var l=g.offsetHeight/2;
var f=g;
while(f){l+=f.offsetTop;
if(!f.offsetParent){break
}f=f.offsetParent
}var a;
if(h.pageY){a=h.pageY
}else{if(h.clientY){a=h.clientY+document.body.scrollTop+document.documentElement.scrollTop
}}var d=a<l;
if(currentTimeInput==null||currentTimeInput==undefined||!isOurTimeInput(c,currentTimeInput)){currentTimeInput=window.document.getElementById(c+"-h")
}if(currentTimeInput!=null&&currentTimeInput!=undefined){if(h.type=="dblclick"){changeTime(d,j,k)
}else{var b=g.className;
if(b.lastIndexOf("-off")==-1){g.setAttribute("akOldClass",b);
g.className=d?e+"-up":e+"-down";
changeTime(d,j,k);
window.clearTimeout(currentTimeInputTimeout);
currentTimeInputTimeout=setTimeout(function(){startRollingTime(d,j,k)
},400)
}}}}function isOurTimeInput(a,b){var c=currentTimeInput.id;
return c==a+"-h"||c==a+"-m"||c==a+"-a"
}function startRollingTime(b,a,c){if(currentTimeInput!=null){window.clearInterval(currentTimeInputInterval);
currentTimeInputInterval=window.setInterval(function(){changeTime(b,a,c)
},110)
}}function changeTime(b,a,e){if(currentTimeInput!=null){if(currentTimeInput.id.lastIndexOf("-a")==currentTimeInput.id.length-2){currentTimeInput.value=currentTimeInput.value=="am"?"pm":"am"
}else{var c=parseInt(removeHeadingZero(currentTimeInput.value));
if(isNaN(c)){currentTimeInput.value="1"
}if(currentTimeInput.id.lastIndexOf("-m")==currentTimeInput.id.length-2){if(isNaN(c)){c=0
}c=b?c+a:c-a;
if(b){c=Math.floor(c/a)*a
}else{c=Math.ceil(c/a)*a
}if(c<0){currentTimeInput.value=""+(60-a)
}else{if(c>=60){currentTimeInput.value="00"
}else{var d=c<10?"0":"";
currentTimeInput.value=d+c
}}}else{if(!isNaN(c)&&(currentTimeInput.id.lastIndexOf("-h")==currentTimeInput.id.length-2)){var f=c;
c=b?c+1:c-1;
if(e){if(c<0){currentTimeInput.value="23"
}else{if(c>=24){currentTimeInput.value="0"
}else{currentTimeInput.value=""+c
}}}else{if(c<=0){currentTimeInput.value="12"
}else{if(c>=13){currentTimeInput.value="1"
}else{currentTimeInput.value=""+c
}}}}}}currentTimeInput.select()
}}function removeHeadingZero(a){if(a.length>1&&a.charAt(0)=="0"){return a.substring(1,a.length)
}return a
}function changeTimeMouseUp(a){a=(a)?a:window.event;
window.clearTimeout(currentTimeInputTimeout);
window.clearInterval(currentTimeInputInterval);
var c=getEventElement(a);
var b=c.getAttribute("akOldClass");
if(b!=undefined&&b!=null&&b!=""){c.className=b;
c.setAttribute("akOldClass","");
currentTimeInput.select()
}}function prepareTimeInput(a){a=(a)?a:window.event;
currentTimeInput=getEventElement(a);
currentTimeInput.select()
}function onkeypressTimeInput(a){var b=!(a);
a=(a)?a:window.event;
var c=getEventElement(a);
c.setAttribute("akOldValue",c.value);
var d=String.fromCharCode(a.keyCode);
if(!b){return
}if(d.match(/^\d+$/)==null){a.cancelBubble=true;
a.returnValue=false;
return false
}return true
}function onkeydownTimeInput(a){a=(a)?a:window.event;
var b=getEventElement(a);
b.setAttribute("akOldValue",b.value)
}function validateHourKeyUp(b,d){b=(b)?b:window.event;
var c=getEventElement(b);
var a=c.getAttribute("akOldValue");
if(a!=null){var e=parseInt(removeHeadingZero(c.value));
if(isNaN(e)||(d&&(e<0||e>23))||(!d&&(e<1||e>12))){c.value=a;
c.setAttribute("akOldValue",null);
c.select()
}}}function adjustMinute(a){a=(a)?a:window.event;
var b=getEventElement(a);
if(b.value.length==1){b.value="0"+b.value
}}function validateMinuteKeyUp(b,c,e){b=(b)?b:window.event;
var d=getEventElement(b);
var a=d.getAttribute("akOldValue");
if(a!=undefined&&a!=null){var f=parseInt(removeHeadingZero(d.value));
if(isNaN(f)||f<0||f>59||(e&&f%c!=0)){if(!isNaN(f)&&e&&f%c!=0){if(f<10){f*=10
}f=Math.min(Math.ceil(f/c)*c,60-c);
d.value=f+"";
d.select()
}else{d.value=a;
d.select()
}}d.setAttribute("akOldValue",null)
}}function onkeypressTimeInputAmPm(a){a=(a)?a:window.event;
var c=getEventElement(a);
var b=!a.charCode;
if(b){var e=String.fromCharCode(a.keyCode)
}else{var e=String.fromCharCode(a.charCode)
}var d=false;
if(e=="a"||e=="A"){c.value="am";
d=true
}else{if(e=="p"||e=="P"){c.value="pm";
d=true
}else{if(e=="\t"){d=true
}}}if(d){if(!b){return true
}}else{c.select();
a.cancelBubble=true;
a.returnValue=false;
return false
}}function prepareSelectableDataTable(b,e,a){if(e!=null){var f=findElementsEndingWithId(null,e,null,true)[0];
var d=window.document.getElementById(b+"._selCountFmt");
d.value=f.innerHTML
}var c=window.document.getElementById(b+"._selCount");
updateTableSelCount(b,c.value,e,a)
}function updateTableSelCount(pTableId,pNbSelected,pSelCountOutputId,pOnselectedcountchanged){var selCountElem=window.document.getElementById(pTableId+"._selCount");
var oldNbSel=parseInt(selCountElem.value);
selCountElem.value=pNbSelected;
if(pSelCountOutputId!=null){var selCountOutput=findElementsEndingWithId(null,pSelCountOutputId,null,true)[0];
var selCountOutputFmt=window.document.getElementById(pTableId+"._selCountFmt").value;
selCountOutput.innerHTML=selCountOutputFmt.replace(/\{0\}/,pNbSelected)
}if(pOnselectedcountchanged!=null){eval(pOnselectedcountchanged+"('"+pTableId+"', "+pNbSelected+", "+oldNbSel+");")
}}function manageTableSelCount2(k,h,o,c){k=(k)?k:window.event;
var a=getEventElement(k);
if(a.tagName!="INPUT"||(a.type!="checkbox"&&a.type!="radio")){return
}var f=window.document.getElementById(h+"._total");
var e=window.document.getElementById(h+"._selmode");
var b=window.document.getElementById(h+"._selCountFmt");
var l=getSelectedRowCount(a);
var g=parseInt(window.document.getElementById(h+"._selCount").value);
var j=findParentOfType(a,"THEAD");
if(j!=null){if(a.type=="checkbox"){if(a.checked){var m=parseInt(f.value)+parseInt(g)-parseInt(l.nbSelectedRows);
l.value=f.value;
updateTableSelCount(h,m.toString(),o,c);
e.value="2"
}else{var m=parseInt(g)-(parseInt(f.value)-(parseInt(f.value)-parseInt(l.nbSelectedRows)));
l.value=0;
updateTableSelCount(h,m.toString(),o,c);
e.value="2"
}formCheckAll(a)
}}else{var d=findParentOfType(a,"TBODY");
if(d!=null&&a.type=="checkbox"){g=a.checked?g+1:g-1;
l.value=a.checked?parseInt(l.value)+1:parseInt(l.value)-1;
updateTableSelCount(h,g.toString(),o,c);
formSyncCheckAll2(a,false)
}else{if(a.type=="radio"){updateTableSelCount(h,"1",o,c)
}}}}function initEmbeddedDialog(b){var d=findAlert(b);
var a=d.embeddedDialog;
if(!a.initialized){var c=findElementsEndingWithId(document,a.dialogId+"-fr",null,true)[0];
a.originalContent=document.createElement("DIV");
if(a.htmlContent!=null){a.originalContent.innerHTML=a.htmlContent
}else{a.originalContent.innerHTML=c.innerHTML
}a.positionPadder=document.createElement("DIV");
a.originalContent.insertBefore(a.positionPadder,a.originalContent.childNodes[0]);
if(a.originalContent!=null){if(a.originalContent.parentNode!=null){a.originalContent.parentNode.removeChild(a.originalContent)
}a.initialized=true
}}}function showEmbeddedDialog(q){for(t=0;
t<alerts_.length;
t++){var g=alerts_[t];
var u=g.embeddedDialog;
if(u!=null&&u.opened){hideEmbeddedDialog(u,null)
}}for(var t=0;
t<window.document.jsfForm().elements.length;
t++){if(window.document.jsfForm().elements[t].type=="checkbox"){q.checkboxesStates[t]=window.document.jsfForm().elements[t].checked
}}if(!q.initialized){initEmbeddedDialog(q.dialogId)
}if(q.pageContentId!=null){q.pageContent=findElementsEndingWithId(window.document.body,q.pageContentId,null,true)[0]
}else{q.pageContent=window.document.body
}if(q.pageContent.tagName=="BODY"){q.parentNode=window.document.body
}else{q.parentNode=q.pageContent.parentNode
}if(q.pageContent.tagName=="BODY"){var p=document.createElement("DIV");
p.className="alert-full-page";
q.fullPageAlert=true;
var p=document.createElement("DIV");
p.className="alert-full-page-container";
var e=HTMLUtils.addAnchor(p,"");
e.id="alertAnchor";
e.href="#";
e.tabIndex=0;
p.appendChild(e);
p.appendChild(q.originalContent);
q.dialogContent=p;
var d=document.createElement("DIV");
d.className="alert-full-page-bg";
p.appendChild(d);
q.dialogBG=d;
q.fadeTimer=setInterval(function(){fadeEmbeddedDialogBG(q,60)
},5);
var c=document.getElementsByTagName("INPUT");
for(var t=0;
t<c.length;
t++){var k=c[t];
if(!k.disabled&&k.type!="hidden"){k.style.visibility="hidden";
q.disabledInputs.push(k)
}}var x=document.getElementsByTagName("SELECT");
for(var t=0;
t<x.length;
t++){var l=x[t];
l.style.visibility="hidden";
q.disabledInputs.push(l)
}var o=document.getElementsByTagName("TEXTAREA");
for(var t=0;
t<o.length;
t++){var r=o[t];
r.style.visibility="hidden";
q.disabledInputs.push(r)
}}else{q.parentNode.removeChild(q.pageContent)
}q.parentNode.appendChild(q.dialogContent);
q.opened=true;
if(!q.commandsOverrided){overrideEmbeddedAlertCommandClick(q.dialogId)
}if(!AKCore._hasFocus&&q.dialogId=="sessionWarning"){var y=(screen.width-450)/2;
var v=(screen.height-200)/2;
var w=window.open(contextPath_+"/akira/pub/offFocusBeaconAlert.jsp?alertClientId=sessionWarningModal&formId="+document.jsfForm().id+"&msgResGroupId="+messagesResGroupId_,"","top="+v+",left="+y+",width=450,height=200,directories=no,location=no,menubar=no,toolbar=no,resizable=no,scrollbars=no,status=no,center=yes;")
}var f=ElementUtils.getChildrenElementsByClassName(q.dialogContent,"alert-title");
if(f!=null&&f.length>0){q.pageTitle=window.document.title;
window.document.title=f[0].innerHTML
}var h=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
q.keydownFnc=function(a){keepFocusInEmbeddedDialog(a,q)
};
addEvent(h,"keydown",q.keydownFnc);
var j=document.getElementById("alertAnchor");
if(j!=null){j.focus()
}var m=findAlert(q.dialogId);
if(m){var s=m.commands[0];
if(s){var b=findElementsEndingWithId(q.dialogContent,s.cmdId,null,true)[0];
if(b==null){b=findElementsEndingWithName(q.dialogContent,s.cmdId,null,true)[0]
}if(b){b.focus()
}}}}function fadeEmbeddedDialogBG(c,a){c.bgOpacity+=1;
if(c.bgOpacity<a){var b=c.dialogBG;
if(b!=null){if(typeof(b.filters)!="undefined"&&typeof(b.filters.alpha)!="undefined"){b.filters.alpha.opacity=c.bgOpacity
}else{if(typeof(b.style.MozOpacity)!="undefined"){b.style.MozOpacity=c.bgOpacity/100
}else{if(typeof(b.style.KHTMLOpacity)!="undefined"){b.style.KHTMLOpacity=c.bgOpacity/100
}else{b.style.opacity=c.bgOpacity/100
}}}}}else{if(c.fadeTimer!=null){clearInterval(c.fadeTimer);
c.fadeTimer=null
}c.bgOpacity=0
}}function trapFocus(a){if(a.keyCode===9){if(a.shiftKey){if(isFocusOnFirstElement()){a.preventDefault();
setFocusOnLastElement()
}}else{if(isFocusOnLastElement()){a.preventDefault();
setFocusOnFirstElement()
}}}}function isFocusOnFirstElement(){return document.activeElement===getFirstFocusable()
}function isFocusOnLastElement(){return document.activeElement===getLastFocusable()
}function setFocusOnFirstElement(){var a=getFirstFocusable();
if(a){a.focus()
}}function setFocusOnLastElement(){var a=getLastFocusable();
if(a){a.focus()
}}function getFirstFocusable(){var a=findFocusableElements();
return(a&&a[0])||null
}function getLastFocusable(){var a=findFocusableElements();
return(a&&a[a.length-1])||null
}function findFocusableElements(){var b=document.getElementsByClassName("alert-full-page-container").item(0);
var a="a:not(#alertAnchor)[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable]";
return(b&&b.querySelectorAll(a))||null
};
var BalloonRenderer={TIP_WIDTH:17,TIP_HEIGHT:16,TIP_XOFFSET:19,TIP_YOFFSET:6,SHADOW_WIDTH:10,DEFAULT_HIDE_DELAY:350,DEFAULT_SHOW_DELAY:500,TIP_SUFFIX:"_tip",MIDDLE_SUFFIX:"_middle",BLOCKER_SUFFIX:"_blocker",BALLOON_SUFFIX:"_balloon",INITIALIZING:1,INITIALIZED:2,SHOW_REQUESTED:3,SHOWN:4,HIDE_REQUESTED:5,HIDING:6,HIDDEN:7,show:function(b,c,e){b=(b)?b:window.event;
var a=c+this.BALLOON_SUFFIX;
var d=document.getElementById(a);
if(d==null){d=HTMLUtils.addDiv(window.document.body);
d.id=a;
d.balloonInfo=new BalloonRenderer.BalloonInfo(this.INITIALIZING,mouseX(b),mouseY(b));
d.balloonInfo.initialContent=document.getElementById(c);
d.balloonInfo.initialContentParent=d.balloonInfo.initialContent.parentNode
}else{if(d.balloonInfo.state==this.HIDE_REQUESTED||d.balloonInfo.state==this.HIDING||d.balloonInfo.state==this.SHOW_REQUESTED){return
}}d.balloonInfo.initialPosX=mouseX(b);
d.balloonInfo.initialPosY=mouseY(b);
d.balloonInfo.state=this.SHOW_REQUESTED;
setTimeout("BalloonRenderer._show('"+a+"', "+e+");",this.DEFAULT_SHOW_DELAY)
},_show:function(a,c){var b=document.getElementById(a);
if(b.balloonInfo.state==this.SHOW_REQUESTED){if(!b.balloonInfo.fullyInitialized){this.buildBalloon(b.id)
}BalloonRenderer.positionBalloon(b,b.balloonInfo.initialContent);
b.balloonInfo.state=this.SHOWN;
if(c!=null){c()
}}},buildBalloon:function(c){var b,d,f,e=document.getElementById(c),g=typeof contextPath_=="string",h;
if(useVerStatFiles_){h=g?contextPath_+"/"+buildVersion_+"/":"../"
}else{h=g?contextPath_+"/":"../"
}addClass(e,"balloon");
b=HTMLUtils.addDiv(e);
addClass(b,"balloon-top");
d=HTMLUtils.addElement(b,"a");
f=HTMLUtils.addImg(d,h+"akira/pub/images/balloonClose.png");
f.setAttribute("alt",calloutRes.closeTT);
addEvent(f,"mousedown",function(){f.src=h+"akira/pub/images/balloonClose_down.png"
});
addEvent(f,"mouseup",function(){f.src=h+"akira/pub/images/balloonClose.png"
});
addClass(d,"balloon-close");
addEvent(d,"click",function(){BalloonRenderer.closeBalloon(c)
});
var a=HTMLUtils.addDiv(e);
addClass(a,"balloon-middle");
a.id=c+this.MIDDLE_SUFFIX;
addClass(HTMLUtils.addDiv(e),"balloon-bottom");
addEvent(e,"mouseover",function(){BalloonRenderer.mouseOverBalloon(c)
});
addEvent(e,"mouseout",function(){BalloonRenderer.mouseOutBalloon(c)
});
e.balloonInfo.state=this.INITIALIZED;
e.balloonInfo.fullyInitialized=true
},buildTip:function(b){var a=document.getElementById(b+this.TIP_SUFFIX);
if(a==null){a=HTMLUtils.addDiv(window.document.body);
a.id=b+this.TIP_SUFFIX;
addClass(a,"balloon-tip");
addEvent(a,"mouseover",function(){BalloonRenderer.mouseOverBalloon(b)
});
addEvent(a,"mouseout",function(){BalloonRenderer.mouseOutBalloon(b)
})
}return a
},mouseOverBalloon:function(a){var b=document.getElementById(a);
b.balloonInfo.isOverBalloon=true;
b.balloonInfo.state=this.SHOWN
},closeBalloon:function(a){var b=document.getElementById(a);
b.balloonInfo.isOverBalloon=false;
this.hide(a.substr(0,a.length-this.BALLOON_SUFFIX.length))
},mouseOutBalloon:function(a){var b=document.getElementById(a);
b.balloonInfo.isOverBalloon=false;
this.hide(a.substr(0,a.length-this.BALLOON_SUFFIX.length))
},positionBalloon:function(m,j){var a=this.buildTip(m.id);
var h=document.getElementById(m.id+this.MIDDLE_SUFFIX);
if(h.firstChild!=null){h.removeChild(h.firstChild)
}h.appendChild(j);
j.style.display="block";
m.style.display="block";
var c=m.offsetHeight;
var e=m.offsetWidth;
var l=window.scrollY||document.documentElement.scrollTop;
var k=document.body.offsetWidth;
var g=m.balloonInfo.initialPosX;
var b=m.balloonInfo.initialPosY;
var d=g-this.TIP_XOFFSET;
var f=b-c-this.TIP_HEIGHT;
removeClass(a,"balloon-tip-topL");
removeClass(a,"balloon-tip-topR");
removeClass(a,"balloon-tip-bottomL");
removeClass(a,"balloon-tip-bottomR");
a.style.display="block";
if(f>l){m.style.top=f+this.SHADOW_WIDTH-this.TIP_YOFFSET+"px";
a.style.top=f+c-this.TIP_YOFFSET+"px";
if(d+e<k){addClass(a,"balloon-tip-bottomL");
m.style.left=d+"px";
a.style.left=d+this.TIP_XOFFSET+"px"
}else{d=g;
addClass(a,"balloon-tip-bottomR");
m.style.left=d-e+this.TIP_XOFFSET+this.SHADOW_WIDTH+"px";
a.style.left=d-this.TIP_XOFFSET+this.SHADOW_WIDTH+"px"
}}else{f=b+this.TIP_HEIGHT+this.TIP_YOFFSET;
m.style.top=(f-this.SHADOW_WIDTH)+"px";
a.style.top=f-this.TIP_HEIGHT+"px";
if(d+e<k){addClass(a,"balloon-tip-topL");
m.style.left=d+"px";
a.style.left=d+this.TIP_XOFFSET+"px"
}else{d=g;
addClass(a,"balloon-tip-topR");
m.style.left=d-e+this.TIP_XOFFSET+this.SHADOW_WIDTH+"px";
a.style.left=d-this.TIP_XOFFSET+this.SHADOW_WIDTH+"px"
}}Core.hideShowCovered(m,false)
},hide:function(a){var b=document.getElementById(a+this.BALLOON_SUFFIX);
b.balloonInfo.state=this.HIDE_REQUESTED;
setTimeout("BalloonRenderer._hide('"+a+"');",this.DEFAULT_HIDE_DELAY)
},_hide:function(b){var d=document.getElementById(b+this.BALLOON_SUFFIX);
if(d.balloonInfo.state==this.HIDE_REQUESTED){d.balloonInfo.state=this.HIDING;
var a=document.getElementById(d.id+this.TIP_SUFFIX);
var c=document.getElementById(d.id+this.MIDDLE_SUFFIX);
if(c!=null&&c.firstChild!=null){c.removeChild(c.firstChild)
}d.style.display="none";
if(a!=null){a.style.display="none"
}if(d.balloonInfo.initialContent!=null){d.balloonInfo.initialContent.style.display="none";
d.balloonInfo.initialContentParent.appendChild(d.balloonInfo.initialContent)
}Core.hideShowCovered(d,true);
d.balloonInfo.state=this.HIDDEN
}},contentReady:function(a,b){var c=document.getElementById(a+this.BALLOON_SUFFIX);
if(c.balloonInfo.state==this.INITIALIZED||c.balloonInfo.state==this.SHOWN||c.balloonInfo.state==this.SHOW_REQUESTED){BalloonRenderer.positionBalloon(c,b);
c.balloonInfo.state=this.SHOWN
}},BalloonInfo:function(a,c,b){this.state=a;
this.initialPosX=c;
this.initialPosY=b;
this.fullyInitialized=false;
this.isOverBalloon=false;
this.initialContent=null;
this.initialContentParent=null
}};
var DataTrainRenderer={SPEED:25,DELAY:10,moveTrainTo:function(c,a){var b=document.getElementById(c);
if(b.trainWidth<=b.windowWidth){b.style.left=(b.windowWidth-b.trainWidth-15)/2+"px";
b.style.padding="0";
b.leftShifter.src=b.leftShifterDisabledImage;
b.leftShifter.alt=b.leftShifterDisabledTitle;
b.rightShifter.src=b.rightShifterDisabledImage;
b.rightShifter.alt=b.rightShifterDisabledTitle
}else{if(a+b.offsetWidth<=b.windowWidth){b.style.left=(-1*b.offsetWidth)+b.windowWidth+"px";
b.leftShifter.src=b.leftShifterEnabledImage;
b.leftShifter.alt=b.leftShifterTitle;
b.rightShifter.src=b.rightShifterDisabledImage;
b.rightShifter.alt=b.rightShifterDisabledTitle
}else{if(a<0){b.style.left=a+"px";
b.leftShifter.src=b.leftShifterEnabledImage;
b.leftShifter.alt=b.leftShifterTitle;
b.rightShifter.src=b.rightShifterEnabledImage;
b.rightShifter.alt=b.rightShifterTitle;
return true
}else{b.style.left="0px";
b.leftShifter.src=b.leftShifterDisabledImage;
b.leftShifter.alt=b.leftShifterDisabledTitle;
b.rightShifter.src=b.rightShifterEnabledImage;
b.rightShifter.alt=b.rightShifterTitle
}}}return false
},move:function(d,c){var b=document.getElementById(d);
var a=Math.abs(DataTrainRenderer.SPEED/c)<=1?DataTrainRenderer.SPEED*(c>0?1:-1):c;
if(a==0){return
}if(DataTrainRenderer.moveTrainTo(d,parseInt(b.style.left)+a)==true){setTimeout("DataTrainRenderer.move('"+d+"', "+(c-a)+")",DataTrainRenderer.DELAY)
}},shiftLeft:function(b){var a=document.getElementById(b);
DataTrainRenderer.move(a.id,a.windowWidth-a.wagonWidth)
},shiftRight:function(b){var a=document.getElementById(b);
DataTrainRenderer.move(a.id,-1*(a.windowWidth-a.wagonWidth))
},initTrain:function(d,u,p,j,g,f,r,m,q,h,s,t,c){var l=document.getElementById(d);
var o=l.parentNode;
var e=findAllElementsByClass(l,j+"-wagon",null);
var b=e.length;
var k=0;
if(b>0){k=e[0].parentNode.parentNode.childNodes[0].offsetWidth+e[0].parentNode.parentNode.childNodes[1].offsetWidth+e[0].parentNode.parentNode.childNodes[2].offsetWidth
}for(i=0;
i<e.length;
i++){var a=e[i];
a.childNodes[0].style.top=(a.offsetHeight-a.childNodes[0].offsetHeight)/2+"px"
}l.trainWidth=b*k;
l.style.width=l.trainWidth+25+"px";
l.windowWidth=o.offsetWidth;
l.wagonWidth=k;
l.styleClassRoot=j;
l.leftShifter=document.getElementById(d+"-ls");
l.rightShifter=document.getElementById(d+"-rs");
l.leftShifterEnabledImage=q+"/"+g;
l.rightShifterEnabledImage=q+"/"+r;
l.leftShifterDisabledImage=q+"/"+f;
l.rightShifterDisabledImage=q+"/"+m;
l.leftShifterTitle=h;
l.leftShifterDisabledTitle=s;
l.rightShifterTitle=t;
l.rightShifterDisabledTitle=c;
DataTrainRenderer.moveTrainTo(l.id,(-1*u*k))
}};
var MenuHierarchyRenderer={HIERARCHIES:[],NOT_SPECIFIED_VALUE:"-1000",updateMenu:function(y,l,A){var a=EventUtils.getElement(y);
var o=document.getElementById("hierarchyStatus-"+a.id.substring(0,a.id.lastIndexOf("-")));
if(a&&o){var z=o.value.indexOf(a.id);
if(z!=-1){var k=z+a.id.length+1;
var j=o.value.indexOf(";",k);
var g=o.value.indexOf(",",j);
var r=o.value.substring(z,g);
var p=o.value.substring(k,j);
var q=a.id+"="+p+";"+a.selectedIndex;
o.value=o.value.replace(r,q)
}}if(a&&a.dependency){this.clearMenu(a.dependency,l,A);
var t=a.options[a.selectedIndex].value;
if(t==""){return
}var w=o.value.indexOf(a.dependency.id);
if(w==-1){o.value=o.value.concat(a.dependency.id+"="+t+";"+a.dependency.selectedIndex+",")
}else{var s=a.dependency.id+"="+t+";"+a.dependency.selectedIndex;
var m=o.value.indexOf(a.dependency.id);
var d=m+a.dependency.id.length+1;
var c=o.value.indexOf(";",d);
var b=o.value.indexOf(",",c);
var u=o.value.substring(m,b);
o.value=o.value.replace(u,s)
}var e=this.HIERARCHIES[l][t];
if(e){if(!A){for(i=0;
i<e.length;
i++){a.dependency.options[i]=new Option(e[i].text,e[i].value)
}if(a.dependency.options.length>0){removeClass(a.dependency.parentNode,"hidden-audible");
a.dependency.disabled=false
}}else{for(i=1;
i<e.length;
i++){a.dependency.options[i]=new Option(e[i].text,e[i].value)
}if(a.dependency.options.length>1){removeClass(a.dependency.parentNode,"hidden-audible");
a.dependency.disabled=false
}}}else{var v=document.jsfForm()[l+"-r"];
var h=v.value;
h=addParameter(h,"q",t);
var f=new HTTPClient();
f.init(h);
f.asyncGET(new MenuHierarchyHandler(a.dependency,l,t,A))
}if(a.dependency.fireEvent&&!AKBrowserDetection.isIE9OrMore()){setTimeout(function(){a.dependency.fireEvent("onchange")
},100)
}else{if(a.dependency.dispatchEvent){var x=document.createEvent("UIEvents");
x.initEvent("change",true,true);
setTimeout(function(){a.dependency.dispatchEvent(x)
},100)
}}}},initialSelection:function(a){var c=document.getElementById(a);
if(c.fireEvent&&!AKBrowserDetection.isIE9OrMore()){c.fireEvent("onchange")
}else{if(c.dispatchEvent){var b=document.createEvent("UIEvents");
b.initEvent("change",true,true);
c.dispatchEvent(b)
}}},refreshMenu:function(e,c,g){var b=document.getElementById(e);
var f=document.getElementById("hierarchyStatus-"+e.substring(0,e.lastIndexOf("-")));
if(f&&f.value!=""){var j=f.value.indexOf(e);
if(j==-1){return
}var k=j+e.length+1;
var h=f.value.substring(k,f.value.indexOf(";",k));
var l=document.jsfForm()[c+"-r"];
var a=l.value;
a=addParameter(a,"q",h);
var d=new HTTPClient();
d.init(a);
d.asyncGET(new MenuHierarchyHandler(b,c,h,g))
}},clearMenu:function(b,c,a){if(!a){while(b.options.length>0){b.options[0]=null
}}else{while(b.options.length>1){b.options[1]=null
}}if(b.dependency){this.clearMenu(b.dependency,c,a)
}if(!a){if(b.options[0]==null){addClass(b.parentNode,"hidden-audible");
b.disabled=true
}}else{if(b.options[0].value==this.NOT_SPECIFIED_VALUE){addClass(b.parentNode,"hidden-audible");
b.disabled=true
}}},cloneOptions:function(b){var a=new Array(b.length);
for(i=0;
i<b.length;
i++){a[i]=new Option(b[i].text,b[i].value)
}return a
},loadOptions:function(k,f,s,b,u){var o=false;
var t=-1;
var h=document.getElementById("hierarchyStatus-"+k.id.substring(0,k.id.lastIndexOf("-")));
var g=h.value.indexOf(k.id);
if(g!=-1){var c=h.value.indexOf(";",g);
var a=h.value.indexOf(",",c);
var l=h.value.substring(g+k.id.length+1,c);
if(l==s){o=true;
t=h.value.substring(c+1,a)
}}var m=b.documentElement.childNodes;
var d=new Array(m.length);
var e=1;
for(var q=0;
q<m.length;
q++){var r=m.item(q);
if(r.nodeName!="option"){continue
}var p=r.childNodes[0].childNodes[0].nodeValue;
var j=r.childNodes[1].childNodes[0].nodeValue;
if(q==0&&!u){d[0]=new Option(j,p);
if(o==true){k.options[0]=new Option(j,p)
}}else{if(q==0&&j==k.options[0].text){d[0]=new Option(j,p);
if(o==true){k.options[0].value=p
}}else{d[e]=new Option(j,p);
if(o==true){k.options[e]=new Option(j,p)
}e++
}}}this.HIERARCHIES[f][s]=d;
if(o==true){if(t!=-1){k.selectedIndex=t
}else{k.selectedIndex=0
}if(k.options.length>1||(k.options.length>0&&!u)){removeClass(k.parentNode,"hidden-audible");
k.disabled=false
}}}};
function MenuHierarchyHandler(a,d,c,b){this.menu=a;
this.hierarchyId=d;
this.parentValue=c;
this.hasDefaultValue=b
}MenuHierarchyHandler.prototype.onInit=function(){};
MenuHierarchyHandler.prototype.onError=function(){};
MenuHierarchyHandler.prototype.onProgress=function(){};
MenuHierarchyHandler.prototype.onLoad=function(a){MenuHierarchyRenderer.loadOptions(this.menu,this.hierarchyId,this.parentValue,a,this.hasDefaultValue)
};
var SuggestiveInputRenderer={KEYUP:38,KEYDOWN:40,KEYENTER:13,KEYTAB:9,DELAY:100,CACHES:[],initSuggestiveInput:function(d,b,g,f,a){var e=document.getElementById(d);
this.CACHES[d]=[];
e.textDirection=a;
e.outputID=b;
e.queryURL=f;
e.styleClassRoot=g;
e.autocomplete="off";
addEvent(e,"keydown",this.keydownHandler);
addEvent(e,"change",this.changeHandler);
addEvent(e,"blur",this.blurHandler);
var c=document.getElementById(d+"-hidden");
if(c&&c.value){c.inputValue=e.value
}this.getOutputHandler(e)
},changeHandler:function(a){var b=a?a:event;
SuggestiveInputRenderer._changeHandler(getEventElement(b))
},_changeHandler:function(b){var a=SuggestiveInputRenderer.getOutputHandler(b);
a.unselect()
},blurHandler:function(a){var b=a?a:event;
SuggestiveInputRenderer._blurHandler(getEventElement(b))
},_blurHandler:function(a){SuggestiveInputRenderer.hideSuggestions(a);
a.removeAttribute("aria-activedescendant")
},keydownHandler:function(a){var b=a?a:event;
SuggestiveInputRenderer._keydownHandler(b,getEventElement(b))
},_keydownHandler:function(a,f){var e=SuggestiveInputRenderer.getOutputHandler(f);
var d=getKeyPressed(a);
if(e.isHidden()&&d!=this.KEYTAB||(d!=this.KEYUP&&d!=this.KEYDOWN&&d!=this.KEYENTER&&d!=this.KEYTAB)){window.clearTimeout(e.input.timeoutID);
e.input.timeoutID=window.setTimeout(function(){SuggestiveInputRenderer.showSuggestions(f.id)
},this.DELAY);
return true
}var c=e.output;
var b=this.getSelectedDivIndex(c);
if((d==this.KEYENTER)||(d==this.KEYTAB)){if(b>=0){var g=this.setSelectedDiv(c,b);
SuggestiveInputRenderer._selectResult(g);
f.removeAttribute("aria-activedescendant")
}return false
}else{if(d==this.KEYUP){this.setSelectedDiv(c,b-1);
SuggestiveInputRenderer._updateSelectedResult(c,f)
}else{if(d==this.KEYDOWN){this.setSelectedDiv(c,b+1);
SuggestiveInputRenderer._updateSelectedResult(c,f)
}}}return true
},showSuggestions:function(b){var c=document.getElementById(b);
var d=this.getOutputHandler(c);
var e=c.value.trim();
var a=SuggestiveInputRenderer.CACHES[b][e];
if(!d.unselect()){return
}if(!a){window.clearTimeout(c.timeoutID);
c.timeoutID=window.setTimeout(function(){SuggestiveInputRenderer.doQuery(b)
},this.DELAY)
}else{d.fill(a)
}},hideSuggestions:function(b){var a=SuggestiveInputRenderer.getOutputHandler(b);
a.hide(true)
},getOutputHandler:function(c){var b=c.outputHandler;
if(!b){if(c.outputID){b=new _TextareaHandler(c,document.getElementById(c.outputID))
}else{var a=HTMLUtils.addDiv(document.body);
addClass(a,c.styleClassRoot+"-sug");
a.setAttribute("role","listbox");
a.id=c.id+"-list";
b=new _DivHandler(c,a)
}c.outputHandler=b
}return b
},selectResult:function(){SuggestiveInputRenderer._selectResult(this)
},_selectResult:function(e){var d=e.getElementsByTagName("span");
var b=/.suggestion[0-9]+$/;
if(d){for(var c=0;
c<d.length;
c++){if(b.test(d[c].id)){var f=document.getElementById(d[c].inputID);
var a=document.getElementById(d[c].inputID+"-hidden");
f.value=d[c].innerText?d[c].innerText:d[c].textContent;
addClass(f,f.styleClassRoot+"-input-selected");
a.value=d[c].key;
a.inputValue=f.value;
f.focus();
SuggestiveInputRenderer.hideSuggestions(f);
return
}}}},_updateSelectedResult:function(a,b){selIndex=this.getSelectedDivIndex(a);
if(selIndex>=0){var c=a.getElementsByTagName("div")[selIndex];
b.setAttribute("aria-activedescendant",c.id)
}b.focus()
},getSelectedDivIndex:function(a){var c=a.getElementsByTagName("div");
if(c){for(var b=0;
b<c.length;
b++){if(c[b].selected){return b
}}}return -1
},setSelectedDiv:function(a,c){var b=this.getSelectedDivIndex(a);
var d;
var e=a.getElementsByTagName("div");
if(e&&e.length>0){if(c>=e.length){c=0
}else{if(c<0){c=e.length-1
}}if(b!=-1){e[b].selected=false;
this._unhighlightResult(e[b])
}this._highlightResult(e[c]);
e[c].selected=true;
d=e[c]
}return d
},highlightResult:function(){SuggestiveInputRenderer._highlightResult(this)
},_highlightResult:function(a){var b=document.getElementById(a.inputID);
addClass(a,b.styleClassRoot+"-sug-div-over")
},unhighlightResult:function(){SuggestiveInputRenderer._unhighlightResult(this)
},_unhighlightResult:function(a){if(!a.selected){var b=document.getElementById(a.inputID);
removeClass(a,b.styleClassRoot+"-sug-div-over")
}},doQuery:function(b){var d=document.getElementById(b);
var e=d.value.trim();
var c=d.queryURL;
c=addParameter(c,"q",e);
var a=new HTTPClient();
a.init(c);
a.asyncGET(new SuggestiveInputHandler(b,e))
},loadSuggestions:function(h,d,k){var e=k.getElementsByTagName("suggestion");
var j=[];
for(var b=0;
b<e.length;
b++){var c=[];
var a=e[b];
var g=a.getElementsByTagName("value")[0];
var f=a.getElementsByTagName("label")[0];
c[0]=g.text||g.textContent;
c[1]=f.text||f.textContent;
j[b]=c
}SuggestiveInputRenderer.CACHES[h][d]=j;
this.showSuggestions(h)
}};
function _TextareaHandler(b,c){this.input=b;
this.output=c;
var a=this;
this._isWebKit=navigator.userAgent.indexOf("WebKit")!=-1;
if(this._isWebKit){addEvent(this.output,"dragenter",function(d){a.dragEnterHandler(d)
})
}addEvent(this.output,"dragstart",function(d){a.dragStartHandler(d)
});
addEvent(this.output,"draggesture",function(d){a.dragStartHandler(d)
})
}_TextareaHandler.prototype.isHidden=function(){return false
};
_TextareaHandler.prototype.hide=function(a){};
_TextareaHandler.prototype.fill=function(d){var c=this.output;
var a="";
var b="";
for(var e=0;
e<d.length;
e++){b+=a+d[e][1];
a="\n"
}c.value=b
};
_TextareaHandler.prototype.unselect=function(){return true
};
_TextareaHandler.prototype.select=function(a){};
_TextareaHandler.prototype.dragEnterHandler=function(a){if(a.stopPropagation){a.stopPropagation()
}if(a.preventDefault){a.preventDefault()
}this.dragStartHandler(a);
return true
};
_TextareaHandler.prototype.dragStartHandler=function(b){var f=b?b:event;
if(this.output.setSelectionRange&&!this._isWebKit){var e=this.output.value;
var g=this.output.selectionStart;
var a=this.output.selectionEnd;
while(g>0){if(e.charAt(g)=="{"){break
}g--
}while(a<e.length){if(e.charAt(a-1)=="}"){break
}a++
}this.output.setSelectionRange(g,a)
}else{if(this._isWebKit){}else{if(document.selection){var c=document.selection.createRange();
var e,d;
while(true){e=c.text;
if(e.charAt(0)=="{"){break
}d=c.moveStart("character",-1);
if(d==0){break
}}while(true){e=c.text;
if(e.charAt(e.length-1)=="}"){break
}d=c.moveEnd("character",1);
if(d==0){break
}}c.select()
}}}};
function _DivHandler(a,b){this.input=a;
this.output=b
}_DivHandler.prototype.isHidden=function(){return this.output.style.visibility=="hidden"
};
_DivHandler.prototype.hide=function(a){this.output.style.visibility=a?"hidden":"visible";
if(a){Core.hideShowCovered(this.output,a)
}};
_DivHandler.prototype.fill=function(k){var e=this.input;
var f=e.offsetLeft;
var d=e.offsetTop+e.offsetHeight;
var g=e;
while(g.offsetParent){g=g.offsetParent;
f+=g.offsetLeft;
d+=g.offsetTop
}var a=this.output;
a.style.left=f+"px";
a.style.top=d+"px";
while(a.lastChild){a.removeChild(a.lastChild)
}for(var b=0;
b<k.length;
b++){var h=HTMLUtils.addDiv(a);
addClass(h,e.styleClassRoot+"-sug-div");
h.id=e.id+"-test"+b;
h.onmousedown=SuggestiveInputRenderer.selectResult;
h.onmousemove=SuggestiveInputRenderer.highlightResult;
h.onmouseout=SuggestiveInputRenderer.unhighlightResult;
h.inputID=e.id;
h.setAttribute("role","option");
var j=HTMLUtils.addSpan(h);
addClass(j,e.styleClassRoot+"-sug-span");
j.key=k[b][0];
writeText(j,k[b][1]);
j.id=e.id+"-suggestion"+b;
j.inputID=e.id
}if(e.textDirection=="rtl"){f+=e.offsetWidth-this.output.offsetWidth;
a.style.left=f+"px"
}var c;
if(k.length==1&&k[0][1].length==e.value.length){this.select(0);
this.hide(true);
this._selectResult(this.setSelectedDiv(a,0));
c=true
}else{c=k.length==0;
this.hide(c)
}Core.hideShowCovered(a,c)
};
_DivHandler.prototype.unselect=function(){var a=document.getElementById(this.input.id+"-hidden");
if(this.input.value==a.inputValue){return false
}removeClass(this.input,this.input.styleClassRoot+"-input-selected");
a.value="";
a.inputValue="";
return true
};
_DivHandler.prototype.select=function(a){};
function SuggestiveInputHandler(b,a){this.inputID=b;
this.queryString=a
}SuggestiveInputHandler.prototype.onInit=function(){};
SuggestiveInputHandler.prototype.onError=function(){};
SuggestiveInputHandler.prototype.onProgress=function(){};
SuggestiveInputHandler.prototype.onLoad=function(a){SuggestiveInputRenderer.loadSuggestions(this.inputID,this.queryString,a)
};
function NullHandler(){}NullHandler.prototype.onInit=function(){};
NullHandler.prototype.onError=function(a,b){};
NullHandler.prototype.onProgress=function(b,a){};
NullHandler.prototype.onLoad=function(a){};
var AjaxActionRenderer={sendRequest:function(pHandler,pUrlPart,pStaticParams,pFormParams,pJsParams,pSrcCompId){var client=new HTTPClient();
var url=pUrlPart;
for(i=0,n=pStaticParams.length;
i<n;
i++){url+="&"+pStaticParams[i][0];
url+="="+pStaticParams[i][1]
}for(i=0,n=pFormParams.length;
i<n;
i++){var input=document.getElementById(pFormParams[i][1]);
url=addParameter(url,pFormParams[i][0],input.value)
}for(i=0,n=pJsParams.length;
i<n;
i++){url+="&"+pJsParams[i][0];
url+="="+eval(pJsParams[i][1])
}if(pSrcCompId!=null){url+="&aaSrcComp";
url+="="+pSrcCompId
}client.init(url);
if(pHandler.length==0){pHandler="NullHandler"
}client.asyncGET(eval("new "+pHandler+"()"))
}};
var MessagesRenderer={moveMessages:function(b,a){var d=document.getElementById(b);
var c=findElementsEndingWithId(null,a,null,true)[0];
if(c!=null){d.appendChild(c);
StyleUtils.removeClass(c,"messagesWillMove")
}}};
var StarRenderer={manageStarClicked:function(g){g=(g)?g:window.event;
var e=getEventElement(g);
var a=e.parentNode;
var j=a.parentNode;
var f=window.document.getElementById(j.id+"-cr");
var d=window.document.getElementById(j.id+"-iw");
var c=parseInt(d.value);
var b=StarRenderer.getLIIndexInUL(a);
var h=window.document.getElementById(j.id+"-hf");
if(parseInt(h.value)==b){b=0
}h.value=b;
f.style.width=b*c+"px"
},getLIIndexInUL:function(d){var e=d.parentNode;
var a=e.childNodes;
var b=0;
for(var c=0;
c<a.length;
c++){if(/^li$/i.test(a[c].tagName)){if(a[c]==d){return b
}b++
}}return -1
}};
var WindowRenderer={openWindow:function(sURL,sName,width,height,clientId,onPopupBlocked){var wind=openWindow(sURL,sName,width,height);
if(onPopupBlocked!=""&&wind==null){eval(onPopupBlocked+"('"+clientId+"')")
}return wind
}};
var FCKeditor=function(b,d,a,c,e){this.InstanceName=b;
this.Width=d||"100%";
this.Height=a||"200";
this.ToolbarSet=c||"Basic";
this.Value=e||"";
this.BasePath="/pub/fckeditor/";
this.Config=new Object()
};
FCKeditor.prototype.Create=function(){if(this.InstanceName){document.write("<div>");
document.write('<input type="hidden" id="'+this.InstanceName+'" name="'+this.InstanceName+'" value="'+this._HTMLEncode(this.Value)+'" />');
document.write(this._GetConfigHtml());
document.write(this._GetIFrameHtml());
document.write("</div>")
}else{alert("You must specify a instance name.")
}};
FCKeditor.prototype.ReplaceTextarea=function(){var a=document.getElementById(this.InstanceName);
if(!a){a=document.getElementsByName(this.InstanceName)[0]
}if(!a||a.tagName!="TEXTAREA"){alert('Error: The TEXTAREA id "'+this.InstanceName+'" was not found');
return
}a.style.display="none";
this._InsertHtmlBefore(this._GetConfigHtml(),a);
this._InsertHtmlBefore(this._GetIFrameHtml(),a)
};
FCKeditor.prototype._InsertHtmlBefore=function(b,a){if(a.insertAdjacentHTML){a.insertAdjacentHTML("beforeBegin",b)
}};
FCKeditor.prototype._GetConfigHtml=function(){var a="";
for(var b in this.Config){if(a.length>0){a+="&amp;"
}a+=escape(b)+"="+escape(this.Config[b])
}return'<input type="hidden" id="'+this.InstanceName+'___Config" value="'+a+'" />'
};
FCKeditor.prototype._GetIFrameHtml=function(){var c="fckeditor.compressed.html";
var a=this.BasePath+"editor/"+c+"?InstanceName="+this.InstanceName;
if(this.ToolbarSet){a+="&Toolbar="+this.ToolbarSet
}var b="Editor";
return'<iframe title="'+b+'" id="'+this.InstanceName+'___Frame" src="'+a+'" width="'+this.Width+'" height="'+this.Height+'" frameborder="no" scrolling="no"></iframe>'
};
FCKeditor.prototype._HTMLEncode=function(a){if(typeof(a)!="string"){a=a.toString()
}a=a.replace(/&/g,"&amp;");
a=a.replace(/"/g,"&quot;");
a=a.replace(/</g,"&lt;");
a=a.replace(/>/g,"&gt;");
a=a.replace(/'/g,"&#39;");
return a
};
var __FORM__=1;
var FORM_DATA_SNAPSHOT=new Array();
function FormDataSnapshot(a){this.form=a;
this.data=new Array()
}function ElementDataSnapshot(a,b){this.element=a;
this.data=b
}function fillFormDataSnapshot(a){for(var e=0;
e<a.form.elements.length;
e++){var f=a.form.elements[e];
var h=f.type;
var c=null;
var b=false;
var g=false;
if(f.id.indexOf("not_relevant")!=-1){b=true
}else{if(f.id.indexOf("relevant")!=-1){g=true
}}if(!b){if(h=="checkbox"||h=="radio"){c=new ElementDataSnapshot(f,f.checked)
}else{if(h=="select-one"){c=new ElementDataSnapshot(f,f.selectedIndex)
}else{if(h=="select-multiple"){var k=new Array();
for(var d=0;
d<f.length;
d++){k[k.length]=f.options[d].selected
}c=new ElementDataSnapshot(f,k)
}else{if(h=="text"||h=="textarea"){c=new ElementDataSnapshot(f,f.value)
}else{if(h=="hidden"&&g){c=new ElementDataSnapshot(f,f.value)
}}}}}}if(c!=null){a.data[a.data.length]=c
}}}function findFormDataSnapshot(c){var a=null;
for(var b=0;
b<FORM_DATA_SNAPSHOT.length;
b++){if(FORM_DATA_SNAPSHOT[b].form==c){a=FORM_DATA_SNAPSHOT[b];
break
}}return a
}function takeFormDataSnapshotOnload(){takeFormDataSnapshot(window.document.jsfForm())
}function takeFormDataSnapshot(b){if(b.formChanged.value!="1"){var a=findFormDataSnapshot(b);
if(a==null){a=new FormDataSnapshot(b);
FORM_DATA_SNAPSHOT[FORM_DATA_SNAPSHOT.length]=a
}fillFormDataSnapshot(a)
}}function isIgnoredElement(b,a){var d=false;
if(a&&typeof(a.length)=="number"){for(var c=0;
c<a.length;
c++){if(b==a[c]){d=true;
break
}}}else{if(b==a){d=true
}}return d
}function checkFormDataChangesOnsubmit(a){if(isFormDataChanged(a)){a.formChanged.value="1"
}}function isFormDataChanged(h,k){if(h.formChanged.value=="1"){return true
}var a=false;
var b=findFormDataSnapshot(h);
if(b!=null){for(var e=0;
e<b.data.length;
e++){var f=b.data[e].element;
var g=f.type;
var c=b.data[e].data;
if(!isIgnoredElement(f,k)){if(g=="checkbox"||g=="radio"){if(c!=f.checked){a=true;
break
}}else{if(g=="select-one"){if(c!=f.selectedIndex){a=true;
break
}}else{if(g=="select-multiple"){for(var d=0;
d<f.length;
d++){if(c[d]!=f.options[d].selected){a=true;
break
}}}else{if(g=="hidden"||g=="text"||g=="textarea"){if(c!=f.value){a=true;
break
}}}}}}}}if(a){h.formChanged.value="1"
}return a
}function formCheckAll(e){var c=e.checked;
var f=findParentOfType(e,"TABLE");
if(f==null){return c
}var b=ElementUtils.getChildrenElementsByTagName(ElementUtils.getChildElementByTagName(f,"TBODY"),"INPUT");
for(var d=0;
d<b.length;
d++){var a=b[d];
if(a.type=="checkbox"&&!a.disabled){a.checked=c
}}return c
}function formSyncCheckAll(a){formSyncCheckAll2(a,false)
}function formSyncCheckAll2(g,f){if(typeof g=="string"){g=document.getElementById(g);
if(g==null){return
}}var a=getSelectedRowCount(g);
var h=(a.nbSelectedRows==a.totalNbRows);
if((f&&!h)||!f){var e=findParentOfType(g,"TABLE");
if(e==null){return a.nbSelectedRows>0
}var c=ElementUtils.getChildrenElementsByTagName(ElementUtils.getChildElementByTagName(e,"THEAD"),"INPUT");
for(var d=0;
d<c.length;
i++){var b=c[d];
if(b.type=="checkbox"&&!b.disabled){b.checked=h;
break
}}}return a.nbSelectedRows>0
}function SelectedRowResult(b,a){this.nbSelectedRows=b;
this.totalNbRows=a
}function getSelectedRowCount(f){var g=0;
var d=0;
var e=findParentOfType(f,"TABLE");
if(e!=null){var b=ElementUtils.getChildrenElementsByTagName(ElementUtils.getChildElementByTagName(e,"TBODY"),"INPUT");
for(var c=0;
c<b.length;
c++){var a=b[c];
if(a.type=="checkbox"&&!a.disabled){if(a.checked){g++
}d++
}}}return new SelectedRowResult(g,d)
};
var Calendar=function(c,b,h,a,d,g,f,e){this.calendarID=e;
this.activeDiv=null;
this.currentDateEl=null;
this.getDateStatus=null;
this.timeout=null;
this.onSelected=h||null;
this.onClose=a||null;
this.onClear=d||null;
this.onDone=g||null;
this.onCancel=f||null;
this.dragging=false;
this.hidden=false;
this.minYear=1970;
this.maxYear=2050;
this.dateFormat=Calendar.getText("DEF_DATE_FORMAT");
this.ttDateFormat=Calendar.getText("TT_DATE_FORMAT");
this.isPopup=true;
this.weekNumbers=true;
this.firstDayOfWeek=c;
this.showsOtherMonths=false;
this.dateStr=b;
this.ar_days=null;
this.showsCalendar=true;
this.showsTime=false;
this.showsActionBar=this.showsTime;
this.time24=true;
this.yearStep=2;
this.table=null;
this.element=null;
this.tbody=null;
this.firstdayname=null;
this.monthsCombo=null;
this.yearsCombo=null;
this.hilitedMonth=null;
this.activeMonth=null;
this.hilitedYear=null;
this.activeYear=null;
this.dateClicked=false;
this.t12=null;
this.hourInput=null;
this.ampmInput=null;
this.minInput=null
};
Calendar._C=null;
Calendar.is_ie=(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent));
Calendar.is_ie5=(Calendar.is_ie&&/msie 5\.0/i.test(navigator.userAgent));
Calendar.is_opera=/opera/i.test(navigator.userAgent);
Calendar.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent);
Calendar.is_webkit=/webkit/i.test(navigator.userAgent);
Calendar.getAbsolutePos=function(e){var a=0,d=0;
var c=/^div$/i.test(e.tagName);
if(c&&e.scrollLeft){a=e.scrollLeft
}if(c&&e.scrollTop){d=e.scrollTop
}var f={x:e.offsetLeft-a,y:e.offsetTop-d};
if(e.offsetParent){var b=this.getAbsolutePos(e.offsetParent);
f.x+=b.x;
f.y+=b.y
}return f
};
Calendar.isRelated=function(c,a){var d=a.relatedTarget;
if(!d){var b=a.type;
if(b=="mouseover"){d=a.fromElement
}else{if(b=="mouseout"){d=a.toElement
}}}while(d){if(d==c){return true
}d=d.parentNode
}return false
};
Calendar.removeClass=function(e,d){if(!(e&&e.className)){return
}var a=e.className.split(" ");
var b=new Array();
for(var c=a.length;
c>0;
){if(a[--c]!=d){b[b.length]=a[c]
}}e.className=b.join(" ")
};
Calendar.addClass=function(b,a){Calendar.removeClass(b,a);
b.className+=" "+a
};
Calendar.getElement=function(a){var b=Calendar.is_ie?window.event.srcElement:a.currentTarget;
while(b.nodeType!=1||/^div$/i.test(b.tagName)){b=b.parentNode
}return b
};
Calendar.getTargetElement=function(a){var b=Calendar.is_ie?window.event.srcElement:a.target;
while(b.nodeType!=1){b=b.parentNode
}return b
};
Calendar.stopEvent=function(a){a||(a=window.event);
if(Calendar.is_ie){a.cancelBubble=true;
a.returnValue=false
}else{a.preventDefault();
a.stopPropagation()
}a.returnValue=false
};
Calendar.addEvent=function(a,c,b){if(a.attachEvent){a.attachEvent("on"+c,b)
}else{if(a.addEventListener){a.addEventListener(c,b,true)
}else{a["on"+c]=b
}}};
Calendar.removeEvent=function(a,c,b){if(a.detachEvent){a.detachEvent("on"+c,b)
}else{if(a.removeEventListener){a.removeEventListener(c,b,true)
}else{a["on"+c]=null
}}};
Calendar.createElement=function(c,b){var a=null;
a=document.createElement(c);
if(typeof b!="undefined"){b.appendChild(a)
}return a
};
Calendar._add_evs=function(el){with(Calendar){addEvent(el,"mouseover",dayMouseOver);
addEvent(el,"mousedown",dayMouseDown);
addEvent(el,"mouseout",dayMouseOut);
if(is_ie){addEvent(el,"dblclick",dayMouseDblClick);
el.setAttribute("unselectable",true)
}}};
Calendar.findMonth=function(a){if(typeof a.month!="undefined"){return a
}else{if(typeof a.parentNode.month!="undefined"){return a.parentNode
}}return null
};
Calendar.findYear=function(a){if(typeof a.year!="undefined"){return a
}else{if(typeof a.parentNode.year!="undefined"){return a.parentNode
}}return null
};
Calendar.showMonthsCombo=function(){var d=Calendar._C;
if(!d){return false
}var d=d;
var e=d.activeDiv;
var c=d.monthsCombo;
if(d.hilitedMonth){Calendar.removeClass(d.hilitedMonth,"hilite")
}if(d.activeMonth){Calendar.removeClass(d.activeMonth,"active")
}var a=d.monthsCombo.getElementsByTagName("div")[d.date.getMonth()];
Calendar.addClass(a,"active");
d.activeMonth=a;
var b=e.navtype<0?"Bl":"Br";
showAtElement2(c,e,b,d.element)
};
Calendar.showYearsCombo=function(f,h){var b=Calendar._C;
if(!b){return false
}var b=b;
var d=b.activeDiv;
var g=b.yearsCombo;
if(b.hilitedYear){Calendar.removeClass(b.hilitedYear,"hilite")
}if(b.activeYear){Calendar.removeClass(b.activeYear,"active")
}b.activeYear=null;
var c=h==20?(f?b.date.getFullYear()-5:b.date.getFullYear()+5):b.date.getFullYear()+(f?1:-1);
if(f&&c<b.minYear){c=b.minYear
}else{if(!f&&c>b.maxYear){c=b.maxYear
}}var k=g.firstChild;
var j=false;
for(var e=12;
e>0;
--e){if(c>=b.minYear&&c<=b.maxYear){k.innerHTML=c;
k.year=c;
k.style.display="block";
j=true
}else{k.style.display="none"
}k=k.nextSibling;
c+=f?b.yearStep:-b.yearStep
}if(j){var a=d.navtype<0?"Bl":"Br";
showAtElement2(g,d,a,b.element)
}};
Calendar.tableMouseUp=function(ev){var cal=Calendar._C;
if(!cal){return false
}if(cal.timeout){clearTimeout(cal.timeout)
}var el=cal.activeDiv;
if(!el){return false
}var target=Calendar.getTargetElement(ev);
ev||(ev=window.event);
Calendar.removeClass(el,"active");
if(target==el||target.parentNode==el){Calendar.cellClick(el,ev)
}var mon=Calendar.findMonth(target);
var date=null;
if(mon){date=new Date(cal.date);
if(mon.month!=date.getMonth()){date.setMonth(mon.month);
cal.setDate(date);
cal.dateClicked=false;
cal.callHandler()
}}else{var year=Calendar.findYear(target);
if(year){date=new Date(cal.date);
if(year.year!=date.getFullYear()){date.setFullYear(year.year);
cal.setDate(date);
cal.dateClicked=false;
cal.callHandler()
}}}with(Calendar){removeEvent(document,"mouseup",tableMouseUp);
removeEvent(document,"mouseover",tableMouseOver);
removeEvent(document,"mousemove",tableMouseOver);
cal._hideCombos();
_C=null;
return stopEvent(ev)
}};
Calendar.tableMouseOver=function(n){var a=Calendar._C;
if(!a){return
}var c=a.activeDiv;
var j=Calendar.getTargetElement(n);
if(j==c||j.parentNode==c){Calendar.addClass(c,"hilite active");
Calendar.addClass(c.parentNode,"rowhilite")
}else{if(typeof c.navtype=="undefined"||(c.navtype!=50&&(c.navtype==0||Math.abs(c.navtype)>2))){Calendar.removeClass(c,"active")
}Calendar.removeClass(c,"hilite");
Calendar.removeClass(c.parentNode,"rowhilite")
}n||(n=window.event);
if(c.navtype==50&&j!=c){var m=Calendar.getAbsolutePos(c);
var p=c.offsetWidth;
var o=n.clientX;
var q;
var l=true;
if(o>m.x+p){q=o-m.x-p;
l=false
}else{q=m.x-o
}if(q<0){q=0
}var f=c._range;
var h=c._current;
var g=Math.floor(q/10)%f.length;
for(var e=f.length;
--e>=0;
){if(f[e]==h){break
}}while(g-->0){if(l){if(--e<0){e=f.length-1
}}else{if(++e>=f.length){e=0
}}}var b=f[e];
c.innerHTML=b;
a.onUpdateTime()
}var d=Calendar.findMonth(j);
if(d){if(d.month!=a.date.getMonth()){if(a.hilitedMonth){Calendar.removeClass(a.hilitedMonth,"hilite")
}Calendar.addClass(d,"hilite");
a.hilitedMonth=d
}else{if(a.hilitedMonth){Calendar.removeClass(a.hilitedMonth,"hilite")
}}}else{if(a.hilitedMonth){Calendar.removeClass(a.hilitedMonth,"hilite")
}var k=Calendar.findYear(j);
if(k){if(k.year!=a.date.getFullYear()){if(a.hilitedYear){Calendar.removeClass(a.hilitedYear,"hilite")
}Calendar.addClass(k,"hilite");
a.hilitedYear=k
}else{if(a.hilitedYear){Calendar.removeClass(a.hilitedYear,"hilite")
}}}}return Calendar.stopEvent(n)
};
Calendar.tableMouseDown=function(a){if(AKBrowserDetection.isIE9OrMore()){return true
}else{if(Calendar.getTargetElement(a)==Calendar.getElement(a)){return Calendar.stopEvent(a)
}}};
Calendar.calDragIt=function(b){var c=Calendar._C;
if(!(c&&c.dragging)){return false
}var e;
var d;
if(Calendar.is_ie){d=window.event.clientY+document.body.scrollTop;
e=window.event.clientX+document.body.scrollLeft
}else{e=b.pageX;
d=b.pageY
}c.hideShowCovered();
var a=c.element.style;
a.left=(e-c.xOffs)+"px";
a.top=(d-c.yOffs)+"px";
return Calendar.stopEvent(b)
};
Calendar.calDragEnd=function(ev){var cal=Calendar._C;
if(!cal){return false
}cal.dragging=false;
with(Calendar){removeEvent(document,"mousemove",calDragIt);
removeEvent(document,"mouseup",calDragEnd);
tableMouseUp(ev)
}cal.hideShowCovered()
};
Calendar.dayMouseDown=function(ev){var el=Calendar.getElement(ev);
if(el.disabled){return false
}var cal=el.calendar;
cal.activeDiv=el;
Calendar._C=cal;
if(el.navtype!=300){with(Calendar){if(el.navtype==50){el._current=el.innerHTML;
addEvent(document,"mousemove",tableMouseOver)
}else{addEvent(document,Calendar.is_ie5?"mousemove":"mouseover",tableMouseOver)
}addClass(el,"hilite active");
addEvent(document,"mouseup",tableMouseUp)
}}else{if(cal.isPopup){cal._dragStart(ev)
}}if(el.navtype==-1||el.navtype==1||el.navtype==10){if(cal.timeout){clearTimeout(cal.timeout)
}cal.timeout=setTimeout("Calendar.showMonthsCombo()",250)
}else{if(el.navtype==-2||el.navtype==2||el.navtype==20){if(cal.timeout){clearTimeout(cal.timeout)
}cal.timeout=setTimeout((el.navtype>0)?"Calendar.showYearsCombo(true, "+el.navtype+")":"Calendar.showYearsCombo(false, "+el.navtype+")",250)
}else{cal.timeout=null
}}return Calendar.stopEvent(ev)
};
Calendar.dayMouseDblClick=function(a){Calendar.cellClick(Calendar.getElement(a),a||window.event);
if(Calendar.is_ie){document.selection.empty()
}};
Calendar.dayMouseOver=function(b){var a=Calendar.getElement(b);
if(Calendar.isRelated(a,b)||Calendar._C||a.disabled){return false
}if(a.ttip){if(a.ttip.substr(0,1)=="_"){a.ttip=a.caldate.print(a.calendar.ttDateFormat)+a.ttip.substr(1)
}a.calendar.tooltips.innerHTML=a.ttip
}if(a.navtype!=300){Calendar.addClass(a,"hilite");
if(a.caldate){Calendar.addClass(a.parentNode,"rowhilite")
}}return Calendar.stopEvent(b)
};
Calendar.dayMouseOut=function(ev){with(Calendar){var el=getElement(ev);
if(isRelated(el,ev)||_C||el.disabled){return false
}removeClass(el,"hilite");
if(el.caldate){removeClass(el.parentNode,"rowhilite")
}el.calendar.tooltips.innerHTML=getText("SEL_DATE");
return stopEvent(ev)
}};
Calendar.cellClick=function(d,o){var b=d.calendar;
var h=false;
var l=false;
var f=null;
if(typeof d.navtype=="undefined"){Calendar.removeClass(b.currentDateEl,"selected");
Calendar.addClass(d,"selected");
h=(b.currentDateEl==d);
if(!h){b.currentDateEl=d
}var q=new Date(d.caldate);
var e=d.otherMonth;
copyTime(q,b.date);
b.setDate(q);
l=true;
b.dateClicked=!e
}else{if(d.navtype==200){Calendar.removeClass(d,"hilite");
b.callCloseHandler();
return
}f=(d.navtype==0)?new Date():new Date(b.date);
b.dateClicked=false;
var n=f.getFullYear();
var g=f.getMonth();
function a(r){var s=f.getDate();
var i=f.getMonthDays(r);
if(s>i){f.setDate(i)
}f.setMonth(r)
}switch(d.navtype){case 400:Calendar.removeClass(d,"hilite");
var p=Calendar.getText("ABOUT");
if(typeof p!="undefined"){p+=b.showsTime?Calendar.getText("ABOUT_TIME"):""
}else{p='Help and about box text is not translated into this language.\nIf you know this language and you feel generous please update\nthe corresponding file in "lang" subdir to match calendar-en.js\nand send it back to <mishoo@infoiasi.ro> to get it into the distribution  ;-)\n\nThank you!\nhttp://dynarch.com/mishoo/calendar.epl\n'
}alert(p);
return;
case -2:if(n>b.minYear){f.setFullYear(n-1)
}break;
case -1:if(g>0){a(g-1)
}else{if(n-->b.minYear){f.setFullYear(n);
a(11)
}}break;
case 1:if(g<11){a(g+1)
}else{if(n<b.maxYear){f.setFullYear(n+1);
a(0)
}}break;
case 2:if(n<b.maxYear){f.setFullYear(n+1)
}break;
case 100:b.setFirstDayOfWeek(d.fdow);
return;
case 50:var k=d._range;
var m=d.innerHTML;
for(var j=k.length;
--j>=0;
){if(k[j]==m){break
}}if(o&&o.shiftKey){if(--j<0){j=k.length-1
}}else{if(++j>=k.length){j=0
}}var c=k[j];
d.innerHTML=c;
b.onUpdateTime();
return;
case 0:if((typeof b.getDateStatus=="function")&&b.getDateStatus(f,f.getFullYear(),f.getMonth(),f.getDate())){return false
}break
}if(!f.equalsTo(b.date)){b.setDate(f);
l=true
}}if(l){o&&b.callHandler()
}if(h){Calendar.removeClass(d,"hilite");
o&&b.callCloseHandler()
}};
Calendar.prototype.create=function(s){var l=null;
if(!s){l=document.getElementsByTagName("body")[0];
this.isPopup=true
}else{l=s;
this.isPopup=false
}this.date=this.dateStr?new Date(this.dateStr):new Date();
var A=Calendar.createElement("table");
A.id=this.calendarID+"-table";
this.table=A;
A.cellSpacing=0;
A.cellPadding=0;
A.calendar=this;
Calendar.addEvent(A,"mousedown",Calendar.tableMouseDown);
var p=Calendar.createElement("div");
p.id=this.calendarID+"-mainDIV";
this.element=p;
p.className="calendar";
if(this.isPopup){p.style.position="absolute";
p.style.display="none"
}p.appendChild(A);
this.caption=Calendar.createElement("caption",A);
this.caption.style.display="none";
var z=Calendar.createElement("thead",A);
var b=null;
var k=null;
var e=true;
var o=this;
var d=function(G,F,E,j,i){b=Calendar.createElement(e?"th":"td",k);
b.id=j;
if(F>1){b.colSpan=F
}b.className="cal-button";
if(E!=0&&Math.abs(E)<=2){b.className+=" nav"
}Calendar._add_evs(b);
b.calendar=o;
b.navtype=E;
b.innerHTML="<div unselectable='on'>"+G+"</div>";
if(i){b.ttip=Calendar.getText(i);
b.title=b.ttip
}return b
};
k=Calendar.createElement("tr",z);
var C=6;
(this.isPopup)&&--C;
(this.weekNumbers)&&++C;
d("?",1,400,this.calendarID+"-help","INFO");
this.title=d("",C,300,this.calendarID+"-title");
this.title.className="title";
this.monthSpan=Calendar.createElement("span",this.title,this.calendarID+"-title-month");
this.monthSpan.className="title_month";
this.monthSpan.calendar=o;
this.monthSpan.navtype=10;
Calendar._add_evs(this.monthSpan);
this.yearSpan=Calendar.createElement("span",this.title,this.calendarID+"-title-year");
this.yearSpan.className="title_year";
this.yearSpan.calendar=o;
this.yearSpan.navtype=20;
Calendar._add_evs(this.yearSpan);
if(this.isPopup){this.title.ttip=Calendar.getText("DRAG_TO_MOVE");
this.title.title=this.title.ttip;
this.title.style.cursor="move";
d("&#x00d7;",1,200,this.calendarID+"-close","CLOSE")
}if(this.showsCalendar){k=Calendar.createElement("tr",z);
k.id=this.calendarID+"-head-row";
k.className="headrow";
this._nav_py=d("&#x00ab;",1,-2,this.calendarID+"-prev-year","PREV_YEAR");
this._nav_pm=d("&#x2039;",1,-1,this.calendarID+"-prev-month","PREV_MONTH");
this._nav_now=d(Calendar.getText("TODAY"),this.weekNumbers?4:3,0,this.calendarID+"-today","GO_TODAY");
this._nav_nm=d("&#x203a;",1,1,this.calendarID+"-next-month","NEXT_MONTH");
this._nav_ny=d("&#x00bb;",1,2,this.calendarID+"-next-year","NEXT_YEAR");
k=Calendar.createElement("tr",z);
k.className="daynames";
b=Calendar.createElement("th",k);
b.id=this.calendarID+"-week-num-header";
b.className="name wn";
b.innerHTML=Calendar.getText("WK");
b.abbr=Calendar.getText("WKABBR");
if(!this.weekNumbers){b.style.display="none"
}for(var x=7;
x>0;
--x){b=Calendar.createElement("th",k);
b.id=this.calendarID+"-day-names-"+x;
if(!x){b.navtype=100;
b.calendar=this;
Calendar._add_evs(b)
}}this.firstdayname=k.firstChild.nextSibling;
this._displayWeekdays()
}var a=Calendar.createElement("tbody",A);
this.tbody=a;
if(this.showsCalendar){for(x=6;
x>0;
--x){k=Calendar.createElement("tr",a);
b=Calendar.createElement("td",k);
b.id=this.calendarID+"-week-num-"+x;
if(!this.weekNumbers){b.style.display="none"
}for(var t=7;
t>0;
--t){b=Calendar.createElement("td",k);
b.id=this.calendarID+"-day-"+x+"-"+t;
b.headers=this.calendarID+"-week-num-"+x+" "+this.calendarID+"-day-names-"+t;
b.calendar=this;
Calendar._add_evs(b)
}}}if(this.showsTime){k=Calendar.createElement("tr",a);
k.id=this.calendarID+"-time-tr";
k.className="time";
b=Calendar.createElement("td",k);
b.id=this.calendarID+"-time-td";
b.className="time";
b.colSpan=8;
var c=Calendar.createElement("span",b);
c=this.calendarID+"-time-label";
c.className="time";
c.innerHTML=Calendar.getText("TIME")||"&nbsp;";
var D=this.calendarID;
var B=o.date.getHours();
var h=o.date.getMinutes();
var y=!o.time24;
var r=dateHourToNormalizedHour(y,B);
var q=Calendar.createElement("INPUT",b);
q.value=r.hours;
q.className="inputTime-input";
q.rs_formrelevant=true;
q.name=q.id=this.calendarID+"-h";
q.maxLength=2;
if(Calendar.is_ie){q.onkeypress=onkeypressTimeInput;
q.onkeydown=onkeydownTimeInput;
q.onkeyup=function(){validateHourKeyUp(null,!y);
o.onUpdateTime()
};
q.onfocus=prepareTimeInput
}else{Calendar.addEvent(q,"keypress",onkeypressTimeInput);
Calendar.addEvent(q,"keydown",onkeypressTimeInput);
Calendar.addEvent(q,"keyup",function(i){validateHourKeyUp(i,!y);
Calendar.onUpdateTime()
});
Calendar.addEvent(q,"focus",prepareTimeInput)
}var w=Calendar.createElement("span",b);
w.innerHTML=":";
w.className="colon";
minInput=Calendar.createElement("INPUT",b);
minInput.value=h;
minInput.className="inputTime-input";
minInput.rs_formrelevant=true;
minInput.name=minInput.id=this.calendarID+"-m";
minInput.maxLength=2;
if(Calendar.is_ie){minInput.onblur=adjustMinute;
minInput.onkeypress=onkeypressTimeInput;
minInput.onkeydown=onkeydownTimeInput;
minInput.onkeyup=function(){validateMinuteKeyUp(null,o.minIncr,o.strictMinIncr);
o.onUpdateTime()
};
minInput.onfocus=prepareTimeInput
}else{Calendar.addEvent(minInput,"blur",adjustMinute);
Calendar.addEvent(minInput,"keypress",onkeypressTimeInput);
Calendar.addEvent(minInput,"keydown",onkeypressTimeInput);
Calendar.addEvent(minInput,"keyup",function(i){validateMinuteKeyUp(i,o.minIncr,o.strictMinIncr);
Calendar.onUpdateTime()
});
Calendar.addEvent(minInput,"focus",prepareTimeInput)
}if(y){var m=Calendar.createElement("INPUT",b);
m.value=r.isPm?"pm":"am";
m.className="inputTime-input";
m.rs_formrelevant=true;
m.name=m.id=this.calendarID+"-a";
m.maxLength=2;
if(Calendar.is_ie){m.onkeypress=onkeypressTimeInputAmPm;
m.onkeyup=function(){o.onUpdateTime()
};
m.onfocus=prepareTimeInput
}else{Calendar.addEvent(m,"keypress",function(i){onkeypressTimeInputAmPm(i);
Calendar.onUpdateTime()
});
Calendar.addEvent(m,"focus",prepareTimeInput)
}}var f=Calendar.createElement("SPAN",b);
f.className="inputTime-spinner";
f.id=D+"-s";
if(Calendar.is_ie){f.onmouseout=f.onmouseup=function(){changeTimeMouseUp();
o.onUpdateTime()
};
f.onmousedown=function(){changeTimeMouseDown(null,D,"inputTime-spinner",o.minIncr,!y)
}
}else{Calendar.addEvent(f,"mouseout",Calendar.changeTimeMouseUp);
Calendar.addEvent(f,"mouseup",Calendar.changeTimeMouseUp);
Calendar.addEvent(f,"mousedown",function(i){changeTimeMouseDown(i,D,"inputTime-spinner",o.minIncr,!y)
})
}f.ondblclick=f.onmousedown;
o.onSetTime=function(){var j=this.date.getHours();
var i=dateHourToNormalizedHour(y,j);
j=i.hours;
var E=this.date.getMinutes();
q.value=j;
minInput.value=(E<10)?("0"+E):E;
if(y){m.value=i.isPm?"pm":"am"
}};
Calendar.onUpdateTime=function(){var j=parseInt(q.value,10);
var j=parseInt(q.value,10);
if(y){if(/pm/i.test(m.value)&&j<12){j+=12
}else{if(/am/i.test(m.value)&&j==12){j=0
}}}var E=calendar.date.getDate();
var i=calendar.date.getMonth();
var F=calendar.date.getFullYear();
calendar.date.setHours(j);
calendar.date.setMinutes(parseInt(minInput.value,10));
calendar.date.setFullYear(F);
calendar.date.setMonth(i);
calendar.date.setDate(E);
this.dateClicked=false;
calendar.callHandler()
};
o.onUpdateTime=function(){var j=this.date;
var E=parseInt(q.value,10);
if(y){if(/pm/i.test(m.value)&&E<12){E+=12
}else{if(/am/i.test(m.value)&&E==12){E=0
}}}var F=j.getDate();
var i=j.getMonth();
var G=j.getFullYear();
j.setHours(E);
j.setMinutes(parseInt(minInput.value,10));
j.setFullYear(G);
j.setMonth(i);
j.setDate(F);
this.dateClicked=false;
this.callHandler()
}
}else{this.onSetTime=this.onUpdateTime=function(){}
}if(this.showsActionBar){k=Calendar.createElement("tr",a);
k.className="action-bar";
b=Calendar.createElement("td",k);
b.className="action-bar";
b.colSpan=8;
function g(J,i,K,L,E,G,H){var F=Calendar.createElement("a",J);
F.id=H;
F.href="#";
F.className="action";
Calendar.addClass(F,E);
Calendar.addEvent(F,"click",L);
var j=F;
for(x=0;
x<G;
x++){var I=Calendar.createElement("span",j);
I.className=E+(x+2);
j=I
}j.appendChild(document.createTextNode(K));
return F
}g(b,"clear",Calendar.getText("CLEAR"),function(i){o.callClearHandler();
Calendar.stopEvent(i)
},"nav-btn-dark-gray",4,this.calendarID+"-clear");
g(b,"done",Calendar.getText("DONE"),function(i){o.callDoneHandler();
Calendar.stopEvent(i)
},"nav-btn-dark-gray",4,this.calendarID+"-done");
g(b,"cancel",Calendar.getText("CANCEL"),function(i){o.callCancelHandler();
Calendar.stopEvent(i)
},"nav-btn-dark-gray",4,this.calendarID+"-cancel")
}var n=Calendar.createElement("tfoot",A);
e=false;
k=Calendar.createElement("tr",n);
k.className="footrow";
b=d(Calendar.getText("SEL_DATE"),8,300);
b.className="ttip";
if(this.isPopup){b.ttip=Calendar.getText("DRAG_TO_MOVE");
b.title=b.ttip;
b.style.cursor="move"
}this.tooltips=b;
p=Calendar.createElement("div",this.element);
p.id=this.calendarID+"-month-combo";
this.monthsCombo=p;
p.className="combo";
for(x=0;
x<Calendar.getText("MN").length;
++x){var v=Calendar.createElement("div");
v.className=Calendar.is_ie?"label-IEfix":"label";
v.month=x;
v.innerHTML=Calendar.getText("SMN")[x];
p.appendChild(v)
}p=Calendar.createElement("div",this.element);
p.id=this.calendarID+"-year-combo";
this.yearsCombo=p;
p.className="combo";
for(x=12;
x>0;
--x){var u=Calendar.createElement("div");
u.className=Calendar.is_ie?"label-IEfix":"label";
p.appendChild(u)
}this._init(this.firstDayOfWeek,this.date);
l.appendChild(this.element)
};
Calendar.changeTimeMouseUp=function(a){changeTimeMouseUp(a);
Calendar.onUpdateTime()
};
Calendar.changeTimeMouseDown=function(a){var b=this;
if(Calendar.is_ie){changeTimeMouseDown(null,a.target.id,"inputTime-spinner",b.minIncr,b.time24)
}else{changeTimeMouseDown(a,a.target.id.replace("-s",""),"inputTime-spinner",1,b.time24)
}};
Calendar.validateHourKeyUp=function(a){validateHourKeyUp(a,cal.time24)
};
Calendar._keyEvent=function(l){if(!window.calendar){return false
}(Calendar.is_ie)&&(l=window.event);
if(Calendar.is_ie){if(l.srcElement&&l.srcElement.tagName=="INPUT"){return true
}}else{if(l.target&&l.target.tagName=="INPUT"){return true
}}var a=window.calendar;
var j=Calendar.is_webkit||Calendar.is_ie?true:(l.type=="keypress"||l.type=="keydown");
if(l.ctrlKey){switch(l.keyCode){case 37:j&&Calendar.cellClick(a._nav_pm);
break;
case 38:j&&Calendar.cellClick(a._nav_py);
break;
case 39:j&&Calendar.cellClick(a._nav_nm);
break;
case 40:j&&Calendar.cellClick(a._nav_ny);
break;
default:return false
}}else{switch(l.keyCode){case 9:var b=window.document.getElementById(a.calendarID+"-h");
b&&b.select();
break;
case 32:Calendar.cellClick(a._nav_now);
break;
case 27:j&&a.callCloseHandler();
break;
case 37:case 38:case 39:case 40:if(j){var m=l.keyCode;
var f,n,k,h,d,e;
f=m==37||m==38;
e=(m==37||m==39)?1:7;
function c(){d=a.currentDateEl;
var o=d.pos;
n=o&15;
k=o>>4;
h=a.ar_days[k][n]
}c();
function g(){var o=new Date(a.date);
o.setDate(o.getDate()-e);
a.setDate(o)
}function i(){var o=new Date(a.date);
o.setDate(o.getDate()+e);
a.setDate(o)
}while(1){switch(m){case 37:if(--n>=0){h=a.ar_days[k][n]
}else{n=6;
m=38;
continue
}break;
case 38:if(--k>=0){h=a.ar_days[k][n]
}else{g();
c()
}break;
case 39:if(++n<7){h=a.ar_days[k][n]
}else{n=0;
m=40;
continue
}break;
case 40:if(++k<a.ar_days.length){h=a.ar_days[k][n]
}else{i();
c()
}break
}break
}if(h){if(!h.disabled){Calendar.cellClick(h)
}else{if(f){g()
}else{i()
}}}}break;
case 13:if(j){Calendar.cellClick(a.currentDateEl,l)
}break;
default:return false
}}return Calendar.stopEvent(l)
};
Calendar.prototype._init=function(k,u){var r=new Date();
this.table.style.visibility="hidden";
var f=u.getFullYear();
if(f<this.minYear){f=this.minYear;
u.setFullYear(f)
}else{if(f>this.maxYear){f=this.maxYear;
u.setFullYear(f)
}}this.firstDayOfWeek=k;
this.date=new Date(u);
var v=u.getMonth();
var s=navigator.appName;
if(s=="Netscape"){this.title.innerHTML=Calendar.getText("MN")[v]+", "+f
}var x=u.getDate();
var w=u.getMonthDays();
u.setDate(1);
var o=(u.getDay()-this.firstDayOfWeek)%7;
if(o<0){o+=7
}u.setDate(-o);
u.setDate(u.getDate()+1);
if(this.showsCalendar){var c=this.tbody.firstChild;
var g=Calendar.getText("SMN")[v];
var m=[];
var l=Calendar.getText("WEEKEND");
for(var q=0;
q<6;
++q,c=c.nextSibling){var a=c.firstChild;
a.className="day wn";
a.innerHTML=u.getWeekNumber();
a=a.nextSibling;
c.className="daysrow";
var t=false;
var b=m[q]=[];
for(var p=0;
p<7;
++p,a=a.nextSibling,u.setDate(u.getDate()+1)){var d=u.getDate();
var e=u.getDay();
a.className="day";
a.pos=q<<4|p;
b[p]=a;
var h=(u.getMonth()==v);
if(!h){if(this.showsOtherMonths){a.className+=" othermonth";
a.otherMonth=true
}else{a.className="emptycell";
a.innerHTML="&nbsp;";
a.disabled=true;
continue
}}else{a.otherMonth=false;
t=true
}a.disabled=false;
a.innerHTML=this.getDateText?this.getDateText(u,d):d;
if(typeof this.getDateStatus=="function"){var n=this.getDateStatus(u,f,v,d);
if(n===true){a.className+=" disabled";
a.disabled=true
}else{if(/disabled/i.test(n)){a.disabled=true
}a.className+=" "+n
}}if(!a.disabled){a.caldate=new Date(u);
a.ttip="_";
if(h&&d==x){a.className+=" selected";
this.currentDateEl=a
}if(u.getFullYear()==r.getFullYear()&&u.getMonth()==r.getMonth()&&d==r.getDate()){a.className+=" today";
a.ttip+=Calendar.getText("PART_TODAY")
}if(l.indexOf(e.toString())!=-1){a.className+=a.otherMonth?" oweekend":" weekend"
}}}if(!(t||this.showsOtherMonths)){c.className="emptyrow"
}}this.ar_days=m;
this.monthSpan.innerText=Calendar.getText("MN")[v]+",";
this.yearSpan.innerText=f;
this.caption.innerText=Calendar.getText("MN")[v]+", "+f
}this.onSetTime();
this.table.style.visibility="visible"
};
Calendar.prototype.setDate=function(a){if(!a.equalsTo(this.date)){this._init(this.firstDayOfWeek,a)
}};
Calendar.prototype.refresh=function(){this._init(this.firstDayOfWeek,this.date)
};
Calendar.prototype.setFirstDayOfWeek=function(a){this._init(a,this.date);
this._displayWeekdays()
};
Calendar.prototype.setDateStatusHandler=Calendar.prototype.setDisabledHandler=function(a){this.getDateStatus=a
};
Calendar.prototype.setRange=function(b,c){this.minYear=b;
this.maxYear=c
};
Calendar.prototype.callHandler=function(){if(this.onSelected){this.onSelected(this,this.date.print(this.dateFormat))
}};
Calendar.prototype.callCloseHandler=function(){if(this.onClose){this.onClose(this)
}this.hideShowCovered()
};
Calendar.prototype.callClearHandler=function(){if(this.onClear){this.onClear(this)
}this.hideShowCovered()
};
Calendar.prototype.callDoneHandler=function(){if(this.onDone){this.onDone(this)
}this.hideShowCovered()
};
Calendar.prototype.callCancelHandler=function(){if(this.onCancel){this.onCancel(this)
}this.hideShowCovered()
};
Calendar.prototype.destroy=function(){var a=this.element.parentNode;
a.removeChild(this.element);
Calendar._C=null;
window.calendar=null
};
Calendar.prototype.reparent=function(b){var a=this.element;
a.parentNode.removeChild(a);
b.appendChild(a)
};
Calendar._checkCalendar=function(b){if(!window.calendar){return false
}var a=Calendar.is_ie?Calendar.getElement(b):Calendar.getTargetElement(b);
for(;
a!=null&&a!=calendar.element;
a=a.parentNode){}if(a==null){window.calendar.callCloseHandler();
return Calendar.stopEvent(b)
}};
Calendar.prototype.show=function(){var e=this.table.getElementsByTagName("tr");
for(var d=e.length;
d>0;
){var f=e[--d];
Calendar.removeClass(f,"rowhilite");
var c=f.getElementsByTagName("td");
for(var b=c.length;
b>0;
){var a=c[--b];
Calendar.removeClass(a,"hilite");
Calendar.removeClass(a,"active")
}}this.element.style.display="block";
this.hidden=false;
if(this.isPopup){window.calendar=this;
Calendar.addEvent(document,"keydown",Calendar._keyEvent);
Calendar.addEvent(document,"keypress",Calendar._keyEvent);
Calendar.addEvent(document,"mousedown",Calendar._checkCalendar)
}this.hideShowCovered()
};
Calendar.prototype.hide=function(){if(this.isPopup){Calendar.removeEvent(document,"keydown",Calendar._keyEvent);
Calendar.removeEvent(document,"keypress",Calendar._keyEvent);
Calendar.removeEvent(document,"mousedown",Calendar._checkCalendar)
}this.element.style.display="none";
this.hidden=true;
this.hideShowCovered()
};
Calendar.prototype.showAt=function(a,c){var b=this.element.style;
b.left=a+"px";
b.top=c+"px";
this.show()
};
Calendar.prototype.showAtElement=function(b,c){var a=this;
var d=Calendar.getAbsolutePos(b);
if(!c||typeof c!="string"){this.showAt(d.x,d.y+b.offsetHeight);
return true
}this.element.style.display="block";
Calendar.continuation_for_the_khtml_browser=function(){var e=a.element.offsetWidth;
var g=a.element.offsetHeight;
a.element.style.display="none";
var f=c.substr(0,1);
var i="l";
if(c.length>1){i=c.substr(1,1)
}switch(f){case"T":d.y-=g;
break;
case"B":d.y+=b.offsetHeight;
break;
case"C":d.y+=(b.offsetHeight-g)/2;
break;
case"t":d.y+=b.offsetHeight-g;
break;
case"b":break
}switch(i){case"L":d.x-=e;
break;
case"R":d.x+=b.offsetWidth;
break;
case"C":d.x+=(b.offsetWidth-e)/2;
break;
case"r":d.x+=b.offsetWidth-e;
break;
case"l":break
}d.width=e;
d.height=g+40;
a.monthsCombo.style.display="none";
fixPosition(d);
a.showAt(d.x,d.y)
};
if(Calendar.is_khtml){setTimeout("Calendar.continuation_for_the_khtml_browser()",10)
}else{Calendar.continuation_for_the_khtml_browser()
}};
Calendar.prototype.setDateFormat=function(a){this.dateFormat=a
};
Calendar.prototype.setTtDateFormat=function(a){this.ttDateFormat=a
};
Calendar.prototype.parseDate=function(b,a){if(!a){a=this.dateFormat
}var c=new Object();
this.setDate(parseDate(b,a,c));
return c.nbf>0
};
function parseDate(p,e,c){var q=0;
var f=-1;
var n=0;
var s=p.split(/\W+/);
var r=e.match(/%./g);
var l=0,k=0;
var u=0;
var h=0;
var g=0;
for(l=0;
l<s.length;
++l){if(!s[l]){continue
}g++;
switch(r[l]){case"%d":case"%e":n=parseInt(s[l],10);
break;
case"%m":f=parseInt(s[l],10)-1;
break;
case"%Y":case"%y":q=parseInt(s[l],10);
(q<100)&&(q+=(q>29)?1900:2000);
break;
case"%b":case"%B":for(k=0;
k<12;
++k){if(Calendar.getText("MN")[k].substr(0,s[l].length).toLowerCase()==s[l].toLowerCase()){f=k;
break
}}break;
case"%H":case"%I":case"%k":case"%l":u=parseInt(s[l],10);
break;
case"%P":case"%p":if(/pm/i.test(s[l])&&u<12){u+=12
}break;
case"%M":h=parseInt(s[l],10);
break
}}if(q!=0&&f!=-1&&n!=0){c.nbf=g;
return new Date(q,f,n,u,h,0)
}q=0;
f=-1;
n=0;
for(l=0;
l<s.length;
++l){if(s[l].search(/[a-zA-Z]+/)!=-1){var v=-1;
for(k=0;
k<12;
++k){if(Calendar.getText("MN")[k].substr(0,s[l].length).toLowerCase()==s[l].toLowerCase()){v=k;
break
}}if(v!=-1){if(f!=-1){g++;
n=f+1
}g++;
f=v
}}else{if(parseInt(s[l],10)<=12&&f==-1){g++;
f=s[l]-1
}else{if(parseInt(s[l],10)>31&&q==0){g++;
q=parseInt(s[l],10);
(q<100)&&(q+=(q>29)?1900:2000)
}else{if(n==0&&s[l]!=0){g++;
n=s[l]
}}}}}if(q==0||f==-1||n==0){var o=new Date();
if(q==0){q=o.getFullYear()
}if(f==-1){f=o.getMonth()
}if(n==0){n=o.getDate()
}}c.nbf=g;
return new Date(q,f,n,u,h,0)
}Calendar.prototype.hideShowCovered=function(){Core.hideShowCovered(this.element,this.hidden)
};
Calendar.prototype._displayWeekdays=function(){var b=this.firstDayOfWeek;
var a=this.firstdayname;
var d=Calendar.getText("WEEKEND");
for(var c=0;
c<7;
++c){a.className="day name";
var e=(c+b)%7;
if(c){a.ttip=Calendar.getText("DAY_FIRST").replace("%s",Calendar.getText("DN")[e]);
a.title=a.ttip;
a.navtype=100;
a.calendar=this;
a.fdow=e;
Calendar._add_evs(a)
}if(d.indexOf(e.toString())!=-1){Calendar.addClass(a,"weekend")
}a.innerHTML=Calendar.getText("SDN")[(c+b)%7];
a.abbr=Calendar.getText("DN")[(c+b)%7];
a=a.nextSibling
}};
Calendar.prototype._hideCombos=function(){this.monthsCombo.style.display="none";
this.yearsCombo.style.display="none"
};
Calendar.prototype._dragStart=function(ev){if(this.dragging){return
}this.dragging=true;
var posX;
var posY;
if(Calendar.is_ie){posY=window.event.clientY+document.body.scrollTop;
posX=window.event.clientX+document.body.scrollLeft
}else{posY=ev.clientY+window.scrollY;
posX=ev.clientX+window.scrollX
}var st=this.element.style;
this.xOffs=posX-parseInt(st.left);
this.yOffs=posY-parseInt(st.top);
with(Calendar){addEvent(document,"mousemove",calDragIt);
addEvent(document,"mouseup",calDragEnd)
}};
Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
Date.SECOND=1000;
Date.MINUTE=60*Date.SECOND;
Date.HOUR=60*Date.MINUTE;
Date.DAY=24*Date.HOUR;
Date.WEEK=7*Date.DAY;
Date.prototype.getMonthDays=function(b){var a=this.getFullYear();
if(typeof b=="undefined"){b=this.getMonth()
}if(((0==(a%4))&&((0!=(a%100))||(0==(a%400))))&&b==1){return 29
}else{return Date._MD[b]
}};
Date.prototype.getDayOfYear=function(){var a=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);
var c=new Date(this.getFullYear(),0,0,0,0,0);
var b=a-c;
return Math.floor(b/Date.DAY)
};
Date.prototype.getWeekNumber=function(){var c=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);
var b=c.getDay();
c.setDate(c.getDate()-(b+6)%7+3);
var a=c.valueOf();
c.setMonth(0);
c.setDate(4);
return Math.round((a-c.valueOf())/(7*86400000))+1
};
Date.prototype.equalsTo=function(a){return((this.getFullYear()==a.getFullYear())&&(this.getMonth()==a.getMonth())&&(this.getDate()==a.getDate())&&(this.getHours()==a.getHours())&&(this.getMinutes()==a.getMinutes()))
};
Date.prototype.print=function(l){var b=this.getMonth();
var k=this.getDate();
var n=this.getFullYear();
var p=this.getWeekNumber();
var q=this.getDay();
var v={};
var r=this.getHours();
var c=(r>=12);
var h=(c)?(r-12):r;
var u=this.getDayOfYear();
if(h==0){h=12
}var e=this.getMinutes();
var j=this.getSeconds();
v["%a"]=Calendar.getText("SDN")[q];
v["%A"]=Calendar.getText("DN")[q];
v["%b"]=Calendar.getText("SMN")[b];
v["%B"]=Calendar.getText("MN")[b];
v["%C"]=1+Math.floor(n/100);
v["%d"]=(k<10)?("0"+k):k;
v["%e"]=k;
v["%H"]=(r<10)?("0"+r):r;
v["%I"]=(h<10)?("0"+h):h;
v["%j"]=(u<100)?((u<10)?("00"+u):("0"+u)):u;
v["%k"]=r;
v["%l"]=h;
v["%m"]=(b<9)?("0"+(1+b)):(1+b);
v["%M"]=(e<10)?("0"+e):e;
v["%n"]="\n";
v["%o"]=1+b;
v["%p"]=c?"PM":"AM";
v["%P"]=c?"pm":"am";
v["%s"]=Math.floor(this.getTime()/1000);
v["%S"]=(j<10)?("0"+j):j;
v["%t"]="\t";
v["%U"]=v["%W"]=v["%V"]=(p<10)?("0"+p):p;
v["%u"]=q+1;
v["%w"]=q;
v["%y"]=(""+n).substr(2,2);
v["%Y"]=n;
v["%%"]="%";
var t=/%./g;
if(!Calendar.is_ie5&&!Calendar.is_khtml){return l.replace(t,function(a){return v[a]||a
})
}var o=l.match(t);
for(var g=0;
g<o.length;
g++){var f=v[o[g]];
if(f){t=new RegExp(o[g],"g");
l=l.replace(t,f)
}}return l
};
Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear;
Date.prototype.setFullYear=function(b){var a=new Date(this);
a.__msh_oldSetFullYear(b);
if(a.getMonth()!=this.getMonth()){this.setDate(28)
}this.__msh_oldSetFullYear(b)
};
function showAtElement2(b,a,e,c){var d=Calendar.getAbsolutePos(a);
if(!e||typeof e!="string"){b.showAt(d.x,d.y+a.offsetHeight);
return true
}showAtElement2_=function(){b.style.display="block";
var f=b.offsetWidth;
var j=b.offsetHeight;
var i=e.substr(0,1);
var k="l";
if(e.length>1){k=e.substr(1,1)
}switch(i){case"T":d.y-=j;
break;
case"B":d.y+=a.offsetHeight;
break;
case"C":d.y+=(a.offsetHeight-j)/2;
break;
case"t":d.y+=a.offsetHeight-j;
break;
case"b":break
}switch(k){case"L":d.x-=f;
break;
case"R":d.x+=a.offsetWidth;
break;
case"C":d.x+=(a.offsetWidth-f)/2;
break;
case"r":d.x+=a.offsetWidth-f;
break;
case"l":break
}d.width=f;
d.height=j;
fixPosition(d);
if(c!=null){var g=Calendar.getAbsolutePos(c);
d.x-=g.x;
d.y-=g.y
}b.style.left=d.x+"px";
b.style.top=d.y+"px"
};
if(Calendar.is_khtml){setTimeout("showAtElement2_()",10)
}else{showAtElement2_()
}}function getScrollXY(){var a=0,b=0;
if(typeof(window.pageYOffset)=="number"){b=window.pageYOffset;
a=window.pageXOffset
}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){b=document.body.scrollTop;
a=document.body.scrollLeft
}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){b=document.documentElement.scrollTop;
a=document.documentElement.scrollLeft
}}}return{x:a,y:b}
}function fixPosition(d){if(d.x<0){d.x=0
}if(d.y<0){d.y=0
}var f=document.createElement("div");
var c=f.style;
c.position="absolute";
c.right=c.bottom=c.width=c.height="0px";
document.body.appendChild(f);
var b=Calendar.getAbsolutePos(f);
document.body.removeChild(f);
var e=getScrollXY();
b.x+=e.x;
b.y+=e.y;
var a=d.x+d.width-b.x;
if(a>0){d.x-=a
}a=d.y+d.height-b.y;
if(a>0){d.y-=a
}}function copyTime(a,b){a.setHours(b.getHours());
a.setMinutes(b.getMinutes())
}function dateHourToNormalizedHour(c,b){var a=false;
if(c){var a=(b>=12);
if(b>12){b-=12
}if(b==0){b=12
}}return new NormalizedHour(b,a)
}function normalizedHourToDateHour(b,a,c){if(b){if(c){a+=12;
if(a==24){a=12
}}else{if(a==12){a=0
}}}return a
}function NormalizedHour(a,b){this.isPm=b;
this.hours=a
}window.calendar=null;
Calendar.setup=function(j){function m(i,r){if(typeof j[i]=="undefined"){j[i]=r
}}m("inputField",null);
m("displayArea",null);
m("button",null);
m("clearField",null);
m("eventName","click");
m("ifFormat","%Y/%m/%d");
m("daFormat","%Y/%m/%d");
m("singleClick",true);
m("disableFunc",null);
m("dateStatusFunc",j.disableFunc);
m("firstDay",0);
m("align","Br");
m("range",[1900,2999]);
m("weekNumbers",true);
m("flat",null);
m("flatCallback",null);
m("onSelect",null);
m("onClose",null);
m("onClear",null);
m("onDone",null);
m("onCancel",null);
m("onUpdate",null);
m("date",null);
m("cancelDate",j.date);
m("showsCalendar",true);
m("showsTime",false);
m("showsActionBar",j.showsTime);
m("minIncr",1);
m("strictMinIncr",true);
m("timeFormat","24");
m("electric",true);
m("step",2);
m("position",null);
m("cache",false);
m("showOthers",false);
var k=["inputField","displayArea","button","clearField"];
for(var l in k){if(typeof j[k[l]]=="string"){j[k[l]]=document.getElementById(j[k[l]])
}}if(!(j.flat||j.inputField||j.displayArea||j.button)){alert("Calendar.setup:\n  Nothing to setup (no fields found).  Please check your code");
return false
}if(j.displayArea){var f=j.inputField||j.displayArea;
var o=j.inputField?j.ifFormat:j.daFormat;
var g=f.value||f.innerHTML;
if(g=="emptied"){g=""
}var b={};
var e=parseDate(g,o,b);
if(b.nbf){j.displayArea.innerHTML=e.print(j.daFormat)
}else{var h=j.clearField?j.clearField.value||j.clearField.innerHTML:"";
j.displayArea.innerHTML=h
}}function n(r){var i=r.params;
var s=(r.dateClicked||i.electric);
if(s&&i.flat){if(typeof i.flatCallback=="function"){i.flatCallback(r)
}else{alert("No flatCallback given -- doing nothing.")
}return false
}if(s&&i.inputField){i.inputField.value=r.date.print(i.ifFormat);
if(typeof i.inputField.onchange=="function"){i.inputField.onchange()
}}if(s&&i.displayArea){i.displayArea.innerHTML=r.date.print(i.daFormat)
}if(s&&i.singleClick&&r.dateClicked&&!r.showsActionBar){r.callCloseHandler()
}if(s&&typeof i.onUpdate=="function"){i.onUpdate(r)
}}function d(r){var i=r.params;
if(i.flat){if(typeof i.flatCallback=="function"){i.flatCallback(r)
}else{alert("No flatCallback given -- doing nothing.")
}return false
}if(i.inputField){i.inputField.value="emptied";
if(typeof i.inputField.onchange=="function"){i.inputField.onchange()
}}if(i.displayArea){i.displayArea.innerHTML=r.clearText
}if(typeof i.onUpdate=="function"){i.onUpdate(r)
}r.hide()
}function c(i){i.hide()
}function p(i){if(i.cancelDate){i.setDate(i.cancelDate);
i.callHandler()
}else{i.callClearHandler()
}i.hide()
}if(j.flat!=null){if(typeof j.flat=="string"){j.flat=document.getElementById(j.flat)
}if(!j.flat){alert("Calendar.setup:\n  Flat specified but can't find parent.");
return false
}var a=new Calendar(j.firstDay,j.date,j.onSelect||n,j.onClose||c,j.onClear||d,j.onDone||c,j.onCancel||p,j.inputField.id.replace(".inputrelevant",""));
a.showsCalendar=j.showsCalendar;
a.showsTime=j.showsTime;
a.showsActionBar=j.showsActionBar;
a.minIncr=j.minIncr;
a.strictMinIncr=j.strictMinIncr;
a.time24=(j.timeFormat=="24");
a.params=j;
a.weekNumbers=j.weekNumbers;
a.setRange(j.range[0],j.range[1]);
a.setDateStatusHandler(j.dateStatusFunc);
a.create(j.flat);
a.show();
return false
}var q=j.button||j.displayArea||j.inputField;
q["on"+j.eventName]=function(){if(typeof(q.disabled)=="undefined"||q.disabled==false){var i=j.inputField||j.displayArea;
var r=j.inputField?j.ifFormat:j.daFormat;
var v=false;
var t=window.calendar;
if(!(t&&j.cache)){window.calendar=t=new Calendar(j.firstDay,j.date,j.onSelect||n,j.onClose||c,j.onClear||d,j.onDone||c,j.onCancel||p,j.inputField.id.replace(".inputrelevant",""));
t.showsCalendar=j.showsCalendar;
t.showsTime=j.showsTime;
t.showsActionBar=j.showsActionBar;
t.minIncr=j.minIncr;
t.strictMinIncr=j.strictMinIncr;
t.time24=(j.timeFormat=="24");
t.weekNumbers=j.weekNumbers;
v=true
}else{if(j.date){t.setDate(j.date)
}t.hide()
}t.showsOtherMonths=j.showOthers;
t.yearStep=j.step;
t.setRange(j.range[0],j.range[1]);
t.params=j;
t.setDateStatusHandler(j.dateStatusFunc);
t.setDateFormat(r);
if(v){t.create()
}var u=i.value||i.innerHTML;
if(u=="emptied"){u=""
}var s=t.parseDate(u);
t.cancelDate=j.cancelDate;
if(!j.cancelDate&&s){t.cancelDate=new Date(t.date.getTime())
}t.clearText=j.clearField?j.clearField.value||j.clearField.innerHTML:"";
t.refresh();
if(!j.position){t.showAtElement(j.button||j.displayArea||j.inputField,j.align)
}else{t.showAt(j.position[0],j.position[1])
}}if(typeof(event)!="undefined"){event.returnValue=false
}return false
}
};
Calendar.getText=function(b){if(!Calendar._texts){var a={};
a.INFO=calendarRes._g("aboutCommandTT");
a.ABOUT=calendarRes._g("aboutContent1")+"\n"+calendarRes._g("aboutContent1")+"\n"+calendarRes._g("aboutContent2")+"\n"+calendarRes._g("aboutContent3")+"\n"+calendarRes._g("aboutContent4")+"\n"+calendarRes._g("aboutContent5")+"\n"+calendarRes._g("aboutContent6")+"\n"+calendarRes._g("aboutContent7")+"\n";
a.ABOUT_TIME="\n\n"+calendarRes._g("aboutTimeContent1")+"\n"+calendarRes._g("aboutTimeContent5")+"\n"+calendarRes._g("aboutTimeContent6")+"\n"+calendarRes._g("aboutTimeContent7");
a.PREV_YEAR=calendarRes._g("previousYearCommandTT");
a.PREV_MONTH=calendarRes._g("previousMonthCommandTT");
a.TODAY=calendarRes._g("todayCommand");
a.GO_TODAY=calendarRes._g("todayCommandTT");
a.NEXT_MONTH=calendarRes._g("nextMonthCommandTT");
a.NEXT_YEAR=calendarRes._g("nextYearCommandTT");
a.SEL_DATE=calendarRes._g("calendarMainTT");
a.PART_TODAY=calendarRes._g("todayParenthesis");
a.DAY_FIRST=calendarRes._g("dayDisplayedFirstCommandTT","%s");
a.CLOSE=calendarRes._g("closeCommandTT");
a.CLEAR=calendarRes._g("eraseCommand");
a.DONE=calendarRes._g("doneCommand");
a.CANCEL=calendarRes._g("cancelCommand");
a.WK=calendarRes._g("week");
a.WKABBR=calendarRes._g("weekTT");
a.DRAG_TO_MOVE=calendarRes._g("dragAndDrop");
a.TIME="??Time:";
a.TIME_PART="??(Shift-)Click or drag to change value";
a.WEEKEND="0,6";
a.TT_DATE_FORMAT="%a, %b %e";
a.DN=[weekDaysRes._g("sunday"),weekDaysRes._g("monday"),weekDaysRes._g("tuesday"),weekDaysRes._g("wednesday"),weekDaysRes._g("thursday"),weekDaysRes._g("friday"),weekDaysRes._g("saturday"),weekDaysRes._g("sunday")];
a.SDN=[weekDaysAbbrRes._g("sundayAbbrev"),weekDaysAbbrRes._g("mondayAbbrev"),weekDaysAbbrRes._g("tuesdayAbbrev"),weekDaysAbbrRes._g("wednesdayAbbrev"),weekDaysAbbrRes._g("thursdayAbbrev"),weekDaysAbbrRes._g("fridayAbbrev"),weekDaysAbbrRes._g("saturdayAbbrev"),weekDaysAbbrRes._g("sundayAbbrev")];
a.MN=[monthsRes._g("january"),monthsRes._g("february"),monthsRes._g("march"),monthsRes._g("april"),monthsRes._g("may"),monthsRes._g("june"),monthsRes._g("july"),monthsRes._g("august"),monthsRes._g("september"),monthsRes._g("october"),monthsRes._g("november"),monthsRes._g("december")];
a.SMN=[monthsAbbrRes._g("januaryAbbrev"),monthsAbbrRes._g("februaryAbbrev"),monthsAbbrRes._g("marchAbbrev"),monthsAbbrRes._g("aprilAbbrev"),monthsAbbrRes._g("mayAbbrev"),monthsAbbrRes._g("juneAbbrev"),monthsAbbrRes._g("julyAbbrev"),monthsAbbrRes._g("augustAbbrev"),monthsAbbrRes._g("septemberAbbrev"),monthsAbbrRes._g("octoberAbbrev"),monthsAbbrRes._g("novemberAbbrev"),monthsAbbrRes._g("decemberAbbrev")];
Calendar._texts=a
}return Calendar._texts[b]
};
var HTTP_INIT=1;
var HTTP_CONNECTED=2;
var HTTP_IN_PROGRESS=3;
var HTTP_COMPLETE=4;
var HTTP_OK=200;
var HTTP_FORBIDDEN=403;
var HTTP_NOT_FOUND=404;
function HTTPClient(){this.url=null;
this.xmlhttp=null;
this.callinprogress=false;
this.userhandler=null
}HTTPClient.prototype.init=function(a){this.url=a;
if(window.XMLHttpRequest){this.xmlhttp=new XMLHttpRequest()
}else{if(window.ActiveXObject){this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}else{throw"XMLHttpRequest not supported by "+navigator.userAgent+"."
}}};
HTTPClient.prototype.launchGETRequest=function(a,b){this.prepareHTTPRequest(a,"GET",b);
this.xmlhttp.send(null)
};
HTTPClient.prototype.launchPOSTRequest=function(b,d,a,c){this.prepareHTTPRequest(b,"POST",d);
this.setRequestHeaders(c);
var e=HTTPClient.stringifyParamsForPOST(a);
this.xmlhttp.send(e)
};
HTTPClient.stringifyParamsForPOST=function(a){var c="";
for(var b in a){if(a.hasOwnProperty(b)){if(c.length>0){c+="&"
}c+=b+"="+a[b]
}}return c
};
HTTPClient.prototype.setRequestHeaders=function(a){for(var b in a){if(a.hasOwnProperty(b)){this.xmlhttp.setRequestHeader(b,a[b])
}}};
HTTPClient.prototype.prepareHTTPRequest=function(c,b,d){if(this.callinprogress){throw"Call in progress"
}this.userhandler=c;
this.xmlhttp.open(b,this.url,d);
var a=this;
this.xmlhttp.onreadystatechange=function(){a.stateChangeCallback(a)
}
};
HTTPClient.prototype.asyncGET=function(a){return this.launchGETRequest(a,true)
};
HTTPClient.prototype.syncGET=function(a){return this.launchGETRequest(a,false)
};
HTTPClient.prototype.stateChangeCallback=function(b){switch(b.xmlhttp.readyState){case HTTP_INIT:try{b.userhandler.onInit()
}catch(c){}break;
case HTTP_CONNECTED:try{if(b.xmlhttp.status!=HTTP_OK){b.userhandler.onError(b.xmlhttp.status,b.xmlhttp.statusText);
b.xmlhttp.abort();
b.callinprogress=false
}}catch(c){}break;
case HTTP_IN_PROGRESS:try{var a;
try{a=b.xmlhttp.getResponseHeader("Content-Length")
}catch(c){a=NaN
}b.userhandler.onProgress(b.xmlhttp.responseText,a)
}catch(c){}break;
case HTTP_COMPLETE:try{if(b.xmlhttp.status==HTTP_OK){b.userhandler.onLoad(b.xmlhttp.responseXML)
}else{b.userhandler.onError(b.xmlhttp.status,b.xmlhttp.statusText)
}}catch(c){}finally{b.callinprogress=false
}break
}};
function EchoHandler(){}EchoHandler.prototype.onInit=function(){this.echo("About to send request<br>")
};
EchoHandler.prototype.onError=function(a,b){this.echo("Error: "+a+": "+b+"<br>")
};
EchoHandler.prototype.onProgress=function(b,a){this.echo("Downloaded "+b.length+" of "+a+"<br>")
};
EchoHandler.prototype.onLoad=function(a){this.echo("<pre>"+a+"</pre>")
};
EchoHandler.prototype.echo=function(a){document.status=a
};
var DOM_ELEMENT_NODE=0;
addEvent(window,"load",convertTrees);
function setDefault(a,b){if(typeof(window[a])=="undefined"||window[a]==null){window[a]=b
}}function expandTree(b){var a=document.getElementById(b);
if(a==null){return false
}expandCollapseList(a,nodeOpenClass,null,true)
}function collapseTree(b){var a=document.getElementById(b);
if(a==null){return false
}expandCollapseList(a,nodeClosedClass,null,true)
}function expandToItem(c,e){var b=document.getElementById(c);
if(b==null){return false
}var a=expandCollapseList(b,nodeOpenClass,e,true);
if(a){var d=document.getElementById(e);
if(d.scrollIntoView){d.scrollIntoView(false)
}}}function expandCollapseList(d,h,f,g){if(!d.childNodes||d.childNodes.length==0){return false
}for(var a=0;
a<d.childNodes.length;
a++){var j=d.childNodes[a];
if(f!=null&&j.id==f){return true
}if(j.nodeName=="LI"){var e=false;
for(var b=0;
b<j.childNodes.length;
b++){var i=j.childNodes[b];
if(i.nodeName=="UL"){e=true;
var c=expandCollapseList(i,h,f,g);
if(f!=null&&c){j.className=h;
return g
}}}if(e&&f==null){j.className=h
}}}}function convertTrees(){setDefault("treeClass","tree-root");
setDefault("nodeClosedClass","tree-node-more");
setDefault("nodeOpenClass","tree-node-less");
setDefault("nodeLeafClass","tree-node-leaf");
setDefault("nodeSignClass","tree-sign");
setDefault("branchSignClass","tree-sign-branch");
setDefault("lastNodeSignClass","tree-sign-last");
setDefault("nodeIconClass","tree-icon");
setDefault("nodeMoreClass","tree-more");
setDefault("nodeLabelClass","tree-label");
setDefault("nodeLabelSelectedClass","tree-label-selected");
if(!document.createElement){return
}var c=document.getElementsByTagName("ul");
for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.className==treeClass){convertTree(a)
}}}function convertTree(b){var e=document.jsfForm()[b.id+"-s"],a,c,d;
if(e&&e.value){a=e.value.split(" ");
for(d=0;
d<a.length;
d++){c=findItemLabel(b.id,b.id+"-"+a[d]);
addClass(c,nodeLabelSelectedClass);
if(!d&&c&&c.scrollIntoView){c.scrollIntoView(false)
}}}}function processList(a,c){if(!c.childNodes||c.childNodes.length==0){return
}for(var b=0;
b<c.childNodes.length;
b++){var d=c.childNodes[b];
if(d.nodeName=="LI"){processItem(a,d,b==c.childNodes.length-1)
}}}function processItem(d,h,g){var c=false;
for(var b=0;
b<h.childNodes.length;
b++){var i=h.childNodes[b];
if(i.nodeName=="UL"){c=true;
processList(d,i)
}}var j=document.createElement("SPAN");
j.className=nodeSignClass+" ";
j.className+=g?lastNodeSignClass:"";
if(c||hasClass(h,nodeMoreClass)){h.className=c?nodeOpenClass:nodeClosedClass;
h.getItems=!c;
j.onclick=onExpandCollapseClickSelf
}else{h.className=nodeLeafClass;
j.onclick=onClickReturnFalse
}j.appendChild(document.createTextNode("\u00A0"));
h.insertBefore(j,h.firstChild);
var f=document.createElement("SPAN");
f.className=nodeIconClass;
f.onclick=onClickReturnFalse;
f.appendChild(document.createTextNode("\u00A0"));
h.insertBefore(f,j.nextSibling);
var e=document.createElement("SPAN");
e.className=nodeLabelClass;
if(isSelectedItem(d.id,h.id)){addClass(e,nodeLabelSelectedClass)
}e.onclick=onS3ClickSelf;
e.onmouseover=onS3MouseOverSelf;
e.onmouseout=onS3MouseOutSelf;
var a=f.nextSibling;
h.removeChild(a);
e.appendChild(a);
h.insertBefore(e,f.nextSibling)
}function onExpandCollapseClick(c){var e=c.parentNode;
var a=e.className==nodeOpenClass;
e.className=a?nodeClosedClass:nodeOpenClass;
var d=findRootId(c);
addItemState(d,e.id,a);
var f=false;
for(var b=0;
b<e.childNodes.length&&!f;
b++){if(e.childNodes[b].nodeName=="UL"){f=true
}}if(!f){e.getItems=false;
getItems(d,e.id)
}return false
}function onExpandCollapseClickSelf(){onExpandCollapseClick(this)
}function onClickReturnFalse(){return false
}function onS3ClickSelf(){return onS3Click(this)
}function onS3Click(b,d){var c=findRootId(b),a;
if(!d){d=window.event
}a=document.jsfForm()[c+"-m"];
if(a&&a.value){a=a.value==="true"
}else{a=false
}if(document.selection){document.selection.empty()
}selectItem(c,b.parentNode.id,a&&d.ctrlKey);
return false
}function onS3MouseOverSelf(){return onS3MouseOver(this)
}function onS3MouseOver(a){addClass(a,"mouseover");
return false
}function onS3MouseOutSelf(){return onS3MouseOut(this)
}function onS3MouseOut(a){removeClass(a,"mouseover");
return false
}function findRootId(a){var b=a.parentNode;
while(b!=null&&(b.parentNode.nodeName=="UL"||b.parentNode.nodeName=="LI")){b=b.parentNode
}return b.id
}function addItemState(d,f,a){var b=document.jsfForm()[d+"-x"];
if(b!=null){var e=b.value;
var c=f.substr(d.length+1);
e=removeItemState(e,c);
e+=(e.length>0?" ":"")+(a?"-":"+")+c;
b.value=e
}}function removeItemState(c,b){var d=" -"+b+" ";
c=" "+c+" ";
var a=c.indexOf(d);
if(a!=-1){c=c.substr(0,a+1)+c.substr(a+d.length)
}d=" +"+b+" ";
a=c.indexOf(d);
if(a!=-1){c=c.substr(0,a+1)+c.substr(a+d.length)
}return c.substr(1,c.length-2)
}function selectItem(f,g,d){var e=getSelectedItems(f),a=g.substr(f.length+1),b=isSelectedItem(f,a),c;
if(!d&&e.length>=1){for(c=0;
c<e.length;
c++){removeSelectedItem(f,e[c])
}}if(b){removeSelectedItem(f,a)
}else{addSelectedItem(f,a)
}}function isSelectedItem(d,a){var c=document.jsfForm()[d+"-s"],b=new RegExp("(^|\\s)"+a+"(\\s|$)","g");
return c&&b.test(c.value)
}function getSelectedItems(c){var b=document.jsfForm()[c+"-s"],d,a;
d=(b?b.value:"").split(" ");
for(a=0;
a<=d.length;
a++){if(""===d[a]){d.splice(a,1)
}}return d
}function addSelectedItem(d,b){var c=document.jsfForm()[d+"-s"],a=findItemLabel(d,d+"-"+b);
if(c!=null){if(c.value==""){c.value=b
}else{c.value+=" "+b
}addClass(a,nodeLabelSelectedClass)
}}function removeSelectedItem(g,b){var f=document.jsfForm()[g+"-s"],c=new RegExp("(^|\\s)"+b+"(\\s|$)","g"),e=new RegExp("^"+b+"(\\s|$)","g"),a=new RegExp("\\s"+b+"$","g"),h=new RegExp("\\s"+b+"\\s","g"),d;
if(f!=null){if(f.value&&c.test(f.value)){f.value=f.value.replace(e,"").replace(a,"").replace(h," ")
}d=findItemLabel(g,g+"-"+b);
removeClass(d,nodeLabelSelectedClass)
}}function findItemLabel(c,d){var a=document.getElementById(d);
if(a!=null){var e=a.firstChild;
for(var b=0;
e!=null;
e=e.nextSibling){if(e.tagName=="SPAN"){if(++b==3){return e
}}}}return null
}function isChildItem(b,a){if(a==null||a.length<=b.length){return false
}return b==a.substr(0,b.length)&&a.charAt(b.length)=="-"
}function getItems(e,f){var c=document.jsfForm()[e+"-r"];
var b=c.value;
b=addParameter(b,"treeId",e);
b=addParameter(b,"nodeId",f.substr(e.length+1));
b=addParameter(b,"formId",window.document.jsfForm().id);
var d=new TreeHandler(e,f);
var a=new HTTPClient();
a.init(b);
a.asyncGET(d)
}function TreeHandler(a,b){this.treeId=a;
this.itemId=b;
this.fallback=new EchoHandler()
}TreeHandler.prototype.onInit=function(){this.fallback.onInit()
};
TreeHandler.prototype.onError=function(a,b){this.fallback.onError(a,b)
};
TreeHandler.prototype.onProgress=function(b,a){this.fallback.onProgress(b,a)
};
TreeHandler.prototype.onLoad=function(a){loadItems(this.treeId,this.itemId,a)
};
function loadItems(f,k,d){var h=d.documentElement.childNodes;
for(var c=0;
c<h.length;
c++){var o=h.item(c);
if(o.nodeType!=ElementUtils.ELEMENT_NODE){continue
}var k=o.getAttribute("id");
var n=document.getElementById(k);
if(n!=null){window.status="Loading item "+k+"...";
var a=new Array();
var b=new Array();
var g=n.getElementsByTagName("INPUT");
for(var c=0;
c<g.length;
c++){if(typeof(g[c].value)!="undefined"){a[g[c].id]=g[c].value
}if(typeof(g[c].checked)!="undefined"){b[g[c].id]=g[c].checked
}}loadItem(f,k,o,n);
var j=document.getElementById(f);
processItem(j,n);
var e=n.getElementsByTagName("INPUT");
for(var c=0;
c<e.length;
c++){var m=a[e[c].id];
if(m!=null&&typeof(e[c].value)!="undefined"){e[c].value=m
}var l=b[e[c].id];
if(l!=null&&typeof(e[c].checked)!="undefined"){e[c].checked=l
}}}else{window.status="Invalid response: item "+k+" not found."
}}}function loadItem(e,h,a,b){while(b.firstChild!=null){removeEvent(b.firstChild,"click",b.firstChild.onclick);
removeEvent(b.firstChild,"mouseover",b.firstChild.onmouseover);
removeEvent(b.firstChild,"mouseout",b.firstChild.onmouseout);
b.removeChild(b.firstChild)
}var j=null;
var k=a.firstChild;
for(;
k!=null;
k=k.nextSibling){if(k.nodeType==DOM_ELEMENT_NODE&&k.tagName=="ul"){j=k
}else{var f=ElementUtils.cloneItem(k);
if(f!=null){b.innerHTML+=f.outerHTML
}}}if(j!=null){var g=cloneItem(j);
b.innerHTML+=g.outerHTML
}var d=b.getElementsByTagName("INPUT");
for(var c=0;
c<d.length;
c++){d[c].name=d[c].id
}};
var EditorUtils={};
EditorUtils.internal={};
EditorUtils.createEditor=function(a,c){var b=this._setupEditor(a,c);
b.Create()
};
EditorUtils.replaceTextarea=function(a,c){var b=this._setupEditor(a,c);
b.ReplaceTextarea()
};
EditorUtils.internal.registeredEditors={};
EditorUtils.internal.setEditorRegistered=function(b,a){EditorUtils.internal.registeredEditors[b]=a
};
EditorUtils._setupEditor=function(g,c){if(!c){throw"Configuration missing for editor "+g
}EditorUtils.internal.setEditorRegistered(g,true);
var b=c.width||800;
var k=c.height||500;
var d=c.toolbarset||"Basic";
var f=new FCKeditor(g,b,k,d);
var j=typeof contextPath_=="string";
var e;
if(useVerStatFiles_){e=j?contextPath_+"/"+buildVersion_+"/akira/pub/":"../"
}else{e=j?contextPath_+"/akira/pub/":"../"
}f.BasePath=e+"fckeditor/";
var l=c.skin||"silver";
var i=e.charAt(0)=="/";
var a="";
if(i){a=e+"fckeditor/editor/"
}a+="skins/"+l+"/";
f.Config.SkinPath=a;
f.Config.EnableSpellCheck=c.canSpellCheck;
f.Config.DefaultLanguage=(c.locale||"en").toLowerCase();
f.Config.textResourcesURL=c.textResourcesURL||richTextComponentResURL;
f.Config.ContentLangDirection=c.langDirection||"ltr";
f.Config.SpellCheckerSkin=c.SpellCheckerSkin||"liquid";
f.Config.LinkDlgHideTarget=c.LinkDlgHideTarget||"false";
f.Config.ImageDlgHideLink=c.imageDlgHideLink||false;
if(c.SpellCheckerURL){f.Config.SpellCheckerURL=c.SpellCheckerURL
}else{var h=j?contextPath_+"/akira/pub/":"../";
f.Config.SpellCheckerURL=h+"spellCheck.jsf"
}f.Config.debug=c.debug;
f.Config.formatOutput=c.formatOutput;
f.Config.formatSource=c.formatSource;
f.Config.hiddenButton=c.hiddenButton;
hideSelectedButtons(f);
return f
};
EditorUtils.getEditor=function(a){return FCKeditorAPI.GetInstance(a)
};
EditorUtils.setHTMLText=function(b,a){var c=EditorUtils.getEditor(b);
c.SetHTML(a,true)
};
EditorUtils.getHTMLText=function(a){var b=EditorUtils.getEditor(a);
return b.GetXHTML(false)
};
EditorUtils.insertHtmlText=function(b,a){var c=EditorUtils.getEditor(b);
return c.InsertHtml(a)
};
EditorUtils.deleteEditor=function(a){EditorUtils.getEditor(a).DeleteEditor();
EditorUtils.internal.setEditorRegistered(a,false)
};
EditorUtils.addListener=function(b,a,c){var d=function(){try{EditorUtils.getEditor(b).Events.AttachEvent(a,c)
}catch(e){taleo.core.logging.warn("EditorUtils.addListener: attaching event to editor failed with message: "+e.message)
}};
EditorUtils.internal.callWhenEditorIsReady(b,d)
};
EditorUtils.internal.pendingCallsQueue={};
EditorUtils.internal.ensureQueueInitialized=function(a){if(!EditorUtils.internal.pendingCallsQueue[a]){EditorUtils.internal.pendingCallsQueue[a]=[]
}};
EditorUtils.internal.getPendingCallsQueue=function(a){EditorUtils.internal.ensureQueueInitialized(a);
return EditorUtils.internal.pendingCallsQueue[a]
};
EditorUtils.internal.addToPendingCallsQueue=function(c,a){EditorUtils.internal.ensureQueueInitialized(c);
var b=EditorUtils.internal.pendingCallsQueue[c];
b.push(a)
};
EditorUtils.internal.callWhenEditorIsReady=function(b,a){if(EditorUtils.isRTEditorReady(b)){a()
}else{EditorUtils.internal.addToPendingCallsQueue(b,a)
}};
EditorUtils.internal.completedEditors={};
EditorUtils.isRTEditorReady=function(a){return EditorUtils.internal.completedEditors[a]===true
};
EditorUtils.internal.setEditorReady=function(b,a){EditorUtils.internal.completedEditors[b]=a
};
EditorUtils.isAllEditorsReady=function(){var b=EditorUtils.internal.registeredEditors;
for(var a in b){if(b[a]===true&&!EditorUtils.isRTEditorReady(a)){return false
}}return true
};
EditorUtils.internal.executePendingCalls=function(c){var b=EditorUtils.internal.getPendingCallsQueue(c);
var a;
while(a=b.shift()){a()
}};
function FCKeditor_OnComplete(a){EditorUtils.internal.setEditorReady(a.Name,true);
EditorUtils.internal.executePendingCalls(a.Name)
}function hideSelectedButtons(c){var e=c.Config.hiddenButton;
if(e){var b=e.split(",");
for(var d=0;
d<b.length;
d++){var a=b[d];
if(a){a.trim();
c.Config["btn"+a]="hidden"
}}}};
var _helpContexts=new Array();
var _helps=new Array();
var _defaultHelpContext=null;
var _activeHelpContext=null;
function HelpContext(d,c,b,a){this.id=d;
this.active=c;
this.helpPageURL=b;
if(a!=null&&a!=""&&a!="null"){this.forHelpId=a
}}function addNewHelpContext(d,c,b,a){var e=new HelpContext(d,c,b,a);
_helpContexts[d]=e;
if(c){_activeHelpContext=e
}if(_defaultHelpContext==null){_defaultHelpContext=e
}}function activateHelpContext(a){var b;
if(a==null){b=_defaultHelpContext
}else{b=_helpContexts[a]
}if(b!=null&&b!=_activeHelpContext){b.active=true;
_activeHelpContext=b;
if(b.forHelpId==null){b.forHelpId=_helps[0]
}refreshHelpContent(b.forHelpId,b.helpPageURL)
}}function refreshHelpContent(e,c){var b=findElementsEndingWithId(null,e+"_iframe",null,true)[0];
if(b!=null){var a=null;
if(b.childNodes>0){a=b.childNodes[0]
}if(a==null){try{a=document.createElement("IFRAME");
a.id=e+"_frame";
a.title=AccessibilityRes.helpIFrameTitle;
a.name=AccessibilityRes.helpIFrameName;
a.frameborder="no";
b.appendChild(a)
}catch(d){iframeHTML='<iframe id="'+e+'_frame" title="'+AccessibilityRes.helpIFrameTitle+'" name="'+AccessibilityRes.helpIFrameName+'" style="';
iframeHTML+='frameborder="no"';
iframeHTML+='"></iframe>';
b.innerHTML+=iframeHTML;
a=new Object();
a.document=new Object();
a.document.location=new Object();
a.document.location.iframe=document.getElementById(e+"_frame");
a.document.location.replace=function(h){this.iframe.src=h
}
}}if(navigator.userAgent.indexOf("Gecko")!=-1&&!a.contentDocument){var f="taleo.core.beacon.sendMessageToUIMessageReceiverServlet('"+c+"', 'POST', true)";
setTimeout(f,10);
return false
}var g=getIFrameDoc(a);
if(g==null){return true
}a.src=c
}}function addNewHelpComponent(a){_helps.push(a)
};
function createAccessibleAlert(g,d,j,a,e,b,c,i){var f=createAlert(g,d,j,a,e,b,c,i);
if(f!=null){if(f.embeddedDialog!=null){var h=findElementsEndingWithId(document,f.embeddedDialog.dialogId+"-fr",null,true)[0];
if(h!=null){f.embeddedDialog.htmlContent=h.innerHTML;
h.innerHTML=""
}}else{var h=findElementsEndingWithId(document,g+".message",null,true)[0];
if(h!=null){f.htmlContent=h.innerHTML;
h.innerHTML=""
}}}return f
};
var AKBrowserDetection={};
AKBrowserDetection.isIE=function(){return(navigator.appName=="Microsoft Internet Explorer")
};
AKBrowserDetection.isIE7=function(){return AKBrowserDetection.isIE()&&AKBrowserDetection.getIEMajorVersion()==="7"
};
AKBrowserDetection.isIE8=function(){return AKBrowserDetection.isIE()&&AKBrowserDetection.getIEMajorVersion()==="8"
};
AKBrowserDetection.isIE8Browser=function(){return AKBrowserDetection.isIE8()||AKBrowserDetection.getTridentVersion()==4
};
AKBrowserDetection.isIE9OrMore=function(){return AKBrowserDetection.isIE()&&parseFloat(AKBrowserDetection.getIEMajorVersion())>=9
};
AKBrowserDetection.isWebkit=function(){return/webkit/.test(navigator.userAgent.toLowerCase())
};
AKBrowserDetection.isFirefox=function(){return navigator.userAgent.toLowerCase().indexOf("firefox")>=0
};
AKBrowserDetection.isChrome=function(){return navigator.userAgent.toLowerCase().indexOf("chrome/")>=0
};
AKBrowserDetection.isSafari=function(){return navigator.userAgent.toLowerCase().indexOf("safari")>=0&&!AKBrowserDetection.isChrome()
};
AKBrowserDetection.isSafari5=function(){return AKBrowserDetection.isSafari()&&AKBrowserDetection.getSafariMajorVersion()==="5"
};
AKBrowserDetection.getIEMajorVersion=function(){return AKBrowserDetection.impl.getIEMajorVersion()
};
AKBrowserDetection.getTridentVersion=function(){var c=null;
var b=navigator.userAgent;
var a=new RegExp("Trident/([0-9]{1,}[.0-9]{0,})");
if(a.exec(b)!=null){c=parseFloat(RegExp.$1)
}return c
};
AKBrowserDetection.getSafariMajorVersion=function(){var a=null;
var b=new RegExp("Version/([^. ]+)");
if(b.exec(navigator.userAgent)!=null){a=RegExp.$1
}return a
};
AKBrowserDetection.impl={};
AKBrowserDetection.impl.ieMajorVersion=null;
AKBrowserDetection.impl.getIEMajorVersion=function(){if(AKBrowserDetection.impl.ieMajorVersion==null){AKBrowserDetection.impl.initIEVersion()
}return AKBrowserDetection.impl.ieMajorVersion
};
AKBrowserDetection.impl.initIEVersion=function(){if(AKBrowserDetection.isIE()){var a=new RegExp("MSIE (\\d+)\\.\\d+;");
if(a.exec(navigator.userAgent)!=null){AKBrowserDetection.impl.ieMajorVersion=RegExp.$1
}}};
var Drag={BIG_Z_INDEX:10000,group:null,isDragging:false,noop:function(){},makeDraggable:function(a){a.handle=a;
a.handle.group=a;
a.minX=null;
a.minY=null;
a.maxX=null;
a.maxY=null;
a.threshold=0;
a.thresholdY=0;
a.thresholdX=0;
a.onDragStart=this.noop;
a.onDragEnd=this.noop;
a.onDrag=this.noop;
a.onDragSetCursor=this.noop;
a.onDragAbort=this.noop;
a.onDragCleanUp=this.noop;
a.setDragHandle=Drag.setDragHandle;
a.setDragThreshold=Drag.setDragThreshold;
a.setDragThresholdX=Drag.setDragThresholdX;
a.setDragThresholdY=Drag.setDragThresholdY;
a.constrain=Drag.constrain;
a.constrainVertical=Drag.constrainVertical;
a.constrainHorizontal=Drag.constrainHorizontal;
a.onmousedown=Drag.onMouseDown
},constrainVertical:function(){var a=Coordinates.northwestOffset(this,true);
this.minX=a.x;
this.maxX=a.x
},constrainHorizontal:function(){var a=Coordinates.northwestOffset(this,true);
this.minY=a.y;
this.maxY=a.y
},constrain:function(b,a){this.minX=b.x;
this.minY=b.y;
this.maxX=a.x;
this.maxY=a.y
},setDragHandle:function(a){if(a&&a!=null){this.handle=a
}else{this.handle=this
}this.handle.group=this;
this.onmousedown=null;
this.handle.onmousedown=Drag.onMouseDown
},setDragThreshold:function(a){if(isNaN(parseInt(a))){return
}this.threshold=a
},setDragThresholdX:function(a){if(isNaN(parseInt(a))){return
}this.thresholdX=a
},setDragThresholdY:function(a){if(isNaN(parseInt(a))){return
}this.thresholdY=a
},startDrag:function(b,a){return Drag.onMouseDownAux(b,a)
},onMouseDown:function(a){return Drag.onMouseDownAux(this.group,a)
},onMouseDownAux:function(f,d){d=Drag.fixEvent(d);
Drag.group=f;
var b=d.windowCoordinate;
var c=Coordinates.northwestOffset(f,true);
var g=Coordinates.northwestPosition(f);
var a=Coordinates.southeastPosition(f);
var e=Coordinates.southeastOffset(f,true);
f.originalCursor=f.style.cursor;
if(f.style.opacity){f.originalOpacity=f.style.opacity
}f.originalZIndex=f.style.zIndex;
f.initialWindowCoordinate=b;
f.dragCoordinate=b;
f.onDragSetCursor(g,a,c,e);
f.onDragStart(g,a,c,e);
if(f.minX!=null){f.minMouseX=b.x-g.x+f.minX-c.x
}if(f.maxX!=null){f.maxMouseX=f.minMouseX+f.maxX-f.minX
}if(f.minY!=null){f.minMouseY=b.y-g.y+f.minY-c.y
}if(f.maxY!=null){f.maxMouseY=f.minMouseY+f.maxY-f.minY
}f.mouseMin=new Coordinate(f.minMouseX,f.minMouseY);
f.mouseMax=new Coordinate(f.maxMouseX,f.maxMouseY);
Drag.isCapturingMouse=f.setCapture?true:false;
if(Drag.isCapturingMouse){f.setCapture()
}document.onmousemove=Drag.onMouseMove;
document.onmouseup=Drag.onMouseUp;
document.onkeydown=Drag.onKeyDown;
return false
},showStatus:function(d,b,f,a,c,e){window.status="src: "+(d.srcElement?d.srcElement.id:"?")+" from: "+(d.fromElement?d.fromElement.id:"?")+" to: "+(d.toElement?d.toElement.id:"?")+" mouse: "+b.toString()+"    NW pos: "+f.toString()+"    SE pos: "+a.toString()+"    NW offset: "+c.toString()+"    SE offset: "+e.toString()
},onMouseMove:function(d){d=Drag.fixEvent(d);
var l=Drag.group;
var j=d.windowCoordinate;
var g=Coordinates.northwestOffset(l,true);
var n=Coordinates.northwestPosition(l);
var b=Coordinates.southeastPosition(l);
var k=Coordinates.southeastOffset(l,true);
if(!Drag.isDragging){if(l.threshold>0){var c=l.initialWindowCoordinate.distance(j);
if(c<l.threshold){return true
}}else{if(l.thresholdY>0){var f=Math.abs(l.initialWindowCoordinate.y-j.y);
if(f<l.thresholdY){return true
}}else{if(l.thresholdX>0){var h=Math.abs(l.initialWindowCoordinate.x-j.x);
if(h<l.thresholdX){return true
}}}}Drag.isDragging=true;
l.style.zIndex=Drag.BIG_Z_INDEX;
if(l.style.opacity){l.style.opacity=0.75
}}var m=j.constrain(l.mouseMin,l.mouseMax);
n=n.plus(m.minus(l.dragCoordinate));
n.reposition(l);
l.dragCoordinate=m;
l.onDragSetCursor(n,b,g,k);
var a=Coordinates.northwestOffset(l,true);
l.onDrag(n,b,g,k);
var i=Coordinates.northwestOffset(l,true);
if(!a.equals(i)){var e=a.minus(i);
n=Coordinates.northwestPosition(l).plus(e);
n.reposition(l)
}return false
},onMouseUp:function(d){d=Drag.fixEvent(d);
var f=Drag.group;
var b=d.windowCoordinate;
var c=Coordinates.northwestOffset(f,true);
var g=Coordinates.northwestPosition(f);
var a=Coordinates.southeastPosition(f);
var e=Coordinates.southeastOffset(f,true);
f.onDragEnd(g,a,c,e);
Drag.cleanup();
return false
},cleanup:function(a){document.onmousemove=null;
document.onmouseup=null;
document.onkeydown=null;
var b=Drag.group;
b.style.cursor=b.originalCursor;
if(Drag.isDragging){b.style.zIndex=b.originalZIndex;
if(b.originalOpacity){b.style.opacity=b.originalOpacity
}}if(Drag.isCapturingMouse){b.releaseCapture()
}Drag.group=null;
Drag.isDragging=false;
b.removeAttribute("minX");
b.removeAttribute("minY");
b.removeAttribute("maxX");
b.removeAttribute("maxY");
b.removeAttribute("threshold");
b.removeAttribute("thresholdX");
b.removeAttribute("thresholdY");
b.removeAttribute("originalCursor");
b.removeAttribute("originalOpacity");
b.removeAttribute("originalZIndex");
b.removeAttribute("initialWindowCoordinate");
b.removeAttribute("dragCoordinate");
b.removeAttribute("minMouseX");
b.removeAttribute("minMouseY");
b.removeAttribute("mouseMin");
b.removeAttribute("mouseMax");
b.onDragCleanUp();
return false
},onKeyDown:function(b){b=Drag.fixEvent(b);
var a=b.keyCode||b.which;
if(a==27){Drag.cancelDrag(b)
}return false
},cancelDrag:function(a){var b=Drag.group;
Coordinates.ORIGIN.reposition(b);
b.onDragAbort();
this.cleanup()
},fixEvent:function(a){if(typeof a=="undefined"){a=window.event
}Coordinates.fixEvent(a);
return a
}};
var Coordinates={ORIGIN:new Coordinate(0,0),northwestPosition:function(b){var a=parseInt(b.style.left);
var c=parseInt(b.style.top);
return new Coordinate(isNaN(a)?0:a,isNaN(c)?0:c)
},southeastPosition:function(a){return Coordinates.northwestPosition(a).plus(new Coordinate(a.offsetWidth,a.offsetHeight))
},northwestOffset:function(a,c){var d=new Coordinate(a.offsetLeft,a.offsetTop);
if(!c){return d
}var b=a.offsetParent;
while(b){d=d.plus(new Coordinate(b.offsetLeft,b.offsetTop));
b=b.offsetParent
}return d
},southeastOffset:function(a,b){return Coordinates.northwestOffset(a,b).plus(new Coordinate(a.offsetWidth,a.offsetHeight))
},fixEvent:function(a){a.windowCoordinate=new Coordinate(a.clientX,a.clientY)
},fromString:function(b){var c=/^\((-?\d+),(-?\d+)\)$/;
if(c.test(b)){var a=parseInt(RegExp.$1,10);
var d=parseInt(RegExp.$2,10);
return new Coordinate(isNaN(a)?0:a,isNaN(d)?0:d)
}return null
}};
function Coordinate(a,b){this.x=a;
this.y=b
}Coordinate.prototype.toString=function(){return"("+this.x+","+this.y+")"
};
Coordinate.prototype.plus=function(a){return new Coordinate(this.x+a.x,this.y+a.y)
};
Coordinate.prototype.minus=function(a){return new Coordinate(this.x-a.x,this.y-a.y)
};
Coordinate.prototype.distance=function(c){var b=this.x-c.x;
var a=this.y-c.y;
return Math.sqrt(Math.pow(b,2)+Math.pow(a,2))
};
Coordinate.prototype.max=function(b){var a=Math.max(this.x,b.x);
var c=Math.max(this.y,b.y);
return new Coordinate(a,c)
};
Coordinate.prototype.constrain=function(c,b){if(c.x>b.x||c.y>b.y){return this
}var a=this.x;
var d=this.y;
if(c.x!=null){a=Math.max(a,c.x)
}if(b.x!=null){a=Math.min(a,b.x)
}if(c.y!=null){d=Math.max(d,c.y)
}if(b.y!=null){d=Math.min(d,b.y)
}return new Coordinate(a,d)
};
Coordinate.prototype.reposition=function(a){a.style.top=this.y+"px";
a.style.left=this.x+"px"
};
Coordinate.prototype.equals=function(a){if(this==a){return true
}if(!a||a==null){return false
}return this.x==a.x&&this.y==a.y
};
Coordinate.prototype.inside=function(b,a){if((this.x>=b.x)&&(this.x<=a.x)&&(this.y>=b.y)&&(this.y<=a.y)){return true
}return false
};
var currentFieldSelector;
var FieldSelector_DRAG_MODE = 1;
var FieldSelector_INPUT_MODE = 2;
var FieldSelector_CLICK_MODE = 3;
var FieldSelector_SUGGEST_MODE = 4;
var FieldSelector_rootNode = null;
var FieldSelector_modelsByModelName = {};

function FieldSelector(pFieldSelectorId, pMode, pDisplayCode, pHideRelationN,
    pOnFieldSelect, pSelectedModelId, pSelectedFieldId, pHideDuplicateModels, pLang)
{
    this.id = pFieldSelectorId;
    this.mode = pMode;
    this.displayCode = pDisplayCode;
    this.hideRelationN = pHideRelationN;
    this.onFieldSelect = pOnFieldSelect;
    this.hideDuplicateModels = pHideDuplicateModels;
    FieldSelector_initMetadata(this.id + "-meta");
    var selModelName = FieldSelector.setupModelSelect(this, pSelectedModelId, pLang);
    this.currentModel = this.findModelMetadata(selModelName);
    FieldSelector.setupFieldSelect(this, pSelectedFieldId, pLang);
}

FieldSelector.setupModelSelect = function(pFieldSelector, pSelectedModelId, pLang)
{
    var firstModelName = null;
    var selModelName = null;
    var select = document.getElementById(pFieldSelector.id + "-mcb");
    if (select)
    {
        select.fieldSelector = pFieldSelector;
    }
    if (FieldSelector_rootNode)
    {
        var meta = FieldSelector_rootNode;
        var modelsByLevel = [];
        for (i = 0; model = meta[i ++]; )
        {
            modelName = model.name;
            if (!firstModelName)
            {
                firstModelName = modelName;
            }
            if (modelName == pSelectedModelId)
            {
                selModelName = modelName;
            }
            if (select)
            {
                // Indent the dataview name
                var level = model.level;
                modelsByLevel[level] = {model: model, used: {}};
                var indent = "";
                for (var l = 0; l < level; l ++)
                {
                    // 2 NBSP's
                    indent = "\u00A0\u00A0" + indent;
                }
                var modelSuffix = "";
                if (level && _getModelUseCount(modelsByLevel[level - 1].model, model) > 1)
                {
                    var used = modelsByLevel[level - 1].used;
                    if (used[modelName] && pFieldSelector.hideDuplicateModels)
                    {
                        continue;
                    }
                    used[modelName] = true;
                    if (!pFieldSelector.hideDuplicateModels)
                    {
                        // Append the relation name if the target model is used more than once.
                        modelSuffix = " (" + model.parentRelationName + ")";
                        if (!pFieldSelector.displayCode)
                        {
                           var parentModel = modelsByLevel[level - 1].model;
                           var parentRelation = parentModel.elementsByName[model.parentRelationName];
                           if (parentRelation)
                           {
                                var parentRelationLabel = _getMultiLingualField(parentRelation, "label", pLang);
                                if (parentRelationLabel)
                                {
                                    modelSuffix = " (" + parentRelationLabel + ")";
                                }
                            }
                        }
                    }
                }
                var oOption = document.createElement("OPTION");
                if (modelName == pSelectedModelId)
                {
                    oOption.selected = true;
                }
                oOption.fieldSelector = pFieldSelector;
                oOption.value = modelName;
                oOption.model = model;
                if (pFieldSelector.displayCode)
                {
                    HTMLUtils.addText(oOption, indent + modelName + modelSuffix);
                }
                else
                {
                    var modelLabel = _getMultiLingualField(model, "label", pLang);
                    if (!modelLabel)
                    {
                        modelLabel = modelName;
                    }
                    HTMLUtils.addText(oOption, indent + modelLabel + modelSuffix);
                }
                select.appendChild(oOption);
            }
        }
    }
    return selModelName || firstModelName;
}

FieldSelector.onModelSelectChange = function(pEvent)
{
    var select = getEventElement(pEvent);
    var model = select.options[select.selectedIndex].model;
    select.fieldSelector.currentModel = model;
    FieldSelector.setupFieldSelect(select.fieldSelector, null, null);
}

FieldSelector.setupFieldSelect = function(pFieldSelector, pSelectedFieldId, pLang)
{
    var model = pFieldSelector.currentModel;
    var elements;
    var i, element;
    var field, isRelationN, fieldLabel, fieldName;
    
    if (pFieldSelector.mode === FieldSelector_DRAG_MODE)
    {
        var fieldUL = document.getElementById(pFieldSelector.id + "-fcb");
        _removeAllChildren(fieldUL);
        fieldUL.fieldSelector = pFieldSelector;
        
        if (model)
        {
            elements = model.elements;
            for (i = 0; element = elements[i ++]; )
            {
                var required;
                
        		field = element.field;
                if (!field)
                {
                    isRelationN = false;
                    required = false;
                    field = element.method;
                }
                else
                {
                    isRelationN = field.isRelationN;
                    required = field.required;
                }
                
                if (!isRelationN || !pFieldSelector.hideRelationN)
                {          
                    fieldLabel = _getMultiLingualField(field, "label", pLang);
                    var fieldLi = document.createElement("LI");
                    DragUtils.makeDragSourceCloned(fieldLi);
                    StyleUtils.addHoverEffect(fieldLi);
                    StyleUtils.addClass(fieldLi, "fs-label");
                    fieldName = element.name;
                    if (pFieldSelector.displayCode)
                    {
                        HTMLUtils.addText(fieldLi, fieldName);
                        if (typeof fieldLabel === "string")
                        {
                            fieldLi.setAttribute("title", fieldLabel);
                        }
                    }
                    else
                    {
                        if (fieldLabel && fieldLabel.type)
                        {
                            fieldLi.innerHTML = fieldLabel.text;
                        }
                        else
                        {
                            HTMLUtils.addText(fieldLi, fieldLabel || fieldName);
                        }
                        fieldLi.setAttribute("title", fieldName);
                    }
                    if (required)
                    {
                        StyleUtils.addClass(fieldLi, "fs-label-required");
                    }
                    fieldLi.fieldSelector = pFieldSelector;
                    fieldLi.fieldMetaData = element;
                    fieldUL.appendChild(fieldLi);
                }
            }
        }
    }
    else if (pFieldSelector.mode === FieldSelector_SUGGEST_MODE)
    {
    }
    else
    {
        var select = document.getElementById(pFieldSelector.id + "-fcb");
        var oOption;
        
        _removeAllChildren(select);
        select.fieldSelector = pFieldSelector;
        if (pFieldSelector.mode === FieldSelector_INPUT_MODE && pSelectedFieldId === null)
        {
            oOption = FieldSelector.createNAFieldOption(pFieldSelector);
            select.appendChild(oOption);
        }

        if (model)
        {
            elements = model.elements;
            for (i = 0; element = elements[i ++]; )
            {
                field = element.field;
                if (!field)
                {
                    isRelationN = false;
                    field = element.method;
                }
                else
                {
                    isRelationN = field.isRelationN;
                }
                
                if (!isRelationN || !pFieldSelector.hideRelationN)
                {           
                    fieldLabel = _getMultiLingualField(field, "label", pLang);
                    oOption = FieldSelector.createFieldOption(pFieldSelector,
                        pSelectedFieldId, element, fieldLabel);
                    select.appendChild(oOption);
                }
            }
        }
    }
}

_getMultiLingualField = function(pObject, pFieldName, pLang)
{
    var values = pObject[pFieldName];
    if (values[pLang])
    {
    	return values[pLang];
    }
    for (var lang in values)
    {
        return values[lang];
    }
    return null;
}

_getModelUseCount = function(pParentModel, pModel)
{
    var count = 0;
    var elements = pParentModel.elements;
    for (var i = 0, element; element = elements[i ++]; )
    {
        var field = element.field;
        if (field && field.contentDVName === pModel.name)
        {
            count ++;
        }
    }
    return count;
}

FieldSelector.createFieldOption = function(pFieldSelector,
    pSelectedFieldId, pFieldMetaData, pFieldLabel)
{
    var oOption = document.createElement("OPTION");

    oOption.fieldMetaData = pFieldMetaData;
    oOption.value = pFieldMetaData.name;
    if (oOption.value == pSelectedFieldId)
    {
        oOption.selected = true;
    }
    if (pFieldSelector.displayCode)
    {
        HTMLUtils.addText(oOption, oOption.value);
        if (typeof pFieldLabel === "string")
        {
            oOption.setAttribute("title", pFieldLabel);
        }
    }
    else
    {
    	if (pFieldLabel && pFieldLabel.type)
    	{
    		oOption.innerHTML = pFieldLabel.text;
    	}
    	else
    	{
            HTMLUtils.addText(oOption, pFieldLabel || oOption.value);
    	}
    }
    oOption.fieldSelector = pFieldSelector;
    return oOption;
}

FieldSelector.createNAFieldOption = function(pFieldSelector)
{
    var oOption = document.createElement("OPTION");

    oOption.fieldMetaData = null;
    oOption.value = "-1"; //DataViewFieldSelectorRenderer.NOT_SEL_VALUE
    oOption.selected = true;
    HTMLUtils.addText(oOption, akDVFieldSelNotSel);
    oOption.fieldSelector = pFieldSelector;
    return oOption;
}

// Listen to mousedown events to store the current selection
// The application may then act on it when handling change events.
FieldSelector.onFieldSelectMouseDown = function (pEvt)
{
    var select = getEventElement(pEvt);
    var ae = FieldSelector_findActiveElement(document, window);
//    logSelection(ae);
    var activeElement = ae && (ae.iframe || ae.element);

    select.fieldSelector.theActiveElement = activeElement;

    if (activeElement &&
        activeElement.tagName !== "SELECT" &&
        activeElement.tagName !== "OPTION")
    {
        select.fieldSelector.theActiveDocument = ae.document;
        select.fieldSelector.theActiveWindow = ae.window;
        if (window.getSelection)
        {
            // w3c
            var selection = select.fieldSelector.theActiveWindow.getSelection();
            select.fieldSelector.savedRange = new W3CSelection(
                select.fieldSelector.theActiveElement,
                selection);
        }
        else if (document.selection)
        {
            // ie
            select.fieldSelector.savedRange = new IESelection(
                select.fieldSelector.theActiveElement,
                select.fieldSelector.theActiveDocument.selection.createRange());
        }
    }
}

function FieldSelector_findActiveElement(pDoc, pWindow)
{
    var ae = pDoc.activeElement;
    if (ae !== pDoc.body)
    {
        return {document: pDoc, element: ae, window: pWindow};
    }
    // Look into inner frames (for Gecko browsers).
    var frames = pDoc.getElementsByTagName("iframe");
    for (var i = 0, n = frames.length; i < n; i++)
    {
        var doc = frames[i].contentDocument;
        var win = frames[i].contentWindow;
        ae = FieldSelector_findActiveElement(doc, win);
        if (ae)
        {
            ae.iframe = frames[i];
            return ae;
        }
    }
    return null;
}

function logSelection(ae)
{
	if (!window.console)
	{
		return;
	}
    var el = ae.element;
    if (el)
    {
        console.log("document.activeElement: " + el.tagName + "#" + el.id);
        var s = ae.window.getSelection();
        console.log("window.getSelection(): text=" + s.toString() +
                ", rangeCount=" + s.rangeCount);
        if (s.rangeCount)
        {
            var r = s.getRangeAt(0);
            console.log("window.getSelection().getRangeAt(0): text=" + r.toString() +
                ", commonAncestorContainer=" + r.commonAncestorContainer.tagName + "#" + r.commonAncestorContainer.id +
                ", startContainer=" + r.startContainer.tagName + "#" + r.startContainer.id +
                ", startOffset=" + r.startOffset +
                ", endContainer=" + r.endContainer.tagName + "#" + r.endContainer.id +
                ", endOffset=" + r.endOffset);
        }
    }
}

function IESelection(pActiveElement, pRange)
{
    this.activeElement = pActiveElement;
    this.range = pRange
}

IESelection.prototype.parentElement = function ()
{
    return this.activeElement;
}

IESelection.prototype.select = function ()
{
    this.activeElement.focus();
    this.range.select();
}

IESelection.prototype.insertAtCursor = function (pText)
{
    var sel = this.range;
    sel.text = pText;
    sel.moveStart('character', pText.length);
    sel.moveEnd('character', pText.length);
}

function W3CSelection(pActiveElement, pSelection)
{
    this.activeElement = pActiveElement;
    this.selection = pSelection;
}

W3CSelection.prototype.parentElement = function ()
{
    return this.activeElement;
}

W3CSelection.prototype.select = function ()
{
    this.activeElement.focus();
}

W3CSelection.prototype.insertAtCursor = function (pText)
{
    var activeElement = this.activeElement;
    var value = activeElement.value;
    var preSel = value.substring(0, activeElement.selectionStart);
    var postSel = value.substring(activeElement.selectionEnd, value.length);
    activeElement.value = preSel + pText + postSel;
    var posEnd = preSel.length + pText.length;
    activeElement.setSelectionRange(posEnd, posEnd);
}

FieldSelector.onFieldSelectChange = function (pEvt)
{
    var select = getEventElement(pEvt);
    if (select.fieldSelector.theActiveElement)
    {
        var selOption = select.options[select.selectedIndex];
        var fieldMetaData = select.fieldSelector.findFieldMetaData(selOption.value);
        var savedRange = select.fieldSelector.savedRange;
        if (savedRange)
        {
             savedRange.select();
        }
        select.fieldSelector.onFieldSelect(select.fieldSelector, fieldMetaData);
    }
    select.fieldSelector.theActiveElement = null;
    if (select.fieldSelector.mode !== FieldSelector_INPUT_MODE)
    {
        select.selectedIndex = -1;
    }
    select.fieldSelector.savedRange = null;
}

FieldSelector.prototype.findFieldMetaData = function (pFieldName)
{
    var model = this.currentModel;
    return model && model.elementsByName[pFieldName];
}

FieldSelector.prototype.findModelMetadata = function (pModelRootName)
{
    return FieldSelector_modelsByModelName[pModelRootName];
}

function FieldSelector_initMetadata(pMetaElementId)
{
    if (FieldSelector_rootNode)
    {
        return;
    }
    var meta = _meta[pMetaElementId];
    var modelsByModelName = {};
    for (var i = 0, model; model = meta[i ++]; )
    {
        model.elementsByName = _buildElementsByName(model.elements || []);
        modelsByModelName[model.name] = model;
    }
    FieldSelector_rootNode = meta;
    FieldSelector_modelsByModelName = modelsByModelName;
}

function _buildElementsByName(pElements)
{
    var elementsByName = {};
    for (var i = 0, element; element = pElements[i ++]; )
    {
        var elementName = element.name;
        elementsByName[elementName] = element;
    }
    return elementsByName;
}

function FieldSelector_findFieldMetadata(pFieldSelectorId, pBinding)
{
    if (!/^([A-Za-z][A-Za-z0-9_]+)\/(.+)$/.test(pBinding))
    {
        return null;
    }
    var modelName = RegExp.$1;
    var fieldName = RegExp.$2;
    var model = FieldSelector_modelsByModelName[modelName];
    return model && model.elementsByName[fieldName];
}

function _removeAllChildren(pParent)
{
    while (pParent.firstChild)
    {
        pParent.removeChild(pParent.firstChild);
    }
}

function onDragStart(pNwPosition, pSePosition, pNnwOffset, pSeOffset)
{
    currentFieldSelector = Drag.group.fieldSelector;
}


