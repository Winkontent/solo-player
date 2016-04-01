function retrieveData(){
	$.ajax({
		type: "GET",
		url: "http://api.monocle.com/radio/",
		dataType: 'jsonp',
		jsonpCallback: 'monocle_24',
		cache: false,
		success: function(onair) {
			// console.log(onair);
			$('.js-show').text(onair.show);
		}
	})
};

function initAudio(){
	var dragging = false;
	var dataInterval = setInterval(retrieveData, 10000);

	$('#player').jPlayer({
		ready: function(){
			$('.js-toggle').on('click', function(e){
				if($('.audio-player').is('.is-playing')){
					$('#player').jPlayer('pause');
				} else {
					$('#player').jPlayer('play');
				}
			});
		},
		swfPath: '../jquery.jplayer.swf',
		supplied: 'mp3',
		solution: 'html,flash',
		wmode: 'window'
	}).jPlayer('setMedia',{
		mp3: 'https://radio.monocle.com/live'
	}).on($.jPlayer.event.loadeddata, function(e){
		var duration = e.jPlayer.status.duration;
		var player = $(this);
		$('.audio-player, #player').addClass('is-playable');

	}).on($.jPlayer.event.play, function(){
		$('.audio-player, #player').addClass('is-playing');
		retrieveData();
		setInterval(dataInterval);
	}).on($.jPlayer.event.pause, function(){
		$('.audio-player, #player').removeClass('is-playing');
		clearInterval(dataInterval);
	});
}

$(document).ready(initAudio);