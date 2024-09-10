import React from 'react';
import { Button, List, ListItem, ListItemText, Stack, Divider } from '@mui/material';
import api from '../api/api';
import { Book } from '../types';

interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onViewDetails: (book: Book) => void;
    refreshBooks: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onViewDetails, refreshBooks }) => {
    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/books/${id}`);
            refreshBooks(); // Refetch the book list after deletion
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <List sx={{ padding: 0 }}>
            {books.map((book) => (
                <React.Fragment key={book.id}>
                    <ListItem
                        onClick={() => onViewDetails(book)}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            cursor: "pointer",
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText primary={book.title} secondary={`${book.author} - ${book.genre}`} />
                        <Stack direction="row" spacing={2}>
                            <Button onClick={(e) => { e.stopPropagation(); onEdit(book); }} variant="outlined" color="primary">
                                Edit
                            </Button>
                            <Button onClick={(e) => { e.stopPropagation(); handleDelete(book.id); }} variant="contained" color="error">
                                Delete
                            </Button>
                        </Stack>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default BookList;
