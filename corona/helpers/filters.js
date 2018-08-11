export const upcomingEventsNearYou = (response, option) =>
  response.data.events
		.map(({name, id, description, local_date, local_time, group: {urlname, lat, lon}}) => (
      {
        id,
        urlname,
        name,
        description,
        lat,
        lon,
        local_date,
        local_time
      }
    ))
    .filter(event => event.description && event.description.includes(option))
