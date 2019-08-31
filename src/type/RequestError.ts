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
| { userWithThisEmailExists: string };

export type RequestError
= InternalError
| ValidationError
| ResultError
| BadResponse;

export type TextErrorMessage
= 'internalError'
| 'invalidData'
| 'badResponse'
| 'failedToSignIn'
| 'couldNotRememberSignIn'
| 'networkError'
| 'unknownError';

export type DataErrorMessage
= {
    error: 'userWithThisEmailExists',
    data: string
} | {
    error: 'organizationExists',
    data: string
};

export type ErrorMessage = TextErrorMessage | DataErrorMessage;

export function isInternalError(error: RequestError): error is InternalError {
    return (typeof (error as any).reason) === 'string';
};

export function isBadResponse(error: RequestError): error is BadResponse {
    return (error as any).badResponse;
};

export function isValidationError(error: RequestError): error is InternalError {
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

export function isResultError(error: RequestError): error is RequestError {
    return !isInternalError(error) && !isValidationError(error);
};

export function isTextErrorMessage(errorMessage: ErrorMessage): errorMessage is TextErrorMessage {
    return typeof errorMessage === 'string';
};

export function isDataErrorMessage(errorMessage: ErrorMessage): errorMessage is DataErrorMessage {
    return !isTextErrorMessage(errorMessage);
};

export function requestErrorToErrorMessage(error: RequestError): ErrorMessage {
    if(isInternalError(error)) {
        return 'internalError';
    }
    if(isBadResponse(error)) {
        return 'badResponse';
    }
    if(isValidationError(error)) {
        return 'invalidData';
    }
    const { failedTo, organizationExists, userWithThisEmailExists } = error as Record<string, string | undefined>;
    if(organizationExists) {
        return { error: 'organizationExists', data: organizationExists };
    }
    if(userWithThisEmailExists) {
        return { error: 'userWithThisEmailExists', data: userWithThisEmailExists };
    }
    if(failedTo === 'signIn') {
        return 'failedToSignIn';
    }
    return 'unknownError';
};