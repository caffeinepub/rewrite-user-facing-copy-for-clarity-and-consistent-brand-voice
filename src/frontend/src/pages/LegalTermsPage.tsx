import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function LegalTermsPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-4xl border-2 border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <img src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" alt="Righteous Truths" className="h-16 w-16 object-contain" />
          </div>
          <CardTitle className="text-center text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Terms of Service</CardTitle>
          <p className="text-center text-sm text-muted-foreground">Effective Date: December 15, 2025</p>
          <Separator />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  Welcome to Righteous Truths ("Platform", "we", "us", or "our"). By accessing or using our Platform, you ("User", "you", or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use the Platform. These Terms constitute a legally binding agreement between you and Righteous Truths.
                </p>
                <p className="mt-2 text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Your continued use of the Platform after changes are posted constitutes acceptance of the modified Terms. We will notify users of material changes through the Platform or via email.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">2. User Accounts and Authentication</h2>
                <p className="text-muted-foreground">
                  To access certain features of the Platform, you must authenticate using Internet Identity, a decentralized authentication system. You are responsible for:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Maintaining the security and confidentiality of your Internet Identity credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Ensuring your profile information is accurate and up-to-date</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  You must be at least 13 years old to create an account. If you are under 18, you must have parental or guardian consent to use the Platform.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">3. Content Ownership and Intellectual Property</h2>
                <p className="text-muted-foreground">
                  <strong>Creator Rights:</strong> Creators retain full ownership and copyright of all content they upload to the Platform. By uploading content, you represent and warrant that:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>You own all rights to the content or have obtained all necessary permissions</li>
                  <li>Your content does not infringe on any third-party intellectual property rights</li>
                  <li>You have the authority to grant the licenses specified in your licensing agreement</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Platform License:</strong> By uploading content, you grant Righteous Truths a non-exclusive, worldwide, royalty-free license to display, distribute, store, and process your content solely for the purpose of operating and promoting the Platform. This license does not transfer ownership of your content.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Buyer Rights:</strong> When you purchase content, you receive a license to use that content according to the terms specified by the creator in their licensing agreement. You do not acquire ownership of the underlying intellectual property unless explicitly stated.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">4. Licensing Agreements and Royalty Terms</h2>
                <p className="text-muted-foreground">
                  All content uploaded to the Platform must include a licensing agreement that specifies:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Redistribution rights (none, limited, or full)</li>
                  <li>Commercial use permissions</li>
                  <li>Derivative works allowances</li>
                  <li>Royalty split configurations for collaborative works</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Royalty Payments:</strong> Creators agree to the royalty splits configured during content upload. The Platform automatically calculates and distributes royalties based on sales. Royalty payments are processed monthly through Stripe, subject to a minimum threshold of $10.00. The Platform retains a 10% service fee on all transactions to cover operational costs.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Collaborative Works:</strong> For content with multiple contributors, all parties must agree to the royalty split configuration. Disputes regarding royalty distributions should be reported to platform administrators for mediation.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">5. Prohibited Content and Conduct</h2>
                <p className="text-muted-foreground">
                  Users may not upload, share, or engage in content or conduct that:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Violates any applicable laws or regulations</li>
                  <li>Infringes on intellectual property rights of others</li>
                  <li>Contains hate speech, harassment, or discriminatory content</li>
                  <li>Includes explicit sexual content or pornography</li>
                  <li>Promotes violence, illegal activities, or self-harm</li>
                  <li>Contains malware, viruses, or harmful code</li>
                  <li>Impersonates another person or entity</li>
                  <li>Engages in spam, fraud, or deceptive practices</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  We reserve the right to remove any content that violates these Terms and to suspend or terminate accounts of users who repeatedly violate our policies.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">6. Purchases, Payments, and Refunds</h2>
                <p className="text-muted-foreground">
                  All purchases are processed through Stripe, our secure payment processor. By making a purchase, you agree to Stripe's terms of service. Prices are displayed in USD and include all applicable taxes unless otherwise stated.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Digital Content:</strong> Digital content is delivered immediately upon successful payment. All sales are generally final due to the nature of digital goods. See our Refund Policy for specific circumstances under which refunds may be granted.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Subscription Services:</strong> If you purchase a subscription, you will be charged automatically at the beginning of each billing period. You may cancel your subscription at any time, but no refunds will be provided for partial billing periods.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">7. User Responsibilities</h2>
                <p className="text-muted-foreground">
                  As a user of the Platform, you agree to:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Provide accurate and truthful information</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Use the Platform in compliance with all applicable laws</li>
                  <li>Not attempt to circumvent security measures or access restricted areas</li>
                  <li>Not engage in automated scraping or data harvesting</li>
                  <li>Report any violations of these Terms to platform administrators</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mt-2 text-muted-foreground">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, RIGHTEOUS TRUTHS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Your use or inability to use the Platform</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of transmission to or from the Platform</li>
                  <li>Any bugs, viruses, or other harmful code transmitted through the Platform</li>
                  <li>Any errors or omissions in content or any loss or damage incurred from use of content</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">9. Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify, defend, and hold harmless Righteous Truths, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your infringement of any intellectual property or other rights of any third party.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">10. Account Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Prolonged inactivity</li>
                  <li>Request by law enforcement or government agencies</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Upon termination, your right to use the Platform will immediately cease. You may retain access to content you have purchased, but you will lose access to any content you have uploaded and any pending royalty payments below the minimum threshold.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">11. Dispute Resolution and Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
                <p className="mt-2 text-muted-foreground">
                  You agree to waive any right to a jury trial or to participate in a class action lawsuit. If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">12. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated to users via email or through prominent notice on the Platform. Your continued use of the Platform after changes are posted constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Platform.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">13. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions, concerns, or notices regarding these Terms of Service, please contact us:
                </p>
                <div className="mt-2 rounded-md bg-muted p-4">
                  <p className="font-medium">Righteous Truths</p>
                  <p className="text-muted-foreground">Email: legal@righteous-truths.com</p>
                  <p className="text-muted-foreground">Website: righteous-truths.com</p>
                </div>
              </section>

              <section className="rounded-md border-2 border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium">
                  By using Righteous Truths, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
