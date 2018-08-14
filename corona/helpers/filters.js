function compareAndSortByDate(a, b) {
  if (a.local_date < b.local_date)
    return -1
  if (a.local_date > b.local_date)
    return 1
  return 0
}

function compareAndSortByTime(a, b) {
  if (a.local_time < b.local_time)
    return -1
  if (a.local_time > b.local_time)
    return 1
  return 0
}

export const upcomingEventsNearYou = (response, option) => {
  const filteredEvents = response.data.events
		.map(({name, id, description, local_date, local_time, link, group: {urlname, lat, lon}}) => (
      {
        id,
        urlname,
        link,
        name,
        description,
        coordinates: {
          latitude: lat,
          longitude: lon
        },
        local_date,
        local_time
      }
    ))
    .filter(event => event.description && event.description.includes(option))
    
  return filteredEvents.sort(compareAndSortByDate).sort(compareAndSortByTime)
}
