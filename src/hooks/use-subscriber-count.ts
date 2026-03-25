import { useQuery } from "@tanstack/react-query";
import { emailService } from "@/lib/emailService";

export const useSubscriberCount = () => {
  const { data: count = 0 } = useQuery({
    queryKey: ["subscriber-count"],
    queryFn: () => emailService.getSubscriberCount(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return count;
};
