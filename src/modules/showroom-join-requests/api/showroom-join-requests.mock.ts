import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";
import { incomingRequests } from "./join-requests-incoming.mock";
import { agreementRequests } from "./join-requests-agreement.mock";
import { followupRequests } from "./join-requests-followup.mock";
import { finalizedRequests } from "./join-requests-finalized.mock";

export const mockShowroomJoinRequests: ShowroomJoinRequest[] = [
  ...incomingRequests,
  ...agreementRequests,
  ...followupRequests,
  ...finalizedRequests,
];
