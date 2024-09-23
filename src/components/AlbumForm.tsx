import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { CREATE_ALBUM } from "../mutations/Mutation";

const AlbumForm = () => {
  const [title, setTitle] = useState("");

  // useMutation works similarly to useQuery, however, useMutation also returns a function that we need to call in order to execute our mutation/call our graphQL API
  const [createAlbum, { data, loading }] = useMutation(CREATE_ALBUM);

  if (loading) {
    return <Spinner />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createAlbum({
      variables: {
        userId: "1",
        title,
      },
    });
  };

  return (
    <>
      <Container>
        <h1>Create Album Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Album Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your album title"
              autoComplete="off"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {data && (
          <>
            <h2>{data.createAlbum.title}</h2>
            <h3>by {data.createAlbum.user.name}</h3>
          </>
        )}
      </Container>
    </>
  );
};

export default AlbumForm;
