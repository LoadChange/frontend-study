import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LAUNCH_QUERY = gql`
  query LaunchesQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function Launch(props) {
  const { flight_number } = props.match.params;
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: +flight_number },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1 className="display-4 my-3">Launch</h1>
      <span>{data.launch.mission_name}</span>
    </div>
  );
}
