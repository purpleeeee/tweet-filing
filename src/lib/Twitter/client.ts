import {
  generateTokenRequestHeaderParams,
  request,
  encodeParamsToString,
} from "./utils";
import { RequestTokenResponse, AccessTokenResponse, Method } from "./types";
import CustomError from "./error";

const baseURL: string = "https://api.twitter.com";
const requestTokenURL: string = "/oauth/request_token";
const authorizationURL: string = "/oauth/authorize";
const accessTokenURL: string = "/oauth/access_token";
const apiURL: string = "https://api.twitter.com/1.1";

class Client {
  consumerKey!: string;
  cunsumerSecret!: string;
  oauthToken!: string;
  oauthTokenSecret!: string;
  tokenRequestHeaderParams: any = {};

  setConsumerKey = (consumerKey: string, cunsumerSecret: string) => {
    this.consumerKey = consumerKey;
    this.cunsumerSecret = cunsumerSecret;
  };

  setAccessToken = (oauthToken: string, oauthTokenSecret: string) => {
    this.oauthToken = oauthToken;
    this.oauthTokenSecret = oauthTokenSecret;
  };

  getLoginUrl = async (callback: string = ""): Promise<string> => {
    this.tokenRequestHeaderParams = generateTokenRequestHeaderParams(
      this.consumerKey,
      this.cunsumerSecret,
      this.oauthToken,
      this.oauthTokenSecret,
      "POST",
      baseURL + requestTokenURL,
      { callback }
    );

    const result = await request<RequestTokenResponse>(
      "POST",
      baseURL + requestTokenURL,
      this.tokenRequestHeaderParams
    );

    if ("errors" in result) {
      console.log("getLoginUrl");
      throw new CustomError(result);
    }

    this.setAccessToken(result.oauth_token, result.oauth_token_secret);

    return `${baseURL + authorizationURL}?oauth_token=${this.oauthToken}`;
  };

  getAccessToken = async (verifier: string = "") => {
    this.tokenRequestHeaderParams = generateTokenRequestHeaderParams(
      this.consumerKey,
      this.cunsumerSecret,
      this.oauthToken,
      this.oauthTokenSecret,
      "POST",
      baseURL + accessTokenURL,
      {}
    );

    this.tokenRequestHeaderParams.oauth_verifier = verifier;

    const result = await request<AccessTokenResponse>(
      "POST",
      baseURL + accessTokenURL,
      this.tokenRequestHeaderParams
    );

    if ("errors" in result) {
      throw new CustomError(result);
    }

    this.setAccessToken(result.oauth_token, result.oauth_token_secret);

    return {
      oauth_token: result.oauth_token,
      oauth_token_secret: result.oauth_token_secret,
    };
  };

  logout = () => {
    this.consumerKey = "";
    this.cunsumerSecret = "";
    this.oauthToken = "";
    this.oauthTokenSecret = "";
    this.tokenRequestHeaderParams = "";
  };

  api = async <T>(
    method: Method,
    endpoint: string,
    params: any = {}
  ): Promise<T> => {
    const apiEndpoint =
      endpoint.slice(0, 1) !== "/" ? `/${endpoint}` : endpoint;

    this.tokenRequestHeaderParams = generateTokenRequestHeaderParams(
      this.consumerKey,
      this.cunsumerSecret,
      this.oauthToken,
      this.oauthTokenSecret,
      method,
      apiURL + apiEndpoint,
      { params }
    );

    const result = await request<T>(
      method,
      apiURL +
        (params
          ? `${apiEndpoint}?${encodeParamsToString(params)}`
          : apiEndpoint),
      this.tokenRequestHeaderParams
    );

    if ("errors" in result) {
      throw new CustomError(result);
    }
    return result;
  };

  post = async (endpoint: string, params: any = {}) => {
    const result = await this.api("POST", endpoint, params);

    return result;
  };

  get = async (endpoint: string, params: any = {}) => {
    const result = await this.api("GET", endpoint, params);

    return result;
  };
}

export default new Client();
