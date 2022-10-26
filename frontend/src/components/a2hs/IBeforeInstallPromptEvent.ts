// Note that BeforeInstallPromptEvent is still a non-standard experimental feature, and may not work for every user.
export default interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}