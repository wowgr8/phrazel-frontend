let base_url;

process.env.NODE_ENV === 'production' ?
    base_url = process.env.REACT_APP_API_URI :
    base_url = "http://localhost:4000/";

export { base_url };