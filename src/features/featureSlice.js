import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("music/fetchSongs", async (albumId) => {
  const response = await fetch(`/${albumId}.json`);
  const data = await response.json();
  return data.songs;
});

const initialState = {
  songs: [],
  currentSong: null,
  isPlaying: false,
  status: "idle",
  seekbarUpdate: false,
  playlistTitle: null,
  image: null,
  background1: null,
  background2: null
};

export const featureSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true; 
    },

    playSong: (state,action) => {
      state.currentSong = action.payload
      state.isPlaying = true;
    },

    pauseSong: (state) => {
      state.isPlaying = false;
    },

    nextSong: (state) => {
      if (state.currentSong) {
        const currentIndex = state.songs.findIndex(
          (song) => song.id === state.currentSong.id
        );
        const nextIndex = (currentIndex + 1) % state.songs.length;
        state.currentSong = state.songs[nextIndex];
        state.isPlaying = true;
      }
    },

    previousSong: (state, action) => {
      if (state.currentSong) {
        const currentIndex = state.songs.findIndex(
          (song) => song.id === state.currentSong.id
        );
        const previousIndex =
          currentIndex != 0 ? currentIndex - 1 : state.songs.length - 1;
        state.currentSong = state.songs[previousIndex];
        state.isPlaying = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
        state.playlistTitle = action.payload[0].playlist;
        state.image = action.payload[0].img;
        state.background1 = action.payload[0].background1;
        state.background2 = action.payload[0].background2;
        if(action.payload && action.payload.length > 0) {
          state.currentSong = action.payload[0];
        }
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentSong, playSong, pauseSong, nextSong, previousSong } =
  featureSlice.actions;

export default featureSlice.reducer;
