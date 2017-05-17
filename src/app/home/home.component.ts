import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows/shows.service';
import { VideoService } from '../videos/video.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  shows: any = [];
  showsLoading = true;
  videos: any = [];
  videosLoading = true;

  constructor(
    private playerService: PlayerService,
    private showsService: ShowsService,
    private videoService: VideoService) { }

  ngOnInit() {
    this.getShows();
    this.getVideos();
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

  getVideos() {
    this.videoService.getHomeVideos()
      .subscribe(videos => {
        this.videos = videos;
        this.videosLoading = false;
      });
  }

  playVideo(event, video) {
    event.preventDefault();
    this.playerService.playThis(video);
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
