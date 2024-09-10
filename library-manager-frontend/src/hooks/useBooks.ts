import useSWR from 'swr';
import api from '../api/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useBooks = () => {
    const { data, error, mutate } = useSWR('/books', fetcher);
    return {
        books: data,
        isLoading: !error && !data,
        error,
        mutate,
    };
};