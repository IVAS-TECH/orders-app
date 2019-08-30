import ResponseResultType from './../../type/ResponseResult';

interface ResponseResult {
    title: string,
    text: Record<ResponseResultType, string>
}

export default ResponseResult;