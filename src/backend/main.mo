import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import Stripe "stripe/stripe";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import OutCall "http-outcalls/outcall";

actor {
  include MixinStorage();

  type ContentCategory = {
    #story;
    #poem;
    #lyrics;
    #quote;
    #artwork;
    #coloringPage;
    #audio;
  };

  type CreativeContent = {
    id : Text;
    title : Text;
    category : ContentCategory;
    description : Text;
    preview : Text;
    price : Nat;
    creator : Principal;
    contentBlob : Storage.ExternalBlob;
    timestamp : Int;
  };

  module CreativeContent {
    public func compareByTimestamp(content1 : CreativeContent, content2 : CreativeContent) : Order.Order {
      Int.compare(content1.timestamp, content2.timestamp);
    };
  };

  type PurchaseRecord = {
    buyer : Principal;
    contentId : Text;
    purchaseTime : Int;
    sessionId : Text;
  };

  module PurchaseRecord {
    public func compareByContentId(record1 : PurchaseRecord, record2 : PurchaseRecord) : Order.Order {
      Text.compare(record1.contentId, record2.contentId);
    };
  };

  type UserProfile = {
    name : Text;
    bio : Text;
    profileImage : ?Storage.ExternalBlob;
  };

  type CreatorSummary = {
    creator : Principal;
    itemCount : Nat;
    totalSales : Nat;
    totalRevenue : Nat;
  };

  module CreatorSummary {
    public func compareByTotalSales(summary1 : CreatorSummary, summary2 : CreatorSummary) : Order.Order {
      Nat.compare(summary1.totalSales, summary2.totalSales);
    };
  };

  type ColoringPage = {
    id : Text;
    theme : Text;
    difficulty : Text;
    image : Storage.ExternalBlob;
    creator : Principal;
    timestamp : Int;
  };

  type Affirmation = {
    id : Text;
    mood : Text;
    text : Text;
    creator : Principal;
    timestamp : Int;
  };

  type Meme = {
    id : Text;
    backgroundImage : Storage.ExternalBlob;
    topCaption : Text;
    bottomCaption : Text;
    font : Text;
    creator : Principal;
    timestamp : Int;
  };

  type CreativeStudioContent = {
    coloringPages : [ColoringPage];
    affirmations : [Affirmation];
    memes : [Meme];
  };

  // DTF Gallery Types & State
  type DtfContentType = {
    #purchase;
    #freeDownload;
    #externalRedirect;
  };

  type DtfDesign = {
    id : Text;
    title : Text;
    tags : [Text];
    externalLink : ?Text;
    price : ?Nat;
    artist : Text;
    previewThumbnail : Storage.ExternalBlob;
    contentType : DtfContentType;
    creator : Principal;
    timestamp : Int;
  };

  type DtfDesignInput = {
    title : Text;
    tags : [Text];
    externalLink : ?Text;
    price : ?Nat;
    artist : Text;
    previewThumbnail : Storage.ExternalBlob;
    contentType : DtfContentType;
    creator : Principal;
  };

  // Royalty Tracking and Licensing System Types
  type RoyaltySplit = {
    creator : Principal;
    percentage : Nat;
  };

  type LicensingAgreement = {
    contentId : Text;
    creator : Principal;
    redistributionRights : {
      #none;
      #limited : {
        usageTerms : Text;
      };
      #full;
    };
    commercialUse : Bool;
    derivativeWorks : {
      #none;
      #withAttribution;
      #fullRemixRights;
    };
    royaltySplit : [RoyaltySplit];
    licensingTermsAccepted : Bool;
    agreementTimestamp : Int;
  };

  // Admin Dashboard Types
  public type AdminOverviewMetrics = {
    totalUsers : Nat;
    activeCreators : Nat;
    salesData : creatorSalesData;
    contentStats : contentStatistics;
  };

  public type creatorSalesData = {
    creator : Principal;
    itemCount : Nat;
    totalSales : Nat;
    totalRevenue : Nat;
    revenueBreakdown : revenueBreakdownStats;
  };

  public type revenueBreakdownStats = {
    artSales : Nat;
    coloringBookSales : Nat;
    audioSales : Nat;
    royaltyIncome : Nat;
    dtfSales : Nat;
  };

  public type contentStatistics = {
    creativeWriting : creativeWritingStats;
    coloringBooks : coloringBookStats;
    memes : memeStats;
    dtfPrints : dtfPrintStats;
    kingsCollabContent : kingsCollabContentStats;
  };

  public type creativeWritingStats = {
    itemCount : Nat;
    totalDownloads : Nat;
    salesCount : Nat;
    revenue : Nat;
  };

  public type coloringBookStats = {
    itemCount : Nat;
    totalDownloads : Nat;
    salesCount : Nat;
    revenue : Nat;
  };

  public type memeStats = {
    itemCount : Nat;
    totalDownloads : Nat;
    salesCount : Nat;
    revenue : Nat;
  };

  public type dtfPrintStats = {
    itemCount : Nat;
    totalDownloads : Nat;
    salesCount : Nat;
    revenue : Nat;
  };

  public type kingsCollabContentStats = {
    itemCount : Nat;
    totalDownloads : Nat;
    salesCount : Nat;
    revenue : Nat;
  };

  let accessControlState = AccessControl.initState();
  let approvalState = UserApproval.initState(accessControlState);
  let contents = Map.empty<Text, CreativeContent>();
  var purchases = List.empty<PurchaseRecord>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let coloringPages = Map.empty<Text, ColoringPage>();
  let affirmations = Map.empty<Text, Affirmation>();
  let memes = Map.empty<Text, Meme>();
  let dtfDesigns = Map.empty<Text, DtfDesign>();
  var dtfPurchases = List.empty<PurchaseRecord>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  let licensingAgreements = Map.empty<Text, LicensingAgreement>();
  let pendingLicensingRequests = Map.empty<Text, LicensingAgreement>();

  // New Privacy Policy Data Storage
  let privacyPolicyData = Map.empty<Nat, Text>();

  func hasApprovedOrAdminPermissions(caller : Principal) : Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller)
  };

  func hasPurchasedContent(caller : Principal, contentId : Text) : Bool {
    purchases.toArray().find(
      func(record) { record.buyer == caller and record.contentId == contentId }
    ) != null;
  };

  func hasPurchasedDtfDesign(caller : Principal, designId : Text) : Bool {
    dtfPurchases.toArray().find(
      func(record) { record.buyer == caller and record.contentId == designId }
    ) != null;
  };

  // Privacy Policy Functions

  public query func getPrivacyPolicy() : async ?Text {
    switch (privacyPolicyData.get(1)) {
      case (null) { null };
      case (?policy) { ?policy };
    };
  };

  public shared ({ caller }) func updatePrivacyPolicy(newPolicy : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update privacy policy");
    };
    privacyPolicyData.add(1, newPolicy);
  };

  public query ({ caller }) func isCallerApproved() : async Bool {
    hasApprovedOrAdminPermissions(caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Allow viewing own profile, or admin viewing any profile
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func uploadContent(content : CreativeContent) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != content.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot upload content for another creator unless admin");
    };
    contents.add(content.id, content);
  };

  public shared ({ caller }) func updateContent(content : CreativeContent) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (contents.get(content.id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot update content for another creator");
        };
      };
    };

    contents.add(content.id, content);
  };

  public query ({ caller }) func getContentById(contentId : Text) : async CreativeContent {
    let content = switch (contents.get(contentId)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) { content };
    };

    // Allow access if: creator, purchaser, or admin
    if (content.creator == caller or hasPurchasedContent(caller, contentId) or AccessControl.isAdmin(accessControlState, caller)) {
      content
    } else {
      // Return limited preview for non-purchasers
      Runtime.trap("Unauthorized: Purchase required to view full content");
    };
  };

  public query func searchContent(searchTerm : Text, category : ?ContentCategory) : async [CreativeContent] {
    // Public marketplace browsing - returns preview information only
    contents.values().toArray().filter(
      func(content) {
        let titleMatch = content.title.contains(#text searchTerm);
        let descMatch = content.description.contains(#text searchTerm);
        let categoryMatch = switch (category) {
          case (null) { true };
          case (?cat) { content.category == cat };
        };
        (titleMatch or descMatch) and categoryMatch
      }
    ).sort(CreativeContent.compareByTimestamp);
  };

  public shared ({ caller }) func purchaseContent(contentId : Text, sessionId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    let _content = switch (contents.get(contentId)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) { content };
    };

    let record : PurchaseRecord = {
      buyer = caller;
      contentId;
      purchaseTime = Time.now();
      sessionId;
    };
    purchases.add(record);
  };

  public query ({ caller }) func getCallerPurchases() : async [PurchaseRecord] {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    purchases.toArray().filter(
      func(record) { record.buyer == caller }
    );
  };

  public query ({ caller }) func getCreatorSummary(creator : Principal) : async CreatorSummary {
    // Only allow viewing own summary or admin viewing any summary
    if (caller != creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own creator summary");
    };

    let creatorContents = contents.values().toArray().filter(
      func(content) { content.creator == creator }
    );
    let creatorPurchases = purchases.toArray().filter(
      func(record) {
        switch (creatorContents.find(func(content) { content.id == record.contentId })) {
          case (null) { false };
          case (_) { true };
        };
      }
    );

    let totalRevenue = creatorPurchases.foldLeft(0, func(acc, record) {
      switch (contents.get(record.contentId)) {
        case (null) { acc };
        case (?content) { acc + content.price };
      };
    });

    {
      creator;
      itemCount = creatorContents.size();
      totalSales = creatorPurchases.size();
      totalRevenue;
    };
  };

  public query func getPopularCreators() : async [CreatorSummary] {
    // Public leaderboard - but only show item counts, not financial details
    let creatorsSet = Set.empty<Principal>();
    for (content in contents.values()) {
      creatorsSet.add(content.creator);
    };

    let creatorSummaries = creatorsSet.values().toArray().map(
      func(creator) {
        let creatorContents = contents.values().toArray().filter(
          func(content) { content.creator == creator }
        );
        let creatorPurchases = purchases.toArray().filter(
          func(record) {
            switch (creatorContents.find(func(content) { content.id == record.contentId })) {
              case (null) { false };
              case (_) { true };
            };
          }
        );

        // Public view: hide revenue details
        {
          creator;
          itemCount = creatorContents.size();
          totalSales = creatorPurchases.size();
          totalRevenue = 0; // Hidden for public view
        };
      }
    );

    let sortedSummaries = creatorSummaries.sort(CreatorSummary.compareByTotalSales);

    let limit = Nat.min(10, sortedSummaries.size());
    Array.tabulate(limit, func(i) { sortedSummaries[i] });
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  // Creative Studio Functions

  public shared ({ caller }) func saveColoringPage(page : ColoringPage) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != page.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot save coloring page for another creator unless admin");
    };
    coloringPages.add(page.id, page);
  };

  public shared ({ caller }) func updateColoringPage(page : ColoringPage) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (coloringPages.get(page.id)) {
      case (null) { Runtime.trap("Coloring page not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot update coloring page for another creator");
        };
      };
    };

    coloringPages.add(page.id, page);
  };

  public query ({ caller }) func getColoringPage(pageId : Text) : async ?ColoringPage {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (coloringPages.get(pageId)) {
      case (null) { null };
      case (?page) {
        if (page.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?page
        } else {
          Runtime.trap("Unauthorized: Can only view your own coloring pages");
        };
      };
    };
  };

  public shared ({ caller }) func saveAffirmation(affirmation : Affirmation) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != affirmation.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot save affirmation for another creator unless admin");
    };
    affirmations.add(affirmation.id, affirmation);
  };

  public shared ({ caller }) func updateAffirmation(affirmation : Affirmation) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (affirmations.get(affirmation.id)) {
      case (null) { Runtime.trap("Affirmation not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot update affirmation for another creator");
        };
      };
    };

    affirmations.add(affirmation.id, affirmation);
  };

  public query ({ caller }) func getAffirmation(affirmationId : Text) : async ?Affirmation {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (affirmations.get(affirmationId)) {
      case (null) { null };
      case (?affirmation) {
        if (affirmation.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?affirmation
        } else {
          Runtime.trap("Unauthorized: Can only view your own affirmations");
        };
      };
    };
  };

  public shared ({ caller }) func saveMeme(meme : Meme) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != meme.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot save meme for another creator unless admin");
    };
    memes.add(meme.id, meme);
  };

  public shared ({ caller }) func updateMeme(meme : Meme) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (memes.get(meme.id)) {
      case (null) { Runtime.trap("Meme not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot update meme for another creator");
        };
      };
    };

    memes.add(meme.id, meme);
  };

  public query ({ caller }) func getMeme(memeId : Text) : async ?Meme {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (memes.get(memeId)) {
      case (null) { null };
      case (?meme) {
        if (meme.creator == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?meme
        } else {
          Runtime.trap("Unauthorized: Can only view your own memes");
        };
      };
    };
  };

  public query ({ caller }) func getCallerCreativeStudioContent() : async CreativeStudioContent {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    getUserCreativeStudioContentInternal(caller);
  };

  public query ({ caller }) func getUserCreativeStudioContent(user : Principal) : async CreativeStudioContent {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own creative studio content");
    };
    getUserCreativeStudioContentInternal(user);
  };

  func getUserCreativeStudioContentInternal(user : Principal) : CreativeStudioContent {
    let userColoringPages = coloringPages.values().toArray().filter(
      func(page) { page.creator == user }
    );
    let userAffirmations = affirmations.values().toArray().filter(
      func(affirmation) { affirmation.creator == user }
    );
    let userMemes = memes.values().toArray().filter(
      func(meme) { meme.creator == user }
    );

    {
      coloringPages = userColoringPages;
      affirmations = userAffirmations;
      memes = userMemes;
    };
  };

  // DTF Gallery Functions

  public query func getDtfGallery() : async [DtfDesign] {
    // Public marketplace browsing
    dtfDesigns.values().toArray();
  };

  public query func getDtfDesignByTag(tag : Text) : async [DtfDesign] {
    // Public search
    dtfDesigns.values().toArray().filter(
      func(design) {
        design.tags.find(func(t) { t == tag }) != null;
      }
    );
  };

  public query func getDtfDesignsByArtist(artist : Text) : async [DtfDesign] {
    // Public search
    dtfDesigns.values().toArray().filter(
      func(design) { design.artist == artist }
    );
  };

  public query func getDtfDesignsByType(contentType : DtfContentType) : async [DtfDesign] {
    // Public filtering
    dtfDesigns.values().toArray().filter(
      func(design) { design.contentType == contentType }
    );
  };

  public query func searchDtfDesigns(searchTerm : Text) : async [DtfDesign] {
    // Public search
    dtfDesigns.values().toArray().filter(
      func(design) {
        let titleMatch = design.title.contains(#text searchTerm);
        let artistMatch = design.artist.contains(#text searchTerm);
        let tagMatch = design.tags.find(func(tag) { tag.contains(#text searchTerm) }) != null;
        titleMatch or artistMatch or tagMatch;
      }
    );
  };

  public shared ({ caller }) func uploadDtfDesign(input : DtfDesignInput) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != input.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot upload DTF design for another creator unless admin");
    };

    let design : DtfDesign = {
      id = generateUniqueId();
      timestamp = Time.now();
      title = input.title;
      tags = input.tags;
      externalLink = input.externalLink;
      price = input.price;
      artist = input.artist;
      previewThumbnail = input.previewThumbnail;
      contentType = input.contentType;
      creator = input.creator;
    };

    dtfDesigns.add(design.id, design);
  };

  public shared ({ caller }) func updateDtfDesign(design : DtfDesign) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (dtfDesigns.get(design.id)) {
      case (null) { Runtime.trap("DTF design not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to update this design");
        };
      };
    };
    dtfDesigns.add(design.id, { design with timestamp = Time.now() });
  };

  public shared ({ caller }) func deleteDtfDesign(designId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (dtfDesigns.get(designId)) {
      case (null) { Runtime.trap("DTF design not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to delete this design");
        };
        dtfDesigns.remove(designId);
      };
    };
  };

  public query func getDtfDesignsByCreator(creator : Principal) : async [DtfDesign] {
    // Public creator portfolio
    dtfDesigns.values().toArray().filter(
      func(design) { design.creator == creator }
    );
  };

  public query ({ caller }) func downloadDtfDesign(designId : Text) : async Storage.ExternalBlob {
    switch (dtfDesigns.get(designId)) {
      case (null) { Runtime.trap("DTF design not found") };
      case (?design) {
        switch (design.contentType) {
          case (#freeDownload) { 
            design.previewThumbnail 
          };
          case (#externalRedirect) { 
            design.previewThumbnail 
          };
          case (#purchase) {
            if (not hasApprovedOrAdminPermissions(caller)) {
              Runtime.trap("Unauthorized: Approved user or admin action required");
            };
            if (design.creator == caller or hasPurchasedDtfDesign(caller, designId) or AccessControl.isAdmin(accessControlState, caller)) {
              design.previewThumbnail
            } else {
              Runtime.trap("Unauthorized: You must purchase this design to download it");
            };
          };
        };
      };
    };
  };

  public shared ({ caller }) func purchaseDtfDesign(designId : Text, sessionId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    let _design = switch (dtfDesigns.get(designId)) {
      case (null) { Runtime.trap("DTF design not found") };
      case (?design) { design };
    };

    let record : PurchaseRecord = {
      buyer = caller;
      contentId = designId;
      purchaseTime = Time.now();
      sessionId;
    };
    dtfPurchases.add(record);
  };

  public query func getMarketplaceGallery() : async [DtfDesign] {
    // Public marketplace
    dtfDesigns.values().toArray();
  };

  func generateUniqueId() : Text {
    Time.now().toText();
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  type KingsCollabContentType = {
    #lyrics;
    #poem;
    #affirmation;
    #rap;
    #audio;
  };

  type KingsCollabLegal = {
    copyrightOwner : Principal;
    termsConsent : Bool;
    attributionRequired : Bool;
    commercialUseAllowed : Bool;
  };

  type KingsCollaborationHub = {
    id : Text;
    title : Text;
    description : Text;
    contentType : KingsCollabContentType;
    contentText : ?Text;
    audioBlob : ?Storage.ExternalBlob;
    collaborators : [Principal];
    legalMetadata : KingsCollabLegal;
    creator : Principal;
    timestamp : Int;
  };

  type KingsCollaborationInput = {
    title : Text;
    description : Text;
    contentType : KingsCollabContentType;
    contentText : ?Text;
    audioBlob : ?Storage.ExternalBlob;
    collaborators : [Principal];
    legalMetadata : KingsCollabLegal;
    creator : Principal;
  };

  let kingsCollaborationContent = Map.empty<Text, KingsCollaborationHub>();

  public query func getVoicesOfKings() : async [KingsCollaborationHub] {
    // Public showcase
    kingsCollaborationContent.values().toArray();
  };

  public shared ({ caller }) func createKingsCollaboration(input : KingsCollaborationInput) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    if (caller != input.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot create content for another principal unless admin");
    };

    let entry : KingsCollaborationHub = {
      id = generateUniqueId();
      timestamp = Time.now();
      title = input.title;
      description = input.description;
      contentType = input.contentType;
      contentText = input.contentText;
      audioBlob = input.audioBlob;
      collaborators = input.collaborators;
      legalMetadata = input.legalMetadata;
      creator = input.creator;
    };

    kingsCollaborationContent.add(entry.id, entry);
  };

  public shared ({ caller }) func updateKingsCollaboration(entry : KingsCollaborationHub) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (kingsCollaborationContent.get(entry.id)) {
      case (null) { Runtime.trap("Record not found") };
      case (?existing) {
        let isCollaborator = existing.collaborators.find(func(c) { c == caller }) != null;
        if (existing.creator != caller and not isCollaborator and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: No permission for collaboration piece");
        };
      };
    };

    kingsCollaborationContent.add(entry.id, { entry with timestamp = Time.now() });
  };

  public shared ({ caller }) func deleteKingsCollaboration(entryId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (kingsCollaborationContent.get(entryId)) {
      case (null) { Runtime.trap("Record not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only creator or admin can delete this content");
        };
        kingsCollaborationContent.remove(entryId);
      };
    };
  };

  public query func getCollabByUser(user : Principal) : async [KingsCollaborationHub] {
    // Public creator portfolio
    kingsCollaborationContent.values().toArray().filter(
      func(entry) { entry.creator == user }
    );
  };

  public query ({ caller }) func getCollabAsCollaborator() : async [KingsCollaborationHub] {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    kingsCollaborationContent.values().toArray().filter(
      func(entry) {
        entry.collaborators.find(func(c) { c == caller }) != null
      }
    );
  };

  public query func searchKingsCollaboration(searchTerm : Text, contentType : ?KingsCollabContentType) : async [KingsCollaborationHub] {
    // Public search
    kingsCollaborationContent.values().toArray().filter(
      func(entry) {
        let titleMatch = entry.title.contains(#text searchTerm);
        let descMatch = entry.description.contains(#text searchTerm);
        let typeMatch = switch (contentType) {
          case (null) { true };
          case (?ct) { entry.contentType == ct };
        };
        (titleMatch or descMatch) and typeMatch
      }
    );
  };

  public shared ({ caller }) func submitLicensingAgreement(agreement : LicensingAgreement) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    if (caller != agreement.creator and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot submit agreement for another creator unless admin");
    };
    if (not agreement.licensingTermsAccepted) {
      Runtime.trap("Licensing terms must be accepted");
    };

    let agreementWithTimestamp = { agreement with agreementTimestamp = Time.now() };
    pendingLicensingRequests.add(agreement.contentId, agreementWithTimestamp);
  };

  public query func getLicensingAgreement(contentId : Text) : async ?LicensingAgreement {
    // Public licensing information
    licensingAgreements.get(contentId);
  };

  public shared ({ caller }) func updateLicensingAgreement(updatedAgreement : LicensingAgreement) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };
    switch (licensingAgreements.get(updatedAgreement.contentId)) {
      case (null) { Runtime.trap("Licensing agreement not found") };
      case (?existingAgreement) {
        if (existingAgreement.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to update this agreement");
        };
      };
    };

    let updatedWithTimestamp = { updatedAgreement with agreementTimestamp = Time.now() };
    licensingAgreements.add(updatedAgreement.contentId, updatedWithTimestamp);
  };

  public query func getContentLicensingAgreements(contentId : Text) : async {
    published : ?LicensingAgreement;
    pending : ?LicensingAgreement;
  } {
    // Public licensing information
    {
      published = licensingAgreements.get(contentId);
      pending = pendingLicensingRequests.get(contentId);
    };
  };

  public query func getRoyaltySplits(contentId : Text) : async [RoyaltySplit] {
    // Public royalty information
    switch (licensingAgreements.get(contentId)) {
      case (null) { [] };
      case (?agreement) { agreement.royaltySplit };
    };
  };

  public query ({ caller }) func getPendingLicensingRequests() : async [(Text, LicensingAgreement)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view pending requests");
    };
    pendingLicensingRequests.toArray();
  };

  public shared ({ caller }) func approveLicensingAgreement(contentId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve licensing agreements");
    };

    let agreement = switch (pendingLicensingRequests.get(contentId)) {
      case (null) { Runtime.trap("Pending licensing agreement not found") };
      case (?value) { value };
    };

    licensingAgreements.add(contentId, agreement);
    pendingLicensingRequests.remove(contentId);
  };

  public shared ({ caller }) func rejectLicensingAgreement(contentId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject licensing agreements");
    };

    switch (pendingLicensingRequests.get(contentId)) {
      case (null) { Runtime.trap("Pending licensing agreement not found") };
      case (?_agreement) {
        pendingLicensingRequests.remove(contentId);
      };
    };
  };

  public shared ({ caller }) func adminUpdateLicensingAgreement(updatedAgreement : LicensingAgreement) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update licensing agreements");
    };

    let updatedWithTimestamp = { updatedAgreement with agreementTimestamp = Time.now() };
    licensingAgreements.add(updatedAgreement.contentId, updatedWithTimestamp);
  };

  public shared ({ caller }) func deleteContent(contentId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (contents.get(contentId)) {
      case (null) { Runtime.trap("Content not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to delete this content");
        };
        contents.remove(contentId);
      };
    };
  };

  public shared ({ caller }) func deleteColoringPage(pageId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (coloringPages.get(pageId)) {
      case (null) { Runtime.trap("Coloring page not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to delete this coloring page");
        };
        coloringPages.remove(pageId);
      };
    };
  };

  public shared ({ caller }) func deleteAffirmation(affirmationId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (affirmations.get(affirmationId)) {
      case (null) { Runtime.trap("Affirmation not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to delete this affirmation");
        };
        affirmations.remove(affirmationId);
      };
    };
  };

  public shared ({ caller }) func deleteMeme(memeId : Text) : async () {
    if (not hasApprovedOrAdminPermissions(caller)) {
      Runtime.trap("Unauthorized: Approved user or admin action required");
    };

    switch (memes.get(memeId)) {
      case (null) { Runtime.trap("Meme not found") };
      case (?existing) {
        if (existing.creator != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You do not have permission to delete this meme");
        };
        memes.remove(memeId);
      };
    };
  };

  public query func getRoyaltyAndLicensingSummary(contentId : Text) : async {
    royaltySplits : [RoyaltySplit];
    licensingTerms : ?{
      redistributionRights : {
        #none;
        #limited : { usageTerms : Text };
        #full;
      };
      commercialUse : Bool;
      derivativeWorks : {
        #none;
        #withAttribution;
        #fullRemixRights;
      };
    };
  } {
    // Public licensing summary
    switch (licensingAgreements.get(contentId)) {
      case (null) {
        {
          royaltySplits = [];
          licensingTerms = null;
        };
      };
      case (?agreement) {
        {
          royaltySplits = agreement.royaltySplit;
          licensingTerms = ?{
            redistributionRights = agreement.redistributionRights;
            commercialUse = agreement.commercialUse;
            derivativeWorks = agreement.derivativeWorks;
          };
        };
      };
    };
  };

  public query ({ caller }) func getAdminOverviewMetrics() : async AdminOverviewMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    computeAdminOverviewMetrics();
  };

  func computeAdminOverviewMetrics() : AdminOverviewMetrics {
    let userCount = userProfiles.toArray().size();

    let activeCreators = contents.toArray().size();

    let overview : AdminOverviewMetrics = {
      totalUsers = userCount;
      activeCreators;
      salesData = {
        creator = Principal.fromText("2vxsx-fae");
        itemCount = 0;
        totalSales = 0;
        totalRevenue = 0;
        revenueBreakdown = {
          artSales = 0;
          coloringBookSales = 0;
          audioSales = 0;
          royaltyIncome = 0;
          dtfSales = 0;
        };
      };
      contentStats = {
        creativeWriting = {
          itemCount = 0;
          totalDownloads = 0;
          salesCount = 0;
          revenue = 0;
        };
        coloringBooks = {
          itemCount = 0;
          totalDownloads = 0;
          salesCount = 0;
          revenue = 0;
        };
        memes = {
          itemCount = 0;
          totalDownloads = 0;
          salesCount = 0;
          revenue = 0;
        };
        dtfPrints = {
          itemCount = 0;
          totalDownloads = 0;
          salesCount = 0;
          revenue = 0;
        };
        kingsCollabContent = {
          itemCount = 0;
          totalDownloads = 0;
          salesCount = 0;
          revenue = 0;
        };
      };
    };

    overview;
  };

  public query ({ caller }) func getAllUserProfiles() : async [(Principal, UserProfile)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    userProfiles.toArray();
  };

  public query ({ caller }) func getAllContent() : async [(Text, CreativeContent)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    contents.toArray();
  };

  public query ({ caller }) func getAllColoringPages() : async [(Text, ColoringPage)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    coloringPages.toArray();
  };

  public query ({ caller }) func getAllAffirmations() : async [(Text, Affirmation)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    affirmations.toArray();
  };

  public query ({ caller }) func getAllMemes() : async [(Text, Meme)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    memes.toArray();
  };

  public query ({ caller }) func getAllDtfDesigns() : async [(Text, DtfDesign)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    dtfDesigns.toArray();
  };

  public query ({ caller }) func getAllKingsCollaborationContent() : async [(Text, KingsCollaborationHub)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    kingsCollaborationContent.toArray();
  };

  public query ({ caller }) func getAllPurchases() : async [PurchaseRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    purchases.toArray();
  };

  public query ({ caller }) func getAllDtfPurchases() : async [PurchaseRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    dtfPurchases.toArray();
  };
};
