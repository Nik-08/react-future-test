declare module "*.scss";
declare module "*.png";

interface AppState {
  books: BooksState;
}

interface BooksState {
  loading: boolean;
  error: null | string;
  items: BookItem[];
  total: number | null;
  category: string;
  orderBy: string;
  searchQuery: string;
  startIndex: number;
  item: BookItem | null;
  showMore: boolean;
}

interface BookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };

    description: string;
    categories: string[];
  };
}
