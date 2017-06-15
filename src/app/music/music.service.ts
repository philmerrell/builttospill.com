import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MusicService {
  albums;

  constructor() {
    this.setAlbums();
  }

  getAlbums() {
    return Observable.of(this.albums);
  }

  setAlbums() {
    this.albums = [
      {
        title: 'Untethered Moon',
        id: 'untethered-moon',
        image: {
          url: 'assets/albums/untethered-moon.jpg'
        },
        releaseDate: '2015-04-18',
        tracks: [
          {
            id: 'tnq1OrbwHt4',
            song: 'All Our Songs',
            album: 'Untethered Moon',
            time: '6:15'
          },
          {
            id: '0hgRgO5y0f4',
            song: 'Living Zoo',
            album: 'Untethered Moon',
            time: '4:22'
          },
          {
            id: 'g1MELddKYLo',
            song: 'On The Way',
            album: 'Untethered Moon',
            time: '4:25'
          },
          {
            id: 'GNrCAInNPA8',
            song: 'Some Other Song',
            album: 'Untethered Moon',
            time: '4:26'
          },
          {
            id: 'LZ1VqwPmKkw',
            song: 'Never Be The Same',
            album: 'Untethered Moon',
            time: '3:15'
          },
          {
            id: 'CJVOXVzLGMk',
            song: 'C.R.E.B',
            album: 'Untethered Moon',
            time: '4:21'
          },
          {
            id: 'G9qEs5bxCkA',
            song: 'Another Day',
            album: 'Untethered Moon',
            time: '3:10'
          },
          {
            id: '9YGMrGyMuRQ',
            song: 'Horizon To Cliff',
            album: 'Untethered Moon',
            time: '2:44'
          },
          {
            id: 'yq-KnD7ln2I',
            song: 'So',
            album: 'Untethered Moon',
            time: '4:28'
          },
          {
            id: '0lk2-Zx_0jQ',
            song: 'When I\'m Blind',
            album: 'Untethered Moon',
            time: '8:23'
          }
        ]
      },
      {
        title: 'There is No Enemy',
        id: 'there-is-no-enemy',
        image: {
          url: 'assets/albums/no-enemy.jpeg'
        },
        releaseDate: '2009-10-06',
        tracks: [
          {
            id: '9rtXZ6X9u6U',
            song: 'Aisle 13',
            album: 'There is No Enemy',
            time: '3:18'
          },
          {
            id: 'IYf3tAtktD8',
            song: 'Hindsight',
            album: 'There is No Enemy',
            time: '3:38'
          },
          {
            id: 'YdLtN0kfyrg',
            song: 'Nowhere Lullaby',
            album: 'There is No Enemy',
            time: '4:00'
          },
          {
            id: 'NPIUDBDxy_s',
            song: 'Good \'Ol Boredom',
            album: 'There is No Enemy',
            time: '6:31'
          },
          {
            id: '7HnzrblXZpo',
            song: 'Life\'s a Dream',
            album: 'There is No Enemy',
            time: '4:54'
          },
          {
            id: 'LX5YOs5JNVE',
            song: 'Oh Yeah',
            album: 'There is No Enemy',
            time: '5:21'
          },
          {
            id: 'iLGe1Lzs4o0',
            song: 'Pat',
            album: 'There is No Enemy',
            time: '2:40'
          },
          {
            id: '_V09XAG9rxI',
            song: 'Done',
            album: 'There is No Enemy',
            time: '6:54'
          },
          {
            id: 'I_n9TJ-pn9Y',
            song: 'Planting Seeds',
            album: 'There is No Enemy',
            time: '4:27'
          },
          {
            id: 'r5FealbsVT8',
            song: 'Thing\'s Fall Apart',
            album: 'There is No Enemy',
            time: '6:15'
          },
          {
            id: 'omINNWOAzLY',
            song: 'Tomorrow',
            album: 'There is No Enemy',
            time: '7:41'
          }
        ]
      },
      {
        title: 'You In Reverse',
        id: 'you-in-reverse',
        image: {
          url: 'assets/albums/you-in-reverse.jpg'
        },
        releaseDate: '2006-04-11',
        tracks: [
          {
            id: 'cH9EJg4o9-s',
            song: 'Goin\' Against Your Mind',
            album: 'You In Reverse',
            time: '8:42'
          },
          {
            id: '-i9T5N4-0_k',
            song: 'Traces',
            album: 'You In Reverse',
            time: '4:43'
          },
          {
            id: '15hUcHR7koo',
            song: 'Liar',
            album: 'You In Reverse',
            time: '5:11'
          },
          {
            id: 'Ss2uYOALCUs',
            song: 'Saturday',
            album: 'You In Reverse',
            time: '2:24'
          },
          {
            id: 'CIme2iaTWqc',
            song: 'Wherever You Go',
            album: 'You In Reverse',
            time: '6:11'
          },
          {
            id: 'mFIBwS0GVX0',
            song: 'Conventional Wisdom',
            album: 'You In Reverse',
            time: '6:21'
          },
          {
            id: 'Vve-fDvwy0s',
            song: 'Gone',
            album: 'You In Reverse',
            time: '5:41'
          },
          {
            id: 'v5SSt3oByjQ',
            song: 'Mess With Time',
            album: 'You In Reverse',
            time: '5:43'
          },
          {
            id: 'nwL6VG8x9P4',
            song: 'Just a Habit',
            album: 'You In Reverse',
            time: '4:27'
          },
          {
            id: '8yblkWa_ROM',
            song: 'The Wait',
            album: 'You In Reverse',
            time: '5:00'
          }
        ]
      },
      {
        title: 'Ancient Melodies of the Future',
        id: 'ancient-melodies-of-the-future',
        image: {
          url: 'assets/albums/ancient-melodies.jpg'
        },
        releaseDate: '2001-07-10',
        tracks: [
          {
            id: 'tRFOjLIl7G0',
            song: 'Strange',
            album: 'Ancient Melodies of the Future',
            time: '4:00'
          },
          {
            id: 'FLN-ipFtdWA',
            song: 'The Host',
            album: 'Ancient Melodies of the Future',
            time: '3:55'
          },
          {
            id: '0WkFogZj974',
            song: 'In Your Mind',
            album: 'Ancient Melodies of the Future',
            time: '3:46'
          },
          {
            id: '4juR5fCNPBM',
            song: 'Alarmed',
            album: 'Ancient Melodies of the Future',
            time: '5:07'
          },
          {
            id: 'imLcdlRG1Kc',
            song: 'Trimmed and Burning',
            album: 'Ancient Melodies of the Future',
            time: '4:17'
          },
          {
            id: '0Tb0gvlZwwU',
            song: 'Happiness',
            album: 'Ancient Melodies of the Future',
            time: '3:41'
          },
          {
            id: 'eXqBk4CQACI',
            song: 'Don\'t Try',
            album: 'Ancient Melodies of the Future',
            time: '3:17'
          },
          {
            id: 'cNJwcr5X3MU',
            song: 'You Are',
            album: 'Ancient Melodies of the Future',
            time: '3:51'
          },
          {
            id: 'CMW-2eHxiBc',
            song: 'Fly Around My Pretty Little Miss',
            album: 'Ancient Melodies of the Future',
            time: '2:45'
          },
          {
            id: 'e4p2InPpqoo',
            song: 'The Weather',
            album: 'Ancient Melodies of the Future',
            time: '4:32'
          }
        ]
      },
      {
        title: 'Keep It Like a Secret',
        id: 'keep-it-like-a-secret',
        image: {
          url: 'assets/albums/keep-it-like-a-secret.jpeg'
        },
        releaseDate: '1999-02-02',
        tracks: [
          {
            id: 'IcyI-UtjssQ',
            song: 'The Plan',
            album: 'Keep It Like a Secret',
            time: '3:29'
          },
          {
            id: 'IcyI-UtjssQ',
            song: 'Center of the Universe',
            album: 'Keep It Like a Secret',
            time: '2:43'
          },
          {
            id: 'owNtZIn7L4A',
            song: 'Carry The Zero',
            album: 'Keep It Like a Secret',
            time: '5:44'
          },
          {
            id: 'iUfr1Bl_e98',
            song: 'Sidewalk',
            album: 'Keep It Like a Secret',
            time: '3:51'
          },
          {
            id: 'RGjDqfL3XTk',
            song: 'Bad Light',
            album: 'Keep It Like a Secret',
            time: '3:22'
          },
          {
            id: '_xZLhwxZ9_M',
            song: 'Time Trap',
            album: 'Keep It Like a Secret',
            time: '5:22'
          },
          {
            id: 'KjGnyGg2pE4',
            song: 'Else',
            album: 'Keep It Like a Secret',
            time: '4:09'
          },
          {
            id: 'IhNPeiy-MeU',
            song: 'You Were Right',
            album: 'Keep It Like a Secret',
            time: '4:46'
          },
          {
            id: 'aP8JVuyhBx8',
            song: 'Temporarily Blind',
            album: 'Keep It Like a Secret',
            time: '4:49'
          },
          {
            id: 'hHnpHs5OcFM',
            song: 'Broken Chairs',
            album: 'Keep It Like a Secret',
            time: '8:41'
          }
        ]
      },
      {
        title: 'Perfect From Now On',
        id: 'perfect-from-now-on',
        image: {
          url: 'assets/albums/perfect-from-now-on.jpg'
        },
        releaseDate: '1997-01-28',
        tracks: [
          {
            id: 'cnU-2R4ohiE',
            song: 'Randy Described Eternity',
            album: 'Perfect From Now On',
            time: '6:06'
          },
          {
            id: 'ygU0gLko39U',
            song: 'I Would Hurt A Fly',
            album: 'Perfect From Now On',
            time: '6:17'
          },
          {
            id: 'Lg8TCuH-HCw',
            song: 'Stop the Show',
            album: 'Perfect From Now On',
            time: '6:27'
          },
          {
            id: '_g4bxsI3ikY',
            song: 'Made-Up Dreams',
            album: 'Perfect From Now On',
            time: '4:53'
          },
          {
            id: 'UcpQ85iVEUA',
            song: 'Velvet Waltz',
            album: 'Perfect From Now On',
            time: '8:34'
          },
          {
            id: 'AKFxF2q_HLQ',
            song: 'Out of Site',
            album: 'Perfect From Now On',
            time: '5:34'
          },
          {
            id: 'W8AqXVL-0ew',
            song: 'Kicked It in the Sun',
            album: 'Perfect From Now On',
            time: '7:33'
          },
          {
            id: 'VAoxWduuu1o',
            song: 'Untrustable / Part 2 (About Someone Else)',
            album: 'Perfect From Now On',
            time: '8:53'
          }
        ]
      },
      {
        title: 'There\'s Nothing Wrong With Love',
        id: 'theres-nothing-wrong-with-love',
        image: {
          url: 'assets/albums/theres-nothing-wrong-with-love.jpg'
        },
        releaseDate: '1994-10-13',
        tracks: [
          {
            id: 'HJCC3QPtv5o',
            song: 'In The Morning',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:38'
          },
          {
            id: 'BKkJXqw8q3Q',
            song: 'Reasons',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:46'
          },
          {
            id: 'f7ysRps-iYA',
            song: 'Big Dipper',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:10'
          },
          {
            id: 'AVtskhcGOtc',
            song: 'Car',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:59'
          },
          {
            id: 'Lg-m-7FkjVA',
            song: 'Fling',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:34'
          },
          {
            id: 'nGcYA2SacJQ',
            song: 'Cleo',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:35'
          },
          {
            id: 'XMfAvgqFzxU',
            song: 'The Source',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:20'
          },
          {
            id: '02TQ37iuu1g',
            song: 'Twin Falls',
            album: 'There\'s Nothing Wrong With Love',
            time: '1:50'
          },
          {
            id: 'maW1ZV8ptzs',
            song: 'Some',
            album: 'There\'s Nothing Wrong With Love',
            time: '5:58'
          },
          {
            id: '3wLAyAlhmxY',
            song: 'Distopian Dream Girl',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:24'
          },
          {
            id: 'XRcRwIQ9ArQ',
            song: 'Israel\'s Song',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:47'
          },
          {
            id: 'RqyqXpDVsUQ',
            song: 'Stab',
            album: 'There\'s Nothing Wrong With Love',
            time: '5:30'
          }
        ]
      }
    ];
  }

}
