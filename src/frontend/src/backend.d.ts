import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface KingsCollabLegal {
    attributionRequired: boolean;
    copyrightOwner: Principal;
    termsConsent: boolean;
    commercialUseAllowed: boolean;
}
export interface DtfDesignInput {
    title: string;
    creator: Principal;
    contentType: DtfContentType;
    externalLink?: string;
    tags: Array<string>;
    previewThumbnail: ExternalBlob;
    artist: string;
    price?: bigint;
}
export interface contentStatistics {
    memes: memeStats;
    creativeWriting: creativeWritingStats;
    kingsCollabContent: kingsCollabContentStats;
    dtfPrints: dtfPrintStats;
    coloringBooks: coloringBookStats;
}
export interface revenueBreakdownStats {
    dtfSales: bigint;
    coloringBookSales: bigint;
    audioSales: bigint;
    artSales: bigint;
    royaltyIncome: bigint;
}
export interface memeStats {
    revenue: bigint;
    itemCount: bigint;
    salesCount: bigint;
    totalDownloads: bigint;
}
export interface CreativeStudioContent {
    memes: Array<Meme>;
    affirmations: Array<Affirmation>;
    coloringPages: Array<ColoringPage>;
}
export interface KingsCollaborationInput {
    title: string;
    creator: Principal;
    contentText?: string;
    contentType: KingsCollabContentType;
    legalMetadata: KingsCollabLegal;
    description: string;
    audioBlob?: ExternalBlob;
    collaborators: Array<Principal>;
}
export interface KingsCollaborationHub {
    id: string;
    title: string;
    creator: Principal;
    contentText?: string;
    contentType: KingsCollabContentType;
    legalMetadata: KingsCollabLegal;
    description: string;
    audioBlob?: ExternalBlob;
    collaborators: Array<Principal>;
    timestamp: bigint;
}
export interface creativeWritingStats {
    revenue: bigint;
    itemCount: bigint;
    salesCount: bigint;
    totalDownloads: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CreatorSummary {
    creator: Principal;
    itemCount: bigint;
    totalSales: bigint;
    totalRevenue: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface DtfDesign {
    id: string;
    title: string;
    creator: Principal;
    contentType: DtfContentType;
    externalLink?: string;
    tags: Array<string>;
    previewThumbnail: ExternalBlob;
    timestamp: bigint;
    artist: string;
    price?: bigint;
}
export interface creatorSalesData {
    creator: Principal;
    itemCount: bigint;
    totalSales: bigint;
    revenueBreakdown: revenueBreakdownStats;
    totalRevenue: bigint;
}
export interface RoyaltySplit {
    creator: Principal;
    percentage: bigint;
}
export interface ColoringPage {
    id: string;
    theme: string;
    creator: Principal;
    difficulty: string;
    timestamp: bigint;
    image: ExternalBlob;
}
export interface kingsCollabContentStats {
    revenue: bigint;
    itemCount: bigint;
    salesCount: bigint;
    totalDownloads: bigint;
}
export interface Affirmation {
    id: string;
    creator: Principal;
    mood: string;
    text: string;
    timestamp: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface Meme {
    id: string;
    bottomCaption: string;
    creator: Principal;
    topCaption: string;
    font: string;
    backgroundImage: ExternalBlob;
    timestamp: bigint;
}
export interface LicensingAgreement {
    licensingTermsAccepted: boolean;
    contentId: string;
    creator: Principal;
    commercialUse: boolean;
    derivativeWorks: Variant_withAttribution_none_fullRemixRights;
    agreementTimestamp: bigint;
    royaltySplit: Array<RoyaltySplit>;
    redistributionRights: {
        __kind__: "full";
        full: null;
    } | {
        __kind__: "none";
        none: null;
    } | {
        __kind__: "limited";
        limited: {
            usageTerms: string;
        };
    };
}
export interface PurchaseRecord {
    contentId: string;
    purchaseTime: bigint;
    buyer: Principal;
    sessionId: string;
}
export interface dtfPrintStats {
    revenue: bigint;
    itemCount: bigint;
    salesCount: bigint;
    totalDownloads: bigint;
}
export interface AdminOverviewMetrics {
    activeCreators: bigint;
    contentStats: contentStatistics;
    totalUsers: bigint;
    salesData: creatorSalesData;
}
export interface CreativeContent {
    id: string;
    title: string;
    creator: Principal;
    contentBlob: ExternalBlob;
    preview: string;
    description: string;
    timestamp: bigint;
    category: ContentCategory;
    price: bigint;
}
export interface coloringBookStats {
    revenue: bigint;
    itemCount: bigint;
    salesCount: bigint;
    totalDownloads: bigint;
}
export interface UserProfile {
    bio: string;
    profileImage?: ExternalBlob;
    name: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ContentCategory {
    lyrics = "lyrics",
    audio = "audio",
    poem = "poem",
    quote = "quote",
    artwork = "artwork",
    story = "story",
    coloringPage = "coloringPage"
}
export enum DtfContentType {
    freeDownload = "freeDownload",
    externalRedirect = "externalRedirect",
    purchase = "purchase"
}
export enum KingsCollabContentType {
    rap = "rap",
    lyrics = "lyrics",
    audio = "audio",
    affirmation = "affirmation",
    poem = "poem"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_withAttribution_none_fullRemixRights {
    withAttribution = "withAttribution",
    none = "none",
    fullRemixRights = "fullRemixRights"
}
export interface backendInterface {
    adminUpdateLicensingAgreement(updatedAgreement: LicensingAgreement): Promise<void>;
    approveLicensingAgreement(contentId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createKingsCollaboration(input: KingsCollaborationInput): Promise<void>;
    deleteAffirmation(affirmationId: string): Promise<void>;
    deleteColoringPage(pageId: string): Promise<void>;
    deleteContent(contentId: string): Promise<void>;
    deleteDtfDesign(designId: string): Promise<void>;
    deleteKingsCollaboration(entryId: string): Promise<void>;
    deleteMeme(memeId: string): Promise<void>;
    downloadDtfDesign(designId: string): Promise<ExternalBlob>;
    getAdminOverviewMetrics(): Promise<AdminOverviewMetrics>;
    getAffirmation(affirmationId: string): Promise<Affirmation | null>;
    getAllAffirmations(): Promise<Array<[string, Affirmation]>>;
    getAllColoringPages(): Promise<Array<[string, ColoringPage]>>;
    getAllContent(): Promise<Array<[string, CreativeContent]>>;
    getAllDtfDesigns(): Promise<Array<[string, DtfDesign]>>;
    getAllDtfPurchases(): Promise<Array<PurchaseRecord>>;
    getAllKingsCollaborationContent(): Promise<Array<[string, KingsCollaborationHub]>>;
    getAllMemes(): Promise<Array<[string, Meme]>>;
    getAllPurchases(): Promise<Array<PurchaseRecord>>;
    getAllUserProfiles(): Promise<Array<[Principal, UserProfile]>>;
    getCallerCreativeStudioContent(): Promise<CreativeStudioContent>;
    getCallerPurchases(): Promise<Array<PurchaseRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCollabAsCollaborator(): Promise<Array<KingsCollaborationHub>>;
    getCollabByUser(user: Principal): Promise<Array<KingsCollaborationHub>>;
    getColoringPage(pageId: string): Promise<ColoringPage | null>;
    getContentById(contentId: string): Promise<CreativeContent>;
    getContentLicensingAgreements(contentId: string): Promise<{
        pending?: LicensingAgreement;
        published?: LicensingAgreement;
    }>;
    getCreatorSummary(creator: Principal): Promise<CreatorSummary>;
    getDtfDesignByTag(tag: string): Promise<Array<DtfDesign>>;
    getDtfDesignsByArtist(artist: string): Promise<Array<DtfDesign>>;
    getDtfDesignsByCreator(creator: Principal): Promise<Array<DtfDesign>>;
    getDtfDesignsByType(contentType: DtfContentType): Promise<Array<DtfDesign>>;
    getDtfGallery(): Promise<Array<DtfDesign>>;
    getLicensingAgreement(contentId: string): Promise<LicensingAgreement | null>;
    getMarketplaceGallery(): Promise<Array<DtfDesign>>;
    getMeme(memeId: string): Promise<Meme | null>;
    getPendingLicensingRequests(): Promise<Array<[string, LicensingAgreement]>>;
    getPopularCreators(): Promise<Array<CreatorSummary>>;
    getPrivacyPolicy(): Promise<string | null>;
    getRoyaltyAndLicensingSummary(contentId: string): Promise<{
        licensingTerms?: {
            commercialUse: boolean;
            derivativeWorks: Variant_withAttribution_none_fullRemixRights;
            redistributionRights: {
                __kind__: "full";
                full: null;
            } | {
                __kind__: "none";
                none: null;
            } | {
                __kind__: "limited";
                limited: {
                    usageTerms: string;
                };
            };
        };
        royaltySplits: Array<RoyaltySplit>;
    }>;
    getRoyaltySplits(contentId: string): Promise<Array<RoyaltySplit>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserCreativeStudioContent(user: Principal): Promise<CreativeStudioContent>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVoicesOfKings(): Promise<Array<KingsCollaborationHub>>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    purchaseContent(contentId: string, sessionId: string): Promise<void>;
    purchaseDtfDesign(designId: string, sessionId: string): Promise<void>;
    rejectLicensingAgreement(contentId: string): Promise<void>;
    requestApproval(): Promise<void>;
    saveAffirmation(affirmation: Affirmation): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveColoringPage(page: ColoringPage): Promise<void>;
    saveMeme(meme: Meme): Promise<void>;
    searchContent(searchTerm: string, category: ContentCategory | null): Promise<Array<CreativeContent>>;
    searchDtfDesigns(searchTerm: string): Promise<Array<DtfDesign>>;
    searchKingsCollaboration(searchTerm: string, contentType: KingsCollabContentType | null): Promise<Array<KingsCollaborationHub>>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitLicensingAgreement(agreement: LicensingAgreement): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAffirmation(affirmation: Affirmation): Promise<void>;
    updateColoringPage(page: ColoringPage): Promise<void>;
    updateContent(content: CreativeContent): Promise<void>;
    updateDtfDesign(design: DtfDesign): Promise<void>;
    updateKingsCollaboration(entry: KingsCollaborationHub): Promise<void>;
    updateLicensingAgreement(updatedAgreement: LicensingAgreement): Promise<void>;
    updateMeme(meme: Meme): Promise<void>;
    updatePrivacyPolicy(newPolicy: string): Promise<void>;
    uploadContent(content: CreativeContent): Promise<void>;
    uploadDtfDesign(input: DtfDesignInput): Promise<void>;
}
