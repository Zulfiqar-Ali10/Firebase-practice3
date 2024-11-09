import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { CardBook } from "../assets/Componets/Card";
import CardGroup from 'react-bootstrap/CardGroup';

export const Home = () => {

    const firebase = useFirebase()

    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    }, [])

    return (
        <>
            <div className="container mt-5">
                <CardGroup>
                    {books.map((book) => (
                        <CardBook key={book.id}  {...book.data()} />
                    ))}
                </CardGroup>
            </div>
        </>
    )
}