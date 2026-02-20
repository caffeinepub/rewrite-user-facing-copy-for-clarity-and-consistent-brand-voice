import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function LegalCopyrightPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-4xl border-2 border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <img src="/assets/generated/righteous-truths-logo-transparent.dim_200x200.png" alt="Righteous Truths" className="h-16 w-16 object-contain" />
          </div>
          <CardTitle className="text-center text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Copyright & Licensing Notice</CardTitle>
          <p className="text-center text-sm text-muted-foreground">Effective Date: December 15, 2025</p>
          <Separator />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">1. Copyright Ownership</h2>
                <p className="text-muted-foreground">
                  <strong>Creator Retention of Rights:</strong> All content uploaded to Righteous Truths remains the exclusive property of the original creator. Creators retain full copyright ownership and all associated intellectual property rights unless explicitly transferred through a separate written agreement.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>No Transfer of Ownership:</strong> Uploading content to the Platform does not transfer ownership or copyright to Righteous Truths or any third party. The Platform merely provides a venue for creators to display, license, and sell their work.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Creator Warranties:</strong> By uploading content, creators warrant that they are the original creator or have obtained all necessary rights, permissions, and licenses to upload and license the content on the Platform.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">2. Licensing Framework</h2>
                <p className="text-muted-foreground">
                  Righteous Truths employs a comprehensive licensing system that allows creators to specify exactly how their content may be used. When uploading content, creators must configure the following licensing terms:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong>Redistribution Rights:</strong>
                    <ul className="ml-6 mt-1 list-circle space-y-1">
                      <li><strong>None:</strong> Buyers may not redistribute the content in any form</li>
                      <li><strong>Limited:</strong> Redistribution allowed under specific terms defined by the creator</li>
                      <li><strong>Full:</strong> Buyers may freely redistribute the content</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Commercial Use Permissions:</strong>
                    <ul className="ml-6 mt-1 list-circle space-y-1">
                      <li><strong>Personal Use Only:</strong> Content may only be used for non-commercial, personal purposes</li>
                      <li><strong>Commercial Use Allowed:</strong> Content may be used in commercial projects and for profit-generating activities</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Derivative Works Allowances:</strong>
                    <ul className="ml-6 mt-1 list-circle space-y-1">
                      <li><strong>No Derivatives:</strong> Content may not be modified, adapted, or used to create derivative works</li>
                      <li><strong>With Attribution:</strong> Derivative works allowed if proper attribution is provided to the original creator</li>
                      <li><strong>Full Remix Rights:</strong> Complete freedom to create derivative works without attribution requirements</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Royalty Split Configurations:</strong> For collaborative works, creators must specify how royalties are divided among contributors
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">3. Buyer Rights and Restrictions</h2>
                <p className="text-muted-foreground">
                  <strong>License Grant:</strong> When you purchase content on Righteous Truths, you receive a non-exclusive license to use the content according to the terms specified by the creator. This license is personal to you and may not be transferred or sublicensed unless explicitly permitted.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Scope of License:</strong> Your license includes:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>The right to download and access the purchased content</li>
                  <li>The right to use the content according to the licensing terms (personal or commercial)</li>
                  <li>The right to create derivative works if permitted by the licensing terms</li>
                  <li>The right to redistribute if explicitly allowed by the creator</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Restrictions:</strong> Unless explicitly permitted by the licensing terms, you may not:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Claim ownership or authorship of the content</li>
                  <li>Remove or alter copyright notices, watermarks, or attribution</li>
                  <li>Use the content in a manner that violates applicable laws or regulations</li>
                  <li>Use the content in a defamatory, obscene, or offensive manner</li>
                  <li>Resell or redistribute the content as a standalone product (unless permitted)</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>License Duration:</strong> Licenses granted through purchases are perpetual unless otherwise specified. Even if content is later removed from the Platform, your license to use purchased content remains valid.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">4. Royalty Tracking and Distribution</h2>
                <p className="text-muted-foreground">
                  <strong>Automated Royalty System:</strong> Righteous Truths employs an automated royalty tracking and distribution system that ensures creators are fairly compensated for their work.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Royalty Calculation:</strong> Royalties are calculated on each sale as follows:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Sale price minus payment processing fees (typically 2.9% + $0.30 for Stripe)</li>
                  <li>Platform service fee (10% of transaction value)</li>
                  <li>Remaining amount distributed to creators according to royalty split configuration</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Payment Schedule:</strong> Royalties are paid out monthly on the 15th of each month for the previous month's sales, subject to a minimum threshold of $10.00. Royalties below the threshold are carried forward to the next payment period.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Royalty Tracking:</strong> Creators can view real-time royalty earnings, transaction history, and payment status through their creator dashboard.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">5. Derivative Works and Attribution</h2>
                <p className="text-muted-foreground">
                  <strong>When Derivatives Are Allowed:</strong> If a creator permits derivative works, buyers may modify, adapt, remix, or build upon the original content to create new works.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Attribution Requirements:</strong> When attribution is required, you must:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Credit the original creator by name or username</li>
                  <li>Provide a link to the original content or creator's profile (when possible)</li>
                  <li>Indicate if changes were made to the original work</li>
                  <li>Not suggest that the original creator endorses your derivative work</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Derivative Work Royalties:</strong> When derivative works are sold on the Platform, original creators may receive a percentage of royalties as specified in the licensing agreement. This ensures that original creators benefit from the ongoing use and adaptation of their work.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">6. Copyright Infringement Reporting</h2>
                <p className="text-muted-foreground">
                  Righteous Truths respects the intellectual property rights of others and expects users to do the same. If you believe your copyright has been infringed on our Platform, please submit a notice containing the following information:
                </p>
                <ol className="ml-6 mt-2 list-decimal space-y-2 text-muted-foreground">
                  <li>
                    <strong>Identification of Copyrighted Work:</strong> A description of the copyrighted work you claim has been infringed, including registration number if applicable
                  </li>
                  <li>
                    <strong>Location of Infringing Material:</strong> The URL or specific location on the Platform where the allegedly infringing content is located
                  </li>
                  <li>
                    <strong>Your Contact Information:</strong> Your name, address, telephone number, and email address
                  </li>
                  <li>
                    <strong>Good Faith Statement:</strong> A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law
                  </li>
                  <li>
                    <strong>Accuracy Statement:</strong> A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the copyright owner
                  </li>
                  <li>
                    <strong>Physical or Electronic Signature:</strong> Your physical or electronic signature
                  </li>
                </ol>
                <p className="mt-2 text-muted-foreground">
                  Submit copyright infringement notices to: copyright@righteous-truths.com
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">7. DMCA Compliance</h2>
                <p className="text-muted-foreground">
                  Righteous Truths complies with the Digital Millennium Copyright Act (DMCA) and will respond to valid DMCA takedown notices in accordance with the law.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Takedown Process:</strong>
                </p>
                <ol className="ml-6 mt-2 list-decimal space-y-1 text-muted-foreground">
                  <li>We will review all properly submitted DMCA notices within 48 hours</li>
                  <li>If the notice is valid, we will remove or disable access to the allegedly infringing content</li>
                  <li>We will notify the user who uploaded the content of the takedown</li>
                  <li>The user may submit a counter-notice if they believe the takedown was in error</li>
                </ol>
                <p className="mt-2 text-muted-foreground">
                  <strong>Counter-Notice:</strong> If you believe your content was removed in error, you may submit a counter-notice containing:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Identification of the removed content and its location before removal</li>
                  <li>A statement under penalty of perjury that you have a good faith belief the content was removed in error</li>
                  <li>Your contact information and consent to jurisdiction</li>
                  <li>Your physical or electronic signature</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Repeat Infringers:</strong> We maintain a policy of terminating accounts of users who are repeat copyright infringers.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">8. Platform License to User Content</h2>
                <p className="text-muted-foreground">
                  By uploading content to Righteous Truths, you grant the Platform a non-exclusive, worldwide, royalty-free, sublicensable license to:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Display and distribute your content on the Platform</li>
                  <li>Store and process your content on our servers and blockchain infrastructure</li>
                  <li>Create thumbnails, previews, and promotional materials featuring your content</li>
                  <li>Use your content in marketing and promotional materials for the Platform</li>
                  <li>Perform technical operations necessary to provide our services</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  This license exists solely to enable us to operate the Platform and does not grant us ownership of your content. The license terminates when you remove your content from the Platform, except for content that has been shared or distributed to other users.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">9. Collaborative Works and Multi-Creator Content</h2>
                <p className="text-muted-foreground">
                  <strong>Joint Ownership:</strong> For collaborative works created by multiple contributors, all contributors retain joint ownership of the work according to their contributions and agreements.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Licensing Agreement:</strong> All contributors to a collaborative work must agree to the licensing terms and royalty split configuration before the work can be published on the Platform.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Royalty Distribution:</strong> Royalties from collaborative works are automatically distributed according to the configured splits. Each contributor receives their designated percentage of the total royalties.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Contributor Rights:</strong> Each contributor retains the right to use their individual contributions in other works, but may not use the collaborative work as a whole without permission from all contributors.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">10. Licensing Disputes and Resolution</h2>
                <p className="text-muted-foreground">
                  <strong>Dispute Reporting:</strong> If you have a dispute regarding licensing terms, royalty distributions, or copyright matters, please report it to our support team at disputes@righteous-truths.com.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Mediation Process:</strong> Platform administrators will review disputes and may:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                  <li>Facilitate communication between parties</li>
                  <li>Review licensing agreements and transaction records</li>
                  <li>Temporarily suspend content or royalty payments pending resolution</li>
                  <li>Make binding decisions in cases of clear policy violations</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  <strong>Legal Action:</strong> If disputes cannot be resolved through our mediation process, parties may pursue legal remedies according to the dispute resolution provisions in our Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">11. Termination of Rights</h2>
                <p className="text-muted-foreground">
                  <strong>Creator Removal:</strong> Creators may remove their content from the Platform at any time. However, existing licenses granted to buyers remain valid and enforceable.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Buyer Access:</strong> Buyers retain perpetual access to content they have purchased, even if the creator later removes it from the Platform or closes their account.
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Platform Removal:</strong> We reserve the right to remove content that violates our Terms of Service, infringes on intellectual property rights, or violates applicable laws. In such cases, buyers may be entitled to refunds according to our Refund Policy.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">12. International Copyright Considerations</h2>
                <p className="text-muted-foreground">
                  Righteous Truths operates globally and respects international copyright laws. Content on the Platform may be subject to copyright protection in multiple jurisdictions. Users are responsible for ensuring their use of content complies with applicable laws in their location.
                </p>
                <p className="mt-2 text-muted-foreground">
                  We comply with international copyright treaties and agreements, including the Berne Convention and WIPO Copyright Treaty.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-primary">13. Contact for Copyright Matters</h2>
                <p className="text-muted-foreground">
                  For copyright-related inquiries, licensing questions, infringement reports, or disputes, please contact us:
                </p>
                <div className="mt-2 rounded-md bg-muted p-4">
                  <p className="font-medium">Righteous Truths - Copyright Department</p>
                  <p className="text-muted-foreground">Email: copyright@righteous-truths.com</p>
                  <p className="text-muted-foreground">DMCA Agent: dmca@righteous-truths.com</p>
                  <p className="text-muted-foreground">Licensing Inquiries: licensing@righteous-truths.com</p>
                  <p className="text-muted-foreground">Disputes: disputes@righteous-truths.com</p>
                  <p className="text-muted-foreground">Website: righteous-truths.com</p>
                </div>
              </section>

              <section className="rounded-md border-2 border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium">
                  By using Righteous Truths, you acknowledge that you have read and understood this Copyright & Licensing Notice and agree to respect the intellectual property rights of all creators on the Platform.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
