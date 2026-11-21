import { useParams } from "react-router";

import RequestDecisionBanner from "../components/request-details/request-decision-banner";
import RequestDetailsHeader from "../components/request-details/request-details-header";
import RequestDetailsStateView from "../components/request-details/request-details-state-view";
import RequestDetailsTopBar from "../components/request-details/request-details-top-bar";
import RequestHistoryCard from "../components/request-details/request-history-card";
import RequestInfoCard from "../components/request-details/request-info-card";
import RequestWorkflowCard from "../components/request-details/request-workflow-card";
import { useShowroomJoinRequestDetails } from "../hooks/use-showroom-join-request-details";

export default function ShowroomJoinRequestDetailsPage() {
  const { requestId } = useParams();
  const state = useShowroomJoinRequestDetails(requestId);

  if (state.isPending) {
    return <RequestDetailsStateView mode="loading" onBack={state.goBack} />;
  }

  if (state.isError || !state.request || !state.activityConfig) {
    return <RequestDetailsStateView mode="not-found" onBack={state.goBack} />;
  }

  const {
    request,
    activityConfig,
    statusConfig,
    selectedStatusEvent,
    rejectionEvent,
  } = state;
  const ActivityIcon = activityConfig.icon;
  const copyRef = () =>
    navigator.clipboard?.writeText(request.reference).catch(() => {});

  return (
    <main dir="rtl" className="space-y-4 pb-8">
      <RequestDetailsTopBar
        reference={request.reference}
        submittedAt={request.submittedAt}
        statusLabel={statusConfig.label}
        statusClassName={statusConfig.className}
        isRejected={state.isRejected}
        eventTimestamp={selectedStatusEvent?.timestamp}
        onBack={state.goBack}
      />
      <RequestDetailsHeader
        showroomName={request.showroomName}
        reference={request.reference}
        activityLabel={activityConfig.label}
        ActivityIcon={ActivityIcon}
        onCopyReference={copyRef}
        onPrint={() => window.print()}
      />
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
        <div className="min-w-0 space-y-4">
          <RequestInfoCard
            request={request}
            activityLabel={activityConfig.label}
            ActivityIcon={ActivityIcon}
          />
          <RequestDecisionBanner
            isRejected={state.isRejected}
            isApproved={state.isApproved}
            rejectionTimestamp={rejectionEvent?.timestamp}
            onStartSetup={state.goToSetup}
          />
        </div>
        <aside className="min-w-0 space-y-4">
          <RequestWorkflowCard
            selectedStatus={state.selectedStatus}
            onStatusChange={state.setStatusOverride}
            internalNote={state.internalNote}
            onInternalNoteChange={state.setInternalNote}
            isRejected={state.isRejected}
            isApproved={state.isApproved}
            progressIndex={state.progressIndex}
            steps={state.progressSteps}
          />
          <RequestHistoryCard events={state.historyEvents} />
        </aside>
      </div>
    </main>
  );
}
