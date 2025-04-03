import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

function baseUrl() {
  const { hostname, port, protocol } = window.location;
  let url = `${protocol}//${hostname}`;
  if(port) {
    url = `${url}:${port}`;
  }

  return `${url}/iapi`;;
}

function formatVariables(payload, url) {
  const urlData = {
    path: url,
    headers: (payload && payload.header_variables) ? payload.header_variables : {},
    body: null
  }

  const token = localStorage.getItem('token');

  if (token) {
    urlData.headers['Authorization'] = `Bearer ${token}`;
  }

  if (payload) {
    // Replace path variables
    if(payload.path_variables && Object.keys(payload.path_variables).length > 0) {
      for (const [field, value] of Object.entries(payload.path_variables)) {
        urlData.path = urlData.path.replaceAll(`{${field}}`, value);
      }
    }

    // Add query variables
    if (payload.query_variables && Object.keys(payload.query_variables).length > 0) {
      const queryParams = new URLSearchParams();

      for (const key in payload.query_variables) {
        const value = payload.query_variables[key];

        // Stringify objects and arrays, otherwise, add the value as is
        const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        queryParams.append(key, serializedValue);
      }

      urlData.path += '?' + queryParams.toString();
    }

    // Add body variables
    if(payload.body_variables) {
      if(payload.body_variables instanceof FormData) {
        urlData.body = payload.body_variables;
      } else if(Object.keys(payload.body_variables).length > 0) {
        if(requestContentType === "multipart/form-data") {
          var formData = new FormData();
          Object.keys(payload.body_variables).forEach((k) => formData.append(k, payload.body_variables[k]));
          urlData.body = formData;
        } else {
          urlData.body = JSON.stringify(payload.body_variables);
        }
      }
    }
  }

  return urlData;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl() }),
  tagTypes: [
  ],
  endpoints: (builder) => ({
  }),
})

export const {
} = api;
