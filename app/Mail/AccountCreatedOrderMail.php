<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Mail\Mailable;

class AccountCreatedOrderMail extends Mailable
{
    public function __construct(
        public Order $order,
        public string $email,
        public string $password
    ) {}

    public function build()
    {
        return $this->subject('Your Account & Order Details')
            ->html("
                <h2>Welcome to Sooth Bangladesh 🎉</h2>

                <p>Your order <strong>#{$this->order->id}</strong> has been placed successfully.</p>

                <p>We’ve created an account for you:</p>

                <p>
                    <strong>Email:</strong> {$this->email} <br>
                    <strong>Password:</strong> {$this->password}
                </p>

                <p>You can log in to track your order and future purchases.</p>

                <p>Sooth Bangladesh</p>
            ");
    }
}