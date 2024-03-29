/**
 * Created by kpiotrowicz on 27/05/14.
 */

CandidateDataHandler = (function () {

    var FIELDS_TO_POPULATE = {
        firstname: "input[id$='frm-dv_cs_candidate_personal_info_FirstName']",
        lastname: "input[id$='frm-dv_cs_candidate_personal_info_LastName']",
        emailaddress: "input[id$='frm-dv_cs_candidate_personal_info_EmailAddress'], input[id$='dialogTemplate-dialogForm-email']"
    }

    function postReadyMessage() {
        var message = { type: 'ready'};
        parent.postMessage(JSON.stringify(message), "*");
    }

    function pageHasFieldsToPopulate() {
        var elementsCount = 0;
        $.each(FIELDS_TO_POPULATE, function (field, selector) {
            elementsCount += $(selector).length
        });
        return elementsCount > 0;
    }

    function initialize(){
        $(document).ready(function () {
            if (pageHasFieldsToPopulate()) {
                postReadyMessage();
            }
        });
    }

    initialize();

    return {
        handleResponse: function (data) {
            $.each(data, function (key, value) {
                var selector = FIELDS_TO_POPULATE[key];
                if ($(selector).length > 0 && $(selector).val().length == 0) {
                    $(selector).val(value);
                }
            });
        }
    }
})();

 if(typeof IFramesIntegration !== 'undefined') {
     IFramesIntegration.registerHandler('candidateData', CandidateDataHandler);
 }