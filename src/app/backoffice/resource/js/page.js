/**
 * ============================================================================
 * 공통함수
 *
 * @author		<A Href="mailto:ssh@duzon.com</A>
 * @version		1.0
 * @since		1.0
 *
 * History
 * 1.0	2015. 4. 6.	신승현	Initial Version
 * ============================================================================
 */
// <![CDATA[

$(document).ready(function() {
    // add favicon
    var css = document.createElement("link");
    css.setAttribute("rel", "shortcut icon");
    css.setAttribute("type", "image/x-icon");
    css.setAttribute("href", "/images/common/favicon.ico");
    document.getElementsByTagName("head")[0].appendChild(css);

    //ajax 요청시 완료후에도 마우스 wait 상태 강제변경
    $('body').mousemove(function (e) {
        $('body').css('cursor', 'default');
    });

    // readonly input에서 backspace 뒤로가기 막기
    $(':input[readonly]').keydown(function(e){
        if (e.which == 8)
            return false;
    });

    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
    }

});

//========================================================//
// validator
// 값 확인 관련 Function Object
//========================================================//
var Validate = {
    isSimpleIP: function(ip) {
        //ipRegExp = /^(([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+)\.([0-2]*[0-9]+[0-9]+))$/;
        var ipRegExp = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
        return ipRegExp.test(ip);
    },
    isAlphaLatin : function(string){
        var alphaRegExp = /^[0-9a-z]+$/i;
        return alphaRegExp.test(string);
    },
    isNotEmpty : function(string){
        if (string == 'undefined' || typeof string == 'undefined' || typeof string == undefined)
            return false;
        return /\S/.test(string);
    },
    isEmpty : function(string){
        if (string == 'undefined' || typeof string == 'undefined' || typeof string == undefined)
            return true;
        return !/\S/.test(string);
    },
    checkEmpty: function(data) {
        if (data === null) {
            return true;
        }
        if (data === undefined) {
            return true;
        }
        if (typeof data === 'string' && data.trim() === '') {
            return true;
        }
        if (typeof data === "object" && !Object.keys(data).length) {
            return true;
        }
        return false
    },
    isIntegerInRange : function(n, Nmin, Nmax){
        var num = Number(n);
        if (isNaN(num)) {
            return false;
        }
        if (num != Math.round(num)) {
            return false;
        }
        return (num >= Nmin && num <= Nmax);
    },
    isNum : function(number){
        var numRegExp = /^[0-9]+$/;
        return numRegExp.test(number);
    },
    isEMailAddr : function(string){

        if (Validate.isEmpty(string)) {
            return true;
        }
        var emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;
        return emailRegExp.test(string);
    },
    isZipCode : function(zipcode){
        //    zpcRegExp = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
        return true;
    },
    isDate : function(date, format){
        return true;
    },
    isURL : function(string){
        if (!string)
            return false;
        string = string.toLowerCase();
        var urlRegExp = /^(((ht|f)tp(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
        return urlRegExp.test(string);
    },
    isSSN : function(number){
        if (!number)
            return false;
        var ssnRegExp = /^\d{6}-\d{7}$/;
        return ssnRegExp.test(number);
    },
    isDecimal : function(number){
        if (!number)
            return false;
        var decimalRegExp = /^-?(0|[1-9]{1}\d{0,})(\.(\d{1}\d{0,}))?$/;
        return decimalRegExp.test(number);
    }
};

//========================================================//
// ajax
// ajax 호출 관련 Function Object
//========================================================//
var Ajax = {
    /**
     * ajax로 호출하여 데이터를 처리한다.
     * data형식 object(json형태)
     * @param callurl : 서비스 호출 주소
     * @param obj : 서비스 입력 json object
     * @param callback : callback function
     */
    ajax: function (callurl, obj, callback, options ) {

        var defaults = {
            type : "POST",
            dataType: "json",
            async: true,
            timeout: 180000,
            block: true
        };

        if (options || options == undefined ) {
            options = $.extend(defaults, options);
        }

        /*
        var data;
        var jsonobj = {};
        jsonobj['json'] = JSON.stringify(obj);
        data = jsonobj;
        */
        $.ajax({
            url : callurl,
            type : options.type,
            data : obj,
            dataType : options.dataType,
            async : options.async,
            success	: function(data, textStatus) {
                if (options.block)
                    $.unblockUI();
            },
            error : function(xhr, textStatus, errorThrown) {
                if (options.block)
                    $.unblockUI();
                if (xhr.status == 12002){
                    //alert("TimeOut");
                    Dcloud.log("TimeOut");
                } else {
                    //alert(errorThrown);
                    Dcloud.log(errorThrown);
                }

            },
            complete : function(xhr, textStatus) {
                if (options.block)
                    $.unblockUI();
                //ajax 요청시 완료후에도 마우스 wait 상태 강제변경
                $('body').trigger("mousemove");
                // 세션이 없을경우 로그인 페이지 이동
                if (xhr.responseJSON != undefined && xhr.responseJSON.resultCode == "9001"){

                    var msg = "<p>세션이 만료되었습니다. 다시 로그인 하시기 바랍니다.</p>";
                    dcloudConfirm.alert(msg, function(){
                        location.href = "/login/login.do";
                    }, {
                        ok: "확인"
                    });

//	        		location.href = "/login/login.do";
                    return;
                }

                if (options.dataType == "html" || options.dataType == "HTML"){
                    //eval(callback+'(xhr, textStatus)');
                    callback(xhr, textStatus);
                } else
                    callback(xhr, textStatus);
            },
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("AUTH_PM_A_TOKEN"));
                if (options.block){
                    $.blockUI({
                        message: '<img src="/resource/images/loading_wehago.gif" alt="loding">',
                        overlayCSS:{
                            backgroundColor: '#000000',
                            opacity: 0.01
                        },
                        css:{
                            backgroundColor: 'rgba(255,255,255,0)',
                            width: '180px',
                            left: '42%',
                            border: '#629CD8 solid 0px'
                        },
                        fadeIn:  0,
                        fadeOut: 0
                    });
                }
            },
            timeout		: options.timeout
            // 기타 ajax 옵션
            //async : false,
            //cache : false,
            //contentType	: "application/x-www-form-urlencoded",
            //global		: true,
            //ifModified	: true,
            //processData : true,
            //timeout		: 3000
        });
    },
    /**
     * DCloudClientAgent 호출
     * data형식 object(json형태)
     * @param callurl : 서비스 호출 주소
     * @param obj : 서비스 입력 json object
     * @param callback : callback function
     */
    excelDownload: function (callurl, obj, callback, options ) {
        var isWehagoVLog = options && options.is_log_v ? options.is_log_v : $("#divContents").data("is_excel_log_v");
        if (isWehagoVLog === 'T') {
            ExcelDownloadDialog.openWehagov(function (e) {
                if (e) {
                    obj['reason'] = e;
                    Ajax.excelDownloadPassword(callurl, obj, callback, options);
                }
            }, options.excel_count);
        } else {
            Ajax.excelDownloadPassword(callurl, obj, callback, options);
        }
    },
    excelDownloadPassword: function (callurl, obj, callback, options ) {
        var isPassword = options && options.is_password ? options.is_password : $("#divContents").data("is_excel_password");
        var msg = "<p>엑셀 다운로드에 사용할 비밀번호를 입력하세요.</p>";
        if (isPassword === 'T') {
            dcloudConfirm.promptpw(msg, function(e1){
                if (e1){
                    obj["is_password"] = 'T';
                    obj["excel_pw"] = e1;
                    var hash_key = $.cookie("wehago_s");

                    Ajax.callExcelDownload(callurl, obj, callback, options);
                }
            }, {
                ok: "확인",
                cancel: "취소"
            });
        } else {
            Ajax.callExcelDownload(callurl, obj, callback, options);
        }
    },
    /**
     * DCloudClientAgent 호출
     * data형식 object(json형태)
     * @param callurl : 서비스 호출 주소
     * @param obj : 서비스 입력 json object
     * @param callback : callback function
     */
    callExcelDownload: function (callurl, obj, callback, options ) {
        var defaults = {
            block: true
        };

        if (options || options == undefined ) {
            options = $.extend(defaults, options);
        }

        var param = "";
        var argcount = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (argcount++) {
                    param += '&';
                }
                param += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
            }
        }

        if (options.block){
            $.blockUI({
                message: '<img src="/resource/images/loading_wehago.gif" alt="loding">',
                overlayCSS:{
                    backgroundColor: '#000000',
                    opacity: 0.01
                },
                css:{
                    backgroundColor: 'rgba(255,255,255,0)',
                    width: '180px',
                    left: '42%',
                    border: '#629CD8 solid 0px'
                },
                fadeIn:  0,
                fadeOut: 0
            });
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', callurl, true);
        xhr.responseType = 'blob';
        /*
        $.each(SERVER.authorization(), function(k, v) {
            xhr.setRequestHeader(k, v);
        });
        */
        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("AUTH_PM_A_TOKEN"));
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        xhr.onload = function(e) {
            if (options.block)
                $.unblockUI();

            if (this.status == 200) {
                // 리턴타입이 바이너리형태라 에러메세지 처리방법이 마땅치 않음
                if (xhr.response.type == "text/html"){
                    alert("엑셀 생성중 오류가 발생했습니다.(" + this.status + ")");
                    callback(xhr, this.response);
                    return;
                }

                var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = downloadUrl;
                a.download = obj.output;
                document.body.appendChild(a);
                a.click();
            } else {
                alert("엑셀 생성중 오류가 발생했습니다.(" + this.status + ")")
            }

            callback(xhr, this.response);
        };
        xhr.onerror = function(e) {
            alert("엑셀 출력중 오류가 발생했습니다.(error)");
        }
        xhr.send(param);
    },
    /**
     * DCloudClientAgent 호출
     * data형식 object(json형태)
     * @param callurl : 서비스 호출 주소
     * @param obj : 서비스 입력 json object
     * @param callback : callback function
     */
    DCloudClientAgent: function (obj, callback, options ) {

        var defaults = {
            type : "GET", //"POST",
            dataType: "jsonp",
            async: true,
            timeout: 10000, //3000,
            block: true
        };

        if (options || options == undefined ) {
            options = $.extend(defaults, options);
        }

        var dataObj;
        if (obj == null)
            dataObj = null;
        else {
            dataObj = {
                site: "PE",
                //site: location.hostname,
                //value: JSON.stringify(obj)
                //value: DcloudAes.encode(JSON.stringify(obj))
                //value: JSON.stringify(obj).replace(/:/g, "*")
                //value: DcloudAes.encode(JSON.stringify(obj).replace(/:/g, "*"))
                value: DcloudAes.encode(JSON.stringify(obj))
            };
        }
        console.log("== param: ",JSON.stringify(dataObj));
        console.log("== param: ",DcloudAes.encode(JSON.stringify(obj)));
        console.log("== param: ",DcloudAes.encode(dataObj));
        $.ajax({
            url : "http://localhost:8233/DCloudClientAgent?callback=?",
            type : options.type,
            data : dataObj,
            dataType : options.dataType,
            contentType: 'application/json; charset=utf-8',
            crossDomain: true,
            async : options.async,
            success	: function(data, textStatus) {
                if (options.block)
                    $.unblockUI();
            },
            error : function(xhr, textStatus, errorThrown) {
                if (options.block)
                    $.unblockUI();

                if (obj != null){
                    if (xhr.status == 12002){
                        //alert("TimeOut");
                        Dcloud.log("TimeOut");
                    } else {
                        //alert(errorThrown);
                        Dcloud.log(errorThrown);
                    }
                }
            },
            complete : function(xhr, textStatus) {
                if (options.block)
                    $.unblockUI();
                //ajax 요청시 완료후에도 마우스 wait 상태 강제변경
                $('body').trigger("mousemove");
                if (options.dataType == "html" || options.dataType == "HTML"){
                    //eval(callback+'(xhr, textStatus)');
                    callback(xhr, textStatus);
                } else
                    callback(xhr, textStatus);
            },
            beforeSend : function(xhr) {
                if (options.block){
                    $.blockUI({
                        message: '<img src="/resource/images/loading_wehago.gif" alt="loding">',
                        overlayCSS:{
                            backgroundColor: '#000000',
                            opacity: 0.01
                        },
                        css:{
                            backgroundColor: 'rgba(255,255,255,0)',
                            width: '180px',
                            left: '42%',
                            border: '#629CD8 solid 0px'
                        },
                        fadeIn:  0,
                        fadeOut: 0
                    });
                }
            },
            timeout		: options.timeout
        });
    }

};


//========================================================//
// format
// format 관련 Function Object
//========================================================//
var Format = {
    //날짜형 change
    //날짜포멧 정의 ( yyyy-MM-dd )
    date: function(date, fmt) {
        var format = "yyyy-MM-dd";
        if ( fmt != null ) format = fmt;

        var nDate = date.replace(/\/|\-/g, "");
        var nFormat = format.replace(/\/|\-/g, "");

        if (nDate.length != nFormat.length) return "";

        var yS = nFormat.indexOf("y");
        var mS = nFormat.indexOf("M");
        var dS = nFormat.indexOf("d");

        var year = nDate.substr(yS, 4);
        var month = nDate.substr(mS, 2);
        var day = nDate.substr(dS, 2);

        // 날짜가 넘어갈경우 마지막 날짜처리
        if (month > 12) month = 12;
        if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12" )
        {
            if (day > 31) day = 31;
        } else {
            if (day > 30) day = 30;
        }

        format = format.replace("yyyy", year);
        format = format.replace("MM", month);
        format = format.replace("dd", day);

        return format;
    },
    //날짜형 change
    //날짜포멧 정의 ( yyyy-MM-dd )
    getDateStr: function(date, fmt) {
        var format = "yyyy-MM-dd";
        if ( fmt != null ) format = fmt;

        var nDate = date.replace(/\/|\-/g, "");
        var nFormat = format.replace(/\/|\-/g, "");

        if (nDate.length != nFormat.length) return "";

        var yS = nFormat.indexOf("y");
        var mS = nFormat.indexOf("M");
        var dS = nFormat.indexOf("d");

        var year = nDate.substr(yS, 4);
        var month = nDate.substr(mS, 2);
        var day = nDate.substr(dS, 2);

        // 날짜가 넘어갈경우 마지막 날짜처리
        if (month > 12) month = 12;
        if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12" )
        {
            if (day > 31) day = 31;
        } else {
            if (day > 30) day = 30;
        }

        format = format.replace("yyyy", year);
        format = format.replace("MM", month);
        format = format.replace("dd", day);

        return format;
    },
    //금액 change
    decimal: function(number, decimals, dec_point, thousands_sep) {
        if (!number && number !== 0) return "";
        //number = number.replace(",","");
        number = '' + number;
        number = number.replace(/,/g,"");

        if (0 < number.indexOf(".")) {
            if (3 >= number.substr(0, number.indexOf(".")).length) return number.substr(0, number.indexOf(".")+1) + StringUtil.rPad(number.substr(number.indexOf(".")+1), "0", decimals, true);
        } else {
            if (3 >= number.length){
                if (decimals == 0){
                    return StringUtil.rPad(number, "0", decimals);
                } else {
                }
            }
        }

        dec_point = ".";
        thousands_sep = ",";
        var n = number, prec = decimals, dec = dec_point, sep = thousands_sep;
        n = !isFinite(+n) ? 0 : +n;
        prec = !isFinite(+prec) ? 0 : Math.abs(prec);
        sep = sep == undefined ? ',' : sep;

        var s = n.toFixed(prec),
            abs = Math.abs(n).toFixed(prec),
            _, i;

        if (abs >= 1000) {
            _ = abs.split(/\D/);
            i = _[0].length % 3 || 3;

            _[0] = s.slice(0,i + (n < 0)) +
                _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

            s = _.join(dec || '.');
        } else {
            s = abs.replace('.', dec_point);
        }
        return s;
    },
    //숫자형 change
    number: function(number) {
        return Format.decimal('' + number);
    },
    /**
     * 연락처 change
     * @author 김범진A
     * @param number
     * @returns {*|string|*}
     */
    contactNumber: function(number) {
        if(!number && number !== 0) return '';
        if(('' + number).length < 9) return number;

        number = '' + number;

        var oriNum = number;
        var mobileNumArr = ['010','011','016','017','019'];
        var normalNumArr = ['02','031','032','033','041','043','042','044','051','052','053','054','055','061','062','063','064','070'];

        // 숫자 이외에는 다 삭제
        number = number.replace(/\D/g, "");

        var threeFrontNumber = number.substr(0, 3);
        var twoFrontNumber = number.substr(0, 2);

        // 모바일 넘버일 경우
        if(mobileNumArr.indexOf(threeFrontNumber) !== -1) { //01048441054
            if(threeFrontNumber === '010') {
                return number.substr(0, 3) + '-' +  number.substr(3, 4) + '-' + number.substr(7);
            }
            else {
                if(number.length === 10) {
                    return number.substr(0, 3) + '-' +  number.substr(3, 3) + '-' + number.substr(6);
                }
                else if(number.length === 11) {
                    return number.substr(0, 3) + '-' +  number.substr(3, 4) + '-' + number.substr(7);
                }
            }
        }
        else if(normalNumArr.indexOf(twoFrontNumber) !== -1) {
            // 02 353 1234   = 9
            // 02 3423 1234  = 10
            if(number.length === 9) {
                return number.substr(0, 2) + '-' +  number.substr(2, 3) + '-' + number.substr(5);
            }
            else if(number.length === 10) {
                return number.substr(0, 2) + '-' +  number.substr(2, 4) + '-' + number.substr(6);
            }
        }
        else if(normalNumArr.indexOf(threeFrontNumber) !== -1) {
            if(number.length === 10) {
                return number.substr(0, 3) + '-' +  number.substr(3, 3) + '-' + number.substr(6);
            }
            else if(number.length === 11) {
                return number.substr(0, 3) + '-' +  number.substr(3, 4) + '-' + number.substr(7);
            }
        }

        return oriNum;
    },
    //날짜 포멧 자동셋팅
    setDateType: function(date) {
        if (typeof(date) == "object")
        {
            if ( location.pathname.indexOf("/portal") > -1 || location.pathname.indexOf("/storage") > -1){
                date.datepicker({
                    buttonImage:"/jquery/jquery-ui-1.9.1.custom/images/ic_date.png",
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                }).next(".ui-datepicker-trigger").addClass("btn_date").addClass("mgl4");

            } else

                date.datepicker({
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                });

            date.change(function() {
                $(this).val(Format.date($(this).val()));
            });
        }
        else if (typeof(date) == "string")
        {
            var sdate = "#" + date.replace(/#/g, "");
            if ( location.pathname.indexOf("/portal") > -1 || location.pathname.indexOf("/storage") > -1)
                $(sdate).datepicker({
                    buttonImage:"/jquery/jquery-ui-1.9.1.custom/images/ic_date.png",
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                }).next(".ui-datepicker-trigger").addClass("btn_date").addClass("mgl4");
            else
                $(sdate).datepicker({
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                });

            $(sdate).change(function() {
                $(this).val(Format.date($(this).val()));
            });
        }
    },
    setDateTypeYearRange: function(date, yearRange) {
        if (typeof(date) == "object")
        {
            if ( location.pathname.indexOf("/portal") > -1 || location.pathname.indexOf("/storage") > -1){
                date.datepicker({
                    buttonImage:"/jquery/jquery-ui-1.9.1.custom/images/ic_date.png",
                    yearRange: yearRange,
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                }).next(".ui-datepicker-trigger").addClass("btn_date").addClass("mgl4");

            } else

                date.datepicker({
                    yearRange: yearRange,
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                });

            date.change(function() {
                $(this).val(Format.date($(this).val()));
            });
        }
        else if (typeof(date) == "string")
        {
            var sdate = "#" + date.replace(/#/g, "");
            if ( location.pathname.indexOf("/portal") > -1 || location.pathname.indexOf("/storage") > -1)
                $(sdate).datepicker({
                    yearRange: yearRange,
                    buttonImage:"/jquery/jquery-ui-1.9.1.custom/images/ic_date.png",
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                }).next(".ui-datepicker-trigger").addClass("btn_date").addClass("mgl4");
            else
                $(sdate).datepicker({
                    yearRange: yearRange,
                    beforeShowDay:function(date2){
                        if(date2.toString().indexOf('Sun ')!=-1) return [1,'red'];
                        else if(date2.toString().indexOf('Sat ')!=-1) return [1,'blue'];
                        else return [1];
                    }
                });

            $(sdate).change(function() {
                $(this).val(Format.date($(this).val()));
            });
        }
    },
    //월 포멧 자동셋팅
    setMonthType: function(month) {

        if (typeof(month) != "object"){
            month = "#" + month.replace(/#/g, "");
        }

        $(month).MonthPicker({ShowIcon: true, OnAfterChooseMonth: function(selectedDate){
                $(month).trigger("change");
            }});

        $(month).change(function() {
            $(this).val(Format.date($(this).val(), "yyyy-MM"));
        });

        /*
        if (typeof(month) == "object")
        {

            month.datepicker({
                dateFormat: "yy MM",
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                hideIfNoPrevNext: true,
                onChangeMonthYear: function(year , month , inst) {

                    setTimeout(function() {
                       $('.ui-datepicker-calendar').hide();
                    });
                    month = month;
                    year = year;
                    $(this).val(year+"-"+month);
                },

                onClose: function(dateText, inst) {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
                },

            }).focus(function () {
                $(".ui-datepicker-calendar").hide();
                $("#ui-datepicker-div").position({
                    my: "left top",
                    at: "center bottom",
                    of: $(this)
                });
            });

//			month.change(function() {
//				alert(1);
//				$("#monthTarget").text(year + "년" + (parseInt(month, 10)+1) + "월");
//				 $(this).val(year+"-"+(parseInt(month, 10)+1));
//				$(this).val(Format.date($(this).val(), "yyyy-MM"));

//			});
        }
        else if (typeof(month) == "string")
        {
            var sdate = "#" + month.replace(/#/g, "");

            $(sdate).datepicker({
                dateFormat: "yy MM",
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                onClose: function(dateText, inst) {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
                },

            }).focus(function () {
                $(".ui-datepicker-calendar").hide();
                $("#ui-datepicker-div").position({
                    my: "left top",
                    at: "center bottom",
                    of: $(this)
                });
            });

            $(sdate).change(function() {
                $(this).val(Format.date($(this).val(), "yyyy-MM"));
            });
        }
        */


    },
    //금액 포멧 자동셋팅
    setDecimalType: function(amt, decimals) {
        if (typeof(amt) == "object")
        {
            amt.change(function () {
                $(this).val(Format.decimal($(this).val(), decimals));
            });
        }
        else if (typeof(amt) == "string")
        {
            var samt = "#" + amt.replace(/#/g, "");

            $(samt).change(function () {
                $(this).val(Format.decimal($(this).val(), decimals));
            });
        }
    },
    //숫자 포멧 자동셋팅 , 찍어서
    setNumberType: function(amt) {
        if (typeof(amt) == "object")
        {
            amt.change(function () {
                var val = $(this).val().replace(/[^0-9]/gi, "");
                $(this).val(Format.number(val));
            });
        }
        else if (typeof(amt) == "string")
        {
            var samt = "#" + amt.replace(/#/g, "");
            $(samt).change(function () {
                var val = $(this).val().replace(/[^0-9]/gi, "");
                $(this).val(Format.number(val));
            });
        }
    },
    //숫자 포멧 자동셋팅 , 찍어서
    setNumberType2: function(amt) {
        if (typeof(amt) == "object")
        {
            amt.change(function () {
                var val = $(this).val().replace(/[^0-9]/gi, "");
                $(this).val(val);
            });
        }
        else if (typeof(amt) == "string")
        {
            var samt = "#" + amt.replace(/#/g, "");
            $(samt).change(function () {
                var val = $(this).val().replace(/[^0-9]/gi, "");
                $(this).val(val);
            });
        }
    },

    /**
     * 연락처 포멧 자동 세팅
     * @author 김범진A
     * @param amt
     */
    setContactType: function(amt) {
        var node;

        if(!amt) return;
        if(typeof amt !== 'object' && typeof amt !== 'string') return;

        if (typeof amt === 'object') {
            node = amt;
        }
        else if (typeof amt === 'string') {
            node = $("#" + amt.replace(/#/g, ""));
        }

        node.change(function () {
            $(this).val(Format.contactNumber($(this).val()));
        });
    },

    /**
     * 계좌번호 또는 신용카드 정보 반환
     * <br/>에러난 경우에는 null 반환.
     * @author 김범진A
     * @param {string} str 계좌번호
     * @param {string=} splitter 계좌번호 사이에 구분자로 들어갈 값. 기본값은 '-'
     * @return {*}
     */
    accountNo: function (str, splitter) {
        if(typeof str !== 'string')
            return null;

        str = str.replace(/\s/gi, "");

        if(!str)
            return null;

        if(str.length !== 12 && str.length !== 14 && str.length !== 16)
            return str;

        if(!splitter)
            splitter = '-';

        if(typeof splitter !== 'string')
            return null;

        var strResult = '';

        if(str.length === 12) {
            strResult = str.substr(0, 4);
            strResult += splitter;
            strResult += str.substr(4, 4);
            strResult += splitter;
            strResult += str.substr(8);
        }
        else if(str.length === 14) {
            strResult = str.substr(0, 2);
            strResult += splitter;
            strResult += str.substr(2, 4);
            strResult += splitter;
            strResult += str.substr(6, 4);
            strResult += splitter;
            strResult += str.substr(10);
        }
        else {
            strResult = str.substr(0, 4);
            strResult += splitter;
            strResult += str.substr(4, 4);
            strResult += splitter;
            strResult += str.substr(8, 4);
            strResult += splitter;
            strResult += str.substr(12);
        }

        return strResult;
    },
    /**
     * 법인등록번호 - 처리
     * @author 심서영
     * @param {string} str
     * @return {*}
     */
    businessRegNo: function (str) {
        str = str || "";

        var numStr = str.replace(/\D/igm, "");

        if(!numStr) return '';
        if(numStr.length < 13) return numStr;

        return numStr.replace(/^([\d]{4})(\d{2})(\d{6})(\d{1})$/, "$1-$2-$3-$4");
    },
    /**
     * 사업자등록번호 - 처리
     * @author 심서영
     * @param {string} str
     * @return {*}
     */
    companyRegNo: function (str) {
        str = str || "";

        var numStr = str.replace(/\D/igm, "");

        if(!numStr) return '';
        if(numStr.length < 10) return numStr;

        return numStr.replace(/^([\d]{3})(\d{2})(\d{5})$/, "$1-$2-$3");
    },
};

//========================================================//
// string
// string 관련 Function Object
//========================================================//
var StringUtil = {
    lPad: function(sOrgStr, sPaddingChar, iNum, fix) {
        if (sOrgStr == null || sPaddingChar == null || iNum == null) return "";

        var sReturn
        var sPaddingStr = "";

        for (var i=0; i < iNum; i++) {
            sPaddingStr += sPaddingChar;
        }

        if (fix) sReturn = (sPaddingStr + sOrgStr).substring((sPaddingStr + sOrgStr).length-iNum, (sPaddingStr + sOrgStr).length);
        else sReturn = (sPaddingStr + sOrgStr);

        return	sReturn;
    },
    rPad: function(sOrgStr, sPaddingChar, iNum, fix) {
        if (sOrgStr == null || sPaddingChar == null || iNum == null) return "";

        var sReturn
        var sPaddingStr = "";

        for (var i=0; i < iNum; i++) {
            sPaddingStr += sPaddingChar;
        }

        if (fix) sReturn = (sOrgStr + sPaddingStr).substring(0, iNum);
        else sReturn = (sOrgStr + sPaddingStr);

        return	sReturn;
    },
    fixNull: function(obj) {
        if (obj == null || obj == undefined)
            return "";
        else
            return obj;
    }
};

//========================================================//
// grid
// grid(jqgrid사용) 관련 Function Object
//========================================================//
var Grid = {

};

//========================================================//
// formatter
// 공통 formatter(jqgrid에서 사용) 관련 Function Object
//========================================================//
var Formatter = {
    /**
     * jqgrid 포멧 형식
     */
    // 날짜 포멧
    dateFormatter : function(cellvalue, options, rowObject) {
        if(cellvalue==null) return "";
        if(cellvalue.length == 8 || cellvalue.length == 14){
            var yyyy = String(cellvalue).substring(0, 4);
            var mm = String(cellvalue).substring(4, 6);
            var dd = String(cellvalue).substring(6, 8);
            return yyyy + "-" + mm + "-" + dd;
        } else if(0 <= cellvalue.length && cellvalue.length <= 10)
            return cellvalue;
        else
            return null; //return '&nbsp;';
    },
    dateUnFormatter : function(cellvalue, options) {
        if(cellvalue==null) return "";
        if(cellvalue.length == 10)
            return cellvalue.replace(/-/g, "");
        else if(0 <= cellvalue.length && cellvalue.length <= 10)
            return cellvalue;
        else
            return null;
    },
    // 사업자번호 포멧
    bizFormatter : function(cellvalue, options, rowObject) {
        if(cellvalue == null || cellvalue == "null") return "";
        if(cellvalue.length == 10){
            var biz1 = String(cellvalue).substring(0, 3);
            var biz2 = String(cellvalue).substring(3, 5);
            var biz3 = String(cellvalue).substring(5, 10);
            return biz1 + "-" + biz2 + "-" + biz3;
        } else if(0 <= cellvalue.length && cellvalue.length <= 12)
            return cellvalue;
        else
            return null; //return '&nbsp;';
    },
    bizUnFormatter : function (cellvalue, options, rowObject) {
        if(cellvalue.length == 12)
            return cellvalue.replace(/-/g, "");
        else if(0 <= cellvalue.length && cellvalue.length <= 12)
            return cellvalue;
        else
            return null;
    },
    // 주민번호 포멧
    personFormatter : function (cellvalue, options, rowObject) {
        if(cellvalue.length == 13){
            var person1 = String(cellvalue).substring(0, 6);
            var person2 = String(cellvalue).substring(6, 13);
            return person1 + "-" + person2;
        } else if(0 <= cellvalue.length && cellvalue.length <= 14)
            return cellvalue;
        else
            return null; //return '&nbsp;';
    },
    personUnFormatter : function (cellvalue, options, rowObject) {
        if(cellvalue.length == 14)
            return cellvalue.replace(/-/g, "");
        else if(0 <= cellvalue.length && cellvalue.length <= 14)
            return cellvalue;
        else
            return null;
    },
    // 우편번호
    zipFormatter : function (cellvalue, options, rowObject) {
        if(cellvalue.length == 6){
            var zip1 = String(cellvalue).substring(0, 3);
            var zip2 = String(cellvalue).substring(3, 6);
            return zip1 + "-" + zip2;
        } else if(0 <= cellvalue.length && cellvalue.length <= 7)
            return cellvalue;
        else
            return null;
    },
    zipUnFormatter : function (cellvalue, options, rowObject){
        if(cellvalue.length == 7)
            return cellvalue.replace(/-/g, "");
        else if(0 <= cellvalue.length && cellvalue.length <= 7)
            return cellvalue;
        else
            return null;
    }

};

//========================================================//
// date
// 날짜 및 시간 관련 Function Object
//========================================================//
var SysDate = {
    // 오늘날짜
    date: function() {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysDate' };
        $.ajax({
            async: false,
            url: "/data/date/selectSysDate.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 오늘날짜시간
    dateTime: function() {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysDateTime' };
        $.ajax({
            async: false,
            url: "/data/date/selectSysDateTime.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 현재월
    month: function() {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysMonth' };
        $.ajax({
            async: false,
            url: "/data/date/selectSysMonth.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 현재월 첫일
    firstDate: function() {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysFirstDate' };
        $.ajax({
            async: false,
            url: "/data/date/selectSysFirstDate.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 현재월 말일
    lastDate: function() {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysLastDate' };
        $.ajax({
            async: false,
            url: "/data/date/selectSysLastDate.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 날짜 더하기
    addDate: function(addday) {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysAddDate', addDay : addday };
        $.ajax({
            async: false,
            url: "/data/date/selectSysAddDate.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    /**
     * addMonth 만큼 오늘날짜에 월을 더해서 반환
     * @param addMonth
     * @returns {*}
     * @author 김범진A
     */
    addMonth: function(addMonth) {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysAddMonth', addMonth : addMonth };
        $.ajax({
            async: false,
            url: "/data/date/selectSysAddMonth.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    // 날짜 차이나는 일 수 계산
    gapDate: function(startDay, endDay) {
        var data;
        var jsonObj = { service : 'dateService', method : 'selectSysGapDate', startDay : startDay, endDay : endDay };
        $.ajax({
            async: false,
            url: "/data/date/selectSysGapDate.do",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.resultData;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    }

};

//========================================================//
// code
// 공통코드 관련 Function Object
//========================================================//
var Code = {
    combo: function(obj, type) {
        var data;
        var jsonObj = { service : 'commonService', method : 'selectCommonCodeCombo', CD_GRP : type };
        $.ajax({
            async: false,
            url: "action.dox",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                //data = xml.string;
                obj.html(xml.string);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    },
    factory: function(type) {
        var data;
        var jsonObj = { service : 'commonService', method : 'selectCommonCode', CD_GRP : type };
        $.ajax({
            async: false,
            url: "action.dox",
            data: jsonObj,
            type: "POST",
            success: function(xml) {
                data = xml.linkedHashMap;

            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
        return data;
    }
};

//========================================================//
//Dcloud Toast Message
//Toast 관련 Function Object
//========================================================//
var DcloudToast = {
    //성공 alert
    notice: function(text, title) {
        $.toast({
            heading: (title == null || title == undefined)?"":title,
            text: text,
            icon: 'confirm',
            hideAfter: 2000,
            stack: 5,
            position: 'mid-center',
            textAlign: 'center',
            beforeShow: function () {
                $(".jq-toast-wrap").append("<div id=\"dcloud_dimmed\" style=\"position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); \"></div>");
                // <div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); "></div>
            },
            beforeHide: function () {
                $("#dcloud_dimmed").remove();
            },
        });
    },
    alert: function(text, title) {
        $.toast({
            heading: (title == null || title == undefined)?"":title,
            text: text,
            icon: 'alert',
            hideAfter: 3000,
            stack: 5,
            position: 'mid-center',
            textAlign: 'center',
            beforeShow: function () {
                $(".jq-toast-wrap").append("<div id=\"dcloud_dimmed\" style=\"position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); \"></div>");
                // <div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); "></div>
            },
            beforeHide: function () {
                $("#dcloud_dimmed").remove();
            },
        });
    },
    error: function(text, title) {
        $.toast({
            heading: (title == null || title == undefined)?"":title,
            text: text,
            icon: 'error',
            hideAfter: 3000,
            stack: 5,
            position: 'mid-center',
            textAlign: 'center',
            beforeShow: function () {
                $(".jq-toast-wrap").append("<div id=\"dcloud_dimmed\" style=\"position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); \"></div>");
                // <div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); "></div>
            },
            beforeHide: function () {
                $("#dcloud_dimmed").remove();
            },
        });
    },
    question: function(text, title) {
        $.toast({
            heading: (title == null || title == undefined)?"":title,
            text: text,
            icon: 'question',
            hideAfter: 3000,
            stack: 5,
            position: 'mid-center',
            textAlign: 'center',
            beforeShow: function () {
                $(".jq-toast-wrap").append("<div id=\"dcloud_dimmed\" style=\"position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); \"></div>");
                // <div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100; opacity: 0.5; background-color: rgb(0, 0, 0); "></div>
            },
            beforeHide: function () {
                $("#dcloud_dimmed").remove();
            },
        });
    }
};

//========================================================//
//Dcloud Snackbar Message
//Snackbar 관련 Function Object
//========================================================//
var DcloudSnackbar = {
    //성공 alert
    success: function(text, timeout) {
        $.smackbar({
            message: text,
            timeout: timeout || 3000,
            type: "success",
        })
    },
    warning: function(text, timeout) {
        $.smackbar({
            message: text,
            timeout: timeout || 3000,
            type: "warning",
        })
    },
    error: function(text, timeout) {
        $.smackbar({
            message: text,
            timeout: timeout || 3000,
            type: "error",
        })
    },
    info: function(text, timeout) {
        $.smackbar({
            message: text,
            timeout: timeout || 3000,
            type: "info",
        })
    }
};

//========================================================//
//Dcloud 공통 component
//Toast 관련 Function Object
//========================================================//
var Dcloud = {
    companySelectBox: function(obj) {
        if (typeof(obj) == "string")
            var obj = $("#" + obj.replace(/#/g, ""));

        var select2Array = [];
//		$.ajax({
//			async: false,
//			url: "/data/business/getBusinessList.do",
//			data: {},
//			type: "POST",
//			success: function(xml) {
//				resultData = xml.resultData;
//				var list = resultData.businessList;
//
//				for (var i = 0; i < list.length; i++){
//					var item = {
//						id : list[i].BusinessConnectID,
//						text : list[i].BsnsName
//					};
//					select2Array.push(item);
//				}
//
//				$(obj).select2({
//					data : select2Array,
//					disabled : resultData.adminYn == "Y"?false:true
//				});
//
//				$(obj).on('propertychange', function () {
//				    $(obj).addClass('disabled');
//				});
//			},
//			error: function(xhr, ajaxOptions, thrownError) {
//				alert("System ajax call Failed!");
//			}
//		});
        $.ajax({
            async: false,
            url: "/data/sample2/selectList.do",
            data: {},
            type: "POST",
            success: function(xml) {
                resultData = xml.resultData;
                var list = resultData;

                for (var i = 0; i < list.length; i++){
                    var item = {
                        id : list[i].company_no,
                        text : list[i].company_name_kr
                    };
                    select2Array.push(item);
                }

                $(obj).select2({
                    data : select2Array
                    //disabled : resultData.adminYn == "Y"?false:true
                });

                $(obj).on('propertychange', function () {
                    $(obj).addClass('disabled');
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("System ajax call Failed!");
            }
        });
    },
    showLoading: function(s) {
        var t = "";
        if (s != undefined)
            t = "<div style='padding-top:10px;'><span style='padding-top:10px;font-size:16px;color:#1385DB;font-family:NanumGothic,dotum;font-weight:bold;'>"+s+"</span></div>";

        $.blockUI({
            message: '<img src="/resource/images/loading_wehago.gif" alt="loding" />' + t,
            overlayCSS:{
                backgroundColor: '#000000',
                opacity: 0.01
            },
            css:{
                backgroundColor: 'rgba(255,255,255,0)',
                width: '180px',
                left: '42%',
                border: '#629CD8 solid 0px',
            },
            fadeIn:  0,
            fadeOut: 0
        });
    },
    closeLoading: function() {
        $.unblockUI();
    },
    log: function (msg, error){
        try {
            if(window.console){
                if (error)
                    window.console.error(msg+"\n", error);
                else
                    window.console.log(msg);
            }
        } catch(e){
            console.log(e);
        }
    },
    removeTag: function (str){
        return str.replace(/<.*?>/g,'');
    }

};

//========================================================//
// multi language
// 다국어 관련 Function Object
//========================================================//
var Lang = {
    setLanguage: function(lang, url){
        if (lang == undefined || lang == ''){
            lang = 'ko_KR';
        }

        var temp = lang.split("_");
        var onlyLang = temp[0];

        $.i18n.properties({
            name: 'message-common',
            path: '/message/message-common_' + onlyLang + '.do',
            mode: 'map',
            language: onlyLang,
            callback: function () {
                Lang.fnSetLanguage(lang, url);
            }
        });
    },
    fnSetLanguage: function (lang, url){
        Ajax.ajax("/data/footer/setLanguage.do", {locale: lang}, function(data,status){
            var dcloudResult = JSON.parse(data.responseText);
            if (dcloudResult.resultCode != "0000"){
                alert(dcloudResult.resultMsg);
            } else {
                //$.datepicker.setDefaults($.datepicker.regional["en"]);
                //$.datepicker('destroy').datepicker($.datepicker.regional[lang]);
                if ( url != undefined)
                    $('#iContainer').attr("src", url);
            }
        });
    },
    getMessage: function(key){
        var args = "\""+ key + "\"";
        for (var i = 1; i < arguments.length; i++) {
            args += ", \"" + arguments[i] + "\"";
        }

        if (document.location.pathname.indexOf("/sample/") > -1){
            //return eval("$.i18n.prop(" + args + ")");
            return $.i18n.prop(args);
        }
        if (parent != this) {
            return parent.$.i18n.prop(args);
        }
        return $.i18n.prop(args);

    }
};
//========================================================//
//AES 256 암호화 복호화
//========================================================//
var DcloudAes = {
    encode: function(plain_text) {
        GibberishAES.size(256);
        return GibberishAES.aesEncrypt(plain_text, DcloudAes.key());
    },
    decode: function(base64_text) {
        GibberishAES.size(256);
        return GibberishAES.aesDecrypt(base64_text, DcloudAes.key());
    },
    key: function(){
        return "e77911b711a9354b864399536d892eafc4884665ac7af7a4e74f35b98c368415";
    }
};
//========================================================//
// 마스킹 처리
//========================================================//
var MaskingFormat = {
    isEmpty : function (str){
        if(typeof str == "undefined" || str == null || str == ""){
            return true;
        }
        else{
            return false;
        }
    },
    /*
    ※ 이메일 마스킹
    ex1) 원본 데이터 : abcdefg12345@naver.com
         변경 데이터 : ab**********@naver.com
    ex2) 원본 데이터 : abcdefg12345@naver.com
         변경 데이터 : ab**********@nav******
    */
    email : function(str){
        var originStr = String(str || "");
        var emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        var strLength;

        if(MaskingFormat.isEmpty(emailStr)){
            return originStr;
        }else{
            strLength = emailStr[0].split('@')[0].length - 3;

            // ex1) abcdefg12345@naver.com => ab**********@naver.com
            return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*');

            // ex2) abcdefg12345@naver.com => ab**********@nav******
            // return originStr.replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*').replace(/.{6}$/, "******");
        }
    },

    id : function(str){
        var originStr = String(str || "");
        var strLength = Math.min(3, originStr.length);
        return originStr.replace(new RegExp('(?<=.{'+strLength+'}).', 'g'), '*');
    },
    /*
    ※ 휴대폰 번호 마스킹
    ex1) 원본 데이터 : 01012345678, 변경 데이터 : 010****5678
    ex2) 원본 데이터 : 010-1234-5678, 변경 데이터 : 010-****-5678
    ex3) 원본 데이터 : 0111234567, 변경 데이터 : 011***4567
    ex4) 원본 데이터 : 011-123-4567, 변경 데이터 : 011-***-4567
    */
    phone : function(str){
        var originStr = String(str || "");
        var phoneStr;
        var maskingStr;

        if (originStr.toString().split('-').length != 3)
        { // 1) -가 없는 경우
            phoneStr = originStr.length < 11 ? originStr.match(/\d{10}/gi) : originStr.match(/\d{11}/gi);
            if(MaskingFormat.isEmpty(phoneStr) == true){
                return "";
            }

            if(originStr.length < 11)
            { // 1.1) 0110000000
                maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{4})(\d+)/gi,'$1***$3'));
            }
            else
            { // 1.2) 01000000000
                maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{4})(\d+)/gi,'$1****$3'));
            }
        }else
        { // 2) -가 있는 경우
            phoneStr = originStr.match(/\d{2,3}-\d{3,4}-\d{4}/gi);
            if(MaskingFormat.isEmpty(phoneStr) == true){
                return "";
            }

            if(/-[0-9]{3}-/.test(phoneStr))
            { // 2.1) 00-000-0000
                maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{3}-([0-9]+)/g, "-***-$1"));
            } else if(/-[0-9]{4}-/.test(phoneStr))
            { // 2.2) 00-0000-0000
                maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{4}-([0-9]{4})/g, "-****-$1"));
            }
        }

        return maskingStr;
    },
    /*
    ※ 주민등록 번호 마스킹 (Resident Registration Number, RRN Masking)
    ex1) 원본 데이터 : 990101-1234567, 변경 데이터 : 990101-1******
    ex2) 원본 데이터 : 9901011234567, 변경 데이터 : 9901011******
    */
    rrn : function(str){
        var originStr = str;
        var rrnStr;
        var maskingStr;
        var strLength;

        if(MaskingFormat.isEmpty(originStr) == true){
            return "";
        }

        rrnStr = originStr.match(/(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4]{1}[0-9]{6}\b/gi);
        if(MaskingFormat.isEmpty(rrnStr) == false){
            strLength = rrnStr.toString().split('-').length;
            maskingStr = originStr.toString().replace(rrnStr,rrnStr.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******"));
        }else {
            rrnStr = originStr.match(/\d{13}/gi);
            if(MaskingFormat.isEmpty(rrnStr) == false){
                strLength = rrnStr.toString().split('-').length;
                maskingStr = originStr.toString().replace(rrnStr,rrnStr.toString().replace(/([0-9]{6})$/gi,"******"));
            }else{
                return originStr;
            }
        }
        return maskingStr;
    },
    /*
    ※ 이름 마스킹
    ex1) 원본 데이터 : 김철수, 변경 데이터 : 김*수
    ex2) 원본 데이터 : 남궁철수, 변경 데이터 : 남**수
    ex3) 원본 데이터 : 철수, 변경 데이터 : 철*
    */
    name : function(str){
        var originStr = str;
        var maskingStr;
        var strLength;

        if(MaskingFormat.isEmpty(originStr) == true){
            return "";
        }

        strLength = originStr.length;

        maskingStr = MaskingFormat.maskName(originStr);

        return maskingStr;
    },

    maskName : function (name) {
        return name.replace(/^(.).*(.)$/, function (match, firstChar, lastChar) {
            if (name.length === 1) {
                return name;
            } else if (name.length === 2) {
                return firstChar + '*';
            } else {
                const maskedPart = '*'.repeat(name.length - 2);
                return firstChar + maskedPart + lastChar;
            }
        });
    },

    /*
    ※ IP 마스킹 - 인터넷 주소 : 17-24 비트(Ver 4)
    ex1) 원본 데이터 : 10.101.31.11, 변경 데이터 : 10.101.**.11
    */
    ip : function(str){
        str = str || "";
        var subnetBits = 24;
        var ipArray = str.split('.');

        if (ipArray.length != 4) {
            return str;
        }

        ipArray[2] = ipArray[2].replace(/\d/gi, "*");

        // 결과 IP 주소 반환
        return ipArray.join('.');
    },
}

//========================================================//
// 마스킹 처리
//========================================================//
var MaskingFormatV = {
    isWehagoV : function (){
        var env = $.cookie("AUTH_PM_ENV") || "";
        var flag = ["", "local", "wehagov"].includes(env);
        // var flag = ["wehagov"].includes(env);
        // console.log("env",env)
        // console.log("flag", flag)
        return flag;
    },
    isWehagoMasking : function (){
        var env = $.cookie("AUTH_PM_ENV") || "";
        var flag = ["", "local", "wehagov", "md"].includes(env);
        // var flag = ["", "wehagov", "md"].includes(env);
        return flag;
    },
    /*
    ※ 이메일 마스킹
    */
    email : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.email(str);
        }
    },
    /*
    ※ id 마스킹
    */
    id : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.id(str);
        }
    },
    /*
    ※ 휴대폰 번호 마스킹
    */
    phone : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.phone(str);
        }
    },
    /*
    ※ 주민등록 번호 마스킹 (Resident Registration Number, RRN Masking)
    */
    rrn : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.rrn(str);
        }
    },
    /*
    ※ 이름 마스킹
    */
    name : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.name(str);
        }
    },
    /*
    ※ 이름 마스킹
    */
    ip : function(str){
        if (!MaskingFormatV.isWehagoMasking()) {
            return str || "";
        } else {
            return MaskingFormat.ip(str);
        }
    },
}

//========================================================//
// 클릭이나 드래그 disable 이벤트 처리
//========================================================//

//]]>
