import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-14">
        <div className="px-4 sm:px-10 lg:px-14 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <h2 className="text-green-600 text-xl font-semibold mb-3">EasyBasket</h2>
                <p className="text-sm text-gray-400">Get your groceries delivered in minutes with fresh quality and best prices.</p>
            </div>
            <div>
                <h3 className="text-green-600  font-semibold mb-3">Quick Links</h3>
                <ul className="text-sm flex flex-col gap-2">
                    <li className="hover:text-white cursor-pointer">Home</li>
                    <li className="hover:text-white cursor-pointer">Shop</li>
                    <li className="hover:text-white cursor-pointer">Cart</li>
                </ul>
            </div>
            <div>
                <h3 className="text-green-600 font-semibold mb-3">Customer</h3>
                <ul className="text-sm flex flex-col gap-2">
                    <li className="hover:text-white cursor-pointer">My Account</li>
                    <li className="hover:text-white cursor-pointer">Orders</li>
                    <li className="hover:text-white cursor-pointer">Help</li>
                    <li className="hover:text-white cursor-pointer">Support</li>
                </ul>
            </div>
            <div>
                <h3 className="text-green-600  font-semibold mb-3">Contact</h3>
                <p className="text-sm">Visakhapatnam, India</p>
                <p className="text-sm">support@easybasket.com</p>
                <p className="text-sm">+91 XXXXXXXXXX</p>
            </div>
        </div>


      <div className="border-t border-gray-700 text-center py-4 text-sm text-white/80"> &copy; 2026 EasyBasket. All rights reserved. 
         <br />Image,Icons credits: BigBasket, ChatGPT,FlatIcons
         </div>

    </footer>
  );
};

export default Footer;