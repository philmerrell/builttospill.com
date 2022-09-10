import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoType'
})
export class VideoTypePipe implements PipeTransform {

  transform(videos: any, type: any): any {
    return videos.filter(video => video.type === type);
  }

}
