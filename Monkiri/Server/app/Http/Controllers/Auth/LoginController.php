<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;
use Socialite;
use App\User;
use Auth;
use Log;

class LoginController extends Controller
{
    use AuthenticatesAndRegistersUsers;

    /**
     * Serve the login page
     */
    public function getLogin()
    {
        return view('login');
    }

    /**
     * Social redirect
     */
    public function getSocialRedirect($account)
    {
        try {
            return Socialite::with($account)->redirect();
        } catch (\InvalidArgumentException $e) {
            return redirect('/login');
        }
    }
  
    /**
     * Social callback
     */
    public function getSocialCallback(Request $request, $account)
    {
        throw new Exception('Social login via web is disabled!');

        session()->put('state', $request->input('state'));

        // Grabs the user who authenticated via social account.
        $socialUser = Socialite::with($account)->user();

        // Get the user from the account provider
        $user = User::where('provider_id', '=', $socialUser->id)
            ->where('provider', '=', $account)
            ->first();

        // Checks to see if a user exists. If not we need to create the
        // user in the database before logging them in.
        if ($user == null) {
            $newUser = new User();

            $newUser->name        = $socialUser->getName();
            $newUser->email       = $socialUser->getEmail() == '' ? '' : $socialUser->getEmail();
            $newUser->password    = '';
            $newUser->provider    = $account;
            $newUser->provider_id = $socialUser->getId();

            $newUser->save();

            $user = $newUser;
        }

        Auth::login($user);
        return response(json_encode($socialUser));
    }
    
    
    /**
     * Add user data in the database and return extra information (required for profile image)
     */
    public function getUserDetails(Request $userRequest, $account)
    {
        // Retrieve user from retrieved access token
        $socialUser = Socialite::driver($account)->userFromToken($userRequest->accessToken);
        
        // Get the user from the database if it is available
        $user = User::where('provider_id', '=', $socialUser->id)
            ->where('provider', '=', $account)
            ->first();
        
        if ($user == null) { //this information is always the same
            $user = new User();
            $user->password    = '';
            $user->provider    = $account;
            $user->provider_id = $socialUser->getId();
        }

        $user->name        = $socialUser->getName();
        $user->email       = $socialUser->getEmail() == '' ? '' : $socialUser->getEmail();
        $user->profile_url     = $socialUser->getAvatar();
         
        
        $user->save();
         

        Auth::login($user);
        return $user;
    }
    
    /**
     * Login via Facebook
     * Return the id, name, profile image and email of the user
     */
    public function socialLoginFacebook(Request $request)
    {
        $providerId = $request->input('userID');
        $accessToken = $request->input('accessToken');

        $client = new \GuzzleHttp\Client();
        
        // Verify the access token and providerIds are valid
        $response = $client->request('GET', "https://graph.facebook.com/v3.3/me?fields=id%2Cname%2Cemail&access_token=$accessToken");
        $data = json_decode($response->getBody());

        if ($response->getStatusCode()==200) {
            $userRequest = new Request([
                'id'    => $providerId,
                'accessToken' => $accessToken,
                'name'   => $data->name,
                'email'  => $data->email,
            ]);
            $extraData = $this->getUserDetails($userRequest, 'facebook');
            $userRequest->merge(['profileImg' => $extraData['profile_url']]);       
        
            return response($userRequest->all());
        } else {
            return response($response->getBody());
        }
    }

    /**
     * Logout of Facebook
     * Return the result code from logout request
     */
    public function socialLogoutFacebook(Request $request)
    {        
        $providerId = $request->input('userID');
        $accessToken = $request->input('accessToken');
        $client = new \GuzzleHttp\Client();
        
        // Verify the access token and providerIds are valid
        $response = $client->request('DELETE', "https://graph.facebook.com/me/permissions?access_token=$accessToken");
        $data = json_decode($response->getBody());
        
        return response($response->getStatusCode());
    }

    public function fakeLoginFacebook()
    {
        $data = [
                "id" => "106230644031430",
                "name"=> "Test User",
                "email"=> "test@user.co"
        ];
        
        return response()->json($data);
    }
}
