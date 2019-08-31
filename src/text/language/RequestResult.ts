import RequestResultType from '../../type/RequestResult';

interface RequestResult {
    title: string,
    text: Record<RequestResultType, string>
}

export default RequestResult;