$(document).ready(function () {
    $SvForms = $("[class*='SvForm']");
    $SvForms.attr("SvIsValidated", false);

    for (var i = 0; i < $SvForms.length; i++) {

        $($SvForms[i]).attr("maxlength", $($SvForms[i]).attr("SvMaxlen"));

        //if ($($SvForms[i]).is("textarea")) {
        //    $($SvForms[i]).removeAttr("maxlength");
        //    $($SvForms[i]).attr("data-limit", $($SvForms[i]).attr("SvMaxlen"));
        //}

        if ($($SvForms[i]).attr("id")) {

        }
        else {
            $($SvForms[i]).attr("id", guid());
        }
    }

    /// Events

    $(".SvText").on("keyup", function () {
        Text(this, false);
    });

    $(".SvNumber").on("keyup", function () {
        Number(this, false);
    });

    $(".SvEmail").on("keyup", function () {
        Email(this, false);
    });

    $(".SvMobile").on("keyup", function () {
        Mobile(this, false);
    });

    $(".SvSelect").on("change focus", function () {
        Select(this);
    });

    $(".SvRegex").on("keyup", function () {
        Regex(this, false);
    });

    $(".SvAlphaNumeric").on("keyup", function () {
        AlphaNumeric(this, false);
    });

    $(".SvAnything").on("keyup", function () {
        Anything(this, false);
    });


    $(".SvRange").on("keyup", function () {
        Range(this, false);
    });



    $(".SvValidate").click(function () {
        var currentbtn = this;


        var names = $(this).attr("class").match(/[\w-]*SvForm[\w-]*/g)
        $('.' + names).not('.SvValidate').each(function (e, elm) {



            if ($(elm).hasClass("SvText")) {
                Text(elm, true);
            }

            if ($(elm).hasClass("SvNumber")) {
                Number(elm, true);
            }

            if ($(elm).hasClass("SvEmail")) {
                Email(elm, true);
            }

            if ($(elm).hasClass("SvMobile")) {
                Mobile(elm, true);
            }

            if ($(elm).hasClass("SvSelect")) {
                Select(elm);
            }

            if ($(elm).hasClass("SvRegex")) {
                Regex(elm, true);
            }


            if ($(elm).hasClass("SvAlphaNumeric")) {
                AlphaNumeric(elm, true);
            }

            if ($(elm).hasClass("SvAnything")) {
                Anything(elm, true);
            }

            if ($(elm).hasClass("SvRange")) {
                Range(elm, true);
            }

        });


        $('.' + names).not('.SvValidate').each(function (e, elm) {


            if ($(elm).attr("svisvalidated") === 'false') {
                $(currentbtn).attr("svisvalidated", false);
                return false;
            }
            else {
                $(currentbtn).attr("svisvalidated", true);
            }
        });

        if ($(currentbtn).attr("svisvalidated") === 'false') {
            return false;
        }

    });




    /// Functions

    function Text(e, IsSubmit) {

        var regex = '^[a-zA-Z ]*$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }
    }

    function Number(e, IsSubmit) {

        var regex = '^[0-9]*$';

        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }

    }

    function Email(e, IsSubmit) {
        var regex = '^([A-Za-z0-9_\\-\\.])+\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})*$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }

    }

    function Mobile(e, IsSubmit) {
        var regex = '^[789]\\d{9}$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }

    }

    function Select(e) {

        if ($(e).prop('selectedIndex') === 0) {
            GetErrorSpan(e);
            return false;
        }
        else {
            RemoveSpan(e);
            return true;
        }

    }


    function Regex(e, IsSubmit) {
        var regex = $(e).attr("svregex");
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }

    }


    function AlphaNumeric(e, IsSubmit) {

        var regex = '^[a-zA-Z0-9]*$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }
    }

    function Anything(e, IsSubmit) {
        var regex = '$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }
    }

    function Range(e, IsSubmit) {
        debugger;
        var range = $(e).attr("svranges");
        var regex = '^[' + range + '][0\-9]?$';
        if (IsSubmit) {
            FromSubmit(e, regex);
        }
        else {
            FromEvent(e, regex);
        }
    }


    /// Function to check Minimum Length given by attribute SvMinLen
    function CheckMinLength(e) {

        var MinLen = $(e).attr("SvMinlen");
        if (MinLen != '0') {
            if (MinLen > $(e).val().length) {
                return false;
            }
            else {
                return true;
            }
        }

    }


    function GetErrorSpan(e) {

        var ErrorSpan = "<span  id='sverrormessage_" + $(e).attr('id') + "'>|*Message*|</span><i id='sverrorspan_" + $(e).attr('id') + "' class='arrow-down'>";
        $("#sverrormessage_" + $(e).attr('id') + "").remove();
        $("#sverrorspan_" + $(e).attr('id') + "").remove();
        ErrorSpan = ErrorSpan.replace("|*Message*|", $(e).attr("svmessage"));
        $(ErrorSpan).insertAfter(e);
        $("#sverrormessage_" + $(e).attr('id') + "").addClass("SvInvalid");
        $(e).attr("SvIsValidated", false);
        return false;
    }


    function MinLenghtErrorSpan(e) {
        var MinLength = $(e).attr("svminlen");
        var msg = MinLength - $(e).val().length + ' more characters';
        var ErrorSpan = "<span  id='sverrormessage_" + $(e).attr('id') + "'>" + msg + "</span><i id='sverrorspan_" + $(e).attr('id') + "' class='arrow-down'>";
        $("#sverrormessage_" + $(e).attr('id') + "").remove();
        $("#sverrorspan_" + $(e).attr('id') + "").remove();
        $(ErrorSpan).insertAfter(e);
        $("#sverrormessage_" + $(e).attr('id') + "").addClass("SvInvalid");
        $(e).attr("SvIsValidated", false);
        return false;

    }

    function RemoveSpan(e) {
        $(e).attr("SvIsValidated", true);
        $("#sverrorspan_" + $(e).attr('id') + "").remove();
        $("#sverrormessage_" + $(e).attr('id') + "").remove();
    }


    function IsTextArea() {

        if ($($SvForms[i]).is("textarea")) {
            return true;
        }
        else {
            return false;
        }
    }



    function FromSubmit(e, regex) {
        var isLenValidated;

        var value = $(e).val()

        if ($(e).val() == "") {
            var isValid = GetErrorSpan(e);

            if (isValid) {
                if ($(e).attr("svminlen")) {
                    isLenValidated = CheckMinLength(e);
                    if (isLenValidated === false) {
                        MinLenghtErrorSpan(e);
                        return false;
                    }
                }
            }

        }
        else {

            if ($(e).is("textarea")) {
                value = $(e).val().replace('\n', '');
            }

            if ($(e).attr("svminlen")) {
                isLenValidated = CheckMinLength(e);
                if (isLenValidated === false) {
                    MinLenghtErrorSpan(e);
                    return false;
                }
            }

            var textRegex = new RegExp(regex);
            if (textRegex.test(value) === false) {
                GetErrorSpan(e);
            }
            else {
                RemoveSpan(e);
            }
        }
    }


    function FromEvent(e, regex) {
        var value = $(e).val();
        var isLenValidated;




        if ($(e).val() == "") {
            GetErrorSpan(e);



        }
        else {

            if ($(e).attr("svminlen")) {
                isLenValidated = CheckMinLength(e);
                if (isLenValidated === false) {
                    MinLenghtErrorSpan(e);
                    return false;
                }
            }

            if ($(e).is("textarea")) {
                value = $(e).val().replace('\n', '');
            }

            var textRegex = new RegExp(regex);
            if (textRegex.test(value) === false) {
                GetErrorSpan(e);
            }
            else {
                RemoveSpan(e);
            }
        }
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});