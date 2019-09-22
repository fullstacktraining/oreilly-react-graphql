import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

// export const GET_CARS = gql`
// {
//   cars {
//     id
//     make
//     model
//   }
// }
// `

export const GET_CARS = gql`
query GetCars($after: String) {
  cars(after: $after) {
    cursor
    hasMore
    cars {
      id
      make
      model
    }
  }
}
`;

export default function Cars() {
  return (
    <Query query={GET_CARS}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <p>Loading ...</p>;
        if (error) return <p>ERROR</p>;
        return (
          <Fragment>
            <h1>A list of cars 🚗</h1>
            {data.cars &&
              data.cars.cars &&
              data.cars.cars.map(car => (
                <p key={car.id}>{ car.make } - { car.model } >>  <Link to={`/car/${car.id}`}>View more</Link></p>
              ))}
            {data.cars &&
              data.cars.hasMore && (
                <button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        after: data.cars.cursor,
                      },
                      updateQuery: (prev, { fetchMoreResult, _ }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...fetchMoreResult,
                          cars: {
                            ...fetchMoreResult.cars,
                            cars: [
                              ...prev.cars.cars,
                              ...fetchMoreResult.cars.cars,
                            ],
                          },
                        };
                      },
                    })
                  }
                >
                  Load More
                </button>
              )}
          </Fragment>
        );
      }}
    </Query>
  );
}



// return (
//   <Fragment>
//     <h1>A list of cars 🚗</h1>
//     {data.cars && data.cars.map(car => (
//       <p key={car.id}>{ car.make } - { car.model } >>  <Link to={`/car/${car.id}`}>View more</Link></p>
//     ))}
//   </Fragment>
// )



// export const GET_CARS = gql`
// query GetCars($after: String) {
//   cars(after: $after) {
//     cursor
//     hasMore
//     cars {
//       id
//       make
//       model
//     }
//   }
// }
// `;