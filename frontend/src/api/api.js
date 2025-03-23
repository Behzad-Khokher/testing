import { makeRequest } from './restApi.js';
export function GetEnvEndpoint(payload) {
    return makeRequest('/v1/action_234647', 'GET', 'application/json;charset=UTF-8', payload);
}

export function GetMeEndpoint(payload) {
    return makeRequest('/v1/me', 'GET', 'application/json;charset=UTF-8', payload);
}

export function LoginEndpoint(payload) {
    return makeRequest('/v1/login', 'POST', 'application/json;charset=UTF-8', payload);
}

export function LogoutEndpoint(payload) {
    return makeRequest('/v1/logout', 'GET', 'application/json;charset=UTF-8', payload);
}

export function RequestPasswordResetEndpoint(payload) {
    return makeRequest('/v1/request_password_reset', 'GET', 'application/json;charset=UTF-8', payload);
}

export function ResetPasswordEndpoint(payload) {
    return makeRequest('/v1/reset_password', 'GET', 'application/json;charset=UTF-8', payload);
}

export function SignUpEndpoint(payload) {
    return makeRequest('/v1/signup', 'POST', 'application/json;charset=UTF-8', payload);
}
