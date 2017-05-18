import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows/shows.service';
import { VideoService } from '../videos/video.service';
import { PlayerService } from '../player/player.service';
import { MusicService } from '../music/music.service';
import { routerAnimation } from '../router-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class HomeComponent implements OnInit, AfterViewInit {
  album: any;
  shows: any = [];
  showsLoading = true;
  videos: any = [];
  videosLoading = true;

  constructor(
    private playerService: PlayerService,
    private showsService: ShowsService,
    private musicService: MusicService,
    private videoService: VideoService) { }

  ngOnInit() {
    this.getShows();
    this.getVideos();
    this.getAlbum();
  }

  ngAfterViewInit() {
    // this.loadTwitterScript();
  }

  getShows() {
    this.showsService.getShows()
      .subscribe(shows => {
        this.shows = shows;
        this.showsLoading = false;
      });
  }

  getAlbum() {
    this.album = this.musicService.albums[0];
  }

  getVideos() {
    this.videoService.getHomeVideos()
      .subscribe(videos => {
        this.videos = videos;
        this.videosLoading = false;
      });
  }

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos);
  }

  // loadTwitterScript() {
  //   !function(d,s,id){
  //               var js: any,
  //                   fjs=d.getElementsByTagName(s)[0],
  //                   p='https';
  //               if(!d.getElementById(id)){
  //                   js=d.createElement(s);
  //                   js.id=id;
  //                   js.src=p+"://platform.twitter.com/widgets.js";
  //                   fjs.parentNode.insertBefore(js,fjs);
  //               }
  //           }
  //           (document,"script","twitter-wjs");
  // }

}
