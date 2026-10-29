var VideoPlayerIcons = {
    'next':         "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20 22V2h2v20h-2zM2 22l16-10L2 2v20z'/></svg>",
    'shortJump':    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m5 3 3-3 12 12L8 24l-3-3 9-9z'/></svg>",
    'jump':         "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M0 3.8 3 .81 14.13 12 2.99 23.19 0 20.2 8.17 12 0 3.8zM18.04 12l-8.17 8.2 3 2.98L24 12 12.87.81l-3 2.98L18.04 12z'/></svg>",
    'play':         "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-1 17H8V7h3v10zm5 0h-3V7h3v10z'/></svg>",
    'pause':        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM9 18V6l10 6-10 6z'/></svg>",
    'soundOff':     "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M22 1.3 3.5 24 2 22.7 5.8 18H4V8h5v6l2-2.4V8l5.4-3 4-5L22 1.3zM11 17.2v.8l9 5V6.1l-9 11z'/></svg>",
    'soundOn':      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M5 17H0V7h5v10zM7 7v10l9 5V2L7 7zm11 2.1a4.09 4.09 0 0 1 0 5.8l1.22 1.22a5.82 5.82 0 0 0 .01-8.25L18.01 9.1zm2.15-2.14a7.1 7.1 0 0 1-.02 10.08l1.25 1.25a8.88 8.88 0 0 0 .02-12.58l-1.25 1.25z'/></svg>",
    'fullscreen':   "<svg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' clip-rule='evenodd' viewBox='0 0 24 24'><path fill-rule='nonzero' d='M22 5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1zm-7.57 3.52h-1.21a.75.75 0 0 1 0-1.5h3.03c.41 0 .75.34.75.75v3.05a.75.75 0 0 1-1.5 0V9.58L9.58 15.5h1.22a.75.75 0 0 1 0 1.5H7.77a.75.75 0 0 1-.75-.75V13.2a.75.75 0 1 1 1.5 0v1.24z'/></svg>",
    'close':        "<svg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' clip-rule='evenodd' viewBox='0 0 24 24'><path fill-rule='nonzero' d='M21 3.998c0-.478-.379-1-1-1H4c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718a.75.75 0 1 1 1.062 1.062l-2.718 2.717 2.728 2.728a.75.75 0 1 1-1.061 1.062l-2.728-2.728-2.728 2.728a.75.75 0 0 1-1.061-1.062l2.728-2.728-2.722-2.722a.75.75 0 0 1 1.061-1.061z'/></svg>",
    'custom':       "<svg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' viewBox='0 0 24 24'><path d='M24 17.98H11L4 23v-5.02H0V1h24v16.98zM13 8h-2v6h2V8zm-1-1.5A1.25 1.25 0 1 0 12 4a1.25 1.25 0 0 0 0 2.5z'/></svg>"
};

/**
 * 
 * @param {Object}                   schema
 * @param {String}                  [schema.src]
 * @param {Object[]}                [schema.playlist]
 * @param {String}                  [schema.jump] in seconds
 * @param {String}                  [schema.shortJump] in seconds
 * @param {Boolean}                 [schema.muted]
 * @param {Boolean}                 [schema.autoplay]
 * @param {Boolean}                 [schema.loop]
 * @param {Boolean}                 [schema.showName]
 * @param {Function}                [schema.onClose]
 * @param {Array}                   [schema.classes]
 * @param {Object[]}                [schema.controls]
 * @param {'close'|'fullscreen'|'sound'|'custom'}     schema.controls[].type
 * @param {SVGElement}              [schema.controls[].icon]
 * @param {Function}                [schema.controls[].onClick]
 * @param {Number}                  [schema.startAtPerc]
 */
function VideoPlayer( schema ) {

    this._elements = {
        'parent': null,
        'video': null,
        'info': null,
        'overlay': null,
        'name': null,
        'play': null,
        'seekWrap': null,
        'seekBufferBar': null,
        'seekBar': null,
        'timeCurrent': null,
        'timeDuration': null,
        'controls': {
            'close': null,
            'previous': null,
            'next': null,
            'sound': null,
            'back': null,
            'shortBack': null,
            'shortForward': null,
            'forward': null,
            'fullscreen': null,
            'custom': null
        }
    };

    this._settings = {
        'timeoutIdle' : null,
        'timeoutClick': null,
        'timeLastScroll': 0,
        'idleTimeoutMs': 2000,
        'muted': false,
        'autoplay': false,
        'loop': false,
        'showName': true,
        'onCloseCallback': null,
        'onClickCustomCallback': null,
        'jump': null,
        'shortJump': null,
        'src': null,
        'playlistIndex': 0,
        'currentName': null,
        'playlist': null,
        'startAtPerc': null
    };

    this._bound_keydown                     = this._evt_keydown.bind( this );
    this._bound_timeupdate_video            = this._evt_timeupdate_video.bind( this );
    this._bound_loadedmetadata_video        = this._evt_loadedmetadata_video.bind( this );
    this._bound_volumechange_video          = this._evt_volumechange_video.bind( this );
    this._bound_play_video                  = this._evt_play_video.bind( this );
    this._bound_pause_video                 = this._evt_pause_video.bind( this );
    this._bound_mouseenter_overlay          = this._evt_mouseenter_overlay.bind( this );
    this._bound_mouseleave_overlay          = this._evt_mouseleave_overlay.bind( this );
    this._bound_mousemove_overlay           = this._evt_mousemove_overlay.bind( this );
    this._bound_click_jumpBackwards         = this._evt_click_jumpBackwards.bind( this );
    this._bound_click_shortJumpBackwards    = this._evt_click_shortJumpBackwards.bind( this );
    this._bound_click_playPause             = this._evt_click_playPause.bind( this );
    this._bound_click_shortJumpForwards     = this._evt_click_shortJumpForwards.bind( this );
    this._bound_click_jumpForwards          = this._evt_click_jumpForwards.bind( this );
    this._bound_click_gotoPrevious          = this._evt_click_gotoPrevious.bind( this );
    this._bound_click_gotoNext              = this._evt_click_gotoNext.bind( this );
    this._bound_click_sound                 = this._evt_click_sound.bind( this );
    this._bound_click_seekWrap              = this._evt_click_seekWrap.bind( this );
    this._bound_click_close                 = this._evt_click_close.bind( this );
    this._bound_click_fullscreen            = this._evt_click_fullscreen.bind( this );
    this._bound_click_overlay               = this._evt_click_overlay.bind( this );
    this._bound_dblclick_overlay            = this._evt_dblclick_overlay.bind( this );
    this._bound_wheel_overlay               = this._evt_wheel_overlay.bind( this );
    this._bound_click_custom                = this._evt_click_custom.bind( this );
    this._bound_error_video                 = this._evt_error_video.bind( this );




    if ( schema.hasOwnProperty( 'src' ) ) {

        this._settings.src = schema.src;
        this._settings.playlist = null;
        this._settings.playlistIndex = 0;

    } else {

        this._settings.playlist = schema.playlist;
        this._settings.src = schema.playlist[ 0 ];

    }

    if ( schema.hasOwnProperty( 'muted' ) ) {

        this._settings.muted = schema.muted;

    }

    if ( schema.hasOwnProperty( 'autoplay' ) ) {

        this._settings.autoplay = schema.autoplay;

    }

    if ( schema.hasOwnProperty( 'loop' ) ) {

        this._settings.loop = schema.loop;

    }

    if ( schema.hasOwnProperty( 'showName' ) ) {

        this._settings.showName = schema.showName;

    }

    if ( schema.hasOwnProperty( 'onClose' ) ) {

        this._settings.onCloseCallback = schema.onClose;

    }

    if ( schema.hasOwnProperty( 'jump' ) ) {

        this._settings.jump = Number( schema.jump );

    }

    if ( schema.hasOwnProperty( 'shortJump' ) ) {

        this._settings.shortJump = Number( schema.shortJump );

    }

    if ( schema.hasOwnProperty( 'startAtPerc' ) ) {

        this._settings.startAtPerc = Number( schema.startAtPerc );

    }

    this._settings.currentName = this._extractFilename( this._settings.src );

    this._createFromSchema( schema );

};

VideoPlayer.prototype.destroy = function() {

    this._removeEventListeners();

    while( this._elements.parent.firstChild ) {

        this._elements.parent.removeChild( this._elements.parent.firstChild );

    }

    if ( document.body.contains( this._elements.parent ) ) {

        document.body.removeChild( this._elements.parent );
    
    }

    this._settings = {
        'timeoutIdle' : null,
        'timeoutClick': null,
        'timeLastScroll': 0,
        'idleTimeoutMs': 2000,
        'muted': false,
        'autoplay': false,
        'loop': false,
        'showName': true,
        'onCloseCallback': null,
        'onClickCustomCallback': null,
        'jump': null,
        'shortJump': null,
        'src': null,
        'playlistIndex': 0,
        'currentName': null,
        'playlist': null
    };

    this._elements = {
        'parent': null,
        'video': null,
        'info': null,
        'overlay': null,
        'name': null,
        'play': null,
        'seekWrap': null,
        'seekBufferBar': null,
        'seekBar': null,
        'timeCurrent': null,
        'timeDuration': null,
        'controls': {
            'close': null,
            'previous': null,
            'next': null,
            'sound': null,
            'back': null,
            'shortBack': null,
            'shortForward': null,
            'forward': null,
            'fullscreen': null,
            'custom': null
        }
    };

};




VideoPlayer.prototype._extractFilename = function( urlString ) {

    try {

        var url = new URL( urlString );
        var pathname = url.pathname;

        var segments = pathname.split( "/" );
        var filename = segments[ segments.length - 1 ];

        return filename;

    } catch ( error ) {

        var segments = urlString.split( "/" );
        var filename = segments[ segments.length - 1 ];

        return filename;

    }

};

VideoPlayer.prototype._overlayMakeActive = function() {

    this._elements.overlay.classList.add( 'active' );

    this._resetIdleTimer();

};

VideoPlayer.prototype._overlayMakeInactive = function() {

    this._elements.overlay.classList.remove( 'active' );

    clearTimeout( this._settings.timeoutIdle );

};

VideoPlayer.prototype._resetIdleTimer = function() {

    clearTimeout( this._settings.timeoutIdle );

    this._settings.timeoutIdle = setTimeout( function(){

        if ( this._elements.overlay !== null ) {

            this._elements.overlay.classList.remove( 'active' );

        }

    }.bind( this ), this._settings.idleTimeoutMs );

};

VideoPlayer.prototype._formatDuration = function( seconds ) {

    var totalSeconds = Math.floor( seconds );

    var hours = Math.floor( totalSeconds / 3600 );

    var minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );

    var remainingSeconds = totalSeconds % 60;

    var formattedMinutes;

    if ( minutes < 10 ) {

        formattedMinutes = '0' + minutes;

    } else {

        formattedMinutes = minutes;

    }

    var formattedSeconds;

    if ( remainingSeconds < 10 ) {

        formattedSeconds = '0' + remainingSeconds;

    } else {

        formattedSeconds = remainingSeconds;

    }

    if ( hours >= 1 ) {

        var formattedHours;

        if ( hours < 10 ) {

            formattedHours = '0' + hours;

        } else {

            formattedHours = hours;

        }

        return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;

    } else {

        return formattedMinutes + ':' + formattedSeconds;

    }

};

VideoPlayer.prototype._evt_mouseenter_overlay = function() {

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_mouseleave_overlay = function() {

    this._overlayMakeInactive();

};

VideoPlayer.prototype._evt_mousemove_overlay = function() {

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_wheel_overlay = function( evt ) {

    evt.preventDefault();

    var now = Date.now();

    if ( now - this._settings.timeLastScroll > 200 ) {

        if ( evt.deltaY < 0 ) {

            if ( this._settings.jump !== null ) {

                this._evt_click_jumpForwards( evt );

            }

        } else if ( evt.deltaY > 0 ) {

            if ( this._settings.jump !== null ) {

                this._evt_click_jumpBackwards( evt );

            }

        }

        this._settings.timeLastScroll = now;

    }

};

VideoPlayer.prototype._evt_click_custom = function( evt ) {

    if ( this._settings.onClickCustomCallback !== null ) {

        this._settings.onClickCustomCallback( evt, this._settings.src );

    }

};

VideoPlayer.prototype._evt_click_seekWrap = function( evt ) {

    evt.stopPropagation();

    var rect = this._elements.seekWrap.getBoundingClientRect();

    var offsetX = evt.clientX - rect.left;

    var percentage = ( offsetX / rect.width ) * 100;

    if ( percentage < 0 ) {

        percentage = 0;

    } else if ( percentage > 100 ) {

        percentage = 100;

    }

    var fraction = percentage / 100;

    if ( this._elements.video.duration ) {

        this._elements.video.currentTime = this._elements.video.duration * fraction;

    }


};

VideoPlayer.prototype._evt_click_fullscreen = function( evt ) {

    evt.stopPropagation();

    if ( document.fullscreenElement == null ) {

        if ( this._elements.parent.requestFullscreen ) {

            this._elements.parent.requestFullscreen();

        } else if ( this._elements.parent.mozRequestFullScreen ) {

            this._elements.parent.mozRequestFullScreen();

        } else if ( this._elements.parent.webkitRequestFullscreen ) {

            this._elements.parent.webkitRequestFullscreen();

        } else if ( this._elements.parent.msRequestFullscreen ) {

            this._elements.parent.msRequestFullscreen();

        }

    } else {

        if ( document.exitFullscreen ) {

            document.exitFullscreen();

        } else if ( document.mozCancelFullScreen ) {

            document.mozCancelFullScreen();

        } else if ( document.webkitExitFullscreen ) {

            document.webkitExitFullscreen();

        } else if ( document.msExitFullscreen ) {

            document.msExitFullscreen();

        }

    }


};

VideoPlayer.prototype._evt_click_sound = function( evt ) {

    evt.stopPropagation();

    if ( this._elements.video.muted === true ) {

        this._elements.video.muted = false;

    } else {

        this._elements.video.muted = true;

    }

};

VideoPlayer.prototype._evt_click_playPause = function( evt ) {

    evt.stopPropagation();

    this._overlayMakeActive();

    if ( this._elements.video.paused === true ) {

        this._elements.video.play();

    } else {

        this._elements.video.pause();

    }

};

VideoPlayer.prototype._evt_click_overlay = function( evt ) {

    if ( this._settings.timeoutClick !== null ) {

        return;

    }

    this._settings.timeoutClick = setTimeout( function () {

        this._settings.timeoutClick = null;

        this._evt_click_playPause( evt );

    }.bind( this ), 250 );

};

VideoPlayer.prototype._evt_dblclick_overlay = function( evt ) {

    if ( this._settings.timeoutClick !== null ) {

        clearTimeout( this._settings.timeoutClick );

        this._settings.timeoutClick = null;

    }

    this._evt_click_fullscreen( evt );

};

VideoPlayer.prototype._evt_click_jumpForwards = function( evt ) {

    evt.stopPropagation();

    var newTime = this._elements.video.currentTime + this._settings.jump;

    if ( newTime > this._elements.video.duration ) {

        newTime = this._elements.video.duration;

    }

    this._elements.video.currentTime = newTime;

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_click_shortJumpForwards = function( evt ) {

    evt.stopPropagation();

    var newTime = this._elements.video.currentTime + this._settings.shortJump;

    if ( newTime > this._elements.video.duration ) {

        newTime = this._elements.video.duration;

    }

    this._elements.video.currentTime = newTime;

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_click_jumpBackwards = function( evt ) {

    evt.stopPropagation();

    var newTime = this._elements.video.currentTime - this._settings.jump;

    if ( newTime < 0 ) {

        newTime = 0;

    }

    this._elements.video.currentTime = newTime;

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_click_shortJumpBackwards = function( evt ) {

    evt.stopPropagation();

    var newTime = this._elements.video.currentTime - this._settings.shortJump;

    if ( newTime < 0 ) {

        newTime = 0;

    }

    this._elements.video.currentTime = newTime;

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_click_close = function( evt ) {

    evt.stopPropagation();

    this.destroy();

    if ( this._settings.onCloseCallback !== null ) {

        this._settings.onCloseCallback( this._elements.video.src );

    }

};

/**
 * @method
 * @private
 * @param {Event} evt 
 * @returns {void}
 */
VideoPlayer.prototype._evt_click_gotoNext = function( evt ) {

    evt.stopPropagation();

    if ( this._settings.playlist === null || this._settings.playlist.length === 0 ) {

        return;

    }

    if ( this._elements.controls.next.classList.contains( 'inactive' ) ) {

        return;

    }

    this._settings.playlistIndex = this._settings.playlistIndex + 1;

    if ( this._settings.playlistIndex === this._settings.playlist.length - 1 ) {

        this._elements.controls.next.classList.add( 'inactive' );

    }

    this._elements.video.src = this._settings.playlist[ this._settings.playlistIndex ];
    this._elements.video.load();
    this._elements.video.play();

    this._settings.src = this._settings.playlist[ this._settings.playlistIndex ];
    this._settings.currentName = this._extractFilename( this._settings.playlist[ this._settings.playlistIndex ] );

    if ( this._settings.currentName === null ) {

        this._elements.name.textContent = '';

    } else {

        this._elements.name.textContent = this._settings.currentName;

    }

    if ( this._settings.playlistIndex > 0 ) {

        this._elements.controls.previous.classList.remove( 'inactive' );

    } else {

        this._elements.controls.previous.classList.add( 'inactive' );

    }

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_click_gotoPrevious = function( evt ) {

    evt.stopPropagation();

    if ( this._settings.playlist === null || this._settings.playlist.length === 0 ) {

        return;

    }

    if ( this._elements.controls.previous.classList.contains( 'inactive' ) ) {

        return false;

    }

    this._settings.playlistIndex = this._settings.playlistIndex - 1;

    if ( this._settings.playlistIndex === 0 ) {

        this._elements.controls.next.classList.add( 'inactive' );

    }

    this._elements.video.src = this._settings.playlist[ this._settings.playlistIndex ];
    this._elements.video.load();
    this._elements.video.play();

    this._settings.src = this._settings.playlist[ this._settings.playlistIndex ];
    this._settings.currentName = this._extractFilename( this._settings.playlist[ this._settings.playlistIndex ] );

    if ( this._settings.currentName === null ) {

        this._elements.name.textContent = '';

    } else {

        this._elements.name.textContent = this._settings.currentName;

    }

    if ( this._settings.playlistIndex < this._settings.playlist.length - 1 ) {

        this._elements.controls.next.classList.remove( 'inactive' );

    } else {

        this._elements.controls.next.classList.add( 'inactive' );

    }

    this._overlayMakeActive();

};

VideoPlayer.prototype._evt_timeupdate_video = function() {

    if ( this._elements.video === null ) {

        return;

    }

    /**
     * calculate buffer bar
     */
    var buffered = this._elements.video.buffered;
    var duration = this._elements.video.duration;

    if ( duration > 0 && buffered.length > 0 ) {

        var end = buffered.end( buffered.length - 1 );
        var percentBuffered = ( end / duration ) * 100;

        this._elements.seekBufferBar.style.width = percentBuffered + '%';

    }

    /**
     * calculate seek bar
     */
    var value = ( 100 / this._elements.video.duration ) * this._elements.video.currentTime;

    this._elements.seekBar.style.width = value + '%';

    this._elements.timeCurrent.textContent = this._formatDuration( this._elements.video.currentTime );

};

VideoPlayer.prototype._evt_volumechange_video = function() {

    if ( this._elements.controls.sound === null ) {

        return;

    }

    if ( this._elements.video.muted === true ) {

        this._elements.controls.sound.innerHTML = VideoPlayerIcons.soundOff;

    } else {

        this._elements.controls.sound.innerHTML = VideoPlayerIcons.soundOn;

    }

};

VideoPlayer.prototype._evt_loadedmetadata_video = function() {

    this._elements.parent.classList.add( 'loadedmetadata' );

    this._elements.timeDuration.textContent = this._formatDuration( this._elements.video.duration );

    if ( this._elements.controls.sound === null ) {

        return;

    }

    if ( this._elements.video.muted === true ) {

        this._elements.controls.sound.innerHTML = VideoPlayerIcons.soundOff;

    } else {

        this._elements.controls.sound.innerHTML = VideoPlayerIcons.soundOn;

    }

    if ( this._settings.startAtPerc !== null ) {

        this._elements.video.currentTime = this._elements.video.duration * ( this._settings.startAtPerc / 100 );

    }

};

VideoPlayer.prototype._evt_play_video = function() {

    this._elements.play.innerHTML = VideoPlayerIcons.play;

};

VideoPlayer.prototype._evt_pause_video = function() {

    if ( this._elements.play !== null ) {

        this._elements.play.innerHTML = VideoPlayerIcons.pause;

    }

};

VideoPlayer.prototype._evt_error_video = function() {

    if ( this._elements.video.error ) {

        if ( this._elements.video.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ) {

            this._elements.info.textContent = 'The video format or MIME type is not supported.';

        } else if ( this._elements.video.error.code === MediaError.MEDIA_ERR_NETWORK ) {

            this._elements.info.textContent = 'A network error occurred while trying to fetch the video.';

        } else if ( this._elements.video.error.code === MediaError.MEDIA_ERR_DECODE ) {

            this._elements.info.textContent = 'The video was corrupted or could not be decoded.';

        } else if ( this._elements.video.error.code === MediaError.MEDIA_ERR_ABORTED ) {

            this._elements.info.textContent = 'Video loading was aborted.';

        } else {

            this._elements.info.textContent = 'An unknown error occurred while loading the video.';

        }

    }

};

VideoPlayer.prototype._evt_keydown = function( evt ) {

    if ( evt.key === 'f' ) {

        if ( this._elements.controls.fullscreen !== null ) {

            this._evt_click_fullscreen( evt );

        }

    } else if ( evt.key === 'F' ) {

        if ( evt.shiftKey ) {

            this._elements.parent.classList.toggle( 'mod_full' );

        }

    } else if ( evt.key === 'm' ) {

        this._evt_click_sound( evt );

    } else if ( evt.key === 'Escape' ) {

        this._evt_click_close( evt );

    } else if ( evt.key === 'q' ) {

        this._evt_click_close( evt );

    } else if ( evt.key === 'ArrowUp' ) {

        evt.preventDefault();

        this._evt_click_gotoNext( evt );

    } else if ( evt.key === 'ArrowDown' ) {

        evt.preventDefault();

        this._evt_click_gotoPrevious( evt );

    } else if ( evt.key === ' ' ) {

        evt.preventDefault();

        this._evt_click_playPause( evt );

    } else if ( evt.key === 'ArrowRight' && this._settings.jump !== null ) {

        if ( evt.shiftKey && this._settings.shortJump !== null ) {

            this._evt_click_shortJumpForwards( evt );

        } else {

            this._evt_click_jumpForwards( evt );

        }

    } else if ( evt.key === 'ArrowLeft' && this._settings.jump !== null ) {

        if ( evt.shiftKey && this._settings.shortJump !== null ) {

            this._evt_click_shortJumpBackwards( evt );

        } else {

            this._evt_click_jumpBackwards( evt );

        }

    }

};

VideoPlayer.prototype._createFromSchema = function( schema ) {

    this._addElements( schema );

    this._addEventListeners();

};

VideoPlayer.prototype._addElements = function( schema ) {

    this._elements.parent = document.createElement( 'video-player' );
    document.body.appendChild( this._elements.parent );

    if ( schema.hasOwnProperty( 'classes' ) ) {

        var classesNum = schema.classes.length;

        for ( var i = 0 ; i < classesNum ; i++ ) {

            this._elements.parent.classList.add( schema.classes[ i ] );

        }

    }

    this._elements.info = document.createElement( 'DIV' );
    this._elements.info.classList.add( 'infoOverlay' );
    this._elements.info.textContent = 'loading...';
    this._elements.parent.appendChild( this._elements.info );

    this._elements.video = document.createElement( 'video' );
    this._elements.video.muted = this._settings.muted;
    this._elements.video.autoplay = this._settings.autoplay;
    this._elements.video.loop = this._settings.loop;
    this._elements.video.controls = false;
    this._elements.video.src = this._settings.src;
    this._elements.parent.appendChild( this._elements.video );

    this._elements.overlay = document.createElement( 'DIV' );
    this._elements.overlay.classList.add( 'overlay' );
    this._elements.parent.appendChild( this._elements.overlay );

    var ribbonElem = document.createElement( 'DIV' );
    ribbonElem.classList.add( 'ribbon' );
    this._elements.overlay.appendChild( ribbonElem );

    var ribbonInfoElem = document.createElement( 'DIV' );
    ribbonInfoElem.classList.add( 'info' );
    ribbonElem.appendChild( ribbonInfoElem );

    this._elements.name = document.createElement( 'P' );
    this._elements.name.classList.add( 'name' );
    this._elements.name.textContent = this._settings.currentName;
    ribbonInfoElem.appendChild( this._elements.name );

    if ( this._settings.showName === false ) {

        this._elements.name.classList.add( 'hidden' );

    }

    var ribbonDurationElem = document.createElement( 'DIV' );
    ribbonDurationElem.classList.add( 'duration' );
    ribbonElem.appendChild( ribbonDurationElem );

    this._elements.seekWrap = document.createElement( 'DIV' );
    this._elements.seekWrap.classList.add( 'seek' );
    ribbonDurationElem.appendChild( this._elements.seekWrap );

    this._elements.seekBufferBar = document.createElement( 'DIV' );
    this._elements.seekBufferBar.classList.add( 'buffer' );
    this._elements.seekWrap.appendChild( this._elements.seekBufferBar );

    this._elements.seekBar = document.createElement( 'DIV' );
    this._elements.seekBar.classList.add( 'bar' );
    this._elements.seekWrap.appendChild( this._elements.seekBar );

    var ribbonTimesElem = document.createElement( 'DIV' );
    ribbonTimesElem.classList.add( 'times' );
    ribbonElem.appendChild( ribbonTimesElem );

    this._elements.timeCurrent = document.createElement( 'P' );
    this._elements.timeCurrent.classList.add( 'current' );
    ribbonTimesElem.appendChild( this._elements.timeCurrent );

    var controlsElem = document.createElement( 'DIV' );
    controlsElem.classList.add( 'controls' );
    ribbonTimesElem.appendChild( controlsElem );

    if ( this._settings.playlist !== null ) {

        this._elements.controls.previous = document.createElement( 'DIV' );
        this._elements.controls.previous.classList.add( 'controlNext' );
        this._elements.controls.previous.classList.add( 'reverse' );
        this._elements.controls.previous.innerHTML = VideoPlayerIcons.next;
        controlsElem.appendChild( this._elements.controls.previous );

        if ( this._settings.playlistIndex === 0 ) {

            this._elements.controls.previous.classList.add( 'inactive' );

        }

    }

    if ( schema.hasOwnProperty( 'jump' ) ) {

        this._elements.controls.back = document.createElement( 'SPAN' );
        this._elements.controls.back.classList.add( 'additional' );
        this._elements.controls.back.classList.add( 'reverse' );
        this._elements.controls.back.innerHTML = VideoPlayerIcons.jump;
        controlsElem.appendChild( this._elements.controls.back );

    }

    if ( schema.hasOwnProperty( 'shortJump' ) ) {

        this._elements.controls.shortBack = document.createElement( 'SPAN' );
        this._elements.controls.shortBack.classList.add( 'additional' );
        this._elements.controls.shortBack.classList.add( 'reverse' );
        this._elements.controls.shortBack.innerHTML = VideoPlayerIcons.shortJump;
        controlsElem.appendChild( this._elements.controls.shortBack );

    }

    this._elements.play = document.createElement( 'SPAN' );
    this._elements.play.classList.add( 'playPause' );
    controlsElem.appendChild( this._elements.play );

    if ( schema.hasOwnProperty( 'shortJump' ) ) {

        this._elements.controls.shortForward = document.createElement( 'SPAN' );
        this._elements.controls.shortForward.classList.add( 'additional' );
        this._elements.controls.shortForward.innerHTML = VideoPlayerIcons.shortJump;
        controlsElem.appendChild( this._elements.controls.shortForward );

    }

    if ( schema.hasOwnProperty( 'jump' ) ) {

        this._elements.controls.forward = document.createElement( 'SPAN' );
        this._elements.controls.forward.classList.add( 'additional' );
        this._elements.controls.forward.innerHTML = VideoPlayerIcons.jump;
        controlsElem.appendChild( this._elements.controls.forward );

    }

    if ( this._settings.playlist !== null ) {

        this._elements.controls.next = document.createElement( 'DIV' );
        this._elements.controls.next.classList.add( 'controlNext' );
        this._elements.controls.next.innerHTML = VideoPlayerIcons.next;
        controlsElem.appendChild( this._elements.controls.next );

        if ( this._settings.playlistIndex === this._settings.playlist.length - 1 ) {

            this._elements.controls.next.classList.add( 'inactive' );

        }

    }

    this._elements.timeDuration = document.createElement( 'P' );
    this._elements.timeDuration.classList.add( 'full' );
    ribbonTimesElem.appendChild( this._elements.timeDuration );

    if ( schema.hasOwnProperty( 'controls' ) ) {

        var controlsNum = schema.controls.length;

        for ( var i = 0 ; i < controlsNum ; i++ ) {

            if ( schema.controls[ i ].type === 'close' ) {

                this._elements.controls.close = document.createElement( 'DIV' );
                this._elements.controls.close.classList.add( 'controlClose' );

                if ( schema.controls[ i ].hasOwnProperty( 'icon' ) ) {

                    this._elements.controls.close.innerHTML = schema.controls[ i ].icon;

                } else {

                    this._elements.controls.close.innerHTML = VideoPlayerIcons.close;

                }

                this._elements.overlay.appendChild( this._elements.controls.close );

            } else if ( schema.controls[ i ].type === 'sound' ) {

                this._elements.controls.sound = document.createElement( 'DIV' );
                this._elements.controls.sound.classList.add( 'controlSound' );
                ribbonInfoElem.appendChild( this._elements.controls.sound );

            } else if ( schema.controls[ i ].type === 'fullscreen' ) {

                this._elements.controls.fullscreen = document.createElement( 'DIV' );
                this._elements.controls.fullscreen.classList.add( 'controlFullscreen' );

                if ( schema.controls[ i ].hasOwnProperty( 'icon' ) ) {

                    this._elements.controls.fullscreen.innerHTML = schema.controls[ i ].icon;

                } else {

                    this._elements.controls.fullscreen.innerHTML = VideoPlayerIcons.fullscreen;

                }

                ribbonInfoElem.appendChild( this._elements.controls.fullscreen );

            } else if ( schema.controls[ i ].type === 'custom' ) {

                this._elements.controls.custom = document.createElement( 'DIV' );
                this._elements.controls.custom.classList.add( 'controlCustom' );

                if ( schema.controls[ i ].hasOwnProperty( 'icon' ) ) {

                    this._elements.controls.custom.innerHTML = schema.controls[ i ].icon;

                } else {

                    this._elements.controls.custom.innerHTML = VideoPlayerIcons.custom;

                }

                if ( schema.controls[ i ].hasOwnProperty( 'onClick' ) ) {

                    this._settings.onClickCustomCallback = schema.controls[ i ].onClick;

                }

                ribbonInfoElem.appendChild( this._elements.controls.custom );

            }

        }

    }

    this._overlayMakeActive();

};

VideoPlayer.prototype._addEventListeners = function() {

    window.addEventListener( 'keydown', this._bound_keydown );

    this._elements.video.addEventListener( 'timeupdate', this._bound_timeupdate_video );
    this._elements.video.addEventListener( 'loadedmetadata', this._bound_loadedmetadata_video );
    this._elements.video.addEventListener( 'volumechange', this._bound_volumechange_video );
    this._elements.video.addEventListener( 'play', this._bound_play_video );
    this._elements.video.addEventListener( 'pause', this._bound_pause_video );
    this._elements.video.addEventListener( 'error', this._bound_error_video );

    this._elements.overlay.addEventListener( 'mouseenter', this._bound_mouseenter_overlay );
    this._elements.overlay.addEventListener( 'mouseleave', this._bound_mouseleave_overlay );
    this._elements.overlay.addEventListener( 'mousemove', this._bound_mousemove_overlay );
    this._elements.overlay.addEventListener( 'click', this._bound_click_overlay );
    this._elements.overlay.addEventListener( 'dblclick', this._bound_dblclick_overlay );
    this._elements.overlay.addEventListener( 'wheel', this._bound_wheel_overlay );

    this._elements.seekWrap.addEventListener( 'click', this._bound_click_seekWrap );

    this._elements.play.addEventListener( 'click', this._bound_click_playPause );

    if ( this._settings.playlist !== null ) {

        this._elements.controls.previous.addEventListener( 'click', this._bound_click_gotoPrevious );
        this._elements.controls.next.addEventListener( 'click', this._bound_click_gotoNext );

    }

    if ( this._settings.jump !== null ) {

        this._elements.controls.back.addEventListener( 'click', this._bound_click_jumpBackwards );
        this._elements.controls.forward.addEventListener( 'click', this._bound_click_jumpForwards );

    }

    if ( this._settings.shortJump !== null ) {

        this._elements.controls.shortBack.addEventListener( 'click', this._bound_click_shortJumpBackwards );
        this._elements.controls.shortForward.addEventListener( 'click', this._bound_click_shortJumpForwards );

    }

    if ( this._elements.controls.close !== null ) {

        this._elements.controls.close.addEventListener( 'click', this._bound_click_close );

    }

    if ( this._elements.controls.sound !== null ) {

        this._elements.controls.sound.addEventListener( 'click', this._bound_click_sound );

    }

    if ( this._elements.controls.fullscreen !== null ) {

        this._elements.controls.fullscreen.addEventListener( 'click', this._bound_click_fullscreen );

    }

    if ( this._elements.controls.custom !== null ) {

        this._elements.controls.custom.addEventListener( 'click', this._bound_click_custom );

    }

};

VideoPlayer.prototype._removeEventListeners = function() {

    window.removeEventListener( 'keydown', this._bound_keydown );

    this._elements.video.removeEventListener( 'timeupdate', this._bound_timeupdate_video );
    this._elements.video.removeEventListener( 'loadedmetadata', this._bound_loadedmetadata_video );
    this._elements.video.removeEventListener( 'volumechange', this._bound_volumechange_video );
    this._elements.video.removeEventListener( 'play', this._bound_play_video );
    this._elements.video.removeEventListener( 'pause', this._bound_pause_video );
    this._elements.video.removeEventListener( 'error', this._bound_error_video );

    this._elements.overlay.removeEventListener( 'mouseenter', this._bound_mouseenter_overlay );
    this._elements.overlay.removeEventListener( 'mouseleave', this._bound_mouseleave_overlay );
    this._elements.overlay.removeEventListener( 'mousemove', this._bound_mousemove_overlay );
    this._elements.overlay.removeEventListener( 'click', this._bound_click_overlay );
    this._elements.overlay.removeEventListener( 'dblclick', this._bound_dblclick_overlay );
    this._elements.overlay.removeEventListener( 'wheel', this._bound_wheel_overlay );

    this._elements.seekWrap.removeEventListener( 'click', this._bound_click_seekWrap );

    this._elements.play.removeEventListener( 'click', this._bound_click_playPause );

    if ( this._settings.playlist !== null ) {

        this._elements.controls.previous.removeEventListener( 'click', this._bound_click_gotoPrevious );
        this._elements.controls.next.removeEventListener( 'click', this._bound_click_gotoNext );

    }

    if ( this._settings.jump !== null ) {

        this._elements.controls.back.removeEventListener( 'click', this._bound_click_jumpBackwards );
        this._elements.controls.forward.removeEventListener( 'click', this._bound_click_jumpForwards );

    }

    if ( this._settings.shortJump !== null ) {

        this._elements.controls.shortBack.removeEventListener( 'click', this._bound_click_shortJumpBackwards );
        this._elements.controls.shortForward.removeEventListener( 'click', this._bound_click_shortJumpForwards );

    }

    if ( this._elements.controls.close !== null ) {

        this._elements.controls.close.removeEventListener( 'click', this._bound_click_close );

    }

    if ( this._elements.controls.sound !== null ) {

        this._elements.controls.sound.removeEventListener( 'click', this._bound_click_sound );

    }

    if ( this._elements.controls.fullscreen !== null ) {

        this._elements.controls.fullscreen.removeEventListener( 'click', this._bound_click_fullscreen );

    }

    if ( this._elements.controls.custom !== null ) {

        this._elements.controls.custom.removeEventListener( 'click', this._bound_click_custom );

    }

};