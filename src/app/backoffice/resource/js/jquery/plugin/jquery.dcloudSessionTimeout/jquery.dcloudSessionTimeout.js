/**
 * Dcloud Session Timeout
 * 2015.05.13 신승현
 * 인터넷뱅킹 형태의 세션아웃 기능
 * 세션시간 지나면 세션연장여부 물어본다
 *  
 * @param options
 */
(function( $ ){
	jQuery.sessionTimeout = function( options ) {
		var defaults = {
			message      : Lang.getMessage("dcloudSessionTimeout.msg04"),
			keepAliveUrl : '/keep-alive',
			keepAliveAjaxRequestType: 'POST',
			redirUrl     : '/timed-out',
			logoutUrl    : '/portal/init/login.do',
			warnAfter    : 7200000,
			redirAfter   : 90000,
			clientType   : "activex"
		};
		
		var o = defaults,
		sessTimer,
		sessTimer2;

		if ( options ) { o = $.extend( defaults, options ); }
		
		if (o.warnAfter == "" ) o.warnAfter = 7200000;

		// 세션시간 리셋
		$.sessionTimeout.reset = function(){
			sesstime = o.warnAfter;
			sesstime2 = o.redirAfter;
			controlDialogTimer('stop');
            controlDialogTimer('start');
            controlRedirTimer('stop');
            
			Ajax.ajax("/data/header/sessionExtend.do", {}, resultSessionExtend, {block: false});
		}
		
		if (o.clientType != "multi"){
			
			// com 연동
			setInterval(function(){
				
				try {
					var comKeep = parent.ctrl.GetLastInputTime();
					if (comKeep.length != 14) return;
									
					// com 시간
					var keepDate = new Date(comKeep.substring(0,4)+"/"+comKeep.substring(4,6)+"/"+comKeep.substring(6,8));
					keepDate.setHours(comKeep.substring(8,10), comKeep.substring(10,12), comKeep.substring(12,14), 0);
					
					// 현재 시간
					var date = new Date();
								
					// diff millesecond 단위
					var diff = date.getTime() - keepDate.getTime();
					// 설정시간 millesecond 단위
					var sessMilliseconds = 5 * 60 * 1000;
					if (diff <= sessMilliseconds){
						// session alive
						$.sessionTimeout.reset();
					} else {
						// session kill
						return;
					}
					
				} catch(e) {
					// 에러는 무시
					Dcloud.log(e);
					return;
				}
				
			}, 5 * 60 * 1000);
			
		} else {
			
			// 멀티브라우저 지원 com 연동
			setInterval(function(){
				Ajax.DCloudClientAgent({Method : "GetLastInputTime"}, function (data,status) {
					try {
						var result = data.responseJSON;
						if (result != undefined && result.resultCode == "0000"){
							var comKeep = result.resultMsg;
							if (comKeep.length != 14) return;
							
							// com 시간
							var keepDate = new Date(comKeep.substring(0,4)+"/"+comKeep.substring(4,6)+"/"+comKeep.substring(6,8));
							keepDate.setHours(comKeep.substring(8,10), comKeep.substring(10,12), comKeep.substring(12,14), 0);
							
							// 현재 시간
							var date = new Date();
										
							// diff millesecond 단위
							var diff = date.getTime() - keepDate.getTime();
							// 설정시간 millesecond 단위
							var sessMilliseconds = 5 * 60 * 1000;
							if (diff <= sessMilliseconds){
								// session alive
								$.sessionTimeout.reset();
							} else {
								// session kill
								return;
							}
						}
					} catch(e) {
						// 에러는 무시
						Dcloud.log(e);
						return;
					}
				}, {block:false});
				
			}, 5 * 60 * 1000);
			
		}
		
		
		function resultSessionExtend(data,status){
			var dcloudResult = JSON.parse(data.responseText);
			if (dcloudResult.resultCode != "0000"){
				$("#btnSessionTimeout_logout").trigger("click");
				DcloudToast.alert(Lang.getMessage("dcloudSessionTimeout.msg05"), Lang.getMessage("dcloudSessionTimeout.msg06"));
			}
		}
		
		
		
		// 라벨타이머
		var sesstime = o.warnAfter;
		// 라벨타이머2
		var sesstime2 = o.redirAfter;
		
		var s = "";
		s+='<div id="sessionTimeout-dialog" class="pop_wrap" style="display:none;">';
		s+='	<div class="pop_ly w410" style="margin: 0;padding: 20px;">';
		s+='		<h2><span id="lblSessionTime2"></span> '+Lang.getMessage("dcloudSessionTimeout.after")+'<br>'+Lang.getMessage("dcloudSessionTimeout.msg01")+'<spring:message code="sending" /></h2>';
		s+='		<div class="screen_area">';
		s+='			<p class="descript">'+Lang.getMessage("dcloudSessionTimeout.msg02")+' <br>'+Lang.getMessage("dcloudSessionTimeout.msg03")+'</p>';
		s+='			<div class="mgt16" style="margin-top:16px;"><a id="btnSessionTimeout_extend" href="#" class="btn_blue w188 mgr6" style="margin-right: 6px;">'+Lang.getMessage("dcloudSessionTimeout.btn01")+'</a><a id="btnSessionTimeout_logout" href="#" class="btn_gray w188">'+Lang.getMessage("dcloudSessionTimeout.btn02")+'</a></div>';
		s+='		</div>';
		s+='	</div>';
		s+='</div>';
		$('body').append(s);
		$('#sessionTimeout-dialog').dialog({
			autoOpen: false,
			width: 446,
			modal: true,
			resizable: false,
			closeOnEscape: false,
			zIndex: 2000,
			create: function (event, ui) {
		        $(this).parent().eq(0).find(".ui-widget-header").hide();
		    }
			
		});
		
		$("#btnSessionTimeout_extend").unbind("click");
	    $("#btnSessionTimeout_extend").bind("click", function (e) {
	    	$('#sessionTimeout-dialog').dialog('close');
			
	    	$.sessionTimeout.reset();
	    	
	    	/*
			
			//$.ajax({
			//	type: o.keepAliveAjaxRequestType,
			//	url: o.keepAliveUrl
			//});
			
			
			// 리셋
			sesstime = o.warnAfter;
			labelTimer(sesstime);
			
			clearInterval(sessTimer);
			controlDialogTimer('start');
			*/
			
			return false;
	    });
	    
	    $("#btnSessionTimeout_logout").unbind("click");
	    $("#btnSessionTimeout_logout").bind("click", function (e) {
	    	Ajax.ajax("/data/header/logout.do", {}, resultSessLogout);
	    });
	    
	    function resultSessLogout(data,status){
			var dcloudResult = JSON.parse(data.responseText);
			/*
			if (dcloudResult.resultCode != "0000"){
				alert(dcloudResult.resultMsg);
			} else {
				document.location.href = "/";
			}
			*/
			
			parent.comDisconnect();
			document.location.href = "/";	
						
		}
	    
		function controlDialogTimer(action){
			switch(action) {
				case 'start':
					labelTimer(sesstime);
					
					sessTimer = setInterval(function(){
						if (sesstime > 0 ){
							sesstime = sesstime - 1000;
							labelTimer(sesstime);
						} else {
							$('#sessionTimeout-dialog').dialog('open');
							/*
							$("#sessionTimeout-dialog").modal({
								onShow: function (dialog) {
									dialog.container.draggable();
								}
							});*/
							controlRedirTimer('start');
							clearInterval(sessTimer);
						}
						
					}, 1000);
					
					break;

				case 'stop':
					clearInterval(sessTimer);
					
					break;
			}
		}
		
		function controlRedirTimer(action){
			switch(action) {
				case 'start':
					labelTimer2(sesstime2);
					
					sessTimer2 = setInterval(function(){
						if (sesstime2 > 0 ){
							sesstime2 = sesstime2 - 1000;
							labelTimer2(sesstime2);
						} else {
							//로그아웃시킨다
							controlRedirTimer('stop');
							clearInterval(sessTimer2);
							Ajax.ajax("/data/header/logout.do", {}, resultSessLogout);
						}
						
					}, 1000);
					break;

				case 'stop':
					clearInterval(sessTimer2);
					break;
			}
		}
		
		$(document).ajaxComplete(function(event, xhr, settings){
			if (settings.url.indexOf("data/header/sessionExtend.do") == -1 && settings.url.indexOf("data/header/logout.do") == -1){
				$.sessionTimeout.reset();
				
				//if (window.opener != undefined)
				//	window.opener.fnSessionReset();
				if (window.opener && !window.opener.closed)
					window.opener.fnSessionReset();
				
			}
		});
		        
        // 시간라벨에 시간을 찍는다.
        function labelTimer(sectime){
        	var hh,mm,ss;
        	sectime = sectime / 1000;
        	/*
        	if (sectime / 60 / 60 < 1){
        		hh = "00";
        	} else {
        		hh = parseInt(sectime / 60 / 60);
        		if (hh < 10)
        			hh = "0" + hh;
        	}
        	
        	if (sectime / 60 < 1){
        		mm = "00";
        	} else {
        		mm = parseInt(sectime / 60);
        		if (mm < 10)
        			mm = "0" + mm;
        		if (mm >= 60){
        			mm = mm - 60;
        			if (mm < 10) mm = "0" + mm;
        		}
        		
        	}
        	
        	if (mm == "60") mm = "00";
        	
        	ss = sectime % 60;
        	if (ss < 10)
        		ss = "0" + ss;
        	
        	$("#lblSessionTime").text(hh + ":" + mm + ":" + ss);
        	*/
        	
        	
        	hh = parseInt(sectime/3600);
        	mm = parseInt((sectime%3600)/60);
        	ss = sectime%60;
        	
        	if (hh < 10) hh = "0" + hh;
        	if (mm < 10) mm = "0" + mm;
        	if (ss < 10) ss = "0" + ss;
        	
        	$("#lblSessionTime").text(hh + ":" + mm + ":" + ss);
        	if ($("#lblMainSessionTime").length > 0)
        		$("#lblMainSessionTime").text(hh + ":" + mm + ":" + ss);
        	
        }
        
        // 시간라벨에 시간을 찍는다.
        function labelTimer2(sectime){
        	var hh,mm,ss;
        	sectime = sectime / 1000;
        	
        	hh = parseInt(sectime/3600);
        	mm = parseInt((sectime%3600)/60);
        	ss = sectime%60;
        	
        	if (hh < 10) hh = "0" + hh;
        	if (mm < 10) mm = "0" + mm;
        	if (ss < 10) ss = "0" + ss;
        	
        	if (mm == 0 || mm == "00")
        		$("#lblSessionTime2").text(ss + Lang.getMessage("seconds"));
        	else
        		$("#lblSessionTime2").text(mm + Lang.getMessage("minute") + " " + ss + Lang.getMessage("seconds"));
        }
        
        // 생성시 세션 시작
		controlDialogTimer('start');
	};
})( jQuery );
