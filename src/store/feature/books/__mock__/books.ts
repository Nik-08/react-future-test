export const book1: BookItem = {
  id: "1",
  volumeInfo: {
    title: "Преступление и наказание",
    authors: ["Достоевский Ф. М."],
    imageLinks: {
      thumbnail:
        "https://s1.livelib.ru/boocover/1000485163/200/13c9/boocover.jpg",
      smallThumbnail:
        "https://s1.livelib.ru/boocover/1000485163/200/13c9/boocover.jpg",
    },
    description:
      "Преступление и наказание – самый известный роман Ф.М. Достоевского, совершивший мощный переворот общественного сознания. Написание романа символизирует открытие высшего, нового этапа творчества гениального писателя. В романе, с присущим Достоевскому психологизмом, показан путь мятущейся души человека сквозь тернии страданий к постижению Истины.",
    categories: ["poetry"],
  },
};

export const booksState: BooksState = {
  items: [book1, book1],
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
