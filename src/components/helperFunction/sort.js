function sort(array, sort) {
  if (sort === 0 || sort === 2) {
    return array.sort((a, b) => {
      return a['price'] - b['price'];
    });
  }
  if (sort === 1) {
    return array.sort((a, b) => {
      return a.segments.duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
    });
  }
}

export default sort;
