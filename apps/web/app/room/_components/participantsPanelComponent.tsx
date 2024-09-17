import React from "react";
import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParticipantsPanelProps {
  participants: string[];
  toggleParticipantList: () => void;
}

const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({
  participants,
  toggleParticipantList,
}) => {
  return (
    <aside className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-80 bg-white dark:bg-[#111116] border-l border-[#EBEDF0] dark:border-[#1a2330] flex flex-col z-50">
      <div className="p-4 border-b border-[#EBEDF0] dark:border-[#1a2330] flex justify-between items-center">
        <h2 className="font-semibold">Participants</h2>
        <Button onClick={toggleParticipantList} variant="ghost" size="sm">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {participants.map((participant, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{participant}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ParticipantsPanel;
