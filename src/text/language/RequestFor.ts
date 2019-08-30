import RequestForType from './../../type/RequestFor';

interface RequestFor {
    title: string,
    text: Record<RequestForType, string>
}

export default RequestFor;