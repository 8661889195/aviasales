function filter(array, filter) {
  if(filter.every((el) => el.status)) return array;
  if(!filter[0].status)
    array = array.filter(
  (el) => el.segments[0].stops.length !== 0 && el.segments[1].stops.length !== 0);
  if(!filter[1].status)
    array = array.filter(
  (el) => el.segments[0].stops.length !== 1 && el.segments[1].stops.length !== 1);
  if(!filter[2].status)
    array = array.filter(
  (el) => el.segments[0].stops.length !== 2 && el.segments[1].stops.length !== 2);
  if(!filter[3].status)
    array = array.filter(
  (el) => el.segments[0].stops.length !== 3 && el.segments[1].stops.length !== 3);
  return array
}

export default filter;