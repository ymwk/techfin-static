/**
 * 매출채권 팩터링 정산
 * 최영원
 */

/* 그리드 resize */
function setGridResize(containerId, gridId){
	////console.log('1')
	$(window).bind(
			'resize',
			function() {
				var resizeWidth = $('#'+containerId).width();
				$('#'+gridId).setGridWidth(resizeWidth,true);
				var resizeMargin = 330;
				/*if ($("#detail_search_box").hasClass("hide")) {
					resizeMargin -= 90;
				}*/
				$('#'+gridId).setGridHeight($(document).height() - resizeMargin);
			}).trigger('resize');
}

/* 다이얼로그 셋팅 */
function setDialog(dialogId){
	//console.log('2')
	$('#'+dialogId).dialog(
			{
				title : "다이알로그",
				autoOpen : false,
				modal : true,
				width : 'auto',
				height : 'auto',
				padding:'0px',
				resizable : true,
				create : function(event, ui) {
					$(this).parent().eq(0)
							.find(".ui-widget-header").hide();
					$('.ui-dialog .ui-dialog-content').css('padding','0')
					
				},
			});
}

/* 총 금액, 할인 후 매출채권 금액(총액) 포맷 형식 */
function amtFormatter(amt){
	//console.log('3')
	return amt.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

/* 총 건수, 총 금액, 할인 후 매출채권 금액(총액) 출력 */
function resultSummary(rowDataAry, totalNumId, totalAmtId, totalAmtBalanceId=""){
	//console.log('4')
	var totalNum=rowDataAry.length;
	var totalAmt=0;
	var totalAmtBalance=0;
	
	rowDataAry.forEach(function(data){
		totalAmt += data.amt;
		if(totalAmtBalanceId!==""){
			totalAmtBalance +=data.amt_balance;
		}		
	});
	
	$('#'+totalNumId).text(totalNum);
	$('#'+totalAmtId).text(amtFormatter(totalAmt));
	if(totalAmtBalanceId!==""){
		$('#'+totalAmtBalanceId).text(amtFormatter(totalAmtBalance));
	}			
}

/* jqgrid 커스텀 버튼 - 약정서  */
function drawButton(cellvalue, options, rowObject){     
	//console.log('5') 	
    const button = "<button onClick=\"openDocDetail("+cellvalue+")\"><img src=\"/imgs/factoring/button.png\" width=\"20\" height=\"27\"></button>";
    //const button = "<span class=\"inbx\"><button type=\"button\" class=\"btn_doc sp_gt\" onClick=\"openDialog("+cellvalue+")\">약정서 팝업 열림</button></span>"
 return button;
}

var now=new Date()
var today= now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();

//연체 체크 후 팝업 오픈 버튼생성
function checkLate(cellValue,option,rowObj){
		
	const ymdEnd = rowObj.ymd_end.replace(/\./g,'-');
	const endTime = new Date(ymdEnd).getTime(); //약정 종료일(시간).
	const todayTime = new Date(today).getTime(); //오늘 날짜(시간).
		
	//console.log('연체 체크 함', cellValue, option, rowObj);
	
	//구매기업 정산 - 연장 만기일 - 연체중 출력
	//팩토링 회사 정산(구매기업) - 회수 일시 - 연체중 출력
	
	
	if(option.gid==='factoring0303grid_buyer' && cellValue!=='-'){
		return cellValue
	}
	
	
	if(endTime < todayTime){ //연체
		return "<img src=\"/imgs/factoring/overdue.png\" width=\"40\" height=\"17\"><br><a href=javascript:openLateDialog("+rowObj.sq_doc+") style=\"text-decoration:none;\" >[연체내역보기]</a>";
	}else{		
		return option.gid==='factoring0303grid_buyer' ? '-' : '-' //<-- 오른쪽 '-' 임시값
	}
}

/*input 엘리먼트 날짜 포맷 설정*/
function setDateFormat(fromDateId, toDateId){
	//console.log('6')
	Format.setDateType($('#'+fromDateId));
	Format.setDateType($('#'+toDateId));
}

/* 검색 날짜 설정 - 일(day)체크 필요 28,30,31 */
function setSearchDate(sMonth, fromDateId, toDateId){
	//console.log('7')
	var $startDate = $('#'+fromDateId);
	var $endDate = $('#'+toDateId);
			
	var toDate = new Date();
	var setStartDate;
	var setEndDate;
			
	setEndDate = toDate.toJSON().slice(0, 10);		
	toDate.setMonth(toDate.getMonth() - sMonth);	
	setStartDate = toDate.toJSON().slice(0, 10);
	
	$startDate.val( setStartDate );
	$endDate.val( setEndDate );	
}


/* 날짜 포맷 지정 */
function formatterDate(date, sep1,sep2,sep3=""){
	var year = date.substring(0,4);
	var month = date.substring(4,6);
	var day = date.substring(6,date.length);
	
	return year+sep1+month+sep2+day+sep3
}

/* 날짜 시간 포맷 */
function formatterDateTime(date){
	var year = date.substring(0,4);
	var month = date.substring(4,6);
	var day = date.substring(6,8);
	var hour = date.substring(8,10);
	var minute = date.substring(10,12);
	var seconds = date.substring(12,14);
	
	if(date===""){
		return "-"
	}
	return year+"."+month+"."+day+"<br> "+hour+":"+minute+":"+seconds
}

/* 시간 포맷 */
function formatterTime(date, sep1,sep2){
	var hour = date.substring(0,2);
	var minute = date.substring(2,4);
	var seconds = date.substring(4,6);
	
	return hour+sep1+minute+sep2+seconds
}

/* 은행코드 */
function formatterBankCode(bankCd){
	
	let resultBankName = '';
	if(!bankCd) return '';
	let bankCodeList = [
	    {code:'004', text:'국민'},
	    {code:'003', text:'기업'},
	    {code:'011', text:'농협'},
	    {code:'002', text:'산업'},
	    {code:'007', text:'수협'},
	    {code:'088', text:'신한'},
	    {code:'020', text:'우리'},
	    {code:'081', text:'하나'},
	    {code:'027', text:'한국시티'},
	    {code:'023', text:'SC제일'},
	    {code:'039', text:'경남'},
	    {code:'034', text:'광주'},
	    {code:'031', text:'대구'},
	    {code:'032', text:'부산'},
	    {code:'045', text:'새마을'},
	    {code:'048', text:'신협'},
	    {code:'071', text:'우체국'},
	    {code:'037', text:'전북'},
	    {code:'035', text:'제주'},
	    {code:'089', text:'케이뱅크'},
	];
	bankCodeList.map((value => {
        if (value.code === bankCd) {
        	resultBankName = value.text;
        }
    }));
	
	return resultBankName;
}

/* 은행계좌 은행별 '-' 추가 */
function formatterAccountNo(bankCd, accountNo){

	let resultAccount = '';
    let splitter = '-';
    
    if(!accountNo)
        return '';
    
    if(bankCd === '002') {  // 산업은행 총 15(3-4-4-3)
        if(accountNo.length === 15) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 4) + splitter + accountNo.substr(7, 4) + splitter + accountNo.substr(10, 3);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if (bankCd === '003') {  // 기업은행 14(3-6-2-3)
        if(accountNo.length === 14) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 6) + splitter + accountNo.substr(9, 2)  + splitter + accountNo.substr(11, 3);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '004') {   // 국민은행 12(3-2-4-3), 14(6-2-6)
        if(accountNo.length === 14) {
            resultAccount = accountNo.substr(0, 6) + splitter + accountNo.substr(6, 2) + splitter + accountNo.substr(8, 6);
        } else if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 4) + splitter + accountNo.substr(9, 3);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '007') {   // 수협은행 12(4-4-4)
        for(let i=0; i<accountNo.length; i+=4) {
            resultAccount += accountNo.substr(i, 4);
            resultAccount += splitter;
        }
        resultAccount = resultAccount.slice(0, - 1);
    } else if(bankCd === '011') {   // 농협 11(3-2-6), 12(4-2-6), 13(3-4-4-2), 14(6-2-6)
        if(accountNo.length === 11) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6);
        } else if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 4) + splitter + accountNo.substr(4, 2) + splitter + accountNo.substr(6, 6);
        } else if(accountNo.length === 13) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 4) + splitter + accountNo.substr(7, 4) + splitter + accountNo.substr(11, 2);
        } else if(accountNo.length === 14) {
            resultAccount = accountNo.substr(0, 6) + splitter + accountNo.substr(6, 2) + splitter + accountNo.substr(8, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '020') {   // 우리은행 13(4-3-6) 12(3-2-6)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6);
        } else if(accountNo.length === 13) {
            resultAccount = accountNo.substr(0, 4) + splitter + accountNo.substr(4, 3) + splitter + accountNo.substr(7, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '023') {   // 스탠다드챠타드은행 11(3-2-6)
        if(accountNo.length === 11) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '027') {   // 씨티은행 12(3-6-3)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 6) + splitter + accountNo.substr(9, 3);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '031') {   // 대구은행 12(3-2-6-1)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6) + splitter + accountNo.substr(11, 1);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '032') {   // 부산은행 12(3-2-6-1), 13(3-4-4-2)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6) + splitter + accountNo.substr(11, 1);
        } else if(accountNo.length === 13) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 4) + splitter + accountNo.substr(7, 4) + splitter + accountNo.substr(11, 2);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '034') {   // 광주은행 12(3-3-6), 13(4,3,6)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 3) + splitter + accountNo.substr(6, 6);
        } else if(accountNo.length === 13) {
            resultAccount = accountNo.substr(0, 4) + splitter + accountNo.substr(4, 3) + splitter + accountNo.substr(7, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '035') {   // 제주은행 10(2-2-6)
        if(accountNo.length === 10) {
            resultAccount = accountNo.substr(0, 2) + splitter + accountNo.substr(2, 2) + splitter + accountNo.substr(4, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '071') {   // 우체국 14(6-2-6)
        if(accountNo.length === 14) {
            resultAccount = accountNo.substr(0, 6) + splitter + accountNo.substr(6, 2) + splitter + accountNo.substr(8, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '081') {   // 하나은행 14(3-6-5)
        if(accountNo.length === 14) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 6) + splitter + accountNo.substr(9, 5);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '088') {   // 신한은행 11(3-2-6), 12(3-3-6)
        if(accountNo.length === 11) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 2) + splitter + accountNo.substr(5, 6);
        } else if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 3) + splitter + accountNo.substr(6, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '089') {   // 케이뱅크 12(3-3-6)
        if(accountNo.length === 12) {
            resultAccount = accountNo.substr(0, 3) + splitter + accountNo.substr(3, 3) + splitter + accountNo.substr(6, 6);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else if(bankCd === '090') {   // 카카오뱅크 13(4-2-7)
        if(accountNo.length === 13) {
            resultAccount = accountNo.substr(0, 4) + splitter + accountNo.substr(4, 2) + splitter + accountNo.substr(6, 7);
        } else {
            for(let i=0; i<accountNo.length; i+=4) {
                resultAccount += accountNo.substr(i, 4);
                resultAccount += splitter;
            }
            resultAccount = resultAccount.slice(0, - 1);
        }
    } else {    // 기타 존재하지 않는 코드 일 경우
        for(let i=0; i<accountNo.length; i+=4) {
            resultAccount += accountNo.substr(i, 4);
            resultAccount += splitter;
        }
        resultAccount = resultAccount.slice(0, - 1);
    }

    return resultAccount;
}

function getDocStatusText(docStatus){
	var docStatusText='';
	
	switch (docStatus) {
		case 11:
			docStatusText = '신청취소';
			break;
		case 12:
			docStatusText = '임시저장';
			break;
		case 13:
			docStatusText = '결재요청(판)';
			break;
		case 14:
			docStatusText = '결재반려';
			break;
		case 1:
			docStatusText = '동의요청';
			break;
		case 15:
			docStatusText = '결재요청(구)';
			break;
		case 2:
			docStatusText = '동의거부';
			break;
		case 3:
			docStatusText = '심사요청';
			break;
		case 4:
			docStatusText = '지급거절';
			break;
		case 5:
			docStatusText = '승인요청';
			break;
		case 6:
			docStatusText = '승인거절';
			break;
		case 7:
			docStatusText = '승인완료';
			break;
		case 8:
			docStatusText = '지급완료';
			break;
		case 9:
			docStatusText = '상환완료';
			break;
		case 10:
			docStatusText = '종결';
			break;
		case 16:
			docStatusText = '연체중';
			break;
		case 17:
			docStatusText = '강제종결';
			break;
	}
	
	return docStatusText;
	
}



