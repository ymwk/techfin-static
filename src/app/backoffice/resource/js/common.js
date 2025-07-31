/**
 * 백오피스 공통 js 
 */
 
 $(document).ready(function(){
	// 클래스 datepicker 지정하면 달력모듈 적용 
	$(".datepicker").datepicker({
	    dateFormat: 'yy-mm-dd' //Input Display Format 변경
	    ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	    ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
	    ,changeYear: true //콤보박스에서 년 선택 가능
	    ,changeMonth: true //콤보박스에서 월 선택 가능                
	    ,setDate : 'today'
	    ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
	    ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
	    ,onClose: function (selectedDate) {
			var objId =  $(this).attr("id");
			if(objId == "search_from_date"){
				$("#search_to_date").datepicker("option", "minDate", selectedDate);
			}else if(objId == "search_to_date"){
				$("#search_from_date").datepicker("option", "maxDate", selectedDate);
			}
		}
	}); 
	
	$("#btn_1_month").removeClass("basic2");
	$("#btn_6_month").removeClass("basic2");
	$("#btn_12_month").removeClass("basic2");
	
	// 1개월 버튼 클릭 이벤트
      $('#btn_1_month').click(function() {
        var date = calculateDate(1);
        $('#search_from_date').val(date);
        $('#search_to_date').val(getTodayDate());
        
        $(this).addClass("basic2");
		$("#btn_6_month").removeClass("basic2");
		$("#btn_12_month").removeClass("basic2");
		$("#btn_all").removeClass("basic2");
      });

      // 6개월 버튼 클릭 이벤트
      $('#btn_6_month').click(function() {
        var date = calculateDate(6);
         $('#search_from_date').val(date);
        $('#search_to_date').val(getTodayDate());
        $(this).addClass("basic2");
		$("#btn_1_month").removeClass("basic2");
		$("#btn_12_month").removeClass("basic2");
		$("#btn_all").removeClass("basic2");
      });

      // 12개월 버튼 클릭 이벤트
      $('#btn_12_month').click(function() {
        var date = calculateDate(12);
          $('#search_from_date').val(date);
          $('#search_to_date').val(getTodayDate());
          $(this).addClass("basic2");
		  $("#btn_6_month").removeClass("basic2");
		  $("#btn_1_month").removeClass("basic2");
		  $("#btn_all").removeClass("basic2");
      }); 
      
      $("#btn_all").click(function(){
		  $('#search_from_date').val("");
	      $('#search_to_date').val("");
	      
	      $(this).addClass("basic2");
		  $("#btn_6_month").removeClass("basic2");
		  $("#btn_12_month").removeClass("basic2");
		  $("#btn_1_month").removeClass("basic2");
	  })
	
})


// method GET으로 비동기 API호출 
function getAjax(apiUrl, param, func){
	Dcloud.showLoading();
	$.ajax({
		url: apiUrl,
		type: "GET",
		data : param,
		contentType : 'application/json;charset=UTF-8',
		dataType: 'json',
        success: function(data) {
        	func(data);
        	Dcloud.closeLoading();
        },
        complete: function(data) {
			Dcloud.closeLoading();
        },
        error: function(xhr, status, error) {
        	var data = xhr.responseJSON;
			if(data.error == '9999' || data.error == '9998'){
				dcloudConfirm.alert(data.message, function(){
					location.href = data.returnUrl;
				}, {
					ok: "확인"
				});
			}
        	Dcloud.closeLoading();
        }
    });
	
}

// method POST으로 비동기 API호출 
function postAjax(apiUrl, param, func){
	//param = JSON.stringify(param);
	Dcloud.showLoading();
	try {
	$.ajax({
		url: apiUrl,
		type: "POST",
		data : param,
		//contentType : 'application/json;charset=UTF-8',
		dataType: 'json',
        success: function(data) {
        	if(data.resultCode == '0000'){
				func(data);
			}else{
				bofAlert(data.resultMsg);
			}
        	Dcloud.closeLoading();
        },
        complete: function(data) {
			Dcloud.closeLoading();
        },
        error: function(xhr, status, error) {
			var data = xhr.responseJSON;
			if(data.error == '9999' || data.error == '9998'){
				dcloudConfirm.alert(data.message, function(){
					location.href = data.returnUrl;
				}, {
					ok: "확인"
				});
			}
        	Dcloud.closeLoading();
        }
    })
    } catch (error) {
		Dcloud.closeLoading();
	    console.error('AJAX 처리 중 에러 발생:', error.message);
	}
    /*.fail(function(data, textStatus, errorThrown) {
		console.log(data);
		Dcloud.closeLoading();
	});*/
    ;
	
}



// method POST으로 비동기 API호출 
function postAjaxToCancelFunc(apiUrl, param, func,cancelFunc){
	//param = JSON.stringify(param);
	Dcloud.showLoading();
	try {
	$.ajax({
		url: apiUrl,
		type: "POST",
		data : param,
		//contentType : 'application/json;charset=UTF-8',
		dataType: 'json',
        success: function(data) {
        	if(data.resultCode == '0000'){
				func(data);
			}else{
				cancelFunc(data);
				bofAlert(data.resultMsg);
			}
        	Dcloud.closeLoading();
        },
        complete: function(data) {
			Dcloud.closeLoading();
        },
        error: function(xhr, status, error) {
			var data = xhr.responseJSON;
			if(data.error == '9999' || data.error == '9998'){
				dcloudConfirm.alert(data.message, function(){
					location.href = data.returnUrl;
				}, {
					ok: "확인"
				});
			}
        	Dcloud.closeLoading();
        }
    })
    } catch (error) {
		Dcloud.closeLoading();
	    console.error('AJAX 처리 중 에러 발생:', error.message);
	}
    /*.fail(function(data, textStatus, errorThrown) {
		console.log(data);
		Dcloud.closeLoading();
	});*/
    ;
	
}

// method POST으로 비동기 API호출 
function postMultipartAjax(apiUrl, param, func){
	//param = JSON.stringify(param);
	Dcloud.showLoading();
	$.ajax({
		url: apiUrl,
		type: "POST",
		data : param,
		//contentType : 'application/json;charset=UTF-8',
		processData: false, // 기본 처리 비활성화 (FormData 객체 처리)
        contentType: false, // Content-Type 헤더 비활성화
        success: function(data) {
        	func(data);
        	Dcloud.closeLoading();
        },
        complete: function(data) {
			Dcloud.closeLoading();
        },
        error: function(xhr, status, error) {
			var data = xhr.responseJSON;
			if(data.error == '9999' || data.error == '9998'){
				dcloudConfirm.alert(data.message, function(){
					location.href = data.returnUrl;
				}, {
					ok: "확인"
				});
			}
        	Dcloud.closeLoading();
        }
    })
    /*.fail(function(data, textStatus, errorThrown) {
		console.log(data);
		Dcloud.closeLoading();
	});*/
    ;
	
}


function getDownloadExcel(url,param,fileName){
	 $.ajax({
	    type: 'GET',
	    data : param,
		contentType:"application/json",
	    url: url, // fileId 변수를 URL에 포함
	    xhrFields: {
	        responseType: 'arraybuffer' // 응답을 Blob 객체로 받음
	    },
	    success: function(data, message, xhr) {
	        var link = document.createElement('a');
	        let blob = new Blob([data]); 
	        link.href = window.URL.createObjectURL(blob);
	        link.download = fileName; // 다운로드시 저장되어 있는 파일이름으로 기본 다운로드 설정
            link.click();
            Dcloud.closeLoading();
       },
       error:function(request,status,error){ 
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);   
  		  Dcloud.closeLoading();  
       }    	
	});
}

// 백오피스 공통 코드 리스트 조회 
function getBofComCdList(mainCd,id,topLabel,func){
	var param = {
		 cdGrp : 'BOF'
		,cdMain : mainCd
	}
	
	postAjax("/api/common/code/cdlist", param, function(data){
		//createSelectBox
		var grpComCdData = data.resultData;
		var obj = {"key": "", "name" : topLabel};
		grpComCdData.unshift(obj)
		var resultCode = data.resultCode;
		if(resultCode === '0000'){
			createSelectBox(id,grpComCdData);
			func();	
		}
		
	});	
	
}


// CB서비스 공통코드 리스트 조회 
function getCbComCdList(cdGrp,cbMain,id,topLabel,func){
	var param = {
		 cdGrp : cdGrp
		,cdMain : cbMain
	}
	postAjax("/api/common/cb/code/list", param, function(data){
		//createSelectBox
		var grpComCdData = data.resultData;
		var obj = {"key": "", "name" : topLabel};
		grpComCdData.unshift(obj)
		var resultCode = data.resultCode;
		if(resultCode === '0000'){
			createSelectBox(id,grpComCdData);
			func();	
		}
		
	});	
	
}

function moveUrl(url){
	Dcloud.showLoading();
	$("#divContents").load(url, function(response, status, xhr){
		Dcloud.closeLoading();
		
		if(status === 'error'){
			$("#divContents").load('/common/error_404', function(){});
		}
		
	});
}

// 그리드 페이지 네이션 
// pagination : 페이지네이션 관련 변수, funcName : 페이지버튼 클릭시 호출할 함수명, gridId : 호출 그리드 ID
function setPagiNation(pagination, funcName , gridId){
	var str = '<div class="common_new_pagination"><div class="pagein">';
	var obj = pagination;
	
	var pageCount = pagination.total_page;
/* 	var numPageGroup = pagination.numPageGroup; 
	var pageGroupCount = pagination.pageGroupCount; */
	var startPage = pagination.start_page;
	var endPage = pagination.end_page;
	var page = pagination.current_no;
	var next = pagination.next;
	var prev = pagination.prev;
	 
	if(prev){
		str += "<button type='button' navid='start' class='btn btn2 btn_prev' onClick=\""+funcName+"('1', '"+gridId+"')\"><span class='blindItem'>첫번째페이지</span></button>";
		str += "<button onClick=\""+funcName+"('"+(startPage-1)+"', '"+gridId+"')\" class=\"btn btn_prev\"><span class='blindItem'>이전페이지로</span></button>";
	}
	
	for (var i = startPage; i <= endPage; i++) { 
		
		if(page == i){
			str += "<strong class=\"num on\">"+i+"</strong>"; 
		}else{
			str += "<a href=\"javascript:void(0);\" class='num' onClick=\""+funcName+"("+i+",'"+gridId+"')\" >"+i+"</a>";
		}
	} 
	
	if(next){
		str += "<button onClick=\""+funcName+"('"+(endPage+1)+"', '"+gridId+"')\" class=\"btn btn_next\"><span class='blindItem'>다음페이지로</span></button>";
		str += "<button type='button' navid='end' class='btn btn2 btn_next' onClick=\""+funcName+"('"+pageCount+"', '"+gridId+"')\"><span class='blindItem'>마지막페이지</span></button>";
	}
	str += "</div></div>";	 
	
	return str;
 
} 

// param 검증 체크 현재는 input만 적용 
function checkFormValid(validForm){
	var validChkList = [];
	var rules = validForm['rules'];
	var messages = validForm['messages'];
	Object.keys(rules).forEach(function(key){
		var obj = $("#"+key);
		var value = $("#"+key).val();
		var parentDiv = obj.closest('div').parent();
		var validChk = true;
		parentDiv.find('.err_msg').remove();
		if(rules[key].required){
			if(isEmpty(value)){
				parentDiv.append("<span class='err_msg'>"+messages[key].required+"</span>")
				validChk = false;
			}else{
				parentDiv.find('.err_msg').remove();
				validChk= true;
				
			}
			
		}
		
		/*if(rules[key].select_required){
			if(isEmpty(value)){
				
			}
		}*/
		// 데이터 값이 있을때 
		// 이름은 한글,영문만 체크 
		if(rules[key].name && validChk){
			var koreanRegex = /^[가-힣]+$/; // 한글 정규 표현식
    		var englishRegex = /^[a-zA-Z]+$/; // 영문 정규 표현식
			if (!koreanRegex.test(value) && !englishRegex.test(value)) {
				parentDiv.append("<span class='err_msg'>"+messages[key].name+"</span>")
				validChk = false;
			}
		}
		//  아이디 체크 
		if(rules[key].id && validChk){
			var idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9@_.-]*$/; // 영,숫자, 특수문자(_,-,@,.)
			if (!idRegex.test(value)) {
				parentDiv.append("<span class='err_msg'>"+messages[key].id+"</span>")
				validChk = false;
			}
		}
		// 최소길이 체크 
		if(!isEmpty(rules[key].minlength) && validChk){
			if(value.length < rules[key].minlength){
				parentDiv.append("<span class='err_msg'>"+messages[key].minlength+"</span>")
				validChk = false;
			}
		}
		// 최대길이 체크 
		if(!isEmpty(rules[key].maxlength) && validChk){
			if(value.length > rules[key].maxlength){
				parentDiv.append("<span class='err_msg'>"+messages[key].maxlength+"</span>")
				validChk = false;
			}
		}
		
		//IP체크 
		if(!isEmpty(rules[key].ip) && validChk){
			if (!isValidIPv4(value)) {
				parentDiv.append("<span class='err_msg'>"+messages[key].ip+"</span>")
				validChk= false;
			}
		}
		validChkList.push(validChk);
		//validChkList = validChkList.concat(valiChkObj);
	});
	return !hasFalseValue(validChkList);
}

function hasFalseValue(arr) {
    return arr.includes(false);
}

// json key 에 맞는 태그값 찾아 데이터 뿌려줌 
function setDataValue(data){
	for(key in data) {
		if($("#"+key).length > 0)  {
			resetTagNameTypeValue($("#"+key));
			setTagNameTypeValue($("#"+key),data[key]);
		}
	}
}	

// 데이터 여부 판단 	
function isEmpty(str){
    
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}	
	
//태그타입 판단해서 데이터 초기화
function resetTagNameTypeValue(obj){
	var tagName = obj[0].tagName;
	var type = obj[0].type;
	var name = obj[0].name;
	var id = obj[0].id;
	if(tagName == "INPUT"){
		switch (type) {
		case "text":
			obj.val("");
			break; 
		case "radio":
			   $("input[name=\""+name+"\"]").prop('checked', false);
			break; 
		case "checkbox":
			$("input[id=\""+id+"\"]").removeAttr('checked');
			break;
		case "hidden": 
			obj.val("");
			break;
		case "number":
			obj.val("");
			break; 
			
		default:
			val = "";
			break;
		}
	}else if(tagName == "SELECT"){
		obj.val("");
	}else if(tagName == "TEXTAREA"){
		obj.val("");
	}else if(tagName == "SPAN"){
		obj.text("");
	}else if(tagName == "DIV"){
		obj.text("");
	}
}


// 태그 타입판단해서 value setting 
function setTagNameTypeValue(obj, value){
	var tagName = obj[0].tagName;
	var type = obj[0].type;
	var name = obj[0].name;
	var id = obj[0].id;
	if(tagName == "INPUT"){
		switch (type) {
		case "text":
			obj.val(value);
			break; 
		case "radio":
			   $("input:radio[name=\""+name+"\"][value=\""+value+"\"]").prop("checked", true);

			break; 
		case "checkbox":
			checkBoxNameInValueChecked(id, value);
			break;
		case "hidden": 
			obj.val(value);
			break;
		case "number":
			obj.val(value);
			break; 
		default:
			val = "";
			break;
		}
	}else if(tagName == "SELECT"){
		obj.val(value);
	}else if(tagName == "TEXTAREA"){
		obj.val(value);
	}else if(tagName == "DIV"){
		if(isEmpty(value)){
			value = "";
		}
		obj.html(value);
	}else if(tagName == "SPAN"){
		if(isEmpty(value)){
			value = "";
		}
		obj.html(value);
	}
	
}

// 백오피스 얼럿 
function bofAlert(msg){
	dcloudConfirm.alert("<p>"+msg+"</p>", function(e){}, {ok: "확인"});
}

// 백오피스 얼럿 
function bofAlertCallBack(msg,callback){
	dcloudConfirm.alert("<p>"+msg+"</p>", function(e){
		callback();
	}, {ok: "확인"});
}

// 백오피스 컨펌 
function bofConfirm(msg,callback){
	 dcloudConfirm.confirm("<p>"+msg+"</p>", function(e){
		if(e){
			callback();
		}
	 }, {ok: "확인",cancel: "취소"});
}

// 백오피스 컨펌 
function bofConfirmAndCancel(msg,callback,canCelCallBack){
	 dcloudConfirm.confirm("<p>"+msg+"</p>", function(e){
		if(e){
			callback();
		}else{
			canCelCallBack();
		}
	 }, {ok: "확인",cancel: "취소"});
}

function calculateDate(monthsAgo) {
    var today = new Date();
    today.setMonth(today.getMonth() - monthsAgo); // monthsAgo 전으로 이동
    return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
 }
 // 오늘날짜 조회 
 function getTodayDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    var day = String(today.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤

    return year + '-' + month + '-' + day;
 }
 
//스크롤 다운 
function scrollToBottomOfElement(id) {
    $("#"+id).animate({ scrollTop: $('#'+id)[0].scrollHeight }, 'slow');
}

//스크롤 제일 위로  
function scrollToTopOfElement(id) {
    $("#"+id).animate({ scrollTop: 0 }, 'slow');
}

//  IP정규식 체크 
function isValidIPv4(ip) {
    const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
}

// jsonarray 특정키 중복 제거 
function removeDuplicatesByKey(jsonArray, key) {
    const uniqueValues = new Set(); // 중복 제거를 위한 Set
    return jsonArray.filter(item => {
        // 해당 키의 값이 Set에 없으면 추가하고 true 반환
        if (!uniqueValues.has(item[key])) {
            uniqueValues.add(item[key]);
            return true; // 이 객체는 배열에 포함
        }
        return false; // 중복된 객체는 배열에서 제외
    });
}

// jsonarray 특정키에 대한데이터 삭제 
function excludeKey(jsonArray, keyToRemove) {
    return jsonArray.map(function(item) {
        // 새로운 객체를 만들어 특정 key를 제외하고 복사
        var newItem = Object.assign({}, item);
        delete newItem[keyToRemove];  // 'btn_del' key를 삭제
        return newItem;
    });
}
// jsonarray 특정키 key값 변경 
function changeKeyInJsonArray(jsonArray, oldKey, newKey) {
    return jsonArray.map(item => {
        // 새 객체를 생성
        var { [oldKey]: oldValue, ...rest } = item; // oldKey의 값을 제거하고 나머지를 rest에 저장
        return { ...rest, [newKey]: oldValue }; // newKey로 oldValue를 추가한 새 객체 반환
    });
}


// 사업자번호 포맷 
function formatBusinessNumber(number) {
    // 숫자만 남기고 다른 문자는 제거
   var cleaned = number.replace(/\D/g, '');
    
    // 10자리 숫자가 아니면 그대로 반환
    if (cleaned.length !== 10) {
        return number;
    }

    // XXX-XX-XXXXX 형태로 변환
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
}

// 법인번호 포맷 
function formatCorpNumber(number) {
    // 숫자만 남기고 다른 문자는 제거
    if(isEmpty(number)){
		return number;
	}
    
    const cleaned = number.replace(/\D/g, '');
    
    // 13자리 숫자가 아니면 그대로 반환
    if (cleaned.length !== 13) {
        return number;
    }

    // XXXXXX-XXXXXXX 형태로 변환
    return `${cleaned.slice(0, 6)}-${cleaned.slice(6)}`;
}

// 날짜포맷 함수 yyyy-MM-dd
function formatDateString(dateString) {
    // 입력이 8자리 숫자가 아닌 경우 원본 반환
    if (!/^\d{8}$/.test(dateString)) {
        return dateString;
    }

    // 연, 월, 일 부분 분리하여 YYYY-MM-DD 형식으로 변환
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${year}-${month}-${day}`;
}


// 검색폼 파라미터 가져오는 공통 함수 
function getSearchParam(){
	var param = {};
	if(!isEmpty($("#search_from_date").val())){
		param.searchFromData = $("#search_from_date").val().replace(/-/gi, "")
	}
	if(!isEmpty($("#search_to_date").val())){
		param.searchToData = $("#search_to_date").val().replace(/-/gi, "")
	}
	
	if(!isEmpty($("#search_typ").val())){
		param.searchTyp = $("#search_typ").val();
		param.searchText = $("#search_text").val();
	}
	
	return param;
}

// 핸드폰 번호 포맷 
function formatPhoneNumber(phoneNumber) {
	
	if(isEmpty(phoneNumber)){
		return phoneNumber;
	}
	
    // 숫자만 남기기
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // 길이에 따라 포맷 적용
    if (phoneNumber.length === 10) {
        // 10자리 번호 (예: 0101234567 → 010-1234-5678)
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (phoneNumber.length === 11) {
        // 11자리 번호 (예: 01012345678 → 010-1234-5678)
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
        // 유효하지 않은 번호 길이일 경우 원래 값을 반환
        return phoneNumber;
    }
}

// 금액포맷 
function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', { style: 'decimal' }).format(amount);
}
// 현재 시간 분 가져오는 함수 
function getCurrentTime() {
    const now = new Date();
    const hour = now.getHours(); // 0 ~ 23 (24시간 형식)
    const minute = now.getMinutes(); // 0 ~ 59

    return {
		//hour : hour,
		//minute : minute,
        hour: hour < 10 ? "0" + hour : hour, // 0 패딩
        minute: minute < 10 ? "0" + minute : minute // 0 패딩
    };
}

function createTimeSelectBox(selector, start, end, unit) {
    const $selectBox = $(selector);
    //$selectBox.append("<option value=''>선택</option>"); // 기본 선택지
    for (let i = start; i <= end; i++) {
        const formattedValue = i < 10 ? "0" + i : i; // 0 패딩
        $selectBox.append("<option value="+formattedValue+">"+formattedValue+" "+unit+"</option>");
    }
}

 function validateSummernote(content) {
    // 1. 내용이 비어있는 경우 체크
    const trimmedContent = content.replace(/<\/?[^>]+(>|$)|&nbsp;/g, '').trim();
    return trimmedContent.length > 0;
}

// 특정 영역에 url 에 해당하는 화면 뿌려주고 콜백 함수 실행
function openUrlToArea(areaId, url, func){
	Dcloud.showLoading();
	$("#"+areaId).load(url, function(response, status, xhr){
		Dcloud.closeLoading();
		func();
		if(status === 'error'){
			$("#divContents").load('/common/error_404', function(){});
		}
	});
}


