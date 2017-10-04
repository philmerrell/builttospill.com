import { NgZone, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
export interface PlayerOutputs {
    ready?: EventEmitter<any>;
    change?: EventEmitter<any>;
}
export interface PlayerSize {
    height?: number;
    width?: number;
}
export declare class YoutubePlayerService {
    private zone;
    static readonly win: Window;
    static readonly YT: any;
    static readonly Player: any;
    api: ReplaySubject<any>;
    private isFullscreen;
    private defaultSizes;
    constructor(zone: NgZone);
    private createApi();
    loadPlayerApi(): void;
    setupPlayer(elementId: string, outputs: PlayerOutputs, sizes: PlayerSize, videoId: string): void;
    play(player: any): void;
    pause(player: any): void;
    playVideo(media: any, player: any): void;
    isPlaying(player: any): boolean;
    createPlayer(elementId: string, outputs: PlayerOutputs, sizes: PlayerSize, videoId: string): any;
    toggleFullScreen(player: any, isFullScreen: boolean | null | undefined): void;
    generateUniqueId(): string;
}
