import jssha from "jssha";
import { Method, ErrorResponse } from "./types";

// encodeURIComponentはRFC3986の規格に対応していないため
export const rfc3986 = (str: string) => {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16)}`
  );
};

export const encodeParamsToString = (params: any) =>
  Object.keys(params)
    .sort()
    .map((key) => `${rfc3986(key)}=${rfc3986(params[key])}`)
    .join("&");

//oauth_nonce用のランダムな文字列
const generateNonce = (number: number = 32) => {
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array(...Array(number))
    .map(() => str.charAt(Math.floor(Math.random() * str.length)))
    .join("");
};

const generateTimestamp = () => Math.floor(Date.now() / 1000);

//oauth_signature
export const generateSignature = (
  consumerSecret: string,
  oauthTokenSecret = "",
  method: Method,
  url: string,
  oauthParams: object,
  params?: object
) => {
  const baseKey = [consumerSecret, oauthTokenSecret]
    .map((key) => rfc3986(key))
    .join("&");

  const signatureBaseString = [
    rfc3986(method),
    rfc3986(url),
    rfc3986(encodeParamsToString({ ...params, ...oauthParams })),
    // `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
    //   encodeParamsToString({ ...params, ...oauthParams })
    // )}`と同じ
  ].join("&");

  const sha1 = new jssha("SHA-1", "TEXT");
  sha1.setHMACKey(baseKey, "TEXT");
  sha1.update(signatureBaseString);

  return sha1.getHMAC("B64");
};

export const generateTokenRequestHeaderParams = (
  cunsumerKey: string,
  consumerSecret: string,
  oauthToken = "",
  oauthTokenSecret = "",
  method: Method,
  url: string,
  { callback, params }: { callback?: string; params?: any }
) => {
  const oauthParams = {
    ...(callback ? { oauth_callback: callback } : {}),
    oauth_consumer_key: cunsumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: generateTimestamp(),
    ...(oauthToken ? { oauth_token: oauthToken } : {}),
    oauth_version: "1.0",
  };

  return {
    ...oauthParams,
    oauth_signature: generateSignature(
      consumerSecret,
      oauthTokenSecret,
      method,
      url,
      oauthParams,
      params
    ),
  };
};

const createHeaderString = (params: any): string =>
  `OAuth ${Object.keys(params)
    .sort()
    .map((key) => `${rfc3986(key)}=${rfc3986(params[key])}`)
    .join(", ")}`;

const parseFormEncoding = (formEncoded: string): any =>
  formEncoded.split("&").reduce((obj, form) => {
    const [key, value] = form.split("=");
    return { ...obj, [key]: value };
  }, {});

export const request = async <T>(
  method: Method = "GET",
  url: string = "",
  params: any = {}
): Promise<T | ErrorResponse> => {
  const uri = url
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");

  const options = {
    method,
    headers: {
      Authorization: createHeaderString(params),
    },
  };
  console.log("options", options);
  const response = await fetch(uri, options);
  console.log("requestres", response);

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    const result = await response.json();
    return result;
  }

  const result = await response.text();
  return parseFormEncoding(result);
};
