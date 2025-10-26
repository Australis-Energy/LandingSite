import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
                <h1 className="text-3xl md:text-4xl font-extrabold text-australis-navy mb-6">Terms of Service</h1>

                <div className="prose max-w-none text-gray-700">
                    <p className="text-sm text-gray-600">Last Updated: 26 October 2025</p>
                    <p className="text-sm text-gray-600">Company: Australis Technologies Limited (Company No. 16178505)</p>

                    <br />
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        These Terms of Service ("Terms") govern your use of the Australis websites (australis.energy, portal.australis.energy), APIs and related services (the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
                    </p>

                    <br />
                    <h2>2. Services</h2>
                    <p>
                        Australis provides geospatial, developability and reporting services, tools and related software. We may update, modify or discontinue features from time to time.
                    </p>

                    <br />
                    <h2>3. Accounts and Registration</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of account credentials. You must provide accurate information and keep it updated. We may suspend or terminate accounts for violations.
                    </p>

                    <br />
                    <h2>4. User Content</h2>
                    <p>
                        You retain ownership of content you upload, post or submit to the Services. By submitting content you grant Australis a licence to use, reproduce and display that content to provide the Services.
                    </p>

                    <br />
                    <h2>5. Acceptable Use</h2>
                    <p>
                        You must not use the Services for unlawful purposes, to infringe the rights of others, or to attempt to gain unauthorised access to systems. We reserve the right to remove content or suspend accounts that violate these rules.
                    </p>

                    <br />
                    <h2>6. Intellectual Property</h2>
                    <p>
                        All intellectual property rights in the Services and our platform (excluding your content) are owned by Australis or its licensors.
                    </p>

                    <br />
                    <h2>7. Third-Party Services</h2>
                    <p>
                        The Services may integrate with third-party providers (Azure, OpenAI, Google Analytics, etc.). Your use of those services may be subject to third-party terms.
                    </p>

                    <br />
                    <h2>8. Disclaimers</h2>
                    <p>
                        The Services are provided "as is" and "as available". To the fullest extent permitted by law, Australis disclaims all warranties, express or implied.
                    </p>

                    <br />
                    <h2>9. Limitation of Liability</h2>
                    <p>
                        Except where prohibited by law, Australis will not be liable for indirect or consequential losses. Our aggregate liability for direct losses arising from these Terms will be limited to fees paid in the 12 months prior to the claim.
                    </p>

                    <br />
                    <h2>10. Termination</h2>
                    <p>
                        We may suspend or terminate access to the Services for breach of these Terms or for operational reasons. Termination does not affect accrued rights.
                    </p>

                    <br />
                    <h2>11. Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of England and Wales. Disputes will be subject to the exclusive jurisdiction of the English courts, unless otherwise agreed.
                    </p>

                    <br />
                    <h2>12. Changes to Terms</h2>
                    <p>
                        We may update these Terms from time to time. Material changes will be notified via the Services or email where practicable.
                    </p>

                    <br />
                    <h2>13. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless Australis and its directors, employees, and affiliates from any claim, damage, or expense arising from your misuse of the Services or violation of these Terms.
                    </p>

                    <br />
                    <h2>14. Termination</h2>
                    <p>
                        We may suspend or terminate your access immediately if you breach these Terms or if required by law. You may stop using the Services at any time. Upon termination, all rights granted to you under these Terms will cease.
                    </p>

                    <br />
                    <h2>15. Governing Law and Jurisdiction</h2>
                    <p>
                        These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                    </p>

                    <br />
                    <h2>16. Changes to These Terms</h2>
                    <p>
                        We may revise these Terms from time to time. The updated version will be posted on our website and effective immediately upon publication. Continued use of the Services constitutes your acceptance of the new Terms.
                    </p>

                    <br />
                    <h2>17. Contact Us</h2>
                    <p>
                        For any questions about these Terms or your use of the Services, please contact:
                    </p>
                    <br />
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

export default TermsOfService;
