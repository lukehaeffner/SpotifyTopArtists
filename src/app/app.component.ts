import { Component, OnInit  } from '@angular/core';
import { SpotifyEndpoints } from "./spotify-endpoints"
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../environments/environment';
import { QueryType } from "./spotify-query-types";
import axios from 'axios'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  active: 1; // This is to make sure that "Artists" is displaying first 
  typeSelected:string = "Artists"; // For displaying the title
  arrayArtists:any[] = [];
  arrayAlbums:any[] = [];
  redirect = `https://accounts.spotify.com/authorize?client_id=${environment.CLIENT_ID}&redirect_uri=http:%2F%2Flocalhost:4200%2F&scope=${SpotifyEndpoints.SCOPE}&response_type=token`
  config = {
    headers: {
      'Authorization': ""
    }
  }

  constructor(private route: ActivatedRoute) {
    this.route.fragment.subscribe(fragment => {
        this.generateAuthorization(fragment)
        this.buildData(QueryType.ARTIST)
        this.buildData(QueryType.TRACKS)
    })
  }

  /**
   * Assign the access_token fragment to the authorisation headers
   * @param fragment The #access_code Fragment when a spotify request is provided
   */
  generateAuthorization(fragment:string) {
    const response = new URLSearchParams(fragment);
    this.config.headers.Authorization = `Bearer ${response.get("access_token")}`
  }

  /**
   * Event responsible for handling the data change between "Artists" and "Tracks"
   * @param changeEvent Tab change between "Artists" and "Tracks"
   */
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if(changeEvent.activeId == 2)
      return this.typeSelected = "Artists"
    this.typeSelected = "Albums"
  }

  /**
   * Sort the array of listened to albums by alphabetical order
   */
  private sortAlbums(){
    this.arrayAlbums.sort((a, b) => {
      if(a.artists[0].name > b.artists[0].name)
        return 1;
        else return -1;
    })
  }

  /**
   * Build the arrays for top artists and tracks
   * @param type The SpotifyEndpoint.TYPES of either TRACK or ARTIST
   */
  private buildData(type: QueryType) {
    var url = this.buildURL(type)
    var allResult = []
    axios.get(url, this.config).then((resp) => {
      let result = resp.data
      result.items.forEach(item => {
        allResult.push(item)
      });
      // Update the appropriate array, based on what type of data we're buulding
      switch(type) {
        case QueryType.ARTIST:
          this.arrayArtists = [...allResult]
          break;
        case QueryType.TRACKS:
          this.arrayAlbums = [...allResult] 
          break;
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  /**
   * Build either the Top Artists or Top Tracks URL
   * @param type The QueryType.TYPES type of reques tbeing made
   */
  private buildURL(type: QueryType):string {
    var url = SpotifyEndpoints.BASE_URL;
    switch(type) {
      case QueryType.ARTIST:
        url +=  SpotifyEndpoints.PERSONALIZATION.TOP_TRACKS(SpotifyEndpoints.TYPES.ARTIST);
        break;
      case QueryType.TRACKS:
        url +=  SpotifyEndpoints.PERSONALIZATION.TOP_TRACKS(SpotifyEndpoints.TYPES.TRACKS);
        break;
    }
    url += `?${SpotifyEndpoints.PERSONALIZATION.TIME_RANGE(SpotifyEndpoints.TYPES.LONG_TERM)}`
    return url
  }

  ngOnInit() {}
}
