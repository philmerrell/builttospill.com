import { EventEmitter, AfterContentInit, ElementRef } from '@angular/core';
import { YoutubePlayerService } from './youtube-player.service';
export declare class YoutubePlayer implements AfterContentInit {
    playerService: YoutubePlayerService;
    private elementRef;
    videoId: string;
    height: number;
    width: number;
    ready: EventEmitter<any>;
    change: EventEmitter<{}>;
    private ytPlayerContainer;
    constructor(playerService: YoutubePlayerService, elementRef: ElementRef);
    ngAfterContentInit(): void;
}
