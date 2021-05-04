import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  albums;

  constructor() {
    this.setAlbums();
  }

  getAlbums() {
    return of(this.albums);
  }

  setAlbums() {
    this.albums = [
      {
        title: 'Unoriginal Artists',
        id: 'unoriginal-artists',
        image: {
          url: 'assets/albums/unoriginal-artists.jpeg'
        },
        links: {},
        releaseDate: '2021-3-19',
        lyrics: false,
        tracks: [
          {
            id: 'gBhhyplMQDE',
            song: 'Loving Pauper',
            album: 'Unoriginal Artists',
            time: '3:23'
          },
          {
            id: 'S95qYcH6w6s',
            song: 'Ashes To Ashes',
            album: 'Unoriginal Artists',
            time: '5:29'
          },
          {
            id: 'ZfPthI630Vs',
            song: 'I Love You More',
            album: 'Unoriginal Artists',
            time: '2:43'
          },
          {
            id: 'Ybc7Ji3QiOU',
            song: 'Strange',
            album: 'Unoriginal Artists',
            time: '4:28'
          },
          {
            id: 'CDhw5wo1TtY',
            song: 'Back On the Chain Gang',
            album: 'Unoriginal Artists',
            time: '3:27'
          },
          {
            id: 'TWF_svLrqhk',
            song: 'I\'m Glad',
            album: 'Unoriginal Artists',
            time: '3:19'
          },
          {
            id: 'kQn95Td7Y_k',
            song: 'Ta Magia Sto Pegadi',
            album: 'Unoriginal Artists',
            time: '4:53'
          }
        ]
      },
      {
        title: 'Built to Spill Plays the Songs of Daniel Johnston',
        id: 'built-to-spill-plays-the-songs-of-daniel-johnston',
        image: {
          url: 'assets/albums/built-to-spill-plays-the-songs-of-daniel-johnston.jpg'
        },
        links: {},
        releaseDate: '2020-06-12',
        lyrics: false,
        tracks: [
          {
            id: 'L6K-dXzGL_M',
            song: 'Bloody Rainbow',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '2:24'
          },
          {
            id: 'lkn3MWmxukw',
            song: 'Tell Me Now',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '3:01'
          },
          {
            id: 'XMcm6KEgEHw',
            song: 'Honey I Sure Miss You',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '3:30'
          },
          {
            id: 'cM6E5gwRQMk',
            song: 'Good Morning You',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '1:33'
          },
          {
            id: '3kN1JGbiNXk',
            song: 'Heart, Mind and Soul',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '4:28'
          },
          {
            id: 'dupVFFIAwy0',
            song: 'Life in Vain',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '3:26'
          },
          {
            id: '3WYw2grPi-g',
            song: 'Mountain Top',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '2:06'
          },
          {
            id: 'ycHbawf1cmA',
            song: 'Queenie the Dog',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '3:36'
          },
          {
            id: 'nd84RIryF7w',
            song: 'Impossible Love',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '2:45'
          },
          {
            id: '4XXXPs7JoBA',
            song: 'Fake Records of Rock & Roll',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '4:09'
          },
          {
            id: '54WJD_qHPRQ',
            song: 'Fish',
            album: 'Built to Spill Plays the Songs of Daniel Johnston',
            time: '3:20'
          }
        ]
      },
      {
        title: 'Untethered Moon',
        id: 'untethered-moon',
        image: {
          url: 'assets/albums/untethered-moon.jpg'
        },
        links: {
          appleMusic: 'https://geo.itunes.apple.com/us/album/untethered-moon/id967409661?mt=1&app=music',
          googleMusic: 'https://play.google.com/store/music/album/Built_To_Spill_Untethered_Moon?id=Bxffhyf2esinlm4a3bmalhiaj4a',
          spotify: 'https://open.spotify.com/album/6RcWVrwvFmFu2KPALVX9ZZ',
          vinyl: 'http://store.warnermusic.com/warner-bros-records/artists/built-to-spill/untethered-moon-lp.html'
        },
        releaseDate: '2015-04-18',
        lyrics: true,
        tracks: [
          {
            id: 'tnq1OrbwHt4',
            song: 'All Our Songs',
            album: 'Untethered Moon',
            time: '6:15',
            lyrics: 'assets/lyrics/untethered-moon/all-our-songs.png'
          },
          {
            id: '0hgRgO5y0f4',
            song: 'Living Zoo',
            album: 'Untethered Moon',
            time: '4:22',
            lyrics: 'assets/lyrics/untethered-moon/living-zoo.png'
          },
          {
            id: 'g1MELddKYLo',
            song: 'On The Way',
            album: 'Untethered Moon',
            time: '4:25',
            lyrics: 'assets/lyrics/untethered-moon/on-the-way.png'
          },
          {
            id: 'GNrCAInNPA8',
            song: 'Some Other Song',
            album: 'Untethered Moon',
            time: '4:26',
            lyrics: 'assets/lyrics/untethered-moon/some-other-song.png'
          },
          {
            id: 'LZ1VqwPmKkw',
            song: 'Never Be The Same',
            album: 'Untethered Moon',
            time: '3:15',
            lyrics: 'assets/lyrics/untethered-moon/never-be-the-same.png'
          },
          {
            id: 'CJVOXVzLGMk',
            song: 'C.R.E.B',
            album: 'Untethered Moon',
            time: '4:21',
            lyrics: 'assets/lyrics/untethered-moon/creb.png'
          },
          {
            id: 'G9qEs5bxCkA',
            song: 'Another Day',
            album: 'Untethered Moon',
            time: '3:10',
            lyrics: 'assets/lyrics/untethered-moon/another-day.png'
          },
          {
            id: '9YGMrGyMuRQ',
            song: 'Horizon To Cliff',
            album: 'Untethered Moon',
            time: '2:44',
            lyrics: 'assets/lyrics/untethered-moon/horizon-to-cliff.png'
          },
          {
            id: 'yq-KnD7ln2I',
            song: 'So',
            album: 'Untethered Moon',
            time: '4:28',
            lyrics: 'assets/lyrics/untethered-moon/so.png'
          },
          {
            id: '0lk2-Zx_0jQ',
            song: 'When I\'m Blind',
            album: 'Untethered Moon',
            time: '8:23',
            lyrics: 'assets/lyrics/untethered-moon/when-im-blind.png'
          }
        ]
      },
      {
        title: 'There is No Enemy',
        id: 'there-is-no-enemy',
        image: {
          url: 'assets/albums/no-enemy.jpeg'
        },
        links: {
          appleMusic: 'https://geo.itunes.apple.com/us/album/there-is-no-enemy/id332672840?mt=1&app=music',
          googleMusic: 'https://play.google.com/store/music/album/Built_To_Spill_There_Is_No_Enemy?id=B5hwfmhszgc4ffza32zr5utvczi',
          spotify: 'https://open.spotify.com/album/0lJtf2QRr5CBfX7WIAA0DK',
          vinyl: 'http://store.warnermusic.com/warner-bros-records/artists/built-to-spill/untethered-moon-lp.html'
        },
        releaseDate: '2009-10-06',
        lyrics: true,
        tracks: [
          {
            id: '9rtXZ6X9u6U',
            song: 'Aisle 13',
            album: 'There is No Enemy',
            time: '3:18',
            lyrics: 'assets/lyrics/there-is-no-enemy/aisle-13.PNG'
          },
          {
            id: 'IYf3tAtktD8',
            song: 'Hindsight',
            album: 'There is No Enemy',
            time: '3:38',
            lyrics: 'assets/lyrics/there-is-no-enemy/hindsight.PNG'
          },
          {
            id: 'YdLtN0kfyrg',
            song: 'Nowhere Lullaby',
            album: 'There is No Enemy',
            time: '4:00',
            lyrics: 'assets/lyrics/there-is-no-enemy/nowhere-lullaby.PNG'
          },
          {
            id: 'NPIUDBDxy_s',
            song: 'Good \'Ol Boredom',
            album: 'There is No Enemy',
            time: '6:31',
            lyrics: 'assets/lyrics/there-is-no-enemy/good-ol-boredom.PNG'
          },
          {
            id: '7HnzrblXZpo',
            song: 'Life\'s a Dream',
            album: 'There is No Enemy',
            time: '4:54',
            lyrics: 'assets/lyrics/there-is-no-enemy/lifes-a-dream.PNG'
          },
          {
            id: 'LX5YOs5JNVE',
            song: 'Oh Yeah',
            album: 'There is No Enemy',
            time: '5:21',
            lyrics: 'assets/lyrics/there-is-no-enemy/oh-yeah.PNG'
          },
          {
            id: 'iLGe1Lzs4o0',
            song: 'Pat',
            album: 'There is No Enemy',
            time: '2:40',
            lyrics: 'assets/lyrics/there-is-no-enemy/pat.PNG'
          },
          {
            id: '_V09XAG9rxI',
            song: 'Done',
            album: 'There is No Enemy',
            time: '6:54',
            lyrics: 'assets/lyrics/there-is-no-enemy/done.PNG'
          },
          {
            id: 'I_n9TJ-pn9Y',
            song: 'Planting Seeds',
            album: 'There is No Enemy',
            time: '4:27',
            lyrics: 'assets/lyrics/there-is-no-enemy/planting-seeds.PNG'
          },
          {
            id: 'r5FealbsVT8',
            song: 'Thing\'s Fall Apart',
            album: 'There is No Enemy',
            time: '6:15',
            lyrics: 'assets/lyrics/there-is-no-enemy/things-fall-apart.PNG'
          },
          {
            id: 'omINNWOAzLY',
            song: 'Tomorrow',
            album: 'There is No Enemy',
            time: '7:41',
            lyrics: 'assets/lyrics/there-is-no-enemy/tomorrow.PNG'
          }
        ]
      },
      {
        title: 'You In Reverse',
        id: 'you-in-reverse',
        image: {
          url: 'assets/albums/you-in-reverse.jpg'
        },
        links: {
          appleMusic: 'https://geo.itunes.apple.com/us/album/you-in-reverse/id140208918?mt=1&app=music',
          googleMusic: 'https://play.google.com/store/music/album/Built_To_Spill_You_In_Reverse_U_S_Version?id=Btg7owx3cusxsdppv4zchqslvti',
          spotify: 'https://open.spotify.com/album/3jKdxSwYf8UkDhIOIXbwku',
          vinyl: 'http://store.warnermusic.com/warner-bros-records/artists/built-to-spill/you-in-reverse-2xlp.html'
        },
        releaseDate: '2006-04-11',
        lyrics: true,
        tracks: [
          {
            id: 'cH9EJg4o9-s',
            song: 'Goin\' Against Your Mind',
            album: 'You In Reverse',
            time: '8:42',
            lyrics: 'assets/lyrics/you-in-reverse/goin-against-your-mind.PNG'
          },
          {
            id: '-i9T5N4-0_k',
            song: 'Traces',
            album: 'You In Reverse',
            time: '4:43',
            lyrics: 'assets/lyrics/you-in-reverse/traces.PNG'
          },
          {
            id: '15hUcHR7koo',
            song: 'Liar',
            album: 'You In Reverse',
            time: '5:11',
            lyrics: 'assets/lyrics/you-in-reverse/liar.PNG'
          },
          {
            id: 'Ss2uYOALCUs',
            song: 'Saturday',
            album: 'You In Reverse',
            time: '2:24',
            lyrics: 'assets/lyrics/you-in-reverse/saturday.PNG'
          },
          {
            id: 'CIme2iaTWqc',
            song: 'Wherever You Go',
            album: 'You In Reverse',
            time: '6:11',
            lyrics: 'assets/lyrics/you-in-reverse/wherever-you-go.PNG'
          },
          {
            id: 'mFIBwS0GVX0',
            song: 'Conventional Wisdom',
            album: 'You In Reverse',
            time: '6:21',
            lyrics: 'assets/lyrics/you-in-reverse/conventional-wisdom.PNG'
          },
          {
            id: 'Vve-fDvwy0s',
            song: 'Gone',
            album: 'You In Reverse',
            time: '5:41',
            lyrics: 'assets/lyrics/you-in-reverse/gone.PNG'
          },
          {
            id: 'v5SSt3oByjQ',
            song: 'Mess With Time',
            album: 'You In Reverse',
            time: '5:43',
            lyrics: 'assets/lyrics/you-in-reverse/mess-with-time.PNG'
          },
          {
            id: 'nwL6VG8x9P4',
            song: 'Just a Habit',
            album: 'You In Reverse',
            time: '4:27',
            lyrics: 'assets/lyrics/you-in-reverse/just-a-habit.PNG'
          },
          {
            id: '8yblkWa_ROM',
            song: 'The Wait',
            album: 'You In Reverse',
            time: '5:00',
            lyrics: 'assets/lyrics/you-in-reverse/the-wait.PNG'
          }
        ]
      },
      {
        title: 'Ancient Melodies of the Future',
        id: 'ancient-melodies-of-the-future',
        image: {
          url: 'assets/albums/ancient-melodies.jpg'
        },
        links: {
          appleMusic: 'https://geo.itunes.apple.com/us/album/ancient-melodies-of-the-future/id296194043?mt=1&app=music',
          // tslint:disable-next-line:max-line-length
          googleMusic: 'https://play.google.com/store/music/album/Built_To_Spill_Ancient_Melodies_Of_The_Future?id=Bxhrceim33jwodl46s2ueuy44gu',
          spotify: 'https://open.spotify.com/album/3jKdxSwYf8UkDhIOIXbwku',
          vinyl: 'http://store.warnermusic.com/warner-bros-records/artists/built-to-spill/you-in-reverse-2xlp.html'
        },
        releaseDate: '2001-07-10',
        lyrics: true,
        tracks: [
          {
            id: 'tRFOjLIl7G0',
            song: 'Strange',
            album: 'Ancient Melodies of the Future',
            time: '4:00',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/strange.PNG'
          },
          {
            id: 'FLN-ipFtdWA',
            song: 'The Host',
            album: 'Ancient Melodies of the Future',
            time: '3:55',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/the-host.PNG'
          },
          {
            id: '0WkFogZj974',
            song: 'In Your Mind',
            album: 'Ancient Melodies of the Future',
            time: '3:46',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/in-your-mind.PNG'
          },
          {
            id: '4juR5fCNPBM',
            song: 'Alarmed',
            album: 'Ancient Melodies of the Future',
            time: '5:07',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/alarmed.PNG'
          },
          {
            id: 'imLcdlRG1Kc',
            song: 'Trimmed and Burning',
            album: 'Ancient Melodies of the Future',
            time: '4:17',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/trimmed-and-burning.PNG'
          },
          {
            id: '0Tb0gvlZwwU',
            song: 'Happiness',
            album: 'Ancient Melodies of the Future',
            time: '3:41',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/happiness.PNG'
          },
          {
            id: 'eXqBk4CQACI',
            song: 'Don\'t Try',
            album: 'Ancient Melodies of the Future',
            time: '3:17',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/dont-try.PNG'
          },
          {
            id: 'cNJwcr5X3MU',
            song: 'You Are',
            album: 'Ancient Melodies of the Future',
            time: '3:51',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/you-are.PNG'
          },
          {
            id: 'CMW-2eHxiBc',
            song: 'Fly Around My Pretty Little Miss',
            album: 'Ancient Melodies of the Future',
            time: '2:45',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/fly-around-my-pretty-little-miss.PNG'
          },
          {
            id: 'e4p2InPpqoo',
            song: 'The Weather',
            album: 'Ancient Melodies of the Future',
            time: '4:32',
            lyrics: 'assets/lyrics/ancient-melodies-of-the-future/the-weather.PNG'
          }
        ]
      },
      {
        title: 'Live',
        id: 'live',
        image: {
          url: 'assets/albums/live.jpg'
        },
        links: {},
        releaseDate: '2000-04-18',
        lyrics: false,
        tracks: [
          {
            id: 'Plk0lxXdQqc',
            song: 'The Plan',
            album: 'Live',
            time: '4:55'
          },
          {
            id: 'OsnbSHmJ3jw',
            song: 'Randy Described Eternity',
            album: 'Live',
            time: '3:56'
          },
          {
            id: 'QjaN5dRYWM8',
            song: 'Stop The Show',
            album: 'Live',
            time: '4:15'
          },
          {
            id: 'UR6r0Nwhz-E',
            song: 'Virginia Reel Around The Fountain',
            album: 'Live',
            time: '7:00'
          },
          {
            id: 'TLOWuLaQTVQ',
            song: 'Cortez The Killer',
            album: 'Live',
            time: '20:30'
          },
          {
            id: 'E-CRaKByW7w',
            song: 'Car',
            album: 'Live',
            time: '3:07'
          },
          {
            id: 's3wNkzgCZMo',
            song: 'Singing Sores Make Perfect Swords',
            album: 'Live',
            time: '3:33'
          },
          {
            id: 'uhjlzeFLZqI',
            song: 'I Would Hurt a Fly',
            album: 'Live',
            time: '5:24'
          },
          {
            id: 'HZrGGfDdxkI',
            song: 'Broken Chairs',
            album: 'Live',
            time: '19:05'
          }
        ]
      },
      {
        title: 'Keep It Like a Secret',
        id: 'keep-it-like-a-secret',
        image: {
          url: 'assets/albums/keep-it-like-a-secret.jpeg'
        },
        links: {},
        releaseDate: '1999-02-02',
        lyrics: true,
        tracks: [
          {
            id: 'IcyI-UtjssQ',
            song: 'The Plan',
            album: 'Keep It Like a Secret',
            time: '3:29',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/the-plan.PNG'
          },
          {
            id: 'IcyI-UtjssQ',
            song: 'Center of the Universe',
            album: 'Keep It Like a Secret',
            time: '2:43',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/center-of-the-universe.PNG'
          },
          {
            id: 'owNtZIn7L4A',
            song: 'Carry The Zero',
            album: 'Keep It Like a Secret',
            time: '5:44',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/carry-the-zero.PNG'
          },
          {
            id: 'iUfr1Bl_e98',
            song: 'Sidewalk',
            album: 'Keep It Like a Secret',
            time: '3:51',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/sidewalk.PNG'
          },
          {
            id: 'RGjDqfL3XTk',
            song: 'Bad Light',
            album: 'Keep It Like a Secret',
            time: '3:22',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/bad-light.PNG'
          },
          {
            id: '_xZLhwxZ9_M',
            song: 'Time Trap',
            album: 'Keep It Like a Secret',
            time: '5:22',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/time-trap.PNG'
          },
          {
            id: 'KjGnyGg2pE4',
            song: 'Else',
            album: 'Keep It Like a Secret',
            time: '4:09',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/else.PNG'
          },
          {
            id: 'IhNPeiy-MeU',
            song: 'You Were Right',
            album: 'Keep It Like a Secret',
            time: '4:46',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/you-were-right.PNG'
          },
          {
            id: 'aP8JVuyhBx8',
            song: 'Temporarily Blind',
            album: 'Keep It Like a Secret',
            time: '4:49',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/temporarily-blind.PNG'
          },
          {
            id: 'hHnpHs5OcFM',
            song: 'Broken Chairs',
            album: 'Keep It Like a Secret',
            time: '8:41',
            lyrics: 'assets/lyrics/keep-it-like-a-secret/broken-chairs.PNG'
          }
        ]
      },
      {
        title: 'Perfect From Now On',
        id: 'perfect-from-now-on',
        image: {
          url: 'assets/albums/perfect-from-now-on.jpg'
        },
        links: {},
        releaseDate: '1997-01-28',
        lyrics: true,
        tracks: [
          {
            id: 'cnU-2R4ohiE',
            song: 'Randy Described Eternity',
            album: 'Perfect From Now On',
            time: '6:06',
            lyrics: 'assets/lyrics/perfect-from-now-on/randy-described-eternity.PNG'
          },
          {
            id: 'ygU0gLko39U',
            song: 'I Would Hurt A Fly',
            album: 'Perfect From Now On',
            time: '6:17',
            lyrics: 'assets/lyrics/perfect-from-now-on/I-would-hurt-a-fly.PNG'
          },
          {
            id: 'Lg8TCuH-HCw',
            song: 'Stop the Show',
            album: 'Perfect From Now On',
            time: '6:27',
            lyrics: 'assets/lyrics/perfect-from-now-on/stop-the-show.PNG'
          },
          {
            id: '_g4bxsI3ikY',
            song: 'Made-Up Dreams',
            album: 'Perfect From Now On',
            time: '4:53',
            lyrics: 'assets/lyrics/perfect-from-now-on/made-up-dreams.PNG'
          },
          {
            id: 'UcpQ85iVEUA',
            song: 'Velvet Waltz',
            album: 'Perfect From Now On',
            time: '8:34',
            lyrics: 'assets/lyrics/perfect-from-now-on/velvet-waltz.PNG'
          },
          {
            id: 'AKFxF2q_HLQ',
            song: 'Out of Site',
            album: 'Perfect From Now On',
            time: '5:34',
            lyrics: 'assets/lyrics/perfect-from-now-on/out-of-site.PNG'
          },
          {
            id: 'W8AqXVL-0ew',
            song: 'Kicked It in the Sun',
            album: 'Perfect From Now On',
            time: '7:33',
            lyrics: 'assets/lyrics/perfect-from-now-on/kicked-it-in-the-sun.PNG'
          },
          {
            id: 'VAoxWduuu1o',
            song: 'Untrustable / Part 2 (About Someone Else)',
            album: 'Perfect From Now On',
            time: '8:53',
            lyrics: 'assets/lyrics/perfect-from-now-on/untrustable.PNG'
          }
        ]
      },
      {
        title: 'The Normal Years',
        id: 'the-normal-years',
        image: {
          url: 'assets/albums/the-normal-years.jpg'
        },
        links: {},
        releaseDate: '1996-04-30',
        lyrics: true,
        tracks: [
          {
            id: 'ZwDpfiXergE',
            song: 'So & So So & So From Wherever Wherever',
            album: 'The Normal Years',
            time: '4:39',
            lyrics: 'assets/lyrics/the-normal-years/so-and-so.PNG'
          },
          {
            id: 'REohmiR24-w',
            song: 'Shortcut',
            album: 'The Normal Years',
            time: '1:27',
            lyrics: 'assets/lyrics/the-normal-years/shortcut.PNG'
          },
          {
            id: 'X-lNIzeJfr0',
            song: 'Car',
            album: 'The Normal Years',
            time: '3:08',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/car.PNG'
          },
          {
            id: 'dCCZgfmEeB4',
            song: 'Some Things Last a Long Time',
            album: 'The Normal Years',
            time: '5:10',
            lyrics: 'assets/lyrics/the-normal-years/some-things-last-a-long-time.PNG'
          },
          {
            id: 'O-UM82jOgY8',
            song: 'Girl',
            album: 'The Normal Years',
            time: '2:48',
            lyrics: 'assets/lyrics/the-normal-years/girl.PNG'
          },
          {
            id: 'LT6EQNYqeuU',
            song: 'Joyride',
            album: 'The Normal Years',
            time: '3:37',
            lyrics: 'assets/lyrics/the-normal-years/joyride.PNG'
          },
          {
            id: 'QPgcxth5acU',
            song: 'Some',
            album: 'The Normal Years',
            time: '4:10',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/some.PNG'
          },
          {
            id: 'pq5oMaYig1E',
            song: 'Sick & Wrong',
            album: 'The Normal Years',
            time: '4:05',
            lyrics: 'assets/lyrics/the-normal-years/sick-and-wrong.PNG'
          },
          {
            id: 'kgfHSeLL9oQ',
            song: 'Still Flat',
            album: 'The Normal Years',
            time: '4:21',
            lyrics: 'assets/lyrics/the-normal-years/still-flat.PNG'
          },
          {
            id: 'FkeJ28P1Jzw',
            song: 'Terrible/Perfect',
            album: 'The Normal Years',
            time: '5:33',
            lyrics: 'assets/lyrics/the-normal-years/terrible-perfect.PNG'
          }
        ]
      },
      {
        title: 'Built to Spill Caustic Resin',
        id: 'built-to-spill-caustic-resin',
        image: {
          url: 'assets/albums/built-to-spill-caustic-resin.jpg'
        },
        links: {},
        releaseDate: '1-28-1995',
        lyrics: true,
        tracks: [
          {
            id: 'rrfPnPL1OVM',
            song: 'When Not Being Stupid is Not Enough',
            album: 'Built to Spill Caustic Resin',
            time: '9:18',
            lyrics: 'assets/lyrics/built-to-spill-caustic-resin/when-not-being-stupid-is-not-enough.PNG'
          },
          {
            id: 'wkMQ4AMwMw4',
            song: 'One Thing',
            album: 'Built to Spill Caustic Resin',
            time: '5:08',
            lyrics: 'assets/lyrics/built-to-spill-caustic-resin/one-thing.PNG'
          },
          {
            id: 'ttZENC20bbQ',
            song: 'Shit Brown Eyes',
            album: 'Built to Spill Caustic Resin',
            time: '3:29'
          },
          {
            id: 'lht4n1wEuzw',
            song: 'She\'s Real',
            album: 'Built to Spill Caustic Resin',
            time: '8:13'
          },
        ]
      },
      {
        title: 'There\'s Nothing Wrong With Love',
        id: 'theres-nothing-wrong-with-love',
        image: {
          url: 'assets/albums/theres-nothing-wrong-with-love.jpg'
        },
        links: {},
        releaseDate: '1994-10-13',
        lyrics: true,
        tracks: [
          {
            id: 'HJCC3QPtv5o',
            song: 'In The Morning',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:38',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/in-the-morning.PNG'
          },
          {
            id: 'BKkJXqw8q3Q',
            song: 'Reasons',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:46',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/reasons.PNG'
          },
          {
            id: 'f7ysRps-iYA',
            song: 'Big Dipper',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:10',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/big-dipper.PNG'
          },
          {
            id: 'AVtskhcGOtc',
            song: 'Car',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:59',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/car.PNG'
          },
          {
            id: 'Lg-m-7FkjVA',
            song: 'Fling',
            album: 'There\'s Nothing Wrong With Love',
            time: '2:34',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/fling.PNG'
          },
          {
            id: 'nGcYA2SacJQ',
            song: 'Cleo',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:35',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/cleo.PNG'
          },
          {
            id: 'XMfAvgqFzxU',
            song: 'The Source',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:20',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/the-source.PNG'
          },
          {
            id: '02TQ37iuu1g',
            song: 'Twin Falls',
            album: 'There\'s Nothing Wrong With Love',
            time: '1:50',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/twin-falls.PNG'
          },
          {
            id: 'maW1ZV8ptzs',
            song: 'Some',
            album: 'There\'s Nothing Wrong With Love',
            time: '5:58',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/some.PNG'
          },
          {
            id: '3wLAyAlhmxY',
            song: 'Dystopian Dream Girl',
            album: 'There\'s Nothing Wrong With Love',
            time: '4:24',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/dystopian-dream-girl.PNG'
          },
          {
            id: 'XRcRwIQ9ArQ',
            song: 'Israel\'s Song',
            album: 'There\'s Nothing Wrong With Love',
            time: '3:47',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/isreals-song.PNG'
          },
          {
            id: 'RqyqXpDVsUQ',
            song: 'Stab',
            album: 'There\'s Nothing Wrong With Love',
            time: '5:30',
            lyrics: 'assets/lyrics/theres-nothing-wrong-with-love/stab.PNG'
          }
        ]
      },
      {
        title: 'Ultimate Alternative Wavers',
        id: 'ultimate-alternative-wavers',
        image: {
          url: 'assets/albums/ultimate-alternative-wavers.jpg'
        },
        links: {},
        releaseDate: '1993-04-01',
        lyrics: true,
        tracks: [
          {
            id: 'ox6uA-OOSs8',
            song: 'The First Song',
            album: 'Ultimate Alternative Wavers',
            time: '4:02',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/the-first-song.PNG'
          },
          {
            id: 'XlZrGH7RHIY',
            song: 'Three Years Ago Today',
            album: 'Ultimate Alternative Wavers',
            time: '3:56',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/three-years-ago-today.PNG'

          },
          {
            id: 'mKbnCkOx1rM',
            song: 'Revolution',
            album: 'Ultimate Alternative Wavers',
            time: '4:25',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/revolution.PNG'
          },
          {
            id: '75HRDkKbHls',
            song: 'Shameful Dread',
            album: 'Ultimate Alternative Wavers',
            time: '8:29',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/shameful-dread.PNG'
          },
          {
            id: 'NujBMqn0tHA',
            song: 'Nowhere Nothin\' Fuckup',
            album: 'Ultimate Alternative Wavers',
            time: '6:34',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/nowhere-nothing-fuck-up.PNG'
          },
          {
            id: 'H78E971SKrM',
            song: 'Get a Life',
            album: 'Ultimate Alternative Wavers',
            time: '5:53',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/get-a-life.PNG'
          },
          {
            id: 'vgpoFe1C0cQ',
            song: 'Built to Spill',
            album: 'Ultimate Alternative Wavers',
            time: '5:52',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/built-to-spill.PNG'
          },
          {
            id: 'V9yvcSS6PEI',
            song: 'Lie for a Lie',
            album: 'Ultimate Alternative Wavers',
            time: '3:16',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/lie-for-a-lie.PNG'
          },
          {
            id: '3DtFTpMETag',
            song: 'Hazy',
            album: 'Ultimate Alternative Wavers',
            time: '6:41',
            lyrics: 'assets/lyrics/ultimate-alternative-wavers/hazy.PNG'
          },
          {
            id: 'Ne1vNTsPOms',
            song: 'Built Too Long, Parts 1, 2 & 3',
            album: 'Ultimate Alternative Wavers',
            time: '9:24'
          }
        ]
      }
    ];
  }
}
