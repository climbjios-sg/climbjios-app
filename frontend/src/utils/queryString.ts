// encodeQueryString takes in dictionary and return a query string
// e.g {key: 'value'} returns qs = '?key=value'
export function encodeQueryString(dict: { [key: string]: string }) {
  return (
    '?' +
    Object.keys(dict)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(dict[key])}`)
      .join('&')
  );
}

// decodeQueryString takes in query string and return a dictionary
// e.g qs = '?key=value' returns {key: 'value'}
export function decodeQueryString(qs: string) {
  const queryDict: { [key: string]: string } = {};

  qs
    // Remove '?'
    .slice(1)
    .split(/[=,&]+/)
    .map(decodeURIComponent)
    .forEach((component, index, arr) => {
      if (index % 2 === 0) {
        queryDict[component] = '';
      } else {
        queryDict[arr[index - 1]] = component;
      }
    });

  return queryDict;
}
