"use strict";
var core_1 = require('@angular/core');
var youtube_player_service_1 = require('./youtube-player.service');
var YoutubePlayer = (function () {
    function YoutubePlayer(playerService, elementRef) {
        this.playerService = playerService;
        this.elementRef = elementRef;
        this.videoId = '';
        // player created and initialized - sends instance of the player
        this.ready = new core_1.EventEmitter();
        // state change: send the YT event with its state
        this.change = new core_1.EventEmitter();
    }
    YoutubePlayer.prototype.ngAfterContentInit = function () {
        var htmlId = this.playerService.generateUniqueId();
        var playerSize = { height: this.height, width: this.width };
        this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
        this.playerService.loadPlayerApi();
        this.playerService.setupPlayer(htmlId, {
            ready: this.ready,
            change: this.change
        }, playerSize, this.videoId);
    };
    YoutubePlayer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'youtube-player',
                    template: "\n\t\t<div id=\"yt-player-ng2-component\" #ytPlayerContainer></div>\n\t",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YoutubePlayer.ctorParameters = function () { return [
        { type: youtube_player_service_1.YoutubePlayerService, },
        { type: core_1.ElementRef, },
    ]; };
    YoutubePlayer.propDecorators = {
        'videoId': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'ready': [{ type: core_1.Output },],
        'change': [{ type: core_1.Output },],
        'ytPlayerContainer': [{ type: core_1.ViewChild, args: ['ytPlayerContainer',] },],
    };
    return YoutubePlayer;
}());
exports.YoutubePlayer = YoutubePlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1wbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieW91dHViZS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBeUgsZUFBZSxDQUFDLENBQUE7QUFFekksdUNBQXFDLDBCQUEwQixDQUFDLENBQUE7QUFHaEU7SUFZQyx1QkFDUSxhQUFtQyxFQUNsQyxVQUFzQjtRQUR2QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWI5QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBSXRCLGdFQUFnRTtRQUMvRCxVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFhLENBQUM7UUFDdkMsaURBQWlEO1FBQ2hELFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQVE3QixDQUFDO0lBRUQsMENBQWtCLEdBQWxCO1FBQ0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JELElBQU0sVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNLLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSx5RUFFVDtvQkFDRCxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtpQkFDL0MsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDRCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSw2Q0FBb0IsR0FBRztRQUM5QixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO0tBQ25CLEVBSDZGLENBRzdGLENBQUM7SUFDSyw0QkFBYyxHQUEyQztRQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM3QixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMzQixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUM1QixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUM3QixtQkFBbUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUcsRUFBRSxFQUFFO0tBQ3pFLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFsRFkscUJBQWEsZ0JBa0R6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWW91dHViZVBsYXllclNlcnZpY2UgfSBmcm9tICcuL3lvdXR1YmUtcGxheWVyLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBjbGFzcyBZb3V0dWJlUGxheWVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cdCB2aWRlb0lkOiBzdHJpbmcgPSAnJztcblx0IGhlaWdodDogbnVtYmVyO1xuXHQgd2lkdGg6IG51bWJlcjtcblxuXHQvLyBwbGF5ZXIgY3JlYXRlZCBhbmQgaW5pdGlhbGl6ZWQgLSBzZW5kcyBpbnN0YW5jZSBvZiB0aGUgcGxheWVyXG5cdCByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8WVQuUGxheWVyPigpO1xuXHQvLyBzdGF0ZSBjaGFuZ2U6IHNlbmQgdGhlIFlUIGV2ZW50IHdpdGggaXRzIHN0YXRlXG5cdCBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0IHByaXZhdGUgeXRQbGF5ZXJDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIHBsYXllclNlcnZpY2U6IFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuXHQpIHtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCAoKSB7XG5cdFx0Y29uc3QgaHRtbElkID0gdGhpcy5wbGF5ZXJTZXJ2aWNlLmdlbmVyYXRlVW5pcXVlSWQoKTtcblx0XHRjb25zdCBwbGF5ZXJTaXplID0geyBoZWlnaHQ6IHRoaXMuaGVpZ2h0LCB3aWR0aDogdGhpcy53aWR0aCB9O1xuXHRcdHRoaXMueXRQbGF5ZXJDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgaHRtbElkKTtcblx0XHR0aGlzLnBsYXllclNlcnZpY2UubG9hZFBsYXllckFwaSgpO1xuXHRcdHRoaXMucGxheWVyU2VydmljZS5zZXR1cFBsYXllcihodG1sSWQsIHtcblx0XHRcdHJlYWR5OiB0aGlzLnJlYWR5LFxuXHRcdFx0Y2hhbmdlOiB0aGlzLmNoYW5nZVxuXHRcdH0sIHBsYXllclNpemUsIHRoaXMudmlkZW9JZCk7XG5cdH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcblx0c2VsZWN0b3I6ICd5b3V0dWJlLXBsYXllcicsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiBpZD1cInl0LXBsYXllci1uZzItY29tcG9uZW50XCIgI3l0UGxheWVyQ29udGFpbmVyPjwvZGl2PlxuXHRgLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBZb3V0dWJlUGxheWVyU2VydmljZSwgfSxcbnt0eXBlOiBFbGVtZW50UmVmLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4ndmlkZW9JZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidoZWlnaHQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nd2lkdGgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ncmVhZHknOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4neXRQbGF5ZXJDb250YWluZXInOiBbeyB0eXBlOiBWaWV3Q2hpbGQsIGFyZ3M6IFsneXRQbGF5ZXJDb250YWluZXInLCBdIH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==