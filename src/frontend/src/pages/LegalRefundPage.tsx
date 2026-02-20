import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function LegalRefundPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-4xl border-2 border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <img src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" alt="Righteous Truths" className="h-16 w-16 object-contain" />
          </div>
          <CardTitle className="text-center text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Refund Policy</CardTitle>
          <p className="text-center text-sm text-muted-foreground">Effective Date: December 15, 2025</p>
          <Separator />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">1. Overview</h2>
                <p className="text-muted-foreground">
                  At Righteous Truths, we strive to provide high-quality digital content and a satisfactory user experience. This Refund Policy outlines the circumstances under which refunds may be granted for purchases made on our Platform. Due to the nature of digital content, which is delivered immediately upon purchase, all sales are generally final. However, we understand that exceptional circumstances may arise, and we are committed to addressing legitimate concerns fairly.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">2. Digital Content Purchases</h2>
                <p className="text-muted-foreground">
                  <strong>Immediate Delivery:</strong> All digital content purchased on Righteous Truths is delivered immediately upon successful payment completion. Once content is delivered and accessible, it is considered "used" and is generally not eligible for refund.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Final Sale Policy:</strong> By completing a purchase, you acknowledge that digital content is delivered instantly and that all sales are final unless you qualify for a refund under the specific circumstances outlined in this policy.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Preview Before Purchase:</strong> We encourage all users to carefully review content previews, descriptions, licensing terms, and creator information before making a purchase to ensure the content meets your needs and expectations.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">3. Refund Eligibility</h2>
                <p className="text-muted-foreground">
                  Refunds may be considered in the following circumstances:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Technical Issues:</strong> If you experience technical problems that prevent you from downloading or accessing purchased content, and our support team is unable to resolve the issue within a reasonable timeframe (typically 48 hours).
                  </li>
                  <li>
                    <strong>Content Misrepresentation:</strong> If the content you received significantly differs from its description, preview, or advertised features. Minor variations or subjective quality assessments do not qualify for refunds.
                  </li>
                  <li>
                    <strong>Duplicate Purchases:</strong> If you accidentally purchased the same content multiple times due to a technical error or payment processing issue. Only the duplicate transaction(s) will be refunded.
                  </li>
                  <li>
                    <strong>Payment Processing Errors:</strong> If you were charged incorrectly due to a payment processing error, such as being charged multiple times for a single purchase or being charged an incorrect amount.
                  </li>
                  <li>
                    <strong>Unauthorized Transactions:</strong> If your account was accessed without authorization and purchases were made without your consent. You must report unauthorized access immediately and provide supporting documentation.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">4. Refund Request Process</h2>
                <p className="text-muted-foreground">
                  To request a refund, please follow these steps:
                </p>
                <ol className="ml-6 mt-2 list-decimal space-y-2 text-muted-foreground">
                  <li>
                    <strong>Contact Us Promptly:</strong> Submit your refund request within 7 days of the purchase date. Requests submitted after 7 days will not be considered except in cases of unauthorized transactions.
                  </li>
                  <li>
                    <strong>Provide Required Information:</strong> Include the following in your refund request:
                    <ul className="ml-6 mt-1 list-disc space-y-1">
                      <li>Your account email or Internet Identity principal</li>
                      <li>Transaction ID or order number</li>
                      <li>Title and ID of the content purchased</li>
                      <li>Detailed explanation of the reason for your refund request</li>
                      <li>Supporting documentation (screenshots, error messages, etc.) if applicable</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Submit Request:</strong> Send your refund request to refunds@righteous-truths.com or through the contact form on our About page.
                  </li>
                  <li>
                    <strong>Review Process:</strong> Our team will review your request and respond within 5 business days. We may request additional information or attempt to resolve technical issues before processing a refund.
                  </li>
                  <li>
                    <strong>Decision Notification:</strong> You will receive an email notification of our decision. If approved, your refund will be processed according to the timeline outlined in Section 6.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">5. Non-Refundable Items and Circumstances</h2>
                <p className="text-muted-foreground">
                  The following items and circumstances are not eligible for refunds:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Successfully Downloaded Content:</strong> Content that has been successfully downloaded and accessed is not eligible for refund based on subjective quality assessments, change of mind, or buyer's remorse.
                  </li>
                  <li>
                    <strong>Free Content:</strong> Free downloads, promotional items, and complimentary content are not eligible for refunds (as no payment was made).
                  </li>
                  <li>
                    <strong>Expired Requests:</strong> Refund requests submitted more than 7 days after the purchase date (except for unauthorized transactions).
                  </li>
                  <li>
                    <strong>Content Used in Projects:</strong> Content that has been incorporated into derivative works, commercial projects, or distributed to third parties is not eligible for refund.
                  </li>
                  <li>
                    <strong>Subscription Fees:</strong> Partial refunds for subscription periods are not provided. If you cancel a subscription, you will retain access until the end of the current billing period.
                  </li>
                  <li>
                    <strong>Bundle Purchases:</strong> Individual items within a bundle cannot be refunded separately. Refund requests for bundles must meet eligibility criteria for the entire bundle.
                  </li>
                  <li>
                    <strong>Licensing Disagreements:</strong> Refunds will not be granted based on disagreements with licensing terms that were clearly displayed before purchase.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">6. Refund Processing</h2>
                <p className="text-muted-foreground">
                  <strong>Processing Timeline:</strong> Approved refunds will be processed within 10 business days of approval. The refund will be issued to the original payment method used for the purchase.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Payment Provider Timeline:</strong> After we process the refund, it may take an additional 5-10 business days for the funds to appear in your account, depending on your payment provider's processing times. We are not responsible for delays caused by payment providers or financial institutions.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Refund Amount:</strong> Refunds will be issued for the full purchase price paid. Transaction fees charged by payment processors are non-refundable.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Access Revocation:</strong> Upon refund approval, your access to the refunded content will be revoked. You must delete any downloaded copies of the content and cease all use.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">7. Royalty Implications</h2>
                <p className="text-muted-foreground">
                  <strong>Creator Royalties:</strong> When a refund is issued, any royalties that were distributed to creators for that purchase will be deducted from their future royalty payments. This ensures that creators are not penalized for legitimate refunds while maintaining the integrity of the royalty system.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Collaborative Works:</strong> For content with multiple contributors, royalty deductions will be applied proportionally according to the configured royalty splits.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Platform Fees:</strong> The Platform's service fee (10% of transaction value) is also reversed when a refund is issued.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">8. Dispute Resolution</h2>
                <p className="text-muted-foreground">
                  <strong>Initial Review:</strong> If your refund request is denied, you will receive a detailed explanation of the reason for denial.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Escalation Process:</strong> If you are not satisfied with the initial decision, you may escalate the matter by:
                </p>
                <ol className="ml-6 mt-2 list-decimal space-y-1 text-muted-foreground">
                  <li>Providing additional information or documentation that was not included in your original request</li>
                  <li>Explaining why you believe the denial was incorrect</li>
                  <li>Requesting a review by a senior member of our support team</li>
                </ol>
                <p className="mt-2 text-muted-foreground">
                  <strong>Final Review:</strong> Escalated cases will be reviewed within 10 business days. The decision from the escalated review is final and binding.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Chargebacks:</strong> If you initiate a chargeback with your payment provider without first contacting us, your account may be suspended pending resolution. We encourage you to work with us directly to resolve any issues before pursuing a chargeback.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">9. Exceptions and Special Circumstances</h2>
                <p className="text-muted-foreground">
                  We reserve the right to make exceptions to this Refund Policy on a case-by-case basis for extraordinary circumstances, including but not limited to:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Platform-wide technical issues affecting multiple users</li>
                  <li>Content removed from the Platform due to copyright violations or policy violations</li>
                  <li>Documented hardship cases (medical emergencies, financial hardship, etc.)</li>
                  <li>Legal requirements or court orders</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Such exceptions are granted at our sole discretion and do not create a precedent for future refund requests.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">10. Changes to Refund Policy</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to the Platform. Material changes will be communicated to users via email or prominent notice on the Platform. Your continued use of the Platform after changes are posted constitutes acceptance of the modified Refund Policy.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Refund requests will be evaluated based on the policy in effect at the time of purchase.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">11. Contact Information</h2>
                <p className="text-muted-foreground">
                  For refund requests, questions, or concerns about this policy, please contact us:
                </p>
                <div className="mt-2 rounded-md bg-muted p-4">
                  <p className="font-medium">Righteous Truths - Customer Support</p>
                  <p className="text-muted-foreground">Email: refunds@righteous-truths.com</p>
                  <p className="text-muted-foreground">Support: support@righteous-truths.com</p>
                  <p className="text-muted-foreground">Website: righteous-truths.com</p>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EST. We strive to respond to all inquiries within 24-48 hours.
                </p>
              </section>

              <section className="rounded-md border-2 border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium">
                  By making a purchase on Righteous Truths, you acknowledge that you have read, understood, and agree to this Refund Policy.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
