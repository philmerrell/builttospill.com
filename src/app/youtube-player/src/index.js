"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var youtube_player_component_1 = require('./youtube-player.component');
var youtube_player_service_1 = require('./youtube-player.service');
var YoutubePlayerModule = (function () {
    function YoutubePlayerModule() {
    }
    YoutubePlayerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        youtube_player_component_1.YoutubePlayer
                    ],
                    exports: [
                        youtube_player_component_1.YoutubePlayer
                    ],
                    providers: [
                        youtube_player_service_1.YoutubePlayerService
                    ]
                },] },
    ];
    /** @nocollapse */
    YoutubePlayerModule.ctorParameters = function () { return []; };
    return YoutubePlayerModule;
}());
exports.YoutubePlayerModule = YoutubePlayerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBRS9DLHlDQUE4Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzNELHVDQUFxQywwQkFBMEIsQ0FBQyxDQUFBO0FBR2hFO0lBQUE7SUFtQkEsQ0FBQztJQW5CeUMsOEJBQVUsR0FBMEI7UUFDOUUsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixPQUFPLEVBQUU7d0JBQ1AscUJBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdDQUFhO3FCQUNkO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3Q0FBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsNkNBQW9CO3FCQUNyQjtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksMkJBQW1CLHNCQW1CL0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBZb3V0dWJlUGxheWVyIH0gZnJvbSAnLi95b3V0dWJlLXBsYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgWW91dHViZVBsYXllclNlcnZpY2UgfSBmcm9tICcuL3lvdXR1YmUtcGxheWVyLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBjbGFzcyBZb3V0dWJlUGxheWVyTW9kdWxlIHsgc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgWW91dHViZVBsYXllclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgWW91dHViZVBsYXllclxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBZb3V0dWJlUGxheWVyU2VydmljZVxuICBdXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19