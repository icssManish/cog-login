function updateMandatoryLabels()
{
	var emailDropDown = findElementsEndingWithId(null, "correspondanceEmail", null, true)[0];
	var businessMailLabel = findElementsEndingWithId(null, "businessEMailLabel", null, true)[0];
	var personalMailLabel = findElementsEndingWithId(null, "personalEMailLabel", null, true)[0];

	if (emailDropDown.selectedIndex == 0)
	{
		businessMailLabel.className = "entity-label-mandatory";
		personalMailLabel.className = "entity-label";
	}
	else
	{
		businessMailLabel.className = "entity-label";
		personalMailLabel.className = "entity-label-mandatory";
	}	
}

function checkForceChangePassword(param)
{
    // Getting force change password checkbox
    var checkBox = findElementsEndingWithId(null, 'forcechangePassword', null, true)[0];
    var checkBoxHidden = findElementsEndingWithId(null, 'forcechangePasswordHidden', null, true)[0];
    var generatePwdHidden = findElementsEndingWithId(null, 'generatePasswordHidden', null, true)[0];
    var passwordGeneratedLabel = findElementsEndingWithId(null, 'passwordGeneratedLabel', null, true)[0];
    var systemFlag = findElementsEndingWithId(null, 'system', null, true)[0];
    
    // MySetup page doesn't have a force change password checkbox
    if (checkBox != null)
    {
		// Checks if we have at least a value
	    if (param != null && (param.value == null || param.value.length == 0))
	    {
	        checkBox.checked = false;
	        checkBox.disabled = false;
	        checkBoxHidden.value = 'false';
	    }
	    else
	    {
			if (systemFlag == null || (systemFlag != null && systemFlag.checked == false))
			{
		    	checkBox.checked = true;
				// checkBox.disabled = true;
				checkBoxHidden.value = 'true';
			}
			else
			{
				checkBox.disabled = false;
			}
	    }
	    
	    generatePwdHidden.value = 'false';
	    
	    if (passwordGeneratedLabel != null)
	    {
	    	passwordGeneratedLabel.style.display = 'none';
	    }
	}
}

function updateForceChangePasswordHidden(value)
{
	// Getting force change password hidden checkbox
    var checkBoxHidden = findElementsEndingWithId(null, 'forcechangePasswordHidden', null, true)[0];
    
    // MySetup page doesn't have a force change password checkbox
    if (checkBoxHidden != null)
    {
    	if (value)
    	{
			checkBoxHidden.value = 'true';
		}
		else
		{
			checkBoxHidden.value = 'false';
		}
	}
}

function showGeneratedPassword(value){
	var generatedPassword = findElementsEndingWithId(null, 'generatedPassword', null, true)[0];
	
	var generatedPasswordHidden = findElementsEndingWithId(null, 'generatedPasswordHidden', null, true)[0];
	var showGeneratedPassword = findElementsEndingWithId(null, 'showGeneratedPassword', null, true)[0];
	if (value)
	{
		showGeneratedPassword.innerHTML = generatedPassword.value;
	}
	else
	{
		showGeneratedPassword.innerHTML = generatedPasswordHidden.value;
	}
}


function secureSubmit(pServlet)
{
	document.forms[0].action = pServlet;
	return true;
}

function noneSecureSubmit()
{
	return true;
}

function focusOnElement(elementId)
{
	element = findElementsEndingWithId(null, elementId, null, true)[0];
	element.focus();
}