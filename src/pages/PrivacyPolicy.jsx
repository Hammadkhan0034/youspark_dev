import React from "react";
import Topbar from "../components/Topbar";

const PrivacyPolicy = () => {
  return (
    <>
    {/* <Topbar /> */}
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-left">
      <h1 className="text-3xl font-bold mb-6 text-teal-600 dark:text-teal-400">
        Privacy Policy
      </h1>

      <p className="mb-4">
        This Privacy Policy explains how YouSparks Technologies Inc. ("we", "our", "us") collects, 
        uses, and shares your personal information when you use our services, and your rights regarding your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Data We Collect</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Account Information: Name, email, phone number, date of birth, and location.</li>
        <li>Profile Data: Photos, usernames, bios, and other details you provide.</li>
        <li>Usage Data: Interactions with the app, chats, and connection preferences.</li>
        <li>Location Data: Collected for matchmaking and recommendations.</li>
        <li>Social Media Integration: Information from linked Facebook or Google accounts.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Data</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>To provide app functionality, including matching users and facilitating chats.</li>
        <li>To personalize recommendations and improve services.</li>
        <li>To ensure security and app performance.</li>
        <li>To display relevant advertisements and promotions.</li>
        <li>To comply with legal obligations and prevent fraud.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Sharing</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>We do not sell your data but may share it with trusted partners (e.g., payment processors, cloud hosting).</li>
        <li>We may share data to comply with legal obligations.</li>
        <li>Aggregated, non-personally identifiable data may be shared for analytics.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Your Rights</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Access: Request access to personal data.</li>
        <li>Correction: Request correction of inaccurate or incomplete data.</li>
        <li>Deletion: Request data deletion with legal exceptions.</li>
        <li>Data Portability: Request a copy of data in a portable format.</li>
        <li>Objection: Object to data processing for direct marketing.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security and Storage</h2>
      <p className="mb-4">We implement security measures but encourage you to protect your account credentials.</p>
      <p className="mb-4">We store your data as long as necessary for services and legal compliance.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. International Data Transfers</h2>
      <p className="mb-4">Your data may be transferred globally with safeguards to protect it.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to This Policy</h2>
      <p className="mb-4">We may update this policy and notify you of significant changes.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
      <p className="font-bold text-teal-600 dark:text-teal-400">YouSparks Technologies Inc.</p>
      <p>support@yousparks.com</p>
    </div>
    </>
  );
};

export default PrivacyPolicy;
