import React, { useState } from "react";
import styles from "../styles/Book.module.css";

const Book = () => {
  const [search, setSearch] = useState(""); //useState for user input
  const [books, setBooks] = useState([]); //useState for dynamic book results

  /**
   * Fetches the Google Books API with query replaced by user's search
   * Updates the state of setBooks
   */
  const handleSearch = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=3`
    );
    const data = await response.json();
    setBooks(data.items);
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            className={styles.search}
            type="text"
            placeholder="Enter Book Title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        <div>
          <button className={styles.button} onClick={handleSearch}>
            Search Books
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Subtitle</th>
              <th className={styles.th}>Author</th>
              <th className={styles.th}>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {books
              ? books.map((book) => (
                  <tr key={book.id}>
                    <td className={styles.td}>
                      {book.volumeInfo.title ? book.volumeInfo.title : ""}
                    </td>
                    <td className={styles.td}>
                      {book.volumeInfo.subtitle ? book.volumeInfo.subtitle : ""}
                    </td>
                    <td className={styles.td}>
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors.join(", ")
                        : ""}
                    </td>
                    <td className={styles.td}>
                      {book.volumeInfo.imageLinks ? (
                        <img src={book.volumeInfo.imageLinks.thumbnail} />
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Book;
