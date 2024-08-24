import React from "react";

function Wallet() {
  return (
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* <!-- Wallet Balance --> */}
        <div class="p-6 bg-blue-600 text-white text-center">
          <h2 class="text-2xl font-semibold">Current Balance</h2>
          <p class="text-4xl mt-2 font-bold">$120.00</p>
        </div>

        {/* <!-- Wallet Actions --> */}
        <div class="p-6 flex justify-between">
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Funds
          </button>
          <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Withdraw
          </button>
        </div>

        {/* <!-- Transaction History --> */}
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-4">Transaction History</h3>
          <ul class="space-y-4">
            <li class="flex justify-between">
              <span>Ticket Purchase</span>
              <span>- $30.00</span>
            </li>
            <li class="flex justify-between">
              <span>Funds Added</span>
              <span>+ $50.00</span>
            </li>
            <li class="flex justify-between">
              <span>Ticket Purchase</span>
              <span>- $25.00</span>
            </li>
            <li class="flex justify-between">
              <span>Funds Added</span>
              <span>+ $100.00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
