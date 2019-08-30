export interface InternalError {
    reason: string
};

export interface BadResponse {
    badResponse: true
};

export type ValidationError
= { invalidData: 'notAnObject' }
| { invalidKey: string }
| { invalidField: string };

export type ResultError
= { failedTo: string }
| { organizationExists: string }
| { userExists: string };

export type ResponseError
= InternalError
| ValidationError
| ResultError
| BadResponse;

export default ResponseError;

export type TextErrorMessage
= 'internalError'
| 'invalidData'
| 'badResponse'
| 'failedToSignIn'
| 'networkError'
| 'unknownError';

export type DataErrorMessage
= {
    error: 'userExists',
    user: string
} | {
    error: 'organizationExists',
    organization: string
};

export type ErrorMessage = TextErrorMessage | DataErrorMessage;

export function isInternalError(error: ResponseError): error is InternalError {
    return (typeof (error as any).reason) === 'string';
};

export function isBadResponse(error: ResponseError): error is BadResponse {
    return (error as any).badResponse;
};

export function isValidationError(error: ResponseError): error is InternalError {
    if((error as any).invalidData === 'notAnObject') {
        return true;
    }
    if((typeof (error as any).invalidKey) === 'string') {
        return true;
    }
    if((typeof (error as any).invalidField) === 'string') {
        return true;
    }
    return false;
};

export function isResultError(error: ResponseError): error is ResponseError {
    return !isInternalError(error) && !isValidationError(error);
};

export function isTextErrorMessage(errorMessage: ErrorMessage): errorMessage is TextErrorMessage {
    return typeof errorMessage === 'string';
};

export function isDataErrorMessage(errorMessage: ErrorMessage): errorMessage is DataErrorMessage {
    return !isTextErrorMessage(errorMessage);
};

export function responseErrorToErrorMessage(error: ResponseError): ErrorMessage {
    if(isInternalError(error)) {
        return 'internalError';
    }
    if(isBadResponse(error)) {
        return 'badResponse';
    }
    if(isValidationError(error)) {
        return 'invalidData';
    }
    const { failedTo, organizationExists, userExists } = error as Record<string, string | undefined>;
    if(organizationExists) {
        return { error: 'organizationExists', organization: organizationExists };
    }
    if(userExists) {
        return { error: 'userExists', user: userExists };
    }
    if(failedTo === 'signIn') {
        return 'failedToSignIn';
    }
    return 'unknownError';
};