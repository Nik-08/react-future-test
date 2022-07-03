import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

if (
  !process.env.REACT_APP_API_KEY ||
  !process.env.REACT_APP_API_MAX_RESULT ||
  !process.env.REACT_APP_API_BASE_URL
) {
  throw new Error("API ERROR");
}

const API_KEY = process.env.REACT_APP_API_KEY;
const MAX_RESULT = process.env.REACT_APP_API_MAX_RESULT;

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
  total: null,
  category: "all",
  orderBy: "relevance",
  searchQuery: "",
  startIndex: 0,
  item: null,
  showMore: true,
};

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

const getUrlFromState = (state: RootState): URL => {
  const { category, orderBy, searchQuery, startIndex } = state.books;
  const url = new URL("books/v1/volumes", process.env.REACT_APP_API_BASE_URL);
  const filterCategory = category === "all" ? "" : `+subject:${category}`;
  url.searchParams.append("q", (searchQuery || '""') + filterCategory); //Пустая строка или введенный запрос
  url.searchParams.append("key", API_KEY!);
  url.searchParams.append("startIndex", String(startIndex));
  url.searchParams.append("maxResults", MAX_RESULT!);
  url.searchParams.append("orderBy", orderBy);
  return url;
};

export const search = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "books/search",

  async (_, { rejectWithValue, getState }): Promise<any> => {
    try {
      const url = getUrlFromState(getState());
      url.searchParams.set("startIndex", "0");
      const response = await client.get(url.href);

      if (!response) throw new Error("Server Error!");
      if (!response.data.items) throw new Error("No Books Found");

      return response.data;
    } catch (e: any) {
      return rejectWithValue(String(e.message));
    }
  }
);

export const loadMore = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "books/loadMore",

  async (_, { rejectWithValue, getState }): Promise<any> => {
    try {
      const url = getUrlFromState(getState());
      url.searchParams.set("startIndex", String(getState().books.items.length));

      const response = await client.get(url.href);

      if (!response) throw new Error("Server Error!");
      if (!response.data.items) throw new Error("No Books Found");

      return response.data;
    } catch (e: any) {
      return rejectWithValue(String(e.message));
    }
  }
);

export const fetchSingleBook = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>(
  "books/getSingle",

  async (id, { rejectWithValue }): Promise<any> => {
    try {
      const response = await client.get(
        `books/v1/volumes/${id}?key=${API_KEY}`
      );
      if (!response) throw new Error("Server Error!");

      return response.data;
    } catch (e: any) {
      return rejectWithValue(String(e.message));
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setStartIndex: (state) => {
      state.startIndex = state.startIndex + 30;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
      })
      .addCase(search.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.totalItems;
      })
      .addCase(search.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSingleBook.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.item = action.payload;
        }
      )
      .addCase(
        fetchSingleBook.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(loadMore.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMore.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        console.log(action.payload.items);
        if (!action.payload.items) {
          state.showMore = false;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
      })
      .addCase(loadMore.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.showMore = false;
      });
  },
});

export const { setCategories, setOrderBy, setSearchQuery, setStartIndex } =
  booksSlice.actions;

export default booksSlice.reducer;
