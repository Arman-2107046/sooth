<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Mail\Mailable;

class OrderPlacedMail extends Mailable
{
    public function __construct(public Order $order) {}

    public function build()
    {
        return $this->subject('Your Order Has Been Placed')
            ->html("
                <h2>Thank you for your order 🎉</h2>

                <p>Your order <strong>#{$this->order->id}</strong> has been placed successfully.</p>

                <p>
                    Total Amount: 
                    <strong>Tk " . number_format($this->order->total_price) . "</strong>
                </p>

                <p>You can log in anytime to track your order.</p>

                <p>— Sooth Bangladesh</p>
            ");
    }
}