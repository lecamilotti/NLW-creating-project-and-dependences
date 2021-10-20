import axios from "axios";


// TODO LIST

// receber code (string)
// recuperar o acess_token no github
// verificar se o user existe no DB
// se sim = gerar um token
// se nao = criar no debugger, e gerar um token
// retornar o token com as infos do user
interface IAccessTokenResponse {

  access_token: string

}

class AuthenticateUserService {

  async execute( code : string ) {

    const url = "https://github.com/login/oauth/acess_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>( url, null, {

      params: {

        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,

      },
      headers: {

        "Accept": "application/json"

      },

    } );

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    return response.data;

  }



}
export {AuthenticateUserService};
