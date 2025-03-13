import React from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar"

const TermsAndConditions = () => {
  return (
    <>
    <Topbar />
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-left">
      <h1 className="text-3xl font-bold mb-6 text-teal-600 dark:text-teal-400">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to YouSparks. By accessing or using our services, you agree to be
        bound by these Terms and Conditions ("Terms"). Please read them carefully
        before using our social app platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
      <p className="mb-4">
        By creating an account or using our services, you agree to be legally
        bound by these Terms, our Privacy Policy, and any other guidelines or
        policies we post.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Eligibility</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Be at least 18 years old or meet the age requirements in your jurisdiction.</li>
        <li>Have the legal capacity to enter into a binding agreement.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Prohibited Activities</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Fake Accounts and Impersonation</li>
        <li>Misuse of AI-Generated Content</li>
        <li>Harassment or Bullying</li>
        <li>Hate Speech and Discrimination</li>
        <li>Political and Religious Manipulation</li>
        <li>Illegal Activities</li>
        <li>Spam or Fraud</li>
        <li>Unauthorized Commercial Use</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">User-Generated Content</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>You are responsible for the content you post.</li>
        <li>
          You grant YouSparks Technologies Inc. a non-exclusive, royalty-free
          license to use, display, and distribute your content as part of our services.
        </li>
        <li>
          We reserve the right to remove or disable any content that violates these
          Terms or applicable laws.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Account Security</h2>
      <p className="mb-4">You are responsible for safeguarding your login credentials.</p>
      <p className="mb-4">Notify us immediately if you suspect unauthorized access to your account.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Privacy and Data Protection</h2>
      <p className="mb-4">
        We are committed to protecting your privacy. Please review our 
        <Link to="/privacy-policy"
          className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
        >
          Privacy Policy
        </Link> 
        to understand how we collect, use, and protect your personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Community Guidelines Enforcement</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Issue warnings or temporarily suspend your account.</li>
        <li>Permanently terminate accounts involved in severe or repeated violations.</li>
        <li>Report illegal activities to the appropriate authorities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          All trademarks, logos, and service marks displayed on the platform are the
          property of YouSparks Technologies Inc. or third parties.
        </li>
        <li>
          You agree not to use, reproduce, or distribute any content from our
          platform without permission.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Information</h2>
      <p className="font-bold text-teal-600 dark:text-teal-400">YouSparks Technologies Inc.</p>
      <p>support@yousparks.com</p>
    </div>
    </>
  );
};

export default TermsAndConditions;
