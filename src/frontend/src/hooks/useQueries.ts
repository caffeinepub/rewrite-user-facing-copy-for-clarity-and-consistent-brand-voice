import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { 
  UserProfile, 
  CreativeContent, 
  PurchaseRecord, 
  CreatorSummary, 
  ContentCategory,
  StripeConfiguration,
  ShoppingItem,
  ColoringPage,
  Affirmation,
  Meme,
  CreativeStudioContent,
  DtfDesignInput,
  DtfDesign,
  DtfContentType,
  LicensingAgreement,
  RoyaltySplit,
  AdminOverviewMetrics,
  UserApprovalInfo,
  ApprovalStatus
} from '../backend';
import { Principal } from '@icp-sdk/core/principal';

// User Profile Hooks
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetUserProfile(userId: string | undefined) {
  const { actor } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// Content Management Hooks
export function useUploadContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: CreativeContent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchContent'] });
      queryClient.invalidateQueries({ queryKey: ['allContent'] });
      queryClient.invalidateQueries({ queryKey: ['popularCreators'] });
    },
  });
}

export function useUpdateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: CreativeContent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateContent(content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['searchContent'] });
      queryClient.invalidateQueries({ queryKey: ['allContent'] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContent(contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchContent'] });
      queryClient.invalidateQueries({ queryKey: ['allContent'] });
      queryClient.invalidateQueries({ queryKey: ['popularCreators'] });
    },
  });
}

export function useSearchContent(searchTerm: string, category: ContentCategory | null) {
  const { actor } = useActor();

  return useQuery<CreativeContent[]>({
    queryKey: ['searchContent', searchTerm, category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchContent(searchTerm, category);
    },
    enabled: !!actor,
    staleTime: 1000 * 30,
  });
}

export function useGetContentById(contentId: string | undefined) {
  const { actor } = useActor();

  return useQuery<CreativeContent | null>({
    queryKey: ['content', contentId],
    queryFn: async () => {
      if (!actor || !contentId) return null;
      return actor.getContentById(contentId);
    },
    enabled: !!actor && !!contentId,
    staleTime: 1000 * 60 * 2,
  });
}

// Purchase Hooks
export function usePurchaseContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, sessionId }: { contentId: string; sessionId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.purchaseContent(contentId, sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['creatorSummary'] });
    },
  });
}

export function useGetCallerPurchases() {
  const { actor, isFetching } = useActor();

  return useQuery<PurchaseRecord[]>({
    queryKey: ['purchases'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerPurchases();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

// Creator Hooks
export function useGetCreatorSummary(creatorId: string | undefined) {
  const { actor } = useActor();

  return useQuery<CreatorSummary | null>({
    queryKey: ['creatorSummary', creatorId],
    queryFn: async () => {
      if (!actor || !creatorId) return null;
      return actor.getCreatorSummary(Principal.fromText(creatorId));
    },
    enabled: !!actor && !!creatorId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPopularCreators() {
  const { actor } = useActor();

  return useQuery<CreatorSummary[]>({
    queryKey: ['popularCreators'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPopularCreators();
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 10,
  });
}

// Admin Hooks
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetAdminOverviewMetrics() {
  const { actor } = useActor();

  return useQuery<AdminOverviewMetrics>({
    queryKey: ['adminOverviewMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAdminOverviewMetrics();
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGetAllUserProfiles() {
  const { actor } = useActor();

  return useQuery<Array<[Principal, UserProfile]>>({
    queryKey: ['allUserProfiles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserProfiles();
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGetAllContent() {
  const { actor } = useActor();

  return useQuery<Array<[string, CreativeContent]>>({
    queryKey: ['allContent'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContent();
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 2,
  });
}

export function useListApprovals() {
  const { actor } = useActor();

  return useQuery<UserApprovalInfo[]>({
    queryKey: ['userApprovals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor,
    staleTime: 1000 * 60,
  });
}

export function useSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, status }: { user: Principal; status: ApprovalStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setApproval(user, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userApprovals'] });
    },
  });
}

// Stripe Hooks
export function useIsStripeConfigured() {
  const { actor } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ items, successUrl, cancelUrl }: { items: ShoppingItem[]; successUrl: string; cancelUrl: string }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);
      const session = JSON.parse(result) as { id: string; url: string };
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      return session;
    },
  });
}

export function useGetStripeSessionStatus() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getStripeSessionStatus(sessionId);
    },
  });
}

// Creative Studio Hooks
export function useSaveColoringPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (page: ColoringPage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveColoringPage(page);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allColoringPages'] });
    },
  });
}

export function useDeleteColoringPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pageId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteColoringPage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allColoringPages'] });
    },
  });
}

export function useSaveAffirmation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (affirmation: Affirmation) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveAffirmation(affirmation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allAffirmations'] });
    },
  });
}

export function useDeleteAffirmation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (affirmationId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteAffirmation(affirmationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allAffirmations'] });
    },
  });
}

export function useSaveMeme() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meme: Meme) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveMeme(meme);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allMemes'] });
    },
  });
}

export function useDeleteMeme() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memeId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteMeme(memeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creativeStudioContent'] });
      queryClient.invalidateQueries({ queryKey: ['allMemes'] });
    },
  });
}

export function useGetCallerCreativeStudioContent() {
  const { actor, isFetching } = useActor();

  return useQuery<CreativeStudioContent>({
    queryKey: ['creativeStudioContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerCreativeStudioContent();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

// Daily Affirmation Hook
export function useDailyAffirmation() {
  const { actor } = useActor();

  return useQuery<string | null>({
    queryKey: ['dailyAffirmation', new Date().toDateString()],
    queryFn: async () => {
      if (!actor) return null;
      
      // Get all affirmations and pick a random one for the day
      const allAffirmations = await actor.getAllAffirmations();
      if (allAffirmations.length === 0) return null;
      
      // Use date as seed for consistent daily affirmation
      const dateString = new Date().toDateString();
      const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const index = seed % allAffirmations.length;
      
      return allAffirmations[index][1].text;
    },
    enabled: !!actor,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
}

// DTF Gallery Hooks
export function useDtfGallery() {
  const { actor } = useActor();

  return useQuery<DtfDesign[]>({
    queryKey: ['dtfGallery'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDtfGallery();
    },
    enabled: !!actor,
    staleTime: 1000 * 60,
  });
}

export function useSearchDtfDesigns(searchTerm: string) {
  const { actor } = useActor();

  return useQuery<DtfDesign[]>({
    queryKey: ['searchDtfDesigns', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return actor.searchDtfDesigns(searchTerm);
    },
    enabled: !!actor && !!searchTerm,
    staleTime: 1000 * 30,
  });
}

export function useGetDtfDesignsByType(contentType: DtfContentType | null) {
  const { actor } = useActor();

  return useQuery<DtfDesign[]>({
    queryKey: ['dtfDesignsByType', contentType],
    queryFn: async () => {
      if (!actor) return [];
      if (!contentType) return actor.getDtfGallery();
      return actor.getDtfDesignsByType(contentType);
    },
    enabled: !!actor,
    staleTime: 1000 * 60,
  });
}

export function useUploadDtfDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: DtfDesignInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadDtfDesign(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dtfGallery'] });
      queryClient.invalidateQueries({ queryKey: ['searchDtfDesigns'] });
      queryClient.invalidateQueries({ queryKey: ['dtfDesignsByType'] });
    },
  });
}

export function useDeleteDtfDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (designId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteDtfDesign(designId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dtfGallery'] });
      queryClient.invalidateQueries({ queryKey: ['searchDtfDesigns'] });
      queryClient.invalidateQueries({ queryKey: ['dtfDesignsByType'] });
    },
  });
}

export function usePurchaseDtfDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ designId, sessionId }: { designId: string; sessionId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.purchaseDtfDesign(designId, sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['dtfPurchases'] });
    },
  });
}

// Licensing Hooks
export function useSubmitLicensingAgreement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (agreement: LicensingAgreement) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitLicensingAgreement(agreement);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['licensingAgreement', variables.contentId] });
      queryClient.invalidateQueries({ queryKey: ['pendingLicensingRequests'] });
    },
  });
}

export function useGetLicensingAgreement(contentId: string | undefined) {
  const { actor } = useActor();

  return useQuery<LicensingAgreement | null>({
    queryKey: ['licensingAgreement', contentId],
    queryFn: async () => {
      if (!actor || !contentId) return null;
      return actor.getLicensingAgreement(contentId);
    },
    enabled: !!actor && !!contentId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetRoyaltyAndLicensingSummary(contentId: string) {
  const { actor } = useActor();

  return useQuery({
    queryKey: ['royaltyLicensingSummary', contentId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRoyaltyAndLicensingSummary(contentId);
    },
    enabled: !!actor && !!contentId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPendingLicensingRequests() {
  const { actor } = useActor();

  return useQuery<Array<[string, LicensingAgreement]>>({
    queryKey: ['pendingLicensingRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingLicensingRequests();
    },
    enabled: !!actor,
    staleTime: 1000 * 60,
  });
}

export function useApproveLicensingAgreement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveLicensingAgreement(contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingLicensingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['licensingAgreement'] });
    },
  });
}

export function useRejectLicensingAgreement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectLicensingAgreement(contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingLicensingRequests'] });
    },
  });
}
