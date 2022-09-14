/**
 * 
 */


//initializing variables
	var blink, s = 0,
	    c = 0,
	    songindex = 0;
	var song_audio = new Audio();
	// playback mode (presets): normal, shuffle, repeatx1 
	const arrayMode = ["normal", "shuffle", "repeatx1"];
	// genres for split up playlists: all (no split), rock, chill, jazz
	const arrayGenre = ["all", "rock", "chill", "jazz"];
	// set initial mode to normal and initial genre to all
	var mode = arrayMode[0],
	    genre = arrayGenre[0];
	
	var turningOnSpeakerTimeout = null;
	var turningOffSpeakerTimeout = null;
	
	var MILLISEC_HOUR = 5000;

	// array for songs	
	let songs = [ // 18 songs
	    {
	        genre: "chill", //potrei mettere anche artistName e title 
	        url: "buddha_kontekst_no_copyright_music_2839959751367546641.mp3"
	    },
	    {
	        genre: "rock",
	        url: "Coded Moments Of Madness No Copyright Royalty Free Rock Music.mp3"
	    },
	    {
	        genre: "chill",
	        url: "by_the_croft_joakim_karud_free_copyright_safe_music_-4319458117336297589.mp3"
	    },
	    {
	        genre: "chill",
	        url: "fantasy_del_free_copyright_safe_music_-7695021378360065724.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "Home for the Holidays.mp3"
	    },
	    {
	        genre: "rock",
	        url: "Self Deception The Shift No Copyright Rock Music.mp3"
	    },
	    {
	        genre: "chill",
	        url: "happy_life_fredji_vlog_no_copyright_music_QqD7_XIByoK-gucZklwP.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "Soul and Mind.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "Bluesy Vibes.mp3"
	    },
	    {
	        genre: "chill",
	        url: "hip_hop_rap_instrumental_crying_over_you_christophermorrow_free_copyright_music_4086957605365281907.mp3"
	    },
	    {
	        genre: "chill",
	        url: "icy_vindur_a_himitsu_free_copyright_safe_music_-6273418528628016263.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "Bet On It.mp3"
	    },
	    {
	        genre: "rock",
	        url: "Dark Signal I Was Alive No Copyright Rock.mp3"
	    },
	    {
	        genre: "chill",
	        url: "island_mbb_vlog_no_copyright_music_6v51BnMByoK-gucZpR16.mp3"
	    },
	    {
	        genre: "rock",
	        url: "Farewell To Fear Fire No Copyright Rock.mp3"
	    },
	    {
	        genre: "rock",
	        url: "Highway Saints In This Moment No Copyright Rock Music.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "A Night Alone.mp3"
	    },
	    {
	        genre: "jazz",
	        url: "Long Stroll.mp3"
	    },
	
	]
		

	
	var speakerStatus = false;
	var speakerPlaying = false;

	
	
	function setSpeakerStatus(bool){
		speakerStatus = bool;
	}
	
	function getSpeakerStatus(){
		return speakerStatus;
	}

	function setSpeakerPlaying(bool) {
		speakerPlaying = bool;
	}
	
	function getSpeakerPlaying() {
		return speakerPlaying;
	}
	
	initAudio(songs[songindex]);

	// initialize audio object
	// param element is the song (from songs array)
	function initAudio(element) {
	    var title = element.url; // getting url
	    song_audio.src = 'audio/songs/' + title; // setting url
	}
	
	
	// turn off the speaker
	function powerOff() {
		var x = setInterval(function(){
			decreaseVol(); 
			console.log("volume: "+song_audio.volume); 
			if(song_audio.volume==0.0) {
				stopSong();
				$(".button").removeClass('attivo');
			    $(".led").removeClass('attivo');
			    document.getElementById('audiotag1').play();
				clearInterval(x);
			}
			setSpeakerStatus(false);
			setSpeakerPlaying(false);
		},300);
	     // stop the song so it can restart from the beginning when turned on
	    // css buttons and led goes out
	    
	}
	
	// turn on the speaker
	function powerOn() {
	    document.getElementById('audiotag2').play();
	    // css led lights up
	    $(".led").addClass('attivo');
	    song_audio.volume = 0.5; // initial average volume value
		setSpeakerStatus(true);
		setSpeakerPlaying(false);
	}
	
	// play the song
	function playSong() {
	    if (song_audio.paused) {
	        clearInterval(blink); // if song was paused before invoking playSong
	    }
	    song_audio.play();
	    // css button play lights up
	    $(".button.play").addClass('attivo');
		setSpeakerPlaying(true);
	}
	
	// pause the song
	function pauseSong() {
	    if (!song_audio.paused) { // check for next clicks
	        song_audio.pause();
	        // css button starts blinking until pressing stopSong or playSong
	        blink = setInterval(function() {
	            if ($(".button.play").hasClass('attivo'))
	                $(".button.play").removeClass('attivo');
	            else
	                $(".button.play").addClass('attivo');
	        }, 700);
			setSpeakerPlaying(false);
	    }
	}
	
	// stop the song
	function stopSong() {
	
	    clearInterval(blink); // if song was paused before invoking stopSong
	    song_audio.pause(); // pause the song
	    song_audio.currentTime = 0; // reset time
	    $(".button.play").removeClass('attivo'); // css button play goes out
		setSpeakerPlaying(false);
	}
	
	// play next song
	function nextSong() {
	    console.log("mode detected: " + mode);
	    song_audio.pause(); // stop the playing song
	    var next;
	    // mode checking
	    if (mode == "normal") {
	        songindex++; // simply increment
	        if (songindex > songs.length - 1) { //circular play
	            songindex = 0;
	        }
	    } else if (mode == "shuffle") {
	        var j = Math.floor(Math.random() * (songs.length)); // random index
	        /*if(j==songindex){
	        	j=(j+1)%songs.length;
	        }*/
	        songindex = j;
	    }
	
	    // playlist genre checking
	    // if some genre is up initialize and play the song having same genre or "all"
	    if (songs[songindex].genre == genre || genre == arrayGenre[0]) {
	        next = songs[songindex];
	        initAudio(next);
	        console.log("songindex: " + songindex);
	        playSong();
	    }
	    // otherwise, try again with immediately following song
	    else nextSong();
	
	
	}
	
	// play previous song
	function prevSong() {
	    song_audio.pause(); // stop the playing song
	    var prev;
	    // mode checking
	    if (mode == "normal") {
	        songindex--; // simply decrement
	        if (songindex < 0) { // circular play
	            songindex = songs.length - 1;
	        }
	    } else if (mode == "shuffle") {
	        var j = Math.floor(Math.random() * (songs.length)); // random index
	        /*if(j==songindex){
	        	j=(j-1)%songs.length;
	        }*/
	        songindex = j;
	    }
	
	    // playlist genre checking
	    // if some genre is up initialize and play the song having same genre or "all"
	    if (songs[songindex].genre == genre || genre == arrayGenre[0]) {
	        prev = songs[songindex];
	        initAudio(prev);
	        console.log("songindex: " + songindex);
	        playSong();
	    }
	    // otherwise, try again with immediately preceding song
	    else prevSong();
	}
	
	// css button mute lights up
	function muteSpeaker() {
	    $(".button.myc").addClass('attivo');
	}
	
	// css button mute goes out
	function unmuteSpeaker() {
	    $(".button.myc").removeClass('attivo');
	}
	
	// turn up the volume
	function volUp() {
	    // css button plus blinks
	    $(".button.plus").addClass('attivo');
	    setTimeout(function() {
	        $(".button.plus").removeClass('attivo');
	    }, 500);
	
	    // return 1 if tries to increase when volume is already 1
	    if (song_audio.volume == 1) {
	        return song_audio.volume;
	    }
	    var currentVolume = song_audio.volume;
	    currentVolume = Math.round((currentVolume + 0.1) * 10) / 10;
	    return song_audio.volume = currentVolume;
	}
	
	// turn down the volume
	function volDown() {
	    // css button minus blinks
	    $(".button.minus").addClass('attivo');
	    setTimeout(function() {
	        $(".button.minus").removeClass('attivo');
	    }, 500);
	
	    // return 0 if tries to decrease when volume is already 0
	    if (song_audio.volume == 0) {
	        return song_audio.volume;
	    }
	
	   return decreaseVol();
	}
	
	function decreaseVol(){
		  var currentVolume = song_audio.volume;
	    currentVolume = Math.round((currentVolume - 0.1) * 10) / 10;
	    return song_audio.volume = currentVolume;
	}
	
	// change the playback mode (preset)
	function swapMode() { // initial value "normal"
	    s = (s + 1) % 3;
	    mode = arrayMode[s];
	    console.log("mode changed in: " + mode);
	}
	
	// change playlist genre
	function changeGenre() { // initial value "all"
	    c = (c + 1) % arrayGenre.length;
	    genre = arrayGenre[c];
	}
	
	// set the playlist based on the genre and play it
	function selectPlaylist() {
	    changeGenre();
	    console.log("playlist changed, " + genre + " is playing now");
	    // scan the songs array in order 
	    // and initialize the first one found having the chosen genre
	    for (songindex = 0; songindex < songs.length; songindex++) {
	        if (songs[songindex].genre == genre) {
	            initAudio(songs[songindex]);
	            break;
	        }
	    }
		var playlistAudio = new Audio("audio/playlist.mp3");
    	playlistAudio.play();
		playlistAudio.onended = function() {
			var genreAudio = new Audio("audio/"+genre+".mp3");
			genreAudio.play();
		};
	    playSong();
	
	}
	
	// autoplay the next song 
	song_audio.onended = function() {
	    console.log("ended");
	    nextSong();
	};
	
	
	function switchOnSpeaker(){
			var millis, notComputed; // tempo da aggiungere
					
			if(turningOnSpeakerTimeout!=null) {
				turningOnSpeakerTimeout.pause();
				notComputed = turningOnSpeakerTimeout.getTimeLeft();
			} else {
				notComputed = 0;
				millis = 0;
			}
			millis = notComputed + MILLISEC_HOUR;
			console.log("millis: "+millis+"/// notComputed: "+notComputed);
			
			turningOnSpeakerTimeout = new timer(function() {
    			powerOn(); 
				setTimeout(playSong, 1000); 
				turningOnSpeakerTimeout=null;
			}, millis);	
	}
	
	function shutDownSpeaker(){
		var millis, notComputed; // tempo da aggiungere

					if(turningOffSpeakerTimeout!=null) {
						turningOffSpeakerTimeout.pause();
						notComputed = turningOffSpeakerTimeout.getTimeLeft();
					} else {
						notComputed = 0;
						millis = 0;
					}
					millis = notComputed + MILLISEC_HOUR;
					console.log("millis: "+millis+"/// notComputed: "+notComputed);
					
					turningOffSpeakerTimeout = new timer(function() {
    					powerOff();  
						turningOffSpeakerTimeout=null;
					}, millis);
					
	
	}
	
	
	
