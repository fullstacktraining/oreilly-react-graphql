import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const CAR_DETAIL = gql`
  query CarDetail($carId: ID!) {
    car(id: $carId) {
      make
      model
      colour
      year
      speed
    }
  }
`;

export default function Car({ carId }) {
  return (
    <Query query={CAR_DETAIL} variables={{ carId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading ...</p>;
        if (error) return <p>Error ...</p>;
        return (
          <Fragment>
            <h2>{ data.car.make } - { data.car.model } 🚗</h2>
            <p>Year of production: { data.car.year }</p>
            <p>Maximum speed: { data.car.speed }</p>
            <p>Colour: { data.car.colour }</p>
            <a href="/">Go back</a>
          </Fragment>
        );
      }}
    </Query>
  );
}