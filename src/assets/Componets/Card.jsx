import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export const CardBook = (props) => {
    return (
     
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"  style={{ width: "100%" }} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        This book has a tittle {props.name} and this book is sold by {props.displayName}
                        and this book cost Rs: {props.price}.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
      
    );
};
