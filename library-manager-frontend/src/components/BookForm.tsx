import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Stack, InputLabel, Input, Box, Typography } from '@mui/material';
import api from '../api/api';
import { Book } from '../types';

// Validation schema for form fields
const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .required('Title is required'),
    author: Yup.string()
        .min(3, 'Author must be at least 3 characters')
        .required('Author is required'),
    description: Yup.string()
        .min(3, 'Description must be at least 3 characters')
        .required('Description is required'),
});

interface BookFormProps {
    initialValues: Book;
    onSuccess: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialValues, onSuccess }) => {
    const [imageBase64, setImageBase64] = useState(initialValues.image || '');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const formData = { ...values, image: imageBase64 };
                if (values.id) {
                    await api.put(`/books/${values.id}`, formData);
                } else {
                    const { id, ...newBookData } = formData;
                    await api.post('/books', newBookData);
                }
                onSuccess();
            } catch (error) {
                console.error("Error during book submission:", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.author && Boolean(formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiline
                    rows={3}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                {/* Image Upload */}
                {/* Display existing image if available */}
                {imageBase64 && (
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="caption">Cover</Typography>
                        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                            <img
                                src={imageBase64}
                                alt={formik.values.title}
                                style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', objectFit: 'contain' }}
                            />
                        </Box>
                    </Box>
                )}
                <InputLabel>{initialValues.image ? 'Update Cover' : 'Upload Cover'}</InputLabel>
                <Input type="file" onChange={handleImageUpload} />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {initialValues.id ? 'Update Book' : 'Add Book'}
                </Button>
            </Stack>
        </form>
    );
};

export default BookForm;
