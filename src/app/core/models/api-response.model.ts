export class ApiResponse<T> {
  count: number = 0;
  next?: string;
  previous?: string;
  results: Array<T> = [];
}
