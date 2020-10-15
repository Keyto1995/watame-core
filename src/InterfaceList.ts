export interface IApiDetail {
  name: String;
  desc: String;
  order?: number;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: String;
  query: Object;
}
