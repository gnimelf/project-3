import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client'

import { ADD_POST } from '../../utils/Mutations';
import { QUERY_POSTS, GET_ME } from '../../utils/Queries';

import Auth from '../../utils/Auth';

const ReviewForm = () => {
  const [reviewText, setreviewText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { reviewText } }) {
      try {
        const { reviewText } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { reviewText: [addPost, ...reviewText] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: { ...me, reviewText: [...me.reviewText, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          reviewText,
          reviewAuthor: Auth.getProfile.data.username,
        },
      });

      setreviewText('');
      console.log(reviewText);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reviewText' && value.length <= 280) {
      setreviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What Would You Like to Review?</h3>

      {Auth.loggedIn() ? (
        <>
          <a
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </a>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="reviewText"
                placeholder="Here's a new review..."
                value={reviewText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Review
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to review items. Please{' '}
          <a href = "/login">login</a> or <a href = "/signup">signup.</a>
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
