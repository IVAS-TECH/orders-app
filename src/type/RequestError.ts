interface ErrorResult {
    reason: string,
    badResponse: true,
    invalidRequestParameter: string,
    invalidData: string,
    invalidKey: string,
    invalidField: string,
    failedTo: string,
    organizationExists: string,
    userWithThisEmailExists: string,
    userWithThisUserNameExistsInTheOrganization: string,
    invalidOrganizationToken: true,
    orderNotFound: string,
    permissionDenied: true,
    permissionDeniedForFileWithId: string,
    couldNotFindFileWithId: string
}

type $Error<E extends keyof ErrorResult>
= Pick<ErrorResult, E>
& Partial<ErrorResult>;

export type InternalError = $Error<'reason'>;

export type BadResponse = $Error<'badResponse'>;

export type ValidationError
= $Error<'invalidRequestParameter'>
| $Error<'invalidData'>
| $Error<'invalidKey'>
| $Error<'invalidField'>;

export type ResultError
= $Error<'failedTo'>
| $Error<'organizationExists'>
| $Error<'userWithThisEmailExists'>
| $Error<'userWithThisUserNameExistsInTheOrganization'>
| $Error<'invalidOrganizationToken'>
| $Error<'orderNotFound'>
| $Error<'permissionDenied'>
| $Error<'permissionDeniedForFileWithId'>
| $Error<'couldNotFindFileWithId'>;

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
| 'permissionDenied'
| 'permissionDeniedForFile'
| 'couldNotFindFile'
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
} | {
    error: 'orderNotFound',
    data: string
};

export type ErrorMessage = TextErrorMessage | DataErrorMessage;

export function isInternalError(error: RequestError): error is InternalError {
    return (typeof error.reason) === 'string';
};

export function isBadResponse(error: RequestError): error is BadResponse {
    return !!(error.badResponse);
};

export function isValidationError(error: RequestError): error is InternalError {
    if((typeof error.invalidRequestParameter) === 'string') {
        return true;
    }
    if((typeof error.invalidData) === 'string') {
        return true;
    }
    if((typeof error.invalidKey) === 'string') {
        return true;
    }
    if((typeof error.invalidField) === 'string') {
        return true;
    }
    return false;
};

export function isResultError(error: RequestError): error is RequestError {
    return !isInternalError(error) && !isValidationError(error) && !isBadResponse(error);
};

export function isTextErrorMessage(errorMessage: ErrorMessage): errorMessage is TextErrorMessage {
    return (typeof errorMessage) === 'string';
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
    if(error.invalidOrganizationToken) {
        return 'invalidOrganizationToken';
    }
    if(error.permissionDenied) {
        return 'permissionDenied';
    }
    if(error.permissionDeniedForFileWithId) {
        return 'permissionDeniedForFile';
    }
    if(error.couldNotFindFileWithId) {
        return 'couldNotFindFile';
    }
    if(error.organizationExists) {
        return { error: 'organizationExists', data: error.organizationExists };
    }
    if(error.userWithThisEmailExists) {
        return {
            error: 'userWithThisEmailExists',
            data: error.userWithThisEmailExists
        };
    }
    if(error.userWithThisUserNameExistsInTheOrganization) {
        return {
            error: 'userWithThisUserNameExistsInTheOrganization',
            data: error.userWithThisUserNameExistsInTheOrganization
        };
    }
    if(error.orderNotFound) {
        return { error: 'orderNotFound', data: error.orderNotFound };
    }
    if(error.failedTo === 'signIn') {
        return 'failedToSignIn';
    }
    return 'unknownError';
};
