export const getEvent = () => {
  return {
    type: [
      {
        name: `taxi`,
        icon: `taxi.png`,
      },
      {
        name: `bus`,
        icon: `bus.png`,
      },
      {
        name: `train`,
        icon: `train.png`,
      },
      {
        name: `ship`,
        icon: `ship.png`,
      },
      {
        name: `transport`,
        icon: `transport.png`,
      },
      {
        name: `drive`,
        icon: `drive.png`,
      },
      {
        name: `Flight`,
        icon: `Flight.png`,
      },
      {
        name: `check-in`,
        icon: `check-in.png`,
      },
      {
        name: `sightseeing`,
        icon: `sightseeing.png`,
      },
      {
        name: `restaurant`,
        icon: `restaurant.png`,
      },
    ][Math.round(Math.random() * 10)],
  }
};
