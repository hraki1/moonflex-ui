"use client";

import { useState } from "react";

type SubscriptionPlan = {
  id: string;
  name: string;
  price: string;
  resolution: string;
  devices: string;
  features: string[];
};

type PaymentMethod = {
  id: string;
  type: "card" | "paypal";
  lastFour?: string;
  email?: string;
  expiry?: string;
};

export default function AccountProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "plan" | "payment">(
    "profile"
  );
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    password: "••••••••",
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      lastFour: "4242",
      expiry: "05/25",
    },
    {
      id: "2",
      type: "paypal",
      email: "john.doe@example.com",
    },
  ]);

  const plans: SubscriptionPlan[] = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99/month",
      resolution: "720p",
      devices: "1 device",
      features: ["Watch on 1 screen at a time", "Download on 1 device"],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$15.49/month",
      resolution: "1080p",
      devices: "2 devices",
      features: [
        "Watch on 2 screens at a time",
        "Download on 2 devices",
        "HD available",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99/month",
      resolution: "4K+HDR",
      devices: "4 devices",
      features: [
        "Watch on 4 screens at a time",
        "Download on 4 devices",
        "Ultra HD available",
      ],
    },
  ];

  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(plans[1]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically call an API to save changes
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-[60px] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Account Settings
        </h1>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "plan"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("plan")}
          >
            Plan
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "payment"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                ) : (
                  <div className="bg-gray-700 border border-gray-700 rounded px-4 py-2">
                    {profile.name}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                ) : (
                  <div className="bg-gray-700 border border-gray-700 rounded px-4 py-2">
                    {profile.email}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                ) : (
                  <div className="bg-gray-700 border border-gray-700 rounded px-4 py-2">
                    {profile.phone}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Password</label>
                <div className="flex items-center">
                  <div className="bg-gray-700 border border-gray-700 rounded px-4 py-2 flex-1">
                    {profile.password}
                  </div>
                  <button className="ml-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan Tab */}
        {activeTab === "plan" && (
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Plan</h2>

            <div className="mb-8 p-4 bg-gray-700 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium">{currentPlan.name}</h3>
                  <p className="text-gray-400">{currentPlan.price}</p>
                </div>
                <button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 px-6 py-2 rounded">
                  Change Plan
                </button>
              </div>
            </div>

            <h3 className="text-xl font-medium mb-4">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-6 ${
                    currentPlan.id === plan.id
                      ? "border-red-600 bg-gray-700"
                      : "border-gray-600"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">{plan.name}</h4>
                  <p className="text-2xl font-bold mb-2">{plan.price}</p>
                  <p className="text-gray-400 mb-4">
                    {plan.resolution} • {plan.devices}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 rounded ${
                      currentPlan.id === plan.id
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    disabled={currentPlan.id === plan.id}
                  >
                    {currentPlan.id === plan.id
                      ? "Current Plan"
                      : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === "payment" && (
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Payment Methods</h2>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {method.type === "card" ? (
                      <>
                        <div className="bg-gray-600 p-2 rounded mr-4">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Credit Card</h3>
                          <p className="text-gray-400">
                            •••• •••• •••• {method.lastFour}
                          </p>
                          <p className="text-sm text-gray-400">
                            Expires {method.expiry}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gray-600 p-2 rounded mr-4">
                          <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.5 14.4c-.4.3-.9.5-1.4.5-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c.5 0 1 .2 1.4.5l4.5-2.6c-.3-.5-.5-1-.5-1.5 0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1c-.6 0-1.1-.2-1.6-.4l-4.5 2.6c.1.5.2 1 .2 1.5 0 .6-.1 1.1-.3 1.6l4.5 2.6c.4-.3.9-.5 1.4-.5 1.2 0 2.1 1 2.1 2.1s-1 2.1-2.1 2.1c-1.2 0-2.1-1-2.1-2.1 0-.3.1-.7.2-1l-4.5-2.6c-.4.3-.9.5-1.4.5-1.7 0-3.1-1.4-3.1-3.1 0-.5.1-1 .3-1.5l4.5-2.6z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">PayPal</h3>
                          <p className="text-gray-400">{method.email}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Billing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">
                    Billing Address
                  </label>
                  <div className="bg-gray-800 border border-gray-700 rounded px-4 py-2">
                    123 Main St, Apt 4B, New York, NY 10001
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Tax ID</label>
                  <div className="bg-gray-800 border border-gray-700 rounded px-4 py-2">
                    US-123456789
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
