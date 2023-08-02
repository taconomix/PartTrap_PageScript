
// Kevin's version Baby!

$(document).on('click', '.next-config-step', function (e) {

  var container = $(this).closest('.config-step-selection').find('.config-selection-container');

  if ($(container).attr('required')) {
      //console.log("REQUIERD!!!!!"); 
      if ($(container).hasClass("is-selected")) {
          $(this).closest('.config-step-selection').closest('div').addClass("hidden");
          $(this).closest('.config-step-selection').next().closest('div').removeClass("hidden");
          $(this).closest('.config-step-selection').next().fadeIn();
          //scrollToElement($(this).closest('.config-step-selection').next());
          $(this).closest('.config-step-selection').removeClass("req-alert");
      } else {
          $(this).closest('.config-step-selection').addClass("req-alert");
      }

  } else {
      $(this).closest('.config-step-selection').closest('div').addClass("hidden");
      $(this).closest('.config-step-selection').next().closest('div').removeClass("hidden");
      $(this).closest('.config-step-selection').next().fadeIn();
      //scrollToElement($(this).closest('.config-step-selection').next());
  }
});

$(document).on('click', '.back-config-step', function (e) {
    $(this).closest('.config-step-selection').closest('div').addClass("hidden");
    $(this).closest('.config-step-selection').prev().closest('div').removeClass("hidden");
    $(this).closest('.config-step-selection').prev().fadeIn();
    //scrollToElement($(this).closest('.config-step-selection').prev());
});

/*
function scrollToElement(element) {
     //var targetEle = this.hash;
    var $targetEle = $(element);

    $('html, body').stop().animate({
        'scrollTop': $targetEle.offset().top + 35

    }, 800, 'swing', function () {

    });
}
*/

var kvLog = "KV Was Here";

var isSavedConfig = false;
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
if (urlParams.get('configId')) {
    isSavedConfig = true;
}
//console.log("IS SAVED CONFIG: " + isSavedConfig);
$('.save-config-button').on('click', function (e) {
    if (confirm("Save configuration: " + $('[field-name="LastNamePID_c"]').val()) == true) {
        addNotesToConfig();
        saveConfiguration();
    }
});

var selectedData = [];

$(document).on('change', '.config-selection-input input', function (e) {
    var dataValue = $(this).val();
    $(this).attr('data-value', dataValue)
});

$(document).on('change', '.config-selection-button input', function (e) {
    if ($(this).is(":checked")) {
        $(this).closest('.config-button').addClass('is-selected');
        $(this).attr('data-value', true)
    } else {
        $(this).attr('data-value', false)
        $(this).closest('.config-button').removeClass('is-selected');
    }
});

var stockCodeToAddToBasket = "SOLEDYNAMIX-PERF";

$(document).on('click', '.add-config-to-cart', function (e) {
    //if (confirm("Device Configuration cannot be edited once added to cart. Continue?")) {
    var configData = selectedData.slice();
    var deviceDescription = $('.config-selected-image-container [field-name="cDeviceCode_c"]').attr('item-descrip');
    //var noteObje = { name: 'OrderNotes_c', datavalue: $('#noteText').val(), description: '' };
    //var internalNoteObje = { name: 'cInternalNotes_c', datavalue: $('#internalNoteText').val(), description: '' };
    //configData.push(noteObje)
    //configData.push(internalNoteObje)

    var data = {
        stockCode: stockCodeToAddToBasket,
        qty: 1,
        ConfigurationItems: configData,
        deviceCodeDescription: deviceDescription
    };

    $.post('/DienenConfiguratorAddToBasket/AddToBasket', data, function (result) {
        if (result) {
            if (result.Success) {

                alertify.success(result.Message);
                PT.Sections.Basket.miniBasket.UpdateMiniBasket();
                if (isSavedConfig) {
                    deleteSavedConfig();
                }
                window.location.href = window.location.origin + '/Checkout';
            }
            else {
                alertify.error(result.Message);
            }
        }
        else {
            alertify.success("Saved");
        }
    });
    //}
});

$(document).on('change', '.config-selection-input input', function (e) {
    var dataValue = $(this).val();
    $(this).attr('data-value', dataValue)
});

/*check if numeric*/
function checkIfNumeric(item) {
    if ($.isNumeric($(item).val())) {
        $(item).removeClass("not-valid");
        return true;

    } else {
        $(item).addClass("not-valid")
        return false;
    }
}
/*check if numeric end*/
/*Summary*/

$(document).on("click", ".slider-img-conf img, .config-image-list img", function () {

    var dataValue = $(this).closest('.select-image-container').find('input').attr('data-value');
    var fieldName = $(this).closest('.select-image-container').find('input').attr('field-name');
    $('.selected-image-length').removeClass('selected-image-length');
    $(this).closest('.select-image-container').addClass('selected-image-length');
    var descr = "Pattern";

    if (fieldName == "cDeviceCode_c") {
        deviceCodeFilter(dataValue);
    }

    addToSummary(descr, dataValue, fieldName);
    $(this).closest('.config-selection-container').addClass("is-selected");
});

$('.config-selection-dropdown select').on('change', function (e) {
    var selectedDataValue = $(this).children("option:selected").attr('data-value');
    var selectedDescription = $(this).children("option:selected").text();
    var fieldName = $(this).children("option:selected").attr('field-name');

    addToSummary(selectedDescription, selectedDataValue, fieldName)
    $(this).closest('.config-selection-container').addClass("is-selected");
});


$(document).on('change', '.config-selection-input input, .config-selection-radio input, .config-selection-button input, .measurement-input', function (e) {
    changeValue(this);
});

function changeValue(item) {

    var dataValue = $(item).attr('data-value');
    var descr = $(item).attr('name');
    var fieldName = $(item).attr('field-name');
    var inchWhole = "";
    var inchDivedend = "";
    var inchDevisor = "";

    if ($(item).hasClass("numeric")) {

        var isvalid = checkIfNumeric(item);
        if (isvalid == true) {
            addToSummary(descr, dataValue, fieldName);
            $(item).closest('.config-selection-container').addClass("is-selected");
        }
    } else {
        if ($(item).hasClass('measurement-input')) {

            inchWhole = $(item).closest(".measurement-value-container").find('.inch-whole').val();
            inchDivedend = $(item).closest(".measurement-value-container").find('.inch-divedend').val();
            inchDevisor = $(item).closest(".measurement-value-container").find('.inch-devisor').val();

            //console.log("inchWhole: " + inchWhole + " inchDivedend: " + inchDivedend + " inchDevisor: " + inchDevisor);
        }
        addToSummary(descr, dataValue, fieldName, inchWhole, inchDivedend, inchDevisor);

        $(item).closest('.config-selection-container').addClass("is-selected");
    }
}

function validateReqiredFields(element) {

    var requiredFields = $(element).find('[required="required"]');

    $(requiredFields).each(function () {

        if ($(this).hasClass('config-selection-dropdown')) {
            validateRequiredDropDowns($(this))
        }

        if ($(this).hasClass('config-selection-radio')) {
            validateRequiredRadioButtons($(this))
        }

        if ($(this).hasClass('config-selection-image-slider')) {

            validateRequiredImages($(this))
        }

        if ($(this).hasClass('config-selection-input')) {
            validateRequiredTextFields($(this));
        }

        if ($(this).hasClass('config-selection-measurement-value')) {
            validateRequiredMeasureValues($(this));
        }
    });
}

function validateRequiredTextFields(element) {

    $(element).find('[required="required"]').each(function () {
        if ($(this).val() == "") {
            $(element).addClass("not-valid");
            $(this).addClass("not-valid");
        } else {
            $(element).removeClass("not-valid");
            $(this).removeClass("not-valid");
        }
    });

}

function validateRequiredDropDowns(element){
    if ($(element).find("option:selected").text() == "") {
        $(element).addClass("not-valid");
    } else {
        $(element).removeClass("not-valid");
    }
}

function validateRequiredRadioButtons(element){

    if ($(element).find('input').is(':checked')) {
        $(element).removeClass("not-valid");
    } else {
        $(element).addClass("not-valid");
    }

}

$(document).on("click", ".config-image-list a", function (e) {

    e.preventDefault();
    var items = $(this).children().clone();
    $(this).closest('.config-selection-container').find('.config-selected-image-container').empty();
    $(this).closest('.config-selection-container').find('.config-selected-image-container').append($(this).children('input').clone());
    $(this).closest('.config-selection-container').find('.config-selected-image-container').append("<img src=\"" + $(this).children('img').data('imageurl') + "\" class=\"img-responsive\" />");
});

function validateRequiredButtons(element){

}

function validateRequiredImages(element) {
//    console.log("imag", element);
    if ($(element).find('.config-selected-image-container input').length) {
  //      console.log("imag if");
        $(element).removeClass("not-valid");
    } else {
    //    console.log("imag else");
        $(element).addClass("not-valid");
    }
}

function addToSummary(description, datavalue, fieldname, inchWhole = "", inchDivedend = "", inchDevisor = "") {

    if (typeof datavalue !== "undefined" && typeof fieldname !== "undefined" && fieldname !== "") {
        //filter away old
        selectedData = selectedData.filter(f => f.name != fieldname);
        var summaryObj = { name: fieldname, datavalue: datavalue, description: description, inchWhole: inchWhole, inchDivedend: inchDivedend, inchDevisor: inchDevisor };
        selectedData.push(summaryObj);
        //console.log(" selectedData: ", selectedData);
        $('.summary-container .' + fieldname).remove();
        $('.summary-container').append("<p class=" + fieldname + "><span>" + description + " | </span> <span>" + datavalue + " | </span> <span>" + fieldname + " </span></p>");
    }
}

function sedDefaultCheckBox() {
    var selectedCheckBoxes = $(".tab-content").find("input:checked");
    $(selectedCheckBoxes).each(function () {
        changeValue(this);
    });
}

function saveConfiguration() {

    if (localStorage.getItem("dienen-configs")) {
        addToLocalStorage();
    } else {
        var dienenConfigs = [];
        var configsSerialized = JSON.stringify(dienenConfigs);
        localStorage.setItem("dienen-configs", configsSerialized);
        addToLocalStorage();
    }
}

function addToLocalStorage() {
    if (isSavedConfig) {
        addToSavedConfig();
        return;
    }
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

    var configName = "";
    var configId = Math.random();
    var configUrl = window.location.href.split('?')[0];
    var coinfigCreateDate = twoDigitMonth + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();

    $.each(selectedData, function (i, item) {
        if (item.name == "LastNamePID_c") {
            configName = item.datavalue;
        }
    });

    var configObj = {
        configName: configName,
        configId: configId,
        configUrl: configUrl,
        configCreateDate: coinfigCreateDate,
        configValueData: []
    };

    configObj.configValueData.push(selectedData);

    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

    dienenConfigs.push(configObj);
    var configsSerialized = JSON.stringify(dienenConfigs);
    localStorage.setItem("dienen-configs", configsSerialized);

    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

    populateSelector();
    alert("Configuration " + configName + " is saved");
    window.location.href = "/";
}

function addToSavedConfig() {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var configId = urlParams.get('configId')
    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));
    var configName;

    $.each(dienenConfigs, function (i, item) {
        if (item.configId == configId) {
            configName = item.configName;
            item.configValueData = [];
            item.configValueData.push(selectedData);
        }
    });

    var configsSerialized = JSON.stringify(dienenConfigs);
    localStorage.setItem("dienen-configs", configsSerialized);

    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

    alert("Configuration " + configName + " is saved");
    window.location.href = "/";
}


function populateFieldsFromSaveConfig() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    var configId = urlParams.get('configId')
    var configName = urlParams.get('configName')

    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

    $.each(dienenConfigs, function (i, item) {
        if (item.configId == configId) {

            //console.log("item: ", item.configValueData)
            $.each(item.configValueData[0], function (a, itemdata) {

                var inputType = $('[field-name="' + itemdata.name + '"]').attr('type');

                if (inputType = "radio" && $('[field-name="' + itemdata.name + '"]').closest('.config-selection-container.config-selection-dropdown option ').length > 1) {
                    inputType = "dropdown";
                } else {
                    inputType = $('[field-name="' + itemdata.name + '"]').attr('type');
                }
                console.log("ITEM: " + itemdata.name + " inputType: " + inputType);

                if (inputType == "radio") {
                    //console.log("inputType: " + inputType)
                    $('[field-name="' + itemdata.name + '"]' + '[data-value="' + itemdata.datavalue + '"]').click();
                    $('[field-name="' + itemdata.name + '"]' + '[data-value="' + itemdata.datavalue + '"]').trigger("change");
                }

                if (inputType == "text" || inputType == "number") {
                    $('[field-name="' + itemdata.name + '"]').val(itemdata.datavalue);
                    $('[field-name="' + itemdata.name + '"]').trigger("change");
                }

                if (inputType == "checkbox") {
                    if (itemdata.datavalue == "true") {
                        $('[field-name="' + itemdata.name + '"]' + '[value="' + itemdata.description + '"]').click();
                    }
                }

                if (inputType == "image") {
                    console.log("inputType: " + inputType + " fieldName: " + itemdata.name + " description: " + itemdata.description + " value: " + itemdata.datavalue);
                    $('[field-name="' + itemdata.name + '"]' + '[data-value="' + itemdata.datavalue + '"]').closest('.select-image-container').find('img').click();
                }

                if (inputType == "dropdown") {
                    //console.log("inputType: " + inputType + " fieldName: " + itemdata.name + " description: " + itemdata.description + " value: " + itemdata.datavalue);
                    $('[field-name="' + itemdata.name + '"]' + '[data-value="' + itemdata.datavalue + '"]').attr("selected", "selected")
                    $('[field-name="' + itemdata.name + '"]' + '[data-value="' + itemdata.datavalue + '"]').closest('select').val(itemdata.description).change();
                }

                if (inputType == "textArea") {
                    $('[field-name="' + itemdata.name + '"]').val(itemdata.datavalue);
                    addNotesToConfig();
                }

                if (inputType == "measurement") {
                    $('[field-name="' + itemdata.name + '"]').closest('.measurement-value-container').find('.inch-whole').val(itemdata.inchWhole);
                    $('[field-name="' + itemdata.name + '"]').closest('.measurement-value-container').find('.inch-divedend').val(itemdata.inchDivedend);
                    $('[field-name="' + itemdata.name + '"]').closest('.measurement-value-container').find('.inch-devisor').val(itemdata.inchDevisor);
                }
            });
        }
    });
}

function populateSelector() {
    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));
    if (dienenConfigs) {
        $('#configSelector option').remove();
        $('#configSelector').append('<option></option>');
        $.each(dienenConfigs, function (i, item) {

            $('#configSelector').append('<option config-id="' + item.configId + '" config-url="' + item.configUrl + '" value="' + item.configName + '">' + item.configName + " " + item.configCreateDate + '</option>');
        });

        $('#deleteConfigSelector option').remove();
        $('#deleteConfigSelector').append('<option></option>');
        $.each(dienenConfigs, function (i, item) {
            $('#deleteConfigSelector').append('<option config-id="' + item.configId + '" config-url="' + item.configUrl + '" value="' + item.configName + '">' + item.configName + " " + item.configCreateDate + '</option>');
        });
    }
}

function deleteSavedConfig(configIdParam = "") {

    var configId;

    if (configIdParam == "") {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        configId = urlParams.get('configId')
    } else {
        configId = configIdParam;
    }

    console.log("ID: " + configId);

    var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

    $.each(dienenConfigs, function (i, item) {
        if (item.configId == configId) {
            delete dienenConfigs[i]
        }
    });

    var newConfigList = [];

    dienenConfigs.map((elem) => {
        if (elem !== '') {
            newConfigList.push(elem);
        }
    });

    var configsSerialized = JSON.stringify(newConfigList);
    localStorage.setItem("dienen-configs", configsSerialized);

    populateSelector();
}

$('#deleteConfigSelector').on('change', function (e) {
    var selectedConfig = $(this).children("option:selected");
    if (confirm("Delete configuration: " + selectedConfig.val())) {

        var configId = selectedConfig.attr("config-id");

        deleteSavedConfig(configId);
        populateSelector();
        console.log("ID: " + configId);

        alert(selectedConfig.val() + " is deleted");
    }
});

function addNotesToConfig() {
    var internalText = $('#internalNoteText').val();
    var orderNoteText = $('#noteText').val();

    $('#internalNoteText').attr("data-value", internalText);
    $('#noteText').attr("data-value", orderNoteText);
    changeValue($('#internalNoteText'));
    changeValue($('#noteText'));

}

$(document).ready(function () {
    if (isSavedConfig) {
        populateFieldsFromSaveConfig();
        $('.measurement-value-container').find('.inch-whole').trigger('change');
        $('.measurement-value-container').find('.inch-divedend').trigger('change');
        $('.measurement-value-container').find('.inch-devisor').trigger('change');
    } else {
        sedDefaultCheckBox();
    }
});

$("#internalNoteText, #noteText").on('change keyup paste', function () {
    addNotesToConfig() // your code here
});