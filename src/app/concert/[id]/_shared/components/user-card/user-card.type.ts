interface UserProps {
  agentId: string;
  name: string;
  profileImage: string;
  introduction: string;
  transactionCount: number;
}

interface UserCardProps {
  user: UserProps;
  onClick: () => void;
}
export type { UserProps, UserCardProps };
