// List.js
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../Context/Firebase";

export const List = () => {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbn, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(null);  // For error handling
    const [success, setSuccess] = useState(false); // To show success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        try {
            await firebase.handleCreateNewListing(name, isbn, price);
            setName(""); // Clear the form fields after successful submission
            setIsbnNumber("");
            setPrice("");
            setSuccess(true); // Set success message
        } catch (err) {
            setError("Error creating listing. Please try again.");
            console.error("Error creating listing:", err.message);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBookName">
                        <Form.Label>Enter Book Name</Form.Label>
                        <Form.Control 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            type="text" 
                            placeholder="Enter Book Name" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsbn">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control 
                            onChange={(e) => setIsbnNumber(e.target.value)} 
                            value={isbn} 
                            type="text" 
                            placeholder="Enter ISBN Number" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            onChange={(e) => setPrice(e.target.value)} 
                            value={price} 
                            type="text" 
                            placeholder="Enter Price" 
                            required 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>

                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">Listing created successfully!</p>}
            </div>
        </>
    );
}
