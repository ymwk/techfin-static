/**
 * Dcloud Keyup
 * 2015.05.19 신승현
 * input창에 key 입력시 event
 * 
 */
;(function($) {
	
	// 숫자만
	$.fn.onlyNumber = function () {
		$(this).css("ime-mode", "disabled");
		this.keypress(function(e){
			var code = e.which?e.which:event.keyCode;
		    if(code < 48 || code > 57){
		        return false;
		    }
			return true;
		});
		
		
		this.keyup(function(e){
			var regexp = /[^0-9]/gi;
			var v = $(this).val();
			if (regexp.test(v)) {
				$(this).val(v.replace(regexp,''));
			}
		});

        this.blur(function(e){
            var regexp = /[^0-9]/gi;
            var v = $(this).val();
            if (regexp.test(v)) {
                $(this).val(v.replace(regexp,''));
            }
        });
	};

	// 영어만
	$.fn.onlyEnglish = function () {
		this.keyup(function(e){
			var regexp = /[^a-z]/gi;
			var v = $(this).val();
			if (regexp.test(v)) {
				$(this).val(v.replace(regexp,''));
			}
		});
	};
	
	// 한글만
	$.fn.onlyHangul = function () {
		this.keyup(function(e){
			var regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
			var v = $(this).val();
			if (regexp.test(v)) {
				$(this).val(v.replace(regexp,''));
			}
		});
	};
	
	// 특수문자 제외 (추가 특수문자 생기면 표현식에 넣어주세요)
	$.fn.excludeSpecialLetter = function () {
		/*
		this.keyup(function(e){
			var regexp = /[~!@\#$%^&*\()\-=+_?{}"'<>\/|\\]/gi;	// /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
			var v = $(this).val();
			if (regexp.test(v)) {
				$(this).val(v.replace(regexp,''));
			}
		});
		*/
		this.keypress(function(e){
			var code = e.which?e.which:event.keyCode;
		    if(code==47||code==91||code==126||code==33||code==64||code==92||code==35||code==36||code==37||
		    	code==94||code==38||code==42||code==40||code==41||code==45||code==61||code==43||code==95||
		    	code==63||code==123||code==125||code==34||code==39||code==60||code==62||code==124||code==91||
		    	code==93||code==96){
		        return false;
		    }
			return true;
		});
	};
	
})($);
