/** 全局消息通知
 * @param Refresh func
 */
$.getScript('http://app.shou65.com:8000/socket.io/socket.io.js', function(data, textStatus, jqxhr) {
	if(textStatus === 'success' && jqxhr.status === 200){
		var socket = io.connect('ws://www.shou65.com:8000');
		socket.on('connect', function(data) {
			socket.emit('join', {
				'room': $("ul.nav.pull-right li:eq(4) a").text(),
			});
		});
		socket.on('notice', function(data) {
			$(".badge").text(data.unread_messages_count);
			if(Refresh){Refresh()}; 
		})
	}
});