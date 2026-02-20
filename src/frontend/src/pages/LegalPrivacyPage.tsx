import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Eye, Users, FileText, Globe, Mail } from 'lucide-react';

export default function LegalPrivacyPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-4xl border-2 border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <img 
              src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" 
              alt="Righteous Truths Logo" 
              className="h-16 w-16 object-contain" 
            />
          </div>
          <CardTitle className="text-center text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Privacy Policy
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Effective Date: January 10, 2026 | Last Updated: January 10, 2026
          </p>
          <Separator />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8 text-sm leading-relaxed">
              {/* Introduction */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">1. Introduction</h2>
                </div>
                <p className="text-muted-foreground">
                  Welcome to Righteous Truths ("we," "us," "our," or the "Platform"). We are committed to protecting your privacy and ensuring transparency in how we collect, use, store, and protect your personal information. This Privacy Policy explains our data practices when you use the Righteous Truths platform.
                </p>
                <p className="mt-2 text-muted-foreground">
                  By accessing or using Righteous Truths, you agree to the terms outlined in this Privacy Policy. We comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Union and the California Consumer Privacy Act (CCPA) for California residents.
                </p>
              </section>

              {/* Data Collection */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">2. Data Collection Practices</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We collect various types of information to provide and improve our services:
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-md bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      <li><strong>Account Data:</strong> Name, bio, profile image, and Internet Identity principal</li>
                      <li><strong>Contact Information:</strong> Email address for communications and support</li>
                      <li><strong>Authentication Data:</strong> Internet Identity credentials and session information</li>
                      <li><strong>Profile Preferences:</strong> User settings, preferences, and customization choices</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      <li><strong>Platform Interactions:</strong> Pages visited, features used, content viewed</li>
                      <li><strong>Engagement Metrics:</strong> Likes, shares, downloads, and community interactions</li>
                      <li><strong>Search Queries:</strong> Content searches and filter preferences</li>
                      <li><strong>Time and Duration:</strong> Session length and activity timestamps</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Creative Content</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      <li><strong>Uploaded Works:</strong> Images, audio files, text content, DTF designs</li>
                      <li><strong>AI-Generated Content:</strong> Coloring pages, affirmations, memes</li>
                      <li><strong>Collaborative Works:</strong> Kings Collaboration Hub content and contributor data</li>
                      <li><strong>Metadata:</strong> Titles, descriptions, tags, categories, and licensing terms</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Transaction Data</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      <li><strong>Purchase History:</strong> Items purchased, transaction dates, and amounts</li>
                      <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store full card details)</li>
                      <li><strong>Royalty Records:</strong> Earnings, distributions, and payment history</li>
                      <li><strong>Licensing Agreements:</strong> Terms, royalty splits, and usage rights</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Technical Data</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                      <li><strong>Network Data:</strong> IP address (aggregated), connection type</li>
                      <li><strong>Performance Metrics:</strong> Load times, errors, and system diagnostics</li>
                      <li><strong>Cookies:</strong> Essential cookies for authentication and functionality</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">3. How We Use Your Information</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We use collected information for the following purposes:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Content Personalization:</strong> Provide personalized content recommendations based on your interests, browsing history, and engagement patterns
                  </li>
                  <li>
                    <strong>Platform Analytics:</strong> Analyze usage patterns to improve features, optimize performance, and enhance user experience
                  </li>
                  <li>
                    <strong>Transaction Fulfillment:</strong> Process purchases, distribute royalties, manage licensing agreements, and maintain transaction records
                  </li>
                  <li>
                    <strong>Authentication & Security:</strong> Verify identity, manage sessions, detect fraud, and protect against unauthorized access
                  </li>
                  <li>
                    <strong>Communication:</strong> Send notifications, updates, support responses, and important platform announcements
                  </li>
                  <li>
                    <strong>Community Features:</strong> Enable collaboration, content sharing, and social interactions within the platform
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Comply with legal obligations, enforce Terms of Service, and resolve disputes
                  </li>
                  <li>
                    <strong>Platform Improvement:</strong> Develop new features, conduct research, and optimize existing functionality
                  </li>
                </ul>
              </section>

              {/* Third-Party Services */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">4. Third-Party Services</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We integrate with trusted third-party services to provide platform functionality:
                </p>
                
                <div className="space-y-3">
                  <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Stripe Payment Processing</h3>
                    <p className="text-muted-foreground text-sm">
                      We use Stripe for secure payment processing. Stripe handles all payment card information according to PCI DSS standards. We do not store full payment card details on our servers. For more information, visit <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Stripe's Privacy Policy</a>.
                    </p>
                  </div>

                  <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Internet Identity Authentication</h3>
                    <p className="text-muted-foreground text-sm">
                      We use Internet Identity, a decentralized authentication system by DFINITY Foundation, for secure, privacy-preserving user authentication. Internet Identity does not share personally identifiable information with us beyond your unique principal identifier. Learn more at <a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer" className="text-primary underline">identity.ic0.app</a>.
                    </p>
                  </div>

                  <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                    <h3 className="font-semibold text-foreground mb-2">Internet Computer Blockchain</h3>
                    <p className="text-muted-foreground text-sm">
                      Our platform operates on the Internet Computer blockchain, a decentralized network that provides secure, tamper-proof data storage. Data stored on the blockchain is distributed across multiple nodes globally.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">5. Cookie and Tracking Policies</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Essential Cookies:</strong> Required for authentication, session management, and core platform functionality. These cannot be disabled without affecting platform operation.
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong> Remember your preferences, settings, and customization choices to improve your experience.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Collect anonymous usage statistics to help us understand how users interact with the platform and identify areas for improvement.
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Monitor platform performance, load times, and technical issues to ensure optimal functionality.
                  </li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  You can manage cookie preferences through your browser settings. Note that disabling essential cookies may limit platform functionality. We do not use third-party advertising cookies or sell your data to advertisers.
                </p>
              </section>

              {/* GDPR Compliance */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">6. GDPR Compliance and User Data Rights</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We are committed to protecting the rights of users in the European Union and worldwide. You have the following rights regarding your personal data:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of all personal information we hold about you
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Correct inaccurate or incomplete information through your account settings
                  </li>
                  <li>
                    <strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data, subject to legal retention requirements
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to processing of your personal information for specific purposes
                  </li>
                  <li>
                    <strong>Right to Restriction:</strong> Request limitation of processing in certain circumstances
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing where consent is the legal basis
                  </li>
                  <li>
                    <strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority
                  </li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  To exercise these rights, contact us at <a href="mailto:privacy@righteous-truths.com" className="text-primary underline">privacy@righteous-truths.com</a>. We will respond within 30 days.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">7. Data Retention Periods</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We retain your information only as long as necessary for the purposes outlined in this policy:
                </p>
                <div className="space-y-2">
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-muted-foreground">
                      <strong>Account Information:</strong> Retained while your account is active and for 90 days after account closure
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-muted-foreground">
                      <strong>Transaction Records:</strong> Retained for 7 years for tax, legal, and accounting compliance
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-muted-foreground">
                      <strong>Content and Creative Works:</strong> Retained as long as publicly available or until you request deletion
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-muted-foreground">
                      <strong>Blockchain Data:</strong> Due to the immutable nature of blockchain technology, some data may be permanently stored
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-muted-foreground">
                      <strong>Analytics Data:</strong> Aggregated and anonymized after 24 months
                    </p>
                  </div>
                </div>
              </section>

              {/* Security Measures */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">8. Security Measures</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using HTTPS/TLS protocols</li>
                  <li><strong>Blockchain Security:</strong> Data stored on the Internet Computer blockchain benefits from decentralized, tamper-proof storage</li>
                  <li><strong>Access Controls:</strong> Strict authentication requirements and role-based access controls for sensitive operations</li>
                  <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                  <li><strong>Secure Authentication:</strong> Internet Identity provides privacy-preserving, passwordless authentication</li>
                  <li><strong>Data Minimization:</strong> We collect only the data necessary for platform functionality</li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  While we implement robust security measures, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but continuously work to protect your information.
                </p>
              </section>

              {/* User Control */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">9. User Control Over Data</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  You have control over your personal information:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Profile Management:</strong> Update your name, bio, and profile image at any time through account settings
                  </li>
                  <li>
                    <strong>Content Control:</strong> Edit, delete, or update your uploaded content and creative works
                  </li>
                  <li>
                    <strong>Privacy Settings:</strong> Control visibility of your profile and content
                  </li>
                  <li>
                    <strong>Data Deletion:</strong> Request deletion of your account and associated data by contacting support
                  </li>
                  <li>
                    <strong>Communication Preferences:</strong> Opt out of non-essential communications and notifications
                  </li>
                  <li>
                    <strong>Download Your Data:</strong> Request a copy of your personal information in a portable format
                  </li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">10. Children's Privacy</h2>
                </div>
                <p className="text-muted-foreground">
                  Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at <a href="mailto:privacy@righteous-truths.com" className="text-primary underline">privacy@righteous-truths.com</a>.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Users between 13 and 18 years of age must have parental or guardian consent to use the platform. If we discover that we have collected information from a child under 13 without parental consent, we will delete that information promptly.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">11. International Data Transfers</h2>
                </div>
                <p className="text-muted-foreground">
                  The Righteous Truths platform operates on the Internet Computer blockchain, a decentralized global network. Your information may be stored and processed in multiple jurisdictions worldwide. By using the platform, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws.
                </p>
                <p className="mt-2 text-muted-foreground">
                  For users in the European Union, we ensure appropriate safeguards are in place for international data transfers in accordance with GDPR requirements, including standard contractual clauses and adequacy decisions.
                </p>
              </section>

              {/* Policy Updates */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">12. Changes to This Privacy Policy</h2>
                </div>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or platform features. We will notify you of material changes by:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Posting the updated policy on the platform with a new "Effective Date"</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying a prominent notice on the platform</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Your continued use of the platform after changes are posted constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">13. Contact and Compliance Information</h2>
                </div>
                <p className="text-muted-foreground mb-3">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="rounded-md border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">Righteous Truths - Privacy Team</p>
                    <p className="text-muted-foreground text-sm">Committed to protecting your privacy and data rights</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">
                        <strong>Privacy Inquiries:</strong> <a href="mailto:privacy@righteous-truths.com" className="text-primary underline">privacy@righteous-truths.com</a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">
                        <strong>General Support:</strong> <a href="mailto:support@righteous-truths.com" className="text-primary underline">support@righteous-truths.com</a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">
                        <strong>Legal Matters:</strong> <a href="mailto:legal@righteous-truths.com" className="text-primary underline">legal@righteous-truths.com</a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">
                        <strong>Website:</strong> <a href="https://righteous-truths.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">righteous-truths.com</a>
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    For GDPR-related inquiries, you may also contact your local data protection authority. We will respond to all privacy requests within 30 days.
                  </p>
                </div>
              </section>

              {/* Consent Statement */}
              <section className="rounded-md border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground text-lg">Your Privacy Matters</h3>
                    <p className="text-sm text-muted-foreground">
                      By using Righteous Truths, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein. You have the right to withdraw consent at any time by contacting us or deleting your account.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We are committed to protecting your privacy, empowering you with control over your personal information, and maintaining transparency in our data practices. Your trust is our top priority.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer Note */}
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  This Privacy Policy is part of our legal framework. Please also review our{' '}
                  <a href="/legal/terms" className="text-primary underline">Terms of Service</a>,{' '}
                  <a href="/legal/refund" className="text-primary underline">Refund Policy</a>, and{' '}
                  <a href="/legal/copyright" className="text-primary underline">Copyright & Licensing Notice</a>.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
