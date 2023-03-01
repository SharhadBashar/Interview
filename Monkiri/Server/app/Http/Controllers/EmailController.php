<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Log;

class EmailController extends Controller
{
    public function sendFeedback(Request $request)
    {
        $email = $request->email;
        $feedback = $request->feedback;
        
        Log::debug("email:".$email);
                
        Mail::raw('Feedback from Monkiri User', function ($message) {
            $message->to('angele@monkiri.co')
                ->from('test@test.test')
                ->setBody('$feedback');
        });


        return response()->json(['message' => 'Request completed']);
    }
}
