module.exports = (app, Book) => {
  app.get('/api/books', async (request, response) => {
    const books = await Book.find();

    if (!books) return await response.status(500).send({ error: 'database failure' });

    await response.json(books);
  });

  app.get('/api/books/:book_id', async (request, response) => {
    const book = await Book.findOne({ _id: request.params.book_id });

    if (!book) return await response.status(500).json({ error: 'error' });

    await response.json(book);
  });

  app.get('/api/books/author/:author', async (request, response) => {
    const books = await Book.find({ author: request.params.author });

    if (!books) return await response.status(500).json(books);

    await response.json(books);
  });

  app.post('/api/books', async (request, response) => {
    const book = new Book();

    book.title = request.body.title;
    book.author = request.body.author;
    book.published_date = new Date(request.body.published_date);

    const bookStatus = await book.save();

    if (!bookStatus) {
      const error = new Error('fail');

      console.log(error);
      await response.status(400).json({ result: 0 });

      return;
    }

    await response.json({ result: 1 });
  });

  app.put('/api/books/:book_id', async (request, response) => {
    const book = await Book.findById(request.params.book_id);

    if (!book) return await response.status(404).json({ error: 'book not found' });

    if (request.body.title) book.title = request.body.title;
    if (request.body.author) book.author = request.body.author;
    if (request.body.published_date) book.published_date = request.body.published_date;

    const bookStatus = await book.save();

    if (!bookStatus) {
      await response.status(500).json({ error: 'failed to update' });
    }

    await response.json({ message: 'book update' });
  });

  app.delete('/api/books/:book_id', async (request, response) => {
    const book = await Book.deleteOne({ _id: request.params.book_id });

    console.log(book);

    if (!book) return await response.status(404).json({ error: 'book not found' });

    await response.status(204).end();
  });
};
