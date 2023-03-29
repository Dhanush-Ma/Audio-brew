//Authorization Code
function getAuthorizationCode() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=42f83ce8dd584b0c992bad52d9c08b02&response_type=code&redirect_uri=http://localhost:3000/me&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  window.location = AUTH_URL;

  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);
}

export default getAuthorizationCode;
