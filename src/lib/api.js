const {
  REACT_APP_SERVICE_URL,
  REACT_APP_QUERY_KEY,
  REACT_APP_INDEX_NAME,
} = process.env;

export const url = {
  main: REACT_APP_SERVICE_URL,
  apiKey: REACT_APP_QUERY_KEY,
  indexName: REACT_APP_INDEX_NAME,
  apiVersion: 'api-version=2017-11-11',
};

export const headers = {
  'api-key': REACT_APP_QUERY_KEY,
  'Content-Type': 'application/json',
};

// getIndexDocsUrl function builds and returns a URL for fetching documents based on index with all the parameters passed on to it
export function getIndexDocsUrl(options) {
    let moreThanOne = false;
    let query = '';
    const optionKeys = [...Object.keys(options)];
    optionKeys.forEach(optionKey => {
        if (options[optionKey]) {
            if (!moreThanOne) {
                query += `${optionKey}=${options[optionKey]}`;
            } else {
                query += `&${optionKey}=${options[optionKey]}`;
            }
            moreThanOne = true;
        }
    });
    console.log('QUERY ===>',query);
    return `${url.main}/indexes/${url.indexName}/docs?${query}&${url.apiVersion}`;
}