export interface InternalError {
    reason: string
};

export interface BadResponse {
    badResponse: true
};

export type ValidationError
= { invalidData: string }
| { invalidKey: string }
| { invalidField: string };

export type ResultError
= { failedTo: string }
| { organizationExists: string }
| { userWithThisEmailExists: string }
| { userWithThisUserNameExistsInTheOrganization: string }
| { invalidOrganizationToken: true };

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
| 'invalidOrganizationToken'
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
} | {
    error: 'userWithThisUserNameExistsInTheOrganization',
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
    return !isInternalError(error) && !isValidationError(error) && !isBadResponse(error);
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
    if((error as { invalidOrganizationToken?: true }).invalidOrganizationToken) {
        return 'invalidOrganizationToken';
    }
    const resultError = error as Record<string, string | undefined>;
    if(resultError.organizationExists) {
        return { error: 'organizationExists', data: resultError.organizationExists };
    }
    if(resultError.userWithThisEmailExists) {
        return { error: 'userWithThisEmailExists', data: resultError.userWithThisEmailExists };
    }
    if(resultError.userWithThisUserNameExistsInTheOrganization) {
        return { error: 'userWithThisUserNameExistsInTheOrganization', data: resultError.userWithThisUserNameExistsInTheOrganization };
    }
    if(resultError.failedTo === 'signIn') {
        return 'failedToSignIn';
    }
    return 'unknownError';
};
