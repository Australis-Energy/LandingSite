import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 min-h-screen bg-gradient-to-br from-australis-offWhite via-white to-australis-lightGray relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-australis-aqua/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-16 right-12 w-60 h-60 bg-gradient-to-xl from-white/20 to-australis-indigo/10 rounded-full blur-2xl"></div>
            <div className="container-custom relative z-10">
                <div className="flex items-center mb-6">
                    <button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 backdrop-blur hover:bg-white/80 transition-colors shadow border border-white/30"
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                    >
                        <ArrowLeft size={20} className="text-australis-navy" />
                        <span className="text-australis-navy font-medium text-base">Back</span>
                    </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-australis-navy mb-6">Cookie Policy</h1>

                <div className="prose max-w-none text-gray-700">
                    <p className="text-sm text-gray-600">Last Updated: 26 October 2025</p>
                    <p className="text-sm text-gray-600">Company: Australis Technologies Limited (Company No. 16178505)</p>
                    <p className="text-sm text-gray-600">Email: <a href="mailto:hello@australis.energy" className="text-australis-indigo">hello@australis.energy</a></p>
                    <br />
                    <h2>1. Introduction</h2>
                    <p>
                        This Cookie Policy explains how Australis Technologies Limited (“Australis”, “we”, “us”, “our”) uses cookies and similar technologies on our websites — australis.energy and portal.australis.energy — and within related APIs and applications (together, the “Services”).
                    </p>

                    <p>We use cookies to ensure our sites work properly, improve performance, and analyse usage to enhance your experience.</p>

                    <br />
                    <h2>2. What Are Cookies?</h2>
                    <p>Cookies are small text files placed on your computer or device when you visit a website. They help us recognise your browser, remember preferences, and understand how you use our Services.</p>

                    <p>Some cookies are essential for our sites to function, while others help us improve performance or provide analytics and personalisation.</p>

                    <br />
                    <h2>3. Types of Cookies We Use</h2>
                    <p className="font-medium">Type — Purpose — Examples</p>
                    <ul>
                        <li>
                            <strong>Strictly Necessary Cookies:</strong> Required for the website to operate securely and correctly. These cannot be disabled. Examples: Authentication via Azure AD B2C, session cookies, load balancing.
                        </li>
                        <li>
                            <strong>Performance &amp; Analytics Cookies:</strong> Help us understand how visitors use our site and improve user experience. Examples: Google Analytics, Azure Application Insights.
                        </li>
                        <li>
                            <strong>Functional Cookies:</strong> Enable site features like remembering your preferences. Examples: Language, theme, or form settings.
                        </li>
                        <li>
                            <strong>Targeting or Marketing Cookies:</strong> Used to deliver relevant marketing or measure the effectiveness of campaigns. Examples: Google Ads (if used), social media integrations.
                        </li>
                    </ul>

                    <br />
                    <h2>4. Third-Party Cookies</h2>
                    <p>
                        Some cookies are placed by third parties that provide functionality or analytics for us, including:
                    </p>
                    <ul>
                        <li>Google Analytics – monitors site usage.</li>
                        <li>Microsoft Azure – used for authentication, load balancing, and telemetry.</li>
                        <li>SendGrid – used in email tracking for open and click metrics.</li>
                    </ul>

                    <p>These third parties have their own privacy and cookie policies.</p>

                    <br />
                    <h2>5. Managing Cookies</h2>
                    <p>
                        You can manage or delete cookies at any time through your browser settings. Most browsers allow you to:
                    </p>
                    <ul>
                        <li>Block all cookies.</li>
                        <li>Delete existing cookies.</li>
                        <li>Receive alerts before cookies are stored.</li>
                    </ul>

                    <p>If you block or delete cookies, some site functionality may be affected (e.g., login sessions may not persist).</p>

                    <p>For detailed guidance, visit: <a href="https://www.allaboutcookies.org" className="text-australis-indigo" target="_blank" rel="noreferrer">www.allaboutcookies.org</a> or <a href="https://www.youronlinechoices.eu" className="text-australis-indigo" target="_blank" rel="noreferrer">www.youronlinechoices.eu</a></p>

                    <br />
                    <h2>6. Cookie Consent</h2>
                    <p>
                        When you first visit our website, you will see a cookie banner asking you to accept or manage your preferences. You can update your consent choices at any time by revisiting this page or adjusting your browser settings.
                    </p>

                    <br />
                    <h2>7. Changes to This Policy</h2>
                    <p>
                        We may update this Cookie Policy periodically to reflect legal or technical changes. The latest version will always be published on this page with an updated “Last Updated” date.
                    </p>

                    <br />
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions about how we use cookies, please contact:</p>
                    <p>
                        Australis Technologies Limited<br />
                        Registered in England and Wales (Company No. 16178505)<br />
                        Email: <a href="mailto:hello@australis.energy" className="text-australis-indigo">hello@australis.energy</a><br />
                        Website: <a href="https://australis.energy" target="_blank" rel="noreferrer" className="text-australis-indigo">https://australis.energy</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CookiePolicy;
