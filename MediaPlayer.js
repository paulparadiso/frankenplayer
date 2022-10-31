class Player {

    constructor(videoElement, args, src=null) {
        this.mediaObject = document.querySelector(videoElement);
        this.args = args;
        this.setupMediaPlayer();
        this.src = src;
        if(this.src != null) {
            this.mediaObject.src = src;
        }
    }

    setupMediaPlayer() {
        if(this.args.autoplay === true) {
            this.mediaObject.autoplay = true;
        }
        if(this.args.loop === true) {
            this.mediaObject.loop = true;
        }
    }

    setSrc() {  

    }

    play() {
        this.mediaObject.play();
    }

    runCommand(command) {
        if(this.mediaObject.hasOwnProperty(command)) {
            this.mediaObject[command]();
        }
    }

    pause() {
        this.mediaObject.pause();
    }

    setVolume(level) {
        console.log(`Setting volume to ${level}`);
        this.mediaObject.volume = level;
    }

    getCurrentTime() {
        return this.mediaObject.currentTime;
    }


}

//module.exports = Player;