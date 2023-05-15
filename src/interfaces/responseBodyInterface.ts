export default interface responseBodyProps {
  statusCode: number;
  message: string;
  description?: string;
  error?: any;
  payload?: any;
}
