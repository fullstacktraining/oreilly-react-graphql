import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

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

export const GET_CARS = gql`
{
  cars {
    id
    make
    model
  }
}
`

export default function Cars() {
  const { data, loading, error } = useQuery(GET_CARS);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>ERROR</p>;
  return (
    <Fragment>
      <h1>A list of cars 🚗</h1>
      {data.cars && data.cars.map(car => (
        <p key={car.id}>{ car.make } - { car.model } >>  <Link to={`/car/${car.id}`}>View more</Link></p>
      ))}
    </Fragment>
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