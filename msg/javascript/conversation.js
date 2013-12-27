$(document).ready(function(){

	// 数据初始化
	var baseUrl = 'http://www.shou65.com/';
	var setHeader = function (xhr) {
		xhr.setRequestHeader('X-App-Token', '91ba53b2f759af99');
	 	xhr.setRequestHeader('X-Auth-Token', 'f8d0b904c7739bc2');
	}
	var currentUser = {
		avatar_url: baseUrl + $('a.small.avatar img').attr('src'),
		nickname: $('ul.nav.pull-right li:nth-child(5) a').text(),
		user_url: baseUrl + $('ul.nav.pull-right li:nth-child(5) a').attr('href')
	}
	var chatUser = {
		avatar_url: baseUrl + $('div.photo.photo-c1 a img').attr('src'),
		nickname: $('div.title a:nth-child(1)').text(),
		user_url: baseUrl + $('div.photo.photo-c1 a').attr('href'),
	}

	// UI初始化
	$('body,html').animate({
		scrollTop: $('#J_sendBox').offset().top - $(window).height() + 80
	}, 'slow');

	$('#J_sendBox').focus();

	// 发布
	$('#J_sendButton').click(function(e) {
		var content = $('#J_sendBox').val();
		if (!content) {return;}
		$.ajax({
			type: 'POST',
			url: baseUrl + 'api/v1/talks/' + '52b15ca825d980b80e003bc0' + '/messages',
			data: {'content': content},
			success: function sendCallback(data){
				var it = parseData(data);
				$.get('javascript/tmpl/_message.html', function(response) {
					var tmpl = doT.template(response);
					$('#J_messages').append(tmpl(it));
					$('#J_sendBox').val(null);
					$('body,html').animate({
						scrollTop: $('#J_sendBox').offset().top - $(window).height() + 80
					}, 'slow');
				}, 'text');
			},
			beforeSend: setHeader,
		});

		return false;
	})

	/** 提醒处理
	 * 	@param Refresh 全局变量函数，供application.js调用
	 */
	Refresh = function(){
		$.ajax({
			type: 'GET',
			url: baseUrl + 'api/v1/talks/' + '52b15ca825d980b80e003bc0' + '/messages?per_page=10',
			success: function sendCallback(data){
				var it = parseData(data);
				$.get('javascript/tmpl/_message.html', function(response) {
					var tmpl = doT.template(response);
					$('#J_messages').append(tmpl(it));
					$('#J_sendBox').val(null);
					$('body,html').animate({
						scrollTop: $('#J_sendBox').offset().top - $(window).height() + 80
					}, 'slow');
				}, 'text');
			},
			beforeSend: setHeader,
		});
	}

	// 数据转换
	function parseData(data){
		data = data.message? data.message : data.messages[0]; //兼容收发两种情况
		data.avatar_url = baseUrl + data.avatar_url;
		data.content = '：' + data.content;
		if(data.nickname === currentUser.nickname){
			data.direction = 'right';
		}
		if(/\.jpeg/.test(data.file_url)){
			data.image_url = baseUrl + data.image_url;
			data.location = undefined;
	    }else if(/\.amr|\.mp3/.test(data.file_url)){
			data.sound_url_amr = baseUrl + data.file_url;
			data.sound_url_ogg = baseUrl + data.file_url + '.ogg';
			data.sound_url_mp3 = baseUrl + data.file_url + '.mp3';
			data.location = undefined;
	    }else if(data.content){
	    	data.location = undefined;
	    }else{
			data.image_url = '/images/map.png';
	    };
	    return data;
	}

	// keyboard event
	$('form').on('keydown', function(e) {
		if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
			$(this).trigger('submit');
		}
	});

})