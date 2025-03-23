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
      "GetEnvEndpoint",
    
      "LoginEndpoint",
    
      "LogoutEndpoint",
    
      "GetMeEndpoint",
    
      "RequestPasswordResetEndpoint",
    
      "ResetPasswordEndpoint",
    
      "SignUpEndpoint",
    
  ],
  endpoints: (builder) => ({
    GetEnvEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/action_234647');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["GetEnvEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    LoginEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/login');
        let handler = {
          url: path,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["LoginEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    LogoutEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/logout');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["LogoutEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    GetMeEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/me');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["GetMeEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    RequestPasswordResetEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/request_password_reset');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["RequestPasswordResetEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    ResetPasswordEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/reset_password');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["ResetPasswordEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    SignUpEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/signup');
        let handler = {
          url: path,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["SignUpEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
  }),
})

export const {
  useGetEnvEndpointQuery,
  
  useLoginEndpointQuery,
  
  useLogoutEndpointQuery,
  
  useGetMeEndpointQuery,
  
  useRequestPasswordResetEndpointQuery,
  
  useResetPasswordEndpointQuery,
  
  useSignUpEndpointQuery,
  
} = api;
