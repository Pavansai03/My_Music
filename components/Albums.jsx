import React from 'react'
import './Albums.css'
import AlbumCard from './cards/AlbumCard'
import ArtistCard from './cards/ArtistCard'
const Albums = () => {
  return (
    <div>
      <div className="right-body">
          <div className="playlists p10 flex">
            <h2 className="p2 mL15">Popular albums</h2>
            <div className="playlist-order">
              <AlbumCard/>
            </div>
          </div>

          <div className="playlist-order p10">
            <h2 className="p2 mL15">Popular artists</h2>
            <ArtistCard/>
          </div>
        </div>
      </div>

  )
}

export default Albums
